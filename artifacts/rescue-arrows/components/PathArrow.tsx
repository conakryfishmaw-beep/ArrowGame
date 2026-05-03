import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { Animated, Easing, Platform, Pressable, StyleSheet } from 'react-native';
import Svg, { Polyline, Polygon } from 'react-native-svg';
import * as Haptics from 'expo-haptics';
import { useGame, CellPos } from '@/context/GameContext';

const ND = Platform.OS !== 'web';

type Direction = 'up' | 'down' | 'left' | 'right';

interface PathArrowProps {
  id: string;
  cells: CellPos[];
  dir: Direction;
  color: string;
  cellSize: number;
  gridPixelSize: number;
  gridSize: number;
  exiting: boolean;
  isHint: boolean;
}

function cellCenter(cell: CellPos, cs: number) {
  return { x: cell.col * cs + cs / 2, y: cell.row * cs + cs / 2 };
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

export function PathArrow({
  id, cells, dir, color, cellSize, gridPixelSize, gridSize, exiting, isHint,
}: PathArrowProps) {
  const { slideArrow, removeExitedArrow } = useGame();

  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const hintOpacity = useRef(new Animated.Value(1)).current;
  const exitingRef = useRef(false);

  // FLIP animation refs: track pending delta to apply before first paint
  const prevCellsRef = useRef<CellPos[]>(cells);
  const pendingFlip = useRef<{ dx: number; dy: number } | null>(null);

  // Compute FLIP delta during this render (cells already updated to new position)
  if (!exiting && cells !== prevCellsRef.current) {
    const oldHead = prevCellsRef.current[prevCellsRef.current.length - 1];
    const newHead = cells[cells.length - 1];
    const dx = (oldHead.col - newHead.col) * cellSize;
    const dy = (oldHead.row - newHead.row) * cellSize;
    if (dx !== 0 || dy !== 0) {
      pendingFlip.current = { dx, dy };
    }
    prevCellsRef.current = cells;
  }

  // Apply FLIP before paint
  useLayoutEffect(() => {
    const flip = pendingFlip.current;
    if (flip && !exiting) {
      pendingFlip.current = null;
      translateX.setValue(flip.dx);
      translateY.setValue(flip.dy);
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: 0, duration: 210,
          easing: Easing.out(Easing.quad),
          useNativeDriver: ND,
        }),
        Animated.timing(translateY, {
          toValue: 0, duration: 210,
          easing: Easing.out(Easing.quad),
          useNativeDriver: ND,
        }),
      ]).start();
    }
  });

  // Hint pulse animation
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

  // Exit animation: slide the whole arrow off screen in its direction
  useEffect(() => {
    if (!exiting) return;
    exitingRef.current = true;
    translateX.stopAnimation();
    translateY.stopAnimation();

    const minRow = Math.min(...cells.map((c) => c.row));
    const maxRow = Math.max(...cells.map((c) => c.row));
    const minCol = Math.min(...cells.map((c) => c.col));
    const maxCol = Math.max(...cells.map((c) => c.col));

    let targetTX = 0;
    let targetTY = 0;
    switch (dir) {
      case 'right': targetTX = (gridSize - minCol) * cellSize + cellSize; break;
      case 'left':  targetTX = -(maxCol + 2) * cellSize; break;
      case 'down':  targetTY = (gridSize - minRow) * cellSize + cellSize; break;
      case 'up':    targetTY = -(maxRow + 2) * cellSize; break;
    }

    Animated.parallel([
      Animated.timing(translateX, {
        toValue: targetTX, duration: 340,
        easing: Easing.in(Easing.quad),
        useNativeDriver: ND,
      }),
      Animated.timing(translateY, {
        toValue: targetTY, duration: 340,
        easing: Easing.in(Easing.quad),
        useNativeDriver: ND,
      }),
    ]).start(({ finished }) => {
      if (finished) removeExitedArrow(id);
    });
  }, [exiting]);

  const handlePress = async () => {
    if (exitingRef.current) return;
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

  // Build SVG polyline points string
  const svgPoints = cells.map((c) => {
    const { x, y } = cellCenter(c, cellSize);
    return `${x},${y}`;
  }).join(' ');

  const headCell = cells[cells.length - 1];
  const arrowPts = arrowheadPoints(headCell, dir, cellSize);

  // Hit area: bounding box of the arrow cells
  const minRow = Math.min(...cells.map((c) => c.row));
  const maxRow = Math.max(...cells.map((c) => c.row));
  const minCol = Math.min(...cells.map((c) => c.col));
  const maxCol = Math.max(...cells.map((c) => c.col));

  const pad = cellSize * 0.28;
  const strokeWidth = Math.max(cellSize * 0.11, 3);

  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFillObject,
        { width: gridPixelSize, height: gridPixelSize, pointerEvents: 'box-none' },
        { transform: [{ translateX }, { translateY }] },
      ]}
    >
      {/* SVG draw layer — non-interactive */}
      <Animated.View
        style={[StyleSheet.absoluteFillObject, { opacity: hintOpacity, pointerEvents: 'none' }]}
      >
        <Svg
          width={gridPixelSize}
          height={gridPixelSize}
        >
          <Polyline
            points={svgPoints}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Polygon
            points={arrowPts}
            fill={color}
            strokeLinejoin="round"
          />
        </Svg>
      </Animated.View>

      {/* Pressable touch layer — on top */}
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
    </Animated.View>
  );
}
