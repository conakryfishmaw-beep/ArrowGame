import React from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { router } from 'expo-router';
import { useGame } from '@/context/GameContext';
import { CHARACTERS } from '@/data/characters';

const COLUMNS = 3;
const CARD_GAP = 14;

export default function AlbumScreen() {
  const { unlockedIndices, currentLevel } = useGame();

  return (
    <SafeAreaView style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backArrow}>←</Text>
        </Pressable>
        <View>
          <Text style={styles.headerTitle}>Aile Albümü</Text>
          <Text style={styles.headerSub}>
            {unlockedIndices.length} / {CHARACTERS.length} karakter kurtarıldı
          </Text>
        </View>
        <View style={{ width: 40 }} />
      </View>

      {/* Progress bar */}
      <View style={styles.progressTrack}>
        <View
          style={[
            styles.progressFill,
            { width: `${(unlockedIndices.length / CHARACTERS.length) * 100}%` as `${number}%` },
          ]}
        />
      </View>

      <ScrollView contentContainerStyle={styles.grid} showsVerticalScrollIndicator={false}>
        {CHARACTERS.map((char, idx) => {
          const isUnlocked = unlockedIndices.includes(idx);
          const isNext = idx === unlockedIndices.length; // first locked character
          const unlockLevel = idx + 1; // first unlocked at this level
          const isGold = char.type === 'family';

          return (
            <View key={char.id} style={styles.cardWrap}>
              <View
                style={[
                  styles.card,
                  isUnlocked && {
                    borderColor: char.glowColor,
                    shadowColor: char.glowColor,
                    shadowOpacity: 0.3,
                    shadowRadius: 8,
                    elevation: 6,
                  },
                ]}
              >
                {/* Photo */}
                <View
                  style={[
                    styles.photoCircle,
                    { borderColor: isUnlocked ? char.glowColor : '#DDDDD8' },
                  ]}
                >
                  <Image
                    source={char.image as number | { uri: string }}
                    style={styles.photo}
                    resizeMode="contain"
                    blurRadius={isUnlocked ? 0 : 18}
                  />
                  {!isUnlocked && (
                    <View style={styles.lockOverlay}>
                      <Text style={styles.lockIcon}>🔒</Text>
                      {isNext && (
                        <Text style={styles.unlockHint}>Bölüm {unlockLevel}</Text>
                      )}
                    </View>
                  )}
                </View>

                {/* Name & type */}
                {isUnlocked ? (
                  <>
                    <Text style={styles.charName}>{char.name}</Text>
                    <View style={[styles.typeBadge, { backgroundColor: isGold ? '#FEF9E7' : '#EBF5FB' }]}>
                      <Text style={[styles.typeText, { color: char.glowColor }]}>
                        {char.type === 'pet' ? '🐾 Evcil' : '👨‍👩‍👦 Aile'}
                      </Text>
                    </View>
                  </>
                ) : (
                  <Text style={styles.lockedName}>???</Text>
                )}
              </View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F8F5F0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#EEEBE6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrow: {
    fontSize: 20,
    color: '#1A1A1A',
    fontFamily: 'Inter_700Bold',
  },
  headerTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 20,
    color: '#1A1A1A',
    textAlign: 'center',
  },
  headerSub: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    color: '#AAAAAA',
    textAlign: 'center',
    marginTop: 2,
  },
  progressTrack: {
    marginHorizontal: 20,
    height: 4,
    backgroundColor: '#E8E4DF',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 20,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#F4D03F',
    borderRadius: 2,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: CARD_GAP,
    paddingBottom: 32,
  },
  cardWrap: {
    width: `${(100 - (COLUMNS - 1) * 3) / COLUMNS}%` as `${number}%`,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#EEEBE6',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 8,
    gap: 8,
  },
  photoCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 2.5,
    overflow: 'hidden',
    position: 'relative',
  },
  photo: {
    width: 72,
    height: 72,
  },
  lockOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  lockIcon: {
    fontSize: 22,
  },
  unlockHint: {
    fontFamily: 'Inter_700Bold',
    fontSize: 9,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  charName: {
    fontFamily: 'Inter_700Bold',
    fontSize: 11,
    color: '#1A1A1A',
    textAlign: 'center',
  },
  lockedName: {
    fontFamily: 'Inter_700Bold',
    fontSize: 13,
    color: '#CCCCCC',
  },
  typeBadge: {
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  typeText: {
    fontFamily: 'Inter_700Bold',
    fontSize: 9,
  },
});
