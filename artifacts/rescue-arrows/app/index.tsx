import React, { useMemo } from 'react';
import { Dimensions, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useGame } from '@/context/GameContext';
import { ArrowCell } from '@/components/ArrowCell';
import { MascotCell } from '@/components/MascotCell';
import { LevelCompleteOverlay } from '@/components/LevelCompleteOverlay';

const SCREEN_W = Dimensions.get('window').width;
const GRID_PADDING = 24;

export default function GameScreen() {
  const { level, arrows, isLevelComplete, hintArrowId, restartLevel, showHint } = useGame();
  const insets = useSafeAreaInsets();

  const cellSize = useMemo(() => {
    const available = SCREEN_W - GRID_PADDING * 2;
    return Math.floor(available / level.gridSize);
  }, [level.gridSize]);

  const gridSize = cellSize * level.gridSize;

  const topPad = Platform.OS === 'web' ? 67 : insets.top;
  const bottomPad = Platform.OS === 'web' ? 34 : insets.bottom;

  const characterGroup = Math.ceil(level.id / 10);
  const characterName = [
    'Forest Animals', 'Forest Animals', 'Chibi Anime', 'Chibi Anime', 'Chibi Anime',
    'Mystic Creatures', 'Mystic Creatures', 'Mystic Creatures', 'Legendary Heroes', 'Final Queen',
  ][characterGroup - 1] ?? 'Hero';

  return (
    <View style={[styles.screen, { paddingTop: topPad, paddingBottom: bottomPad }]}>
      <View style={styles.header}>
        <View style={styles.levelBadge}>
          <Text style={styles.levelText}>Level {level.id}</Text>
          <Text style={styles.levelTotal}>/100</Text>
        </View>
        <Text style={styles.characterName}>{characterName}</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${(level.id / 100) * 100}%` }]} />
        </View>
      </View>

      <View style={[styles.gridWrapper, { width: gridSize, height: gridSize }]}>
        {Array.from({ length: level.gridSize }).map((_, r) =>
          Array.from({ length: level.gridSize }).map((_, c) => {
            const isMascot =
              r >= level.mascotRow &&
              r < level.mascotRow + level.mascotSize &&
              c >= level.mascotCol &&
              c < level.mascotCol + level.mascotSize;
            if (isMascot) return null;
            return (
              <View
                key={`cell-${r}-${c}`}
                style={[
                  styles.cell,
                  {
                    width: cellSize,
                    height: cellSize,
                    left: c * cellSize,
                    top: r * cellSize,
                    borderRightWidth: c < level.gridSize - 1 ? 1 : 0,
                    borderBottomWidth: r < level.gridSize - 1 ? 1 : 0,
                  },
                ]}
              />
            );
          })
        )}

        <MascotCell level={level} cellSize={cellSize} celebrating={isLevelComplete} />

        {arrows.map((arrow) => (
          <ArrowCell
            key={arrow.id}
            id={arrow.id}
            row={arrow.row}
            col={arrow.col}
            dir={arrow.dir}
            color={arrow.color}
            cellSize={cellSize}
            isHint={hintArrowId === arrow.id}
          />
        ))}
      </View>

      <View style={styles.footer}>
        <Pressable style={styles.footerBtn} onPress={restartLevel}>
          <MaterialCommunityIcons name="refresh" size={22} color="#888888" />
          <Text style={styles.footerBtnText}>Restart</Text>
        </Pressable>

        <View style={styles.arrowCount}>
          <Text style={styles.arrowCountText}>{arrows.length}</Text>
          <Text style={styles.arrowCountLabel}> arrows left</Text>
        </View>

        <Pressable style={styles.footerBtn} onPress={showHint}>
          <MaterialCommunityIcons name="lightbulb-outline" size={22} color="#FFF3B0" />
          <Text style={[styles.footerBtnText, { color: '#FFF3B0' }]}>Hint</Text>
        </Pressable>
      </View>

      <LevelCompleteOverlay />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header: {
    width: '100%',
    paddingHorizontal: 24,
    paddingTop: 12,
    gap: 6,
    alignItems: 'center',
  },
  levelBadge: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 2,
  },
  levelText: {
    color: '#FFFFFF',
    fontSize: 26,
    fontFamily: 'Inter_700Bold',
  },
  levelTotal: {
    color: '#555555',
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
  },
  characterName: {
    color: '#888888',
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  progressBar: {
    width: '80%',
    height: 3,
    backgroundColor: '#1A1A1A',
    borderRadius: 2,
    overflow: 'hidden',
    marginTop: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#A8E6CF',
    borderRadius: 2,
  },
  gridWrapper: {
    position: 'relative',
    backgroundColor: '#050505',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#1A1A1A',
  },
  cell: {
    position: 'absolute',
    borderColor: '#1A1A1A',
  },
  footer: {
    width: '100%',
    paddingHorizontal: 24,
    paddingBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footerBtn: {
    alignItems: 'center',
    gap: 4,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  footerBtnText: {
    color: '#888888',
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
  },
  arrowCount: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  arrowCountText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
  },
  arrowCountLabel: {
    color: '#555555',
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
  },
});
