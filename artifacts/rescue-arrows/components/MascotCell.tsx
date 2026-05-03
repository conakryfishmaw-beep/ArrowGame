import React, { useEffect, useRef } from 'react';
import { Animated, Platform, StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Level } from '@/data/levels';

const ND = Platform.OS !== 'web';

interface MascotCellProps {
  level: Level;
  cellSize: number;
  celebrating: boolean;
}

type MCIconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

const FALLBACK_ICON: MCIconName = 'star-four-points';

const CHARACTER_ICON_MAP: Record<string, MCIconName> = {
  rabbit: 'rabbit',
  cat: 'cat',
  bear: 'teddy-bear',
  'face-woman': 'face-woman',
  'face-woman-outline': 'face-woman-outline',
  'human-female': 'human-female',
  'star-face': 'star-four-points',
  butterfly: 'butterfly',
  snake: 'snake',
  'horse-variant': 'horse-variant',
  'crystal-ball': 'crystal-ball',
  shimmer: 'shimmer',
  'magic-staff': 'magic-staff',
  'sword-cross': 'sword-cross',
  'shield-star': 'shield-star',
  crown: 'crown',
};

// Character → warm accent color for the mascot circle
const CHARACTER_RING_COLOR: Record<string, string> = {
  rabbit: '#A8E6CF',
  cat: '#FFB7C5',
  bear: '#A8D8FF',
  'face-woman': '#FFB7E8',
  'human-female': '#B7FFE4',
  snake: '#B7D4FF',
  butterfly: '#E0B7FF',
  'horse-variant': '#B7FFF0',
  'crystal-ball': '#FFE4B7',
  shimmer: '#B7FFF0',
  'sword-cross': '#FFD700',
  'shield-star': '#E8E8FF',
  crown: '#FFD700',
  'star-face': '#FFB7E8',
};

export function MascotCell({ level, cellSize, celebrating }: MascotCellProps) {
  const breathe = useRef(new Animated.Value(1)).current;
  const celebrateScale = useRef(new Animated.Value(1)).current;
  const celebrateRotate = useRef(new Animated.Value(0)).current;
  const glowOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(breathe, { toValue: 1.07, duration: 1300, useNativeDriver: ND }),
        Animated.timing(breathe, { toValue: 1, duration: 1300, useNativeDriver: ND }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, []);

  useEffect(() => {
    if (celebrating) {
      glowOpacity.setValue(0.7);
      Animated.parallel([
        Animated.loop(
          Animated.sequence([
            Animated.timing(celebrateScale, { toValue: 1.3, duration: 180, useNativeDriver: ND }),
            Animated.timing(celebrateScale, { toValue: 1, duration: 180, useNativeDriver: ND }),
          ]),
          { iterations: 6 }
        ),
        Animated.loop(
          Animated.sequence([
            Animated.timing(celebrateRotate, { toValue: 1, duration: 130, useNativeDriver: ND }),
            Animated.timing(celebrateRotate, { toValue: -1, duration: 130, useNativeDriver: ND }),
            Animated.timing(celebrateRotate, { toValue: 0, duration: 130, useNativeDriver: ND }),
          ]),
          { iterations: 4 }
        ),
        Animated.loop(
          Animated.sequence([
            Animated.timing(glowOpacity, { toValue: 1, duration: 180, useNativeDriver: ND }),
            Animated.timing(glowOpacity, { toValue: 0.4, duration: 180, useNativeDriver: ND }),
          ]),
          { iterations: 8 }
        ),
      ]).start();
    } else {
      celebrateScale.setValue(1);
      celebrateRotate.setValue(0);
      glowOpacity.setValue(0);
    }
  }, [celebrating]);

  const size = cellSize * 0.72;
  const iconSize = Math.floor(size * 0.52);
  const ringColor = CHARACTER_RING_COLOR[level.character] ?? '#A8E6CF';
  const iconName: MCIconName = CHARACTER_ICON_MAP[level.character] ?? FALLBACK_ICON;

  const rotateDeg = celebrateRotate.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ['-14deg', '0deg', '14deg'],
  });

  return (
    <View
      style={[
        styles.container,
        {
          width: cellSize,
          height: cellSize,
          left: level.mascotCol * cellSize,
          top: level.mascotRow * cellSize,
        },
      ]}
    >
      {/* Glow ring (only visible during celebration) */}
      <Animated.View
        style={[
          styles.glow,
          {
            width: size + 10,
            height: size + 10,
            borderRadius: (size + 10) / 2,
            borderColor: ringColor,
            opacity: glowOpacity,
          },
        ]}
      />

      {/* Main character circle */}
      <Animated.View
        style={[
          styles.circle,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: ringColor,
            borderColor: '#1A1A1A',
            transform: [
              { scale: Animated.multiply(breathe, celebrateScale) },
              { rotate: rotateDeg },
            ],
          },
        ]}
      >
        <MaterialCommunityIcons name={iconName} size={iconSize} color="#1A1A1A" />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  glow: {
    position: 'absolute',
    borderWidth: 3,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  circle: {
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
});
