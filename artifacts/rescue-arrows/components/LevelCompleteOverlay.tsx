import React, { useEffect, useMemo, useRef } from 'react';
import { Animated, Image, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { useGame } from '@/context/GameContext';
import { Confetti } from './Confetti';

export function LevelCompleteOverlay() {
  const { isLevelComplete, currentLevel, nextLevel, restartLevel, currentCharacter } = useGame();
  const scale = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const photoScale = useRef(new Animated.Value(0.7)).current;

  // Pick one random rescue message when the level completes
  const rescueMessage = useMemo(() => {
    const msgs = currentCharacter.rescueMessages;
    return msgs[Math.floor(Math.random() * msgs.length)];
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLevelComplete, currentLevel]);

  useEffect(() => {
    if (isLevelComplete) {
      Animated.parallel([
        Animated.spring(scale, { toValue: 1, useNativeDriver: true, tension: 55, friction: 7 }),
        Animated.timing(opacity, { toValue: 1, duration: 280, useNativeDriver: true }),
        Animated.spring(photoScale, { toValue: 1, useNativeDriver: true, tension: 50, friction: 6 }),
      ]).start();
      if (Platform.OS !== 'web') {
        setTimeout(() => {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        }, 200);
      }
    } else {
      scale.setValue(0);
      opacity.setValue(0);
      photoScale.setValue(0.7);
    }
  }, [isLevelComplete]);

  if (!isLevelComplete) return null;

  const isFinal = currentLevel === 100;
  const { glowColor, name, type } = currentCharacter;
  const isGold = type === 'family';

  return (
    <>
      <Confetti active={isLevelComplete} />
      <Animated.View style={[styles.backdrop, { opacity }]}>
        <Animated.View style={[styles.card, { transform: [{ scale }] }]}>

          {/* Character photo — scales up on appear */}
          <Animated.View
            style={[
              styles.photoWrap,
              {
                borderColor: glowColor,
                shadowColor: glowColor,
                transform: [{ scale: photoScale }],
              },
            ]}
          >
            <Image
              source={currentCharacter.image as number | { uri: string }}
              style={styles.photo}
              resizeMode="contain"
            />
          </Animated.View>

          {/* Character type badge */}
          <View style={[styles.badge, { backgroundColor: isGold ? '#FEF9E7' : '#EBF5FB', borderColor: glowColor }]}>
            <Text style={[styles.badgeText, { color: glowColor }]}>
              {type === 'pet' ? '🐾 Evcil Hayvan' : '👨‍👩‍👦 Aile'}
            </Text>
          </View>

          {/* Rescue message */}
          <Text style={styles.rescueMsg}>"{rescueMessage}"</Text>
          <Text style={styles.charName}>{name}</Text>

          {/* Divider */}
          <View style={styles.divider} />

          <Text style={styles.title}>{isFinal ? 'Tümünü Bitirdin!' : 'Tamamlandı!'}</Text>
          <Text style={styles.sub}>
            {isFinal ? '100 bölümü bitirdin!' : `Bölüm ${currentLevel} tamamlandı`}
          </Text>

          {!isFinal && (
            <Pressable style={styles.nextBtn} onPress={nextLevel}>
              <Text style={styles.nextBtnText}>Sonraki Bölüm →</Text>
            </Pressable>
          )}

          <Pressable style={styles.replayBtn} onPress={restartLevel}>
            <Text style={styles.replayText}>↺  Tekrar Oyna</Text>
          </Pressable>
        </Animated.View>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.88)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    borderWidth: 1.5,
    borderColor: '#E8E8E8',
    paddingVertical: 32,
    paddingHorizontal: 36,
    alignItems: 'center',
    gap: 10,
    minWidth: 280,
    maxWidth: 320,
    shadowColor: '#000',
    shadowOpacity: 0.10,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 8 },
    elevation: 14,
  },
  photoWrap: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 3,
    overflow: 'hidden',
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 6,
    marginBottom: 4,
  },
  photo: {
    width: 96,
    height: 96,
  },
  badge: {
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 3,
  },
  badgeText: {
    fontFamily: 'Inter_700Bold',
    fontSize: 11,
    letterSpacing: 0.5,
  },
  rescueMsg: {
    fontFamily: 'Inter_700Bold',
    fontSize: 17,
    color: '#1A1A1A',
    textAlign: 'center',
    marginTop: 4,
  },
  charName: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    color: '#AAAAAA',
  },
  divider: {
    width: '80%',
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#E8E8E8',
    marginVertical: 4,
  },
  title: {
    color: '#1A1A1A',
    fontSize: 22,
    fontFamily: 'Inter_700Bold',
    textAlign: 'center',
  },
  sub: {
    color: '#AAAAAA',
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
  },
  nextBtn: {
    backgroundColor: '#1A1A1A',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 36,
    marginTop: 10,
  },
  nextBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
  },
  replayBtn: {
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  replayText: {
    color: '#AAAAAA',
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
  },
});
