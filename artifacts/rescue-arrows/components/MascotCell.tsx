import React, { useEffect, useRef } from 'react';
import { Animated, Image, ImageSourcePropType, Platform, StyleSheet, Text, View } from 'react-native';
import { useGame } from '@/context/GameContext';
import { Level } from '@/data/levels';

const ND = Platform.OS !== 'web';

interface MascotCellProps {
  level: Level;
  cellSize: number;
  celebrating: boolean;
}

export function MascotCell({ level, cellSize, celebrating }: MascotCellProps) {
  const { mascotHitTimestamp, currentCharacter } = useGame();

  const breathe = useRef(new Animated.Value(1)).current;
  const celebrateScale = useRef(new Animated.Value(1)).current;
  const shakeX = useRef(new Animated.Value(0)).current;
  const glowOpacity = useRef(new Animated.Value(0)).current;
  const dangerOpacity = useRef(new Animated.Value(0)).current;
  const prevHitTs = useRef(0);

  // Breathing idle animation
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(breathe, { toValue: 1.06, duration: 1400, useNativeDriver: ND }),
        Animated.timing(breathe, { toValue: 1, duration: 1400, useNativeDriver: ND }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, []);

  // Celebrate: scale up with glow pulse
  useEffect(() => {
    if (celebrating) {
      glowOpacity.setValue(0.8);
      Animated.parallel([
        Animated.spring(celebrateScale, { toValue: 1.35, useNativeDriver: ND, tension: 60, friction: 5 }),
        Animated.loop(
          Animated.sequence([
            Animated.timing(glowOpacity, { toValue: 1, duration: 200, useNativeDriver: ND }),
            Animated.timing(glowOpacity, { toValue: 0.4, duration: 200, useNativeDriver: ND }),
          ]),
          { iterations: 10 }
        ),
      ]).start();
    } else {
      celebrateScale.setValue(1);
      glowOpacity.setValue(0);
    }
  }, [celebrating]);

  // Danger shake when an arrow tries to enter the mascot cell
  useEffect(() => {
    if (mascotHitTimestamp === 0 || mascotHitTimestamp === prevHitTs.current) return;
    prevHitTs.current = mascotHitTimestamp;

    dangerOpacity.setValue(1);
    Animated.parallel([
      Animated.sequence([
        Animated.timing(shakeX, { toValue: -8, duration: 50, useNativeDriver: ND }),
        Animated.timing(shakeX, { toValue: 8, duration: 50, useNativeDriver: ND }),
        Animated.timing(shakeX, { toValue: -6, duration: 50, useNativeDriver: ND }),
        Animated.timing(shakeX, { toValue: 6, duration: 50, useNativeDriver: ND }),
        Animated.timing(shakeX, { toValue: -4, duration: 50, useNativeDriver: ND }),
        Animated.timing(shakeX, { toValue: 0, duration: 50, useNativeDriver: ND }),
      ]),
      Animated.sequence([
        Animated.delay(200),
        Animated.timing(dangerOpacity, { toValue: 0, duration: 400, useNativeDriver: ND }),
      ]),
    ]).start();
  }, [mascotHitTimestamp]);

  const size = cellSize * 0.76;
  const glowSize = size + 14;
  const { glowColor } = currentCharacter;
  const imageSource = currentCharacter.image as ImageSourcePropType;

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
      {/* Glow ring */}
      <Animated.View
        style={[
          styles.glow,
          {
            width: glowSize,
            height: glowSize,
            borderRadius: glowSize / 2,
            borderColor: glowColor,
            shadowColor: glowColor,
            opacity: glowOpacity,
          },
        ]}
      />

      {/* Character photo — animated scale + shake */}
      <Animated.View
        style={[
          styles.photoFrame,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            borderColor: glowColor,
            transform: [
              { scale: Animated.multiply(breathe, celebrateScale) },
              { translateX: shakeX },
            ],
          },
        ]}
      >
        <Image
          source={imageSource}
          style={[styles.photo, { width: size, height: size, borderRadius: size / 2 }]}
          resizeMode="cover"
        />
      </Animated.View>

      {/* Danger emoji overlay */}
      <Animated.View
        style={[styles.dangerBadge, { opacity: dangerOpacity }]}
        pointerEvents="none"
      >
        <Text style={styles.dangerEmoji}>{currentCharacter.dangerEmoji}</Text>
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
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 4,
  },
  photoFrame: {
    borderWidth: 2.5,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  photo: {
    overflow: 'hidden',
  },
  dangerBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
  },
  dangerEmoji: {
    fontSize: 18,
  },
});
