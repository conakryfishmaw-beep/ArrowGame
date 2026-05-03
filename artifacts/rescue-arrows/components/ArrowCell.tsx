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

const DIR_ROTATION: Record<string, string> = {
  up: '0deg',
  right: '90deg',
  down: '180deg',
  left: '270deg',
};

function ArrowShape({ size, tint }: { size: number; tint: string }) {
  const headW = size * 0.52;
  const headH = size * 0.42;
  const shaftW = size * 0.30;
  const shaftH = size * 0.40;
  const gap = size * 0.01;

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', height: size }}>
      <View
        style={{
          width: 0,
          height: 0,
          borderLeftWidth: headW / 2,
          borderRightWidth: headW / 2,
          borderBottomWidth: headH,
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent',
          borderBottomColor: tint,
          marginBottom: gap,
        }}
      />
      <View
        style={{
          width: shaftW,
          height: shaftH,
          backgroundColor: tint,
          borderRadius: shaftW * 0.3,
        }}
      />
    </View>
  );
}

export function ArrowCell({ id, row, col, dir, color, cellSize, isHint }: ArrowCellProps) {
  const { slideArrow } = useGame();
  const translateX = useRef(new Animated.Value(col * cellSize)).current;
  const translateY = useRef(new Animated.Value(row * cellSize)).current;
  const hintAnim = useRef(new Animated.Value(1)).current;
  const pressScale = useRef(new Animated.Value(1)).current;
  const slideScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(translateX, {
        toValue: col * cellSize,
        useNativeDriver: true,
        tension: 200,
        friction: 10,
      }),
      Animated.spring(translateY, {
        toValue: row * cellSize,
        useNativeDriver: true,
        tension: 200,
        friction: 10,
      }),
      Animated.sequence([
        Animated.timing(slideScale, { toValue: 1.2, duration: 70, useNativeDriver: true }),
        Animated.timing(slideScale, { toValue: 1, duration: 200, useNativeDriver: true }),
      ]),
    ]).start();
  }, [row, col, cellSize]);

  useEffect(() => {
    if (isHint) {
      const loop = Animated.loop(
        Animated.sequence([
          Animated.timing(hintAnim, { toValue: 1.22, duration: 300, useNativeDriver: true }),
          Animated.timing(hintAnim, { toValue: 0.88, duration: 300, useNativeDriver: true }),
        ]),
        { iterations: 5 }
      );
      loop.start();
      return () => loop.stop();
    } else {
      hintAnim.setValue(1);
    }
  }, [isHint]);

  const handlePress = async () => {
    Animated.sequence([
      Animated.timing(pressScale, { toValue: 0.78, duration: 55, useNativeDriver: true }),
      Animated.timing(pressScale, { toValue: 1.08, duration: 90, useNativeDriver: true }),
      Animated.timing(pressScale, { toValue: 1, duration: 55, useNativeDriver: true }),
    ]).start();

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

  const tileSize = cellSize * 0.83;
  const radius = tileSize * 0.22;
  const arrowSize = tileSize * 0.70;
  const combinedScale = Animated.multiply(Animated.multiply(pressScale, hintAnim), slideScale);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          width: cellSize,
          height: cellSize,
          transform: [{ translateX }, { translateY }],
        },
      ]}
    >
      <Pressable onPress={handlePress} style={styles.pressable}>
        <Animated.View style={{ transform: [{ scale: combinedScale }] }}>
          <View
            style={[
              styles.tile,
              {
                width: tileSize,
                height: tileSize,
                borderRadius: radius,
                backgroundColor: color,
              },
              isHint && {
                shadowColor: '#FFFFFF',
                shadowOpacity: 0.95,
                shadowRadius: 14,
                shadowOffset: { width: 0, height: 0 },
                elevation: 16,
              },
            ]}
          >
            <View style={{ transform: [{ rotate: DIR_ROTATION[dir] }] }}>
              <ArrowShape size={arrowSize} tint="rgba(0,0,0,0.72)" />
            </View>
          </View>
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
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
  tile: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
