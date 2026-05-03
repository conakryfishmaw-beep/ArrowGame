import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet, View } from 'react-native';

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');

const COLORS = ['#A8E6CF', '#A8D8EA', '#FFB7C5', '#FFF3B0', '#FFD700', '#E0B7FF', '#B7FFE4'];

interface Particle {
  x: Animated.Value;
  y: Animated.Value;
  rotate: Animated.Value;
  opacity: Animated.Value;
  color: string;
  size: number;
  shape: 'circle' | 'rect';
  startX: number;
}

function makeParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => {
    const startX = Math.random() * SCREEN_W;
    return {
      x: new Animated.Value(startX),
      y: new Animated.Value(-20 - Math.random() * 200),
      rotate: new Animated.Value(0),
      opacity: new Animated.Value(1),
      color: COLORS[i % COLORS.length],
      size: 6 + Math.random() * 8,
      shape: Math.random() > 0.5 ? 'circle' : 'rect',
      startX,
    };
  });
}

interface ConfettiProps {
  active: boolean;
}

export function Confetti({ active }: ConfettiProps) {
  const particles = useRef<Particle[]>(makeParticles(40)).current;

  useEffect(() => {
    if (!active) return;

    particles.forEach((p) => {
      const newStartX = Math.random() * SCREEN_W;
      p.startX = newStartX;
      p.x.setValue(newStartX);
      p.y.setValue(-20 - Math.random() * 100);
      p.opacity.setValue(1);
      p.rotate.setValue(0);
    });

    const animations = particles.map((p) =>
      Animated.parallel([
        Animated.timing(p.y, {
          toValue: SCREEN_H + 50,
          duration: 1800 + Math.random() * 1200,
          useNativeDriver: true,
        }),
        Animated.timing(p.x, {
          toValue: p.startX + (Math.random() - 0.5) * 200,
          duration: 2000 + Math.random() * 1000,
          useNativeDriver: true,
        }),
        Animated.timing(p.rotate, {
          toValue: (Math.random() > 0.5 ? 1 : -1) * (3 + Math.random() * 8),
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.sequence([
          Animated.delay(1200 + Math.random() * 500),
          Animated.timing(p.opacity, { toValue: 0, duration: 600, useNativeDriver: true }),
        ]),
      ])
    );

    Animated.stagger(30, animations).start();
  }, [active]);

  if (!active) return null;

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {particles.map((p, i) => {
        const rotate = p.rotate.interpolate({
          inputRange: [-10, 10],
          outputRange: ['-360deg', '360deg'],
        });
        return (
          <Animated.View
            key={i}
            style={[
              p.shape === 'circle' ? styles.circle : styles.rect,
              {
                width: p.size,
                height: p.shape === 'circle' ? p.size : p.size * 1.6,
                backgroundColor: p.color,
                opacity: p.opacity,
                transform: [{ translateX: p.x }, { translateY: p.y }, { rotate }],
              },
            ]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    position: 'absolute',
    borderRadius: 999,
  },
  rect: {
    position: 'absolute',
    borderRadius: 2,
  },
});
