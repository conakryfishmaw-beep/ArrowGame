import React, { useEffect, useRef } from 'react';
import { Animated, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useGame } from '@/context/GameContext';
import { Confetti } from './Confetti';

export function LevelCompleteOverlay() {
  const { isLevelComplete, currentLevel, nextLevel, restartLevel } = useGame();
  const scale = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isLevelComplete) {
      Animated.parallel([
        Animated.spring(scale, { toValue: 1, useNativeDriver: true, tension: 60, friction: 8 }),
        Animated.timing(opacity, { toValue: 1, duration: 300, useNativeDriver: true }),
      ]).start();

      if (Platform.OS !== 'web') {
        setTimeout(() => {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        }, 200);
      }
    } else {
      scale.setValue(0);
      opacity.setValue(0);
    }
  }, [isLevelComplete]);

  if (!isLevelComplete) return null;

  const isFinal = currentLevel === 100;

  return (
    <>
      <Confetti active={isLevelComplete} />
      <Animated.View style={[styles.backdrop, { opacity }]}>
        <Animated.View style={[styles.card, { transform: [{ scale }] }]}>
          <MaterialCommunityIcons name="star-circle" size={60} color="#FFD700" />
          <Text style={styles.title}>{isFinal ? 'You Rescued Everyone!' : 'Rescued!'}</Text>
          <Text style={styles.sub}>
            {isFinal ? 'All 100 levels complete!' : `Level ${currentLevel} cleared`}
          </Text>

          {!isFinal && (
            <Pressable style={styles.nextBtn} onPress={nextLevel}>
              <Text style={styles.nextBtnText}>Next Level</Text>
              <MaterialCommunityIcons name="arrow-right" size={20} color="#000" />
            </Pressable>
          )}

          <Pressable style={styles.replayBtn} onPress={restartLevel}>
            <MaterialCommunityIcons name="refresh" size={18} color="#AAAAAA" />
            <Text style={styles.replayBtnText}>Replay</Text>
          </Pressable>
        </Animated.View>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
  card: {
    backgroundColor: '#111111',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#333333',
    paddingVertical: 40,
    paddingHorizontal: 32,
    alignItems: 'center',
    gap: 12,
    minWidth: 280,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 28,
    fontFamily: 'Inter_700Bold',
    textAlign: 'center',
    marginTop: 8,
  },
  sub: {
    color: '#888888',
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
  },
  nextBtn: {
    backgroundColor: '#A8E6CF',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 32,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 16,
  },
  nextBtnText: {
    color: '#000000',
    fontSize: 17,
    fontFamily: 'Inter_700Bold',
  },
  replayBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  replayBtnText: {
    color: '#AAAAAA',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
});
