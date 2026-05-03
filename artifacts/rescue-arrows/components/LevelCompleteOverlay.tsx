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
        Animated.spring(scale, { toValue: 1, useNativeDriver: true, tension: 55, friction: 7 }),
        Animated.timing(opacity, { toValue: 1, duration: 280, useNativeDriver: true }),
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
          <View style={styles.starRow}>
            <MaterialCommunityIcons name="star" size={28} color="#F5C518" />
            <MaterialCommunityIcons name="star" size={36} color="#F5C518" />
            <MaterialCommunityIcons name="star" size={28} color="#F5C518" />
          </View>
          <Text style={styles.title}>{isFinal ? 'All Done!' : 'Cleared!'}</Text>
          <Text style={styles.sub}>
            {isFinal ? 'You finished all 100 levels!' : `Level ${currentLevel} complete`}
          </Text>

          {!isFinal && (
            <Pressable style={styles.nextBtn} onPress={nextLevel}>
              <Text style={styles.nextBtnText}>Next Level</Text>
              <MaterialCommunityIcons name="arrow-right" size={18} color="#1A1A1A" />
            </Pressable>
          )}

          <Pressable style={styles.replayBtn} onPress={restartLevel}>
            <MaterialCommunityIcons name="refresh" size={16} color="#888888" />
            <Text style={styles.replayText}>Replay</Text>
          </Pressable>
        </Animated.View>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.82)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: '#E8E8E8',
    paddingVertical: 36,
    paddingHorizontal: 40,
    alignItems: 'center',
    gap: 10,
    minWidth: 270,
    shadowColor: '#000',
    shadowOpacity: 0.10,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 6 },
    elevation: 12,
  },
  starRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  title: {
    color: '#1A1A1A',
    fontSize: 26,
    fontFamily: 'Inter_700Bold',
    textAlign: 'center',
  },
  sub: {
    color: '#888888',
    fontSize: 15,
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
  },
  nextBtn: {
    backgroundColor: '#1A1A1A',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 36,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 14,
  },
  nextBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
  },
  replayBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 4,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  replayText: {
    color: '#AAAAAA',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
});
