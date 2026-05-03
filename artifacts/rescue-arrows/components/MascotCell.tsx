import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Level } from '@/data/levels';

interface MascotCellProps {
  level: Level;
  cellSize: number;
  celebrating: boolean;
}

type MCIconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

const FALLBACK_ICON: MCIconName = 'star-four-points';

const CHARACTER_ICON_MAP: Record<string, MCIconName> = {
  'rabbit': 'rabbit',
  'cat': 'cat',
  'teddy-bear': 'teddy-bear',
  'face-woman': 'face-woman',
  'face-woman-outline': 'face-woman-outline',
  'human-female': 'human-female',
  'star-face': 'star-four-points',
  'butterfly': 'butterfly',
  'snake': 'snake',
  'horse-variant': 'horse-variant',
  'crystal-ball': 'crystal-ball',
  'shimmer': 'shimmer',
  'magic-staff': 'magic-staff',
  'sword-cross': 'sword-cross',
  'shield-star': 'shield-star',
  'crown': 'crown',
};

export function MascotCell({ level, cellSize, celebrating }: MascotCellProps) {
  const breathe = useRef(new Animated.Value(1)).current;
  const celebrateScale = useRef(new Animated.Value(1)).current;
  const celebrateRotate = useRef(new Animated.Value(0)).current;
  const glowOpacity = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const breathLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(breathe, { toValue: 1.06, duration: 1200, useNativeDriver: true }),
        Animated.timing(breathe, { toValue: 1, duration: 1200, useNativeDriver: true }),
      ])
    );
    breathLoop.start();
    return () => breathLoop.stop();
  }, []);

  useEffect(() => {
    if (celebrating) {
      Animated.parallel([
        Animated.loop(
          Animated.sequence([
            Animated.timing(celebrateScale, { toValue: 1.25, duration: 200, useNativeDriver: true }),
            Animated.timing(celebrateScale, { toValue: 1, duration: 200, useNativeDriver: true }),
          ]),
          { iterations: 6 }
        ),
        Animated.loop(
          Animated.sequence([
            Animated.timing(celebrateRotate, { toValue: 1, duration: 150, useNativeDriver: true }),
            Animated.timing(celebrateRotate, { toValue: -1, duration: 150, useNativeDriver: true }),
            Animated.timing(celebrateRotate, { toValue: 0, duration: 150, useNativeDriver: true }),
          ]),
          { iterations: 4 }
        ),
        Animated.loop(
          Animated.sequence([
            Animated.timing(glowOpacity, { toValue: 1, duration: 200, useNativeDriver: true }),
            Animated.timing(glowOpacity, { toValue: 0.4, duration: 200, useNativeDriver: true }),
          ]),
          { iterations: 8 }
        ),
      ]).start();
    } else {
      celebrateScale.setValue(1);
      celebrateRotate.setValue(0);
      glowOpacity.setValue(0.4);
    }
  }, [celebrating]);

  const mascotWidth = cellSize * level.mascotSize;
  const mascotHeight = cellSize * level.mascotSize;
  const iconSize = Math.floor(mascotWidth * 0.55);

  const rotateDeg = celebrateRotate.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ['-12deg', '0deg', '12deg'],
  });

  const iconName: MCIconName = CHARACTER_ICON_MAP[level.character] ?? FALLBACK_ICON;

  return (
    <View
      style={[
        styles.container,
        {
          width: mascotWidth,
          height: mascotHeight,
          left: level.mascotCol * cellSize,
          top: level.mascotRow * cellSize,
        },
      ]}
    >
      <Animated.View
        style={[
          styles.glow,
          {
            width: mascotWidth,
            height: mascotHeight,
            borderRadius: 12,
            opacity: glowOpacity,
          },
        ]}
      />
      <Animated.View
        style={[
          styles.inner,
          {
            width: mascotWidth - 4,
            height: mascotHeight - 4,
            borderRadius: 10,
            transform: [
              { scale: Animated.multiply(breathe, celebrateScale) },
              { rotate: rotateDeg },
            ],
          },
        ]}
      >
        <MaterialCommunityIcons
          name={iconName}
          size={iconSize}
          color={level.characterColor}
        />
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
    backgroundColor: '#FFD700',
    shadowColor: '#FFD700',
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 12,
  },
  inner: {
    backgroundColor: '#111111',
    borderWidth: 2,
    borderColor: '#FFD700',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
