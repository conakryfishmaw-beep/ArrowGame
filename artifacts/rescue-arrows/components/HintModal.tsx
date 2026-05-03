import React, { useCallback, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AdPhase, createRewardedAd } from '@/lib/adService';
import { AD_UNIT_IDS } from '@/lib/adSlots';

interface Props {
  visible: boolean;
  onClose: () => void;
  onRewarded: () => void;
}

const ND = Platform.OS !== 'web';

export function HintModal({ visible, onClose, onRewarded }: Props) {
  const [phase, setPhase] = useState<AdPhase>('idle');
  const adHandleRef = useRef<ReturnType<typeof createRewardedAd> | null>(null);

  // Progress bar animation for the "playing" phase
  const progressAnim = useRef(new Animated.Value(0)).current;
  const playingAnimRef = useRef<Animated.CompositeAnimation | null>(null);

  const handleWatch = useCallback(() => {
    progressAnim.setValue(0);

    const handle = createRewardedAd(AD_UNIT_IDS.REWARDED, (p: AdPhase) => {
      setPhase(p);

      if (p === 'playing') {
        playingAnimRef.current = Animated.timing(progressAnim, {
          toValue: 1,
          duration: 5000,
          useNativeDriver: ND,
        });
        playingAnimRef.current.start();
      }

      if (p === 'done') {
        playingAnimRef.current?.stop();
        onRewarded();
        setTimeout(() => {
          setPhase('idle');
          onClose();
        }, 300);
      }

      if (p === 'skipped') {
        playingAnimRef.current?.stop();
        setPhase('idle');
        onClose();
      }
    });

    adHandleRef.current = handle;
  }, [onRewarded, onClose, progressAnim]);

  const handleSkip = useCallback(() => {
    adHandleRef.current?.skip();
  }, []);

  const handleCancel = useCallback(() => {
    if (phase === 'idle') {
      onClose();
    } else {
      adHandleRef.current?.skip();
    }
  }, [phase, onClose]);

  const isWatching = phase === 'loading' || phase === 'playing';

  return (
    <Modal transparent animationType="fade" visible={visible} onRequestClose={handleCancel}>
      <View style={styles.overlay}>
        <View style={styles.card}>

          {/* ── Idle state ── */}
          {phase === 'idle' && (
            <>
              <View style={styles.iconWrap}>
                <MaterialCommunityIcons name="play-circle-outline" size={48} color="#E84855" />
              </View>
              <Text style={styles.title}>Get a Hint</Text>
              <Text style={styles.body}>
                Watch a short video to reveal which arrow to move next.
              </Text>
              <View style={styles.actions}>
                <Pressable style={[styles.btn, styles.btnCancel]} onPress={handleCancel}>
                  <Text style={styles.btnCancelText}>Cancel</Text>
                </Pressable>
                <Pressable style={[styles.btn, styles.btnWatch]} onPress={handleWatch}>
                  <MaterialCommunityIcons name="play" size={16} color="#FFFFFF" />
                  <Text style={styles.btnWatchText}>Watch Ad</Text>
                </Pressable>
              </View>
            </>
          )}

          {/* ── Loading state ── */}
          {phase === 'loading' && (
            <>
              <ActivityIndicator size="large" color="#E84855" style={{ marginBottom: 16 }} />
              <Text style={styles.title}>Loading Ad…</Text>
              <Text style={styles.body}>Please wait a moment.</Text>
            </>
          )}

          {/* ── Playing state ── */}
          {phase === 'playing' && (
            <>
              <View style={styles.adScreen}>
                <MaterialCommunityIcons name="television-play" size={40} color="#E84855" />
                <Text style={styles.adLabel}>Ad Playing</Text>
                {/* Progress bar */}
                <View style={styles.progressTrack}>
                  <Animated.View
                    style={[
                      styles.progressFill,
                      {
                        width: progressAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: ['0%', '100%'],
                        }),
                      },
                    ]}
                  />
                </View>
              </View>
              <Pressable style={styles.skipBtn} onPress={handleSkip}>
                <Text style={styles.skipText}>Skip (no hint)</Text>
              </Pressable>
            </>
          )}

        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: 300,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 28,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 12,
  },
  iconWrap: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFF0F1',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontFamily: 'Inter_700Bold',
    fontSize: 18,
    color: '#1A1A1A',
    marginBottom: 8,
    textAlign: 'center',
  },
  body: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#888888',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
  },
  btn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  btnCancel: {
    backgroundColor: '#F0EDE8',
  },
  btnCancelText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 15,
    color: '#888888',
  },
  btnWatch: {
    backgroundColor: '#E84855',
  },
  btnWatchText: {
    fontFamily: 'Inter_700Bold',
    fontSize: 15,
    color: '#FFFFFF',
  },

  // Playing state
  adScreen: {
    width: '100%',
    height: 130,
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    gap: 8,
  },
  adLabel: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    color: '#BBBBBB',
  },
  progressTrack: {
    width: '70%',
    height: 3,
    backgroundColor: '#333333',
    borderRadius: 2,
    overflow: 'hidden',
    marginTop: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#E84855',
    borderRadius: 2,
  },
  skipBtn: {
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  skipText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    color: '#BBBBBB',
    textDecorationLine: 'underline',
  },
});
