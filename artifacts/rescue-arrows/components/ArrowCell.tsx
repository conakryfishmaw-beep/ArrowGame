import React, { useEffect, useRef } from 'react';
import { Animated, Platform, Pressable, StyleSheet, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { useGame } from '@/context/GameContext';

interface ArrowCellProps {
  id: string;
  row: number;
  col: number;
  dir: 'up' | 'down' | 'left' | 'right';
  color: string;
  cellSize: number;
  isHint: boolean;
}

const ARROW_DURATION = 160;

const DIR_ROTATION: Record<string, string> = {
  up: '0deg',
  right: '90deg',
  down: '180deg',
  left: '270deg',
};

export function ArrowCell({ id, row, col, dir, color, cellSize, isHint }: ArrowCellProps) {
  const { slideArrow } = useGame();
  const translateX = useRef(new Animated.Value(col * cellSize)).current;
  const translateY = useRef(new Animated.Value(row * cellSize)).current;
  const hintAnim = useRef(new Animated.Value(1)).current;
  const pressScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateX, { toValue: col * cellSize, duration: ARROW_DURATION, useNativeDriver: true }),
      Animated.timing(translateY, { toValue: row * cellSize, duration: ARROW_DURATION, useNativeDriver: true }),
    ]).start();
  }, [row, col, cellSize]);

  useEffect(() => {
    if (isHint) {
      const loop = Animated.loop(
        Animated.sequence([
          Animated.timing(hintAnim, { toValue: 1.3, duration: 300, useNativeDriver: true }),
          Animated.timing(hintAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
        ]),
        { iterations: 4 }
      );
      loop.start();
      return () => loop.stop();
    } else {
      hintAnim.setValue(1);
    }
  }, [isHint]);

  const handlePress = async () => {
    Animated.sequence([
      Animated.timing(pressScale, { toValue: 0.85, duration: 70, useNativeDriver: true }),
      Animated.timing(pressScale, { toValue: 1, duration: 70, useNativeDriver: true }),
    ]).start();

    const result = slideArrow(id);

    if (Platform.OS !== 'web') {
      if (result.exited) {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      } else if (result.moved) {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
      } else {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      }
    }
  };

  const arrowSize = cellSize * 0.7;
  const headSize = arrowSize * 0.38;
  const shaftWidth = arrowSize * 0.18;
  const shaftHeight = arrowSize * 0.5;

  return (
    <Animated.View
      style={[
        styles.arrowContainer,
        {
          width: cellSize,
          height: cellSize,
          transform: [{ translateX }, { translateY }],
        },
      ]}
    >
      <Pressable onPress={handlePress} style={styles.pressable}>
        <Animated.View style={{ transform: [{ scale: Animated.multiply(pressScale, hintAnim) }] }}>
          <View
            style={[
              styles.arrowWrapper,
              { width: arrowSize, height: arrowSize },
              isHint && { shadowColor: '#FFFFFF', shadowOpacity: 0.8, shadowRadius: 8, elevation: 8 },
            ]}
          >
            <View
              style={[
                styles.arrowBody,
                {
                  width: arrowSize,
                  height: arrowSize,
                  transform: [{ rotate: DIR_ROTATION[dir] }],
                },
              ]}
            >
              <View style={[styles.arrowHead, { borderBottomWidth: headSize, borderLeftWidth: headSize * 0.7, borderRightWidth: headSize * 0.7, borderBottomColor: color }]} />
              <View style={[styles.shaft, { width: shaftWidth, height: shaftHeight, backgroundColor: color, borderRadius: shaftWidth / 2 }]} />
            </View>
          </View>
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  arrowContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressable: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: '100%',
  },
  arrowWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowBody: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  arrowHead: {
    width: 0,
    height: 0,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    backgroundColor: 'transparent',
  },
  shaft: {},
});
