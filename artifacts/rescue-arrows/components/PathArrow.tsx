import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Platform, Pressable, StyleSheet, View } from 'react-native';
import Svg, { Polyline, Polygon, Circle } from 'react-native-svg';
import * as Haptics from 'expo-haptics';
import { useGame, CellPos } from '@/context/GameContext';

const ND = Platform.OS !== 'web';

// ms per snake step during animation
const STEP_MS = 65;

type Direction = 'up' | 'down' | 'left' | 'right';

interface PathArrowProps {
  id: string;
  path: CellPos[];
  tailIdx: number;      // Target tail index (set by GameContext after slide)
  headIdx: number;      // Target head index
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

function arrowheadPoints(headCell: CellPos, dir: Direction, cs: number): string {
  const { x, y } = cellCenter(headCell, cs);
  const s = cs * 0.22;
  const sw = s * 0.72;
  switch (dir) {
    case 'right': return `${x + s},${y} ${x - sw},${y - sw} ${x - sw},${y + sw}`;
    case 'left':  return `${x - s},${y} ${x + sw},${y - sw} ${x + sw},${y + sw}`;
    case 'down':  return `${x},${y + s} ${x - sw},${y - sw} ${x + sw},${y - sw}`;
    case 'up':    return `${x},${y - s} ${x - sw},${y + sw} ${x + sw},${y + sw}`;
  }
}

function isInGrid(c: CellPos, gs: number) {
  return c.row >= 0 && c.row < gs && c.col >= 0 && c.col < gs;
}

export function PathArrow({
  id, path, tailIdx, headIdx, bodyLen, dir, color,
  cellSize, gridPixelSize, gridSize, exiting, isHint,
}: PathArrowProps) {
  const { slideArrow, removeExitedArrow } = useGame();

  // ── Animation state ────────────────────────────────────────────
  // localTailRef / localHeadRef drive the visual snake position.
  // They animate toward the target tailIdx/headIdx set by GameContext.
  const localTailRef = useRef(tailIdx);
  const localHeadRef = useRef(headIdx);
  const [, forceRender] = useState(0);

  const targetTailRef = useRef(tailIdx);
  const targetHeadRef = useRef(headIdx);
  const isExitingRef = useRef(exiting);
  const removedRef = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    // Update targets
    targetTailRef.current = tailIdx;
    targetHeadRef.current = headIdx;
    isExitingRef.current = exiting;

    // Nothing to animate?
    if (localTailRef.current >= tailIdx) return;

    // If already running, let it continue toward updated target
    if (intervalRef.current) return;

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

  // ── Hint pulse ─────────────────────────────────────────────────
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

  // ── Render ─────────────────────────────────────────────────────
  const localTail = localTailRef.current;
  const localHead = localHeadRef.current;

  // Cells in the current body
  const bodyCells = path.slice(localTail, localHead + 1);
  // Only render in-grid portion
  const renderCells = bodyCells.filter(c => isInGrid(c, gridSize));

  // If nothing to render (fully offscreen), show nothing
  if (renderCells.length === 0) return null;

  // SVG polyline points (through in-grid cells)
  const svgPoints = renderCells
    .map(c => `${c.col * cellSize + cellSize / 2},${c.row * cellSize + cellSize / 2}`)
    .join(' ');

  // Arrowhead at the last in-grid cell
  const headCell = renderCells[renderCells.length - 1];
  const isHeadActuallyAtFront = isInGrid(path[localHead], gridSize);
  const showArrowhead = isHeadActuallyAtFront;
  const arrowPts = showArrowhead ? arrowheadPoints(headCell, dir, cellSize) : '';

  // Touch hit area (bounding box of render cells + padding)
  const minRow = Math.min(...renderCells.map(c => c.row));
  const maxRow = Math.max(...renderCells.map(c => c.row));
  const minCol = Math.min(...renderCells.map(c => c.col));
  const maxCol = Math.max(...renderCells.map(c => c.col));
  const pad = cellSize * 0.28;
  const strokeWidth = Math.max(cellSize * 0.11, 3.5);

  const handlePress = async () => {
    if (isExitingRef.current || removedRef.current) return;
    const result = slideArrow(id);
    if (Platform.OS !== 'web') {
      if (result.exited) {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      } else if (result.moved) {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      } else {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      }
    }
  };

  return (
    <View
      style={[
        StyleSheet.absoluteFillObject,
        { width: gridPixelSize, height: gridPixelSize, pointerEvents: 'box-none' },
      ]}
    >
      {/* SVG draw layer */}
      <Animated.View
        style={[
          StyleSheet.absoluteFillObject,
          { opacity: hintOpacity, pointerEvents: 'none' },
        ]}
      >
        <Svg width={gridPixelSize} height={gridPixelSize}>
          {renderCells.length >= 2 && (
            <Polyline
              points={svgPoints}
              stroke={color}
              strokeWidth={strokeWidth}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}
          {renderCells.length === 1 && (
            <Circle
              cx={renderCells[0].col * cellSize + cellSize / 2}
              cy={renderCells[0].row * cellSize + cellSize / 2}
              r={strokeWidth * 0.6}
              fill={color}
            />
          )}
          {showArrowhead && arrowPts !== '' && (
            <Polygon
              points={arrowPts}
              fill={color}
            />
          )}
        </Svg>
      </Animated.View>

      {/* Pressable touch layer */}
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
