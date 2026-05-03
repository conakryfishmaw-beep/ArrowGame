import React, { useEffect, useRef } from 'react';
import { Animated, Platform, Pressable, StyleSheet, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { MaterialCommunityIcons } from '@expo/vector-icons';
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

const DIR_ICON: Record<string, 'arrow-up-bold' | 'arrow-down-bold' | 'arrow-left-bold' | 'arrow-right-bold'> = {
  up: 'arrow-up-bold',
  down: 'arrow-down-bold',
  left: 'arrow-left-bold',
  right: 'arrow-right-bold',
};

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
        tension: 180,
        friction: 9,
      }),
      Animated.spring(translateY, {
        toValue: row * cellSize,
        useNativeDriver: true,
        tension: 180,
        friction: 9,
      }),
      Animated.sequence([
        Animated.timing(slideScale, { toValue: 1.18, duration: 80, useNativeDriver: true }),
        Animated.timing(slideScale, { toValue: 1, duration: 180, useNativeDriver: true }),
      ]),
    ]).start();
  }, [row, col, cellSize]);

  useEffect(() => {
    if (isHint) {
      const loop = Animated.loop(
        Animated.sequence([
          Animated.timing(hintAnim, { toValue: 1.25, duration: 320, useNativeDriver: true }),
          Animated.timing(hintAnim, { toValue: 0.9, duration: 320, useNativeDriver: true }),
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
      Animated.timing(pressScale, { toValue: 0.8, duration: 60, useNativeDriver: true }),
      Animated.timing(pressScale, { toValue: 1.05, duration: 80, useNativeDriver: true }),
      Animated.timing(pressScale, { toValue: 1, duration: 60, useNativeDriver: true }),
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

  const tileSize = cellSize * 0.84;
  const radius = tileSize * 0.24;
  const iconSize = tileSize * 0.58;

  const combinedScale = Animated.multiply(Animated.multiply(pressScale, hintAnim), slideScale);

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
                shadowOpacity: 0.9,
                shadowRadius: 12,
                shadowOffset: { width: 0, height: 0 },
                elevation: 12,
              },
            ]}
          >
            <MaterialCommunityIcons
              name={DIR_ICON[dir]}
              size={iconSize}
              color="rgba(0,0,0,0.75)"
            />
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
  tile: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
