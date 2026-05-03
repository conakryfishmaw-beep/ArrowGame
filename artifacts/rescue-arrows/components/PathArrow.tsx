import React, { useEffect, useRef, useState } from 'react';
import { Animated, Platform, Pressable, StyleSheet, View } from 'react-native';
import Svg, { Path, Polygon } from 'react-native-svg';
import * as Haptics from 'expo-haptics';
import { useGame, CellPos } from '@/context/GameContext';

const ND = Platform.OS !== 'web';
const STEP_MS = 65;

type Direction = 'up' | 'down' | 'left' | 'right';

interface PathArrowProps {
  id: string;
  path: CellPos[];
  tailIdx: number;
  headIdx: number;
  bodyLen: number;
  dir: Direction;
  color: string;
  cellSize: number;
  gridPixelSize: number;
  gridSize: number;
  exiting: boolean;
  isHint: boolean;
}

function cellCenter(c: CellPos, cs: number) {
  return { x: c.col * cs + cs / 2, y: c.row * cs + cs / 2 };
}

function isInGrid(c: CellPos, gs: number) {
  return c.row >= 0 && c.row < gs && c.col >= 0 && c.col < gs;
}

/**
 * Returns arrowhead polygon points string AND the (bx, by) back-center point
 * where the polyline body should terminate — ensuring zero gap between body and head.
 */
function arrowhead(headCell: CellPos, dir: Direction, cs: number) {
  const { x, y } = cellCenter(headCell, cs);
  const tip = cs * 0.24;   // how far the point extends from center
  const half = cs * 0.17;  // half-width of the arrowhead base

  switch (dir) {
    case 'right':
      return {
        pts: `${x + tip},${y} ${x - half},${y - half} ${x - half},${y + half}`,
        bx: x - half, by: y,
      };
    case 'left':
      return {
        pts: `${x - tip},${y} ${x + half},${y - half} ${x + half},${y + half}`,
        bx: x + half, by: y,
      };
    case 'down':
      return {
        pts: `${x},${y + tip} ${x - half},${y - half} ${x + half},${y - half}`,
        bx: x, by: y - half,
      };
    case 'up':
      return {
        pts: `${x},${y - tip} ${x - half},${y + half} ${x + half},${y + half}`,
        bx: x, by: y + half,
      };
  }
}

/**
 * Build a single SVG Path `d` string for the body + seamless arrowhead stub.
 * The body polyline ends exactly at the arrowhead's back-center (bx, by),
 * so the filled Polygon arrowhead seats flush against it with no gap.
 */
function buildBodyPath(renderCells: CellPos[], headCell: CellPos, dir: Direction, cs: number): string {
  const { bx, by } = arrowhead(headCell, dir, cs);

  if (renderCells.length === 0) return '';

  const pts = renderCells.map(c => {
    const { x, y } = cellCenter(c, cs);
    return { x, y };
  });

  // Replace the last point with the arrowhead back-center so the stroke meets the polygon flush
  pts[pts.length - 1] = { x: bx, y: by };

  const [first, ...rest] = pts;
  const d = `M ${first.x} ${first.y}` + rest.map(p => ` L ${p.x} ${p.y}`).join('');
  return d;
}

export function PathArrow({
  id, path, tailIdx, headIdx, bodyLen, dir, color,
  cellSize, gridPixelSize, gridSize, exiting, isHint,
}: PathArrowProps) {
  const { slideArrow, removeExitedArrow } = useGame();

  // ── Animation state ───────────────────────────────────────────
  const localTailRef = useRef(tailIdx);
  const localHeadRef = useRef(headIdx);
  const [, forceRender] = useState(0);

  const targetTailRef = useRef(tailIdx);
  const targetHeadRef = useRef(headIdx);
  const isExitingRef = useRef(exiting);
  const removedRef = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    targetTailRef.current = tailIdx;
    targetHeadRef.current = headIdx;
    isExitingRef.current = exiting;

    if (localTailRef.current >= tailIdx) return;
    if (intervalRef.current) return; // already stepping toward target

    intervalRef.current = setInterval(() => {
      if (localTailRef.current >= targetTailRef.current) {
        clearInterval(intervalRef.current!);
        intervalRef.current = null;
        if (isExitingRef.current && !removedRef.current) {
          removedRef.current = true;
          removeExitedArrow(id);
        }
        return;
      }
      localTailRef.current += 1;
      localHeadRef.current += 1;
      forceRender(k => k + 1);
    }, STEP_MS);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [tailIdx, headIdx, exiting, id]);

  // ── Hint pulse ────────────────────────────────────────────────
  const hintOpacity = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    if (isHint) {
      const loop = Animated.loop(
        Animated.sequence([
          Animated.timing(hintOpacity, { toValue: 0.25, duration: 350, useNativeDriver: ND }),
          Animated.timing(hintOpacity, { toValue: 1, duration: 350, useNativeDriver: ND }),
        ]),
        { iterations: 6 }
      );
      loop.start();
      return () => loop.stop();
    } else {
      hintOpacity.setValue(1);
    }
  }, [isHint]);

  // ── Render ────────────────────────────────────────────────────
  const localTail = localTailRef.current;
  const localHead = localHeadRef.current;

  const bodyCells = path.slice(localTail, localHead + 1);
  const renderCells = bodyCells.filter(c => isInGrid(c, gridSize));

  if (renderCells.length === 0) return null;

  const headCell = renderCells[renderCells.length - 1];
  const isHeadOnScreen = isInGrid(path[localHead], gridSize);

  const { pts: arrowPts } = arrowhead(headCell, dir, cellSize);

  // Unified body path — ends flush at arrowhead back-center
  const bodyPathD = buildBodyPath(renderCells, headCell, dir, cellSize);

  const sw = Math.max(cellSize * 0.11, 3.5);

  // Hit-area bounding box
  const minRow = Math.min(...renderCells.map(c => c.row));
  const maxRow = Math.max(...renderCells.map(c => c.row));
  const minCol = Math.min(...renderCells.map(c => c.col));
  const maxCol = Math.max(...renderCells.map(c => c.col));
  const pad = cellSize * 0.28;

  const handlePress = async () => {
    if (isExitingRef.current || removedRef.current) return;
    const result = slideArrow(id);
    if (Platform.OS !== 'web') {
      if (result.exited) await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      else if (result.moved) await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      else await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    }
  };

  return (
    <View
      style={[
        StyleSheet.absoluteFillObject,
        { width: gridPixelSize, height: gridPixelSize, pointerEvents: 'box-none' },
      ]}
    >
      <Animated.View
        style={[
          StyleSheet.absoluteFillObject,
          { opacity: hintOpacity, pointerEvents: 'none' },
        ]}
      >
        <Svg width={gridPixelSize} height={gridPixelSize}>
          {/* Body: single SVG Path, ends exactly at arrowhead back-center */}
          {bodyPathD !== '' && (
            <Path
              d={bodyPathD}
              stroke={color}
              strokeWidth={sw}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}
          {/* Arrowhead: filled polygon, base flush against body endpoint */}
          {isHeadOnScreen && (
            <Polygon
              points={arrowPts}
              fill={color}
            />
          )}
        </Svg>
      </Animated.View>

      {!exiting && (
        <Pressable
          onPress={handlePress}
          style={{
            position: 'absolute',
            left: minCol * cellSize - pad,
            top: minRow * cellSize - pad,
            width: (maxCol - minCol + 1) * cellSize + pad * 2,
            height: (maxRow - minRow + 1) * cellSize + pad * 2,
          }}
        />
      )}
    </View>
  );
}
