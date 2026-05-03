import React from 'react';
import { Dimensions, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useGame } from '@/context/GameContext';
import { PathArrow } from '@/components/PathArrow';
import { MascotCell } from '@/components/MascotCell';
import { LevelCompleteOverlay } from '@/components/LevelCompleteOverlay';

const SCREEN_W = Dimensions.get('window').width;
const GRID_SIDE = Math.min(SCREEN_W - 32, 420);

function GridDots({ gridSize, cellSize }: { gridSize: number; cellSize: number }) {
  const items: React.ReactElement[] = [];
  for (let r = 0; r <= gridSize; r++) {
    for (let c = 0; c <= gridSize; c++) {
      items.push(
        <View
          key={`d${r}-${c}`}
          style={{
            position: 'absolute',
            left: c * cellSize - 1.5,
            top: r * cellSize - 1.5,
            width: 3,
            height: 3,
            borderRadius: 1.5,
            backgroundColor: '#D6D1CA',
          }}
        />
      );
    }
  }
  return <>{items}</>;
}

export default function GameScreen() {
  const { level, arrows, isLevelComplete, hintArrowId, restartLevel, showHint, clearHint, currentLevel } = useGame();
  const insets = useSafeAreaInsets();

  const cellSize = GRID_SIDE / level.gridSize;
  const gridPixelSize = cellSize * level.gridSize;

  const topPad = Platform.OS === 'web' ? 60 : insets.top;
  const botPad = Platform.OS === 'web' ? 28 : insets.bottom;

  const progressPct = `${(currentLevel / 100) * 100}%` as `${number}%`;

  const handleHint = () => {
    clearHint();
    showHint();
  };

  return (
    <View style={[styles.screen, { paddingTop: topPad, paddingBottom: botPad }]}>
      {/* ── Header ─────────────────────────────── */}
      <View style={styles.header}>
        <View>
          <Text style={styles.levelLabel}>LEVEL</Text>
          <Text style={styles.levelNum}>{currentLevel}</Text>
        </View>

        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: progressPct }]} />
        </View>

        <Pressable style={styles.restartBtn} onPress={restartLevel}>
          <MaterialCommunityIcons name="refresh" size={20} color="#555555" />
        </Pressable>
      </View>

      {/* ── Grid ──────────────────────────────── */}
      <View
        style={[styles.grid, { width: gridPixelSize, height: gridPixelSize, pointerEvents: 'box-none' }]}
      >
        <GridDots gridSize={level.gridSize} cellSize={cellSize} />

        <MascotCell level={level} cellSize={cellSize} celebrating={isLevelComplete} />

        {arrows.map((arrow) => (
          <PathArrow
            key={arrow.id}
            id={arrow.id}
            path={arrow.path}
            tailIdx={arrow.tailIdx}
            headIdx={arrow.headIdx}
            bodyLen={arrow.bodyLen}
            dir={arrow.dir}
            color={arrow.color}
            cellSize={cellSize}
            gridPixelSize={gridPixelSize}
            gridSize={level.gridSize}
            exiting={arrow.exiting}
            isHint={hintArrowId === arrow.id}
          />
        ))}

        <LevelCompleteOverlay />
      </View>

      {/* ── Footer ────────────────────────────── */}
      <View style={styles.footer}>
        <Pressable style={styles.hintBtn} onPress={handleHint}>
          <MaterialCommunityIcons name="lightbulb-outline" size={18} color="#888888" />
          <Text style={styles.hintText}>Hint</Text>
        </Pressable>

        <View style={styles.countRow}>
          <Text style={styles.countNum}>{arrows.filter((a) => !a.exiting).length}</Text>
          <Text style={styles.countLabel}> left</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F8F5F0',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header: {
    width: '100%',
    paddingHorizontal: 24,
    paddingTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  levelLabel: {
    fontFamily: 'Inter_400Regular',
    fontSize: 10,
    color: '#BBBBBB',
    letterSpacing: 2,
  },
  levelNum: {
    fontFamily: 'Inter_700Bold',
    fontSize: 26,
    color: '#1A1A1A',
    lineHeight: 30,
  },
  progressTrack: {
    flex: 1,
    height: 4,
    backgroundColor: '#E8E4DF',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#1A1A1A',
    borderRadius: 2,
  },
  restartBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#EEEBE6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  grid: {
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  footer: {
    width: '100%',
    paddingHorizontal: 24,
    paddingBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  hintBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 18,
    backgroundColor: '#EEEBE6',
    borderRadius: 12,
  },
  hintText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#888888',
  },
  countRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  countNum: {
    fontFamily: 'Inter_700Bold',
    fontSize: 22,
    color: '#1A1A1A',
  },
  countLabel: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#BBBBBB',
  },
});
