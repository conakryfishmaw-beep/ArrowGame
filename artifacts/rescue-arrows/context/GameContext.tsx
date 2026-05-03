import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { LEVELS, Level } from '@/data/levels';
import { GAME_COLORS } from '@/constants/colors';

const ARROW_COLORS = [GAME_COLORS.arrowMint, GAME_COLORS.arrowBlue, GAME_COLORS.arrowPink, GAME_COLORS.arrowYellow];
const STORAGE_KEY = '@rescue_arrows_progress';

export interface ActiveArrow {
  id: string;
  row: number;
  col: number;
  dir: 'up' | 'down' | 'left' | 'right';
  color: string;
}

interface GameContextValue {
  currentLevel: number;
  highestUnlocked: number;
  level: Level;
  arrows: ActiveArrow[];
  isLevelComplete: boolean;
  hintArrowId: string | null;
  slideArrow: (id: string) => { newRow: number; newCol: number; exited: boolean; moved: boolean };
  restartLevel: () => void;
  nextLevel: () => void;
  goToLevel: (n: number) => void;
  showHint: () => void;
  clearHint: () => void;
}

const GameContext = createContext<GameContextValue | null>(null);

function getMascotCells(level: Level): Set<string> {
  const cells = new Set<string>();
  for (let r = level.mascotRow; r < level.mascotRow + level.mascotSize; r++) {
    for (let c = level.mascotCol; c < level.mascotCol + level.mascotSize; c++) {
      cells.add(`${r},${c}`);
    }
  }
  return cells;
}

function buildArrows(level: Level): ActiveArrow[] {
  return level.arrows.map((a, i) => ({
    id: `arrow-${level.id}-${i}`,
    row: a.row,
    col: a.col,
    dir: a.dir,
    color: ARROW_COLORS[i % ARROW_COLORS.length],
  }));
}

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [highestUnlocked, setHighestUnlocked] = useState(1);
  const [arrows, setArrows] = useState<ActiveArrow[]>([]);
  const [isLevelComplete, setIsLevelComplete] = useState(false);
  const [hintArrowId, setHintArrowId] = useState<string | null>(null);
  const loadedRef = useRef(false);

  const level = LEVELS[Math.min(currentLevel - 1, LEVELS.length - 1)];

  useEffect(() => {
    if (loadedRef.current) return;
    loadedRef.current = true;
    AsyncStorage.getItem(STORAGE_KEY).then((val) => {
      if (val) {
        try {
          const { saved, highest } = JSON.parse(val);
          const lv = Math.min(Math.max(saved || 1, 1), 100);
          const hi = Math.min(Math.max(highest || 1, 1), 100);
          setCurrentLevel(lv);
          setHighestUnlocked(hi);
          setArrows(buildArrows(LEVELS[lv - 1]));
        } catch {
          setArrows(buildArrows(LEVELS[0]));
        }
      } else {
        setArrows(buildArrows(LEVELS[0]));
      }
    });
  }, []);

  useEffect(() => {
    if (!loadedRef.current) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ saved: currentLevel, highest: highestUnlocked }));
  }, [currentLevel, highestUnlocked]);

  const slideArrow = useCallback((id: string): { newRow: number; newCol: number; exited: boolean; moved: boolean } => {
    let result = { newRow: 0, newCol: 0, exited: false, moved: false };

    setArrows((prev) => {
      const arrow = prev.find((a) => a.id === id);
      if (!arrow) return prev;

      const mascotCells = getMascotCells(level);
      const occupied = new Set<string>(
        prev.filter((a) => a.id !== id).map((a) => `${a.row},${a.col}`)
      );

      const dr = arrow.dir === 'down' ? 1 : arrow.dir === 'up' ? -1 : 0;
      const dc = arrow.dir === 'right' ? 1 : arrow.dir === 'left' ? -1 : 0;

      let curRow = arrow.row;
      let curCol = arrow.col;
      let moved = false;

      while (true) {
        const nextRow = curRow + dr;
        const nextCol = curCol + dc;

        const outOfBounds = nextRow < 0 || nextRow >= level.gridSize || nextCol < 0 || nextCol >= level.gridSize;
        if (outOfBounds) {
          result = { newRow: curRow, newCol: curCol, exited: true, moved };
          const newArrows = prev.filter((a) => a.id !== id);
          const complete = newArrows.length === 0;
          if (complete) {
            setTimeout(() => setIsLevelComplete(true), 400);
          }
          return newArrows;
        }

        const hitMascot = mascotCells.has(`${nextRow},${nextCol}`);
        const hitArrow = occupied.has(`${nextRow},${nextCol}`);

        if (hitMascot || hitArrow) {
          result = { newRow: curRow, newCol: curCol, exited: false, moved };
          if (!moved) return prev;
          return prev.map((a) => a.id === id ? { ...a, row: curRow, col: curCol } : a);
        }

        curRow = nextRow;
        curCol = nextCol;
        moved = true;
      }
    });

    return result;
  }, [level]);

  const restartLevel = useCallback(() => {
    setIsLevelComplete(false);
    setHintArrowId(null);
    setArrows(buildArrows(level));
  }, [level]);

  const nextLevel = useCallback(() => {
    const next = Math.min(currentLevel + 1, 100);
    setCurrentLevel(next);
    setHighestUnlocked((h) => Math.max(h, next));
    setIsLevelComplete(false);
    setHintArrowId(null);
    setArrows(buildArrows(LEVELS[next - 1]));
  }, [currentLevel]);

  const goToLevel = useCallback((n: number) => {
    if (n < 1 || n > 100) return;
    setCurrentLevel(n);
    setIsLevelComplete(false);
    setHintArrowId(null);
    setArrows(buildArrows(LEVELS[n - 1]));
  }, []);

  const showHint = useCallback(() => {
    setArrows((prev) => {
      const mascotCells = getMascotCells(level);
      const occupied = new Set<string>(prev.map((a) => `${a.row},${a.col}`));

      const removable = prev.find((arrow) => {
        const dr = arrow.dir === 'down' ? 1 : arrow.dir === 'up' ? -1 : 0;
        const dc = arrow.dir === 'right' ? 1 : arrow.dir === 'left' ? -1 : 0;
        let r = arrow.row;
        let c = arrow.col;

        while (true) {
          const nr = r + dr;
          const nc = c + dc;
          if (nr < 0 || nr >= level.gridSize || nc < 0 || nc >= level.gridSize) {
            return true;
          }
          if (mascotCells.has(`${nr},${nc}`)) return false;
          const key = `${nr},${nc}`;
          if (occupied.has(key) && key !== `${arrow.row},${arrow.col}`) return false;
          r = nr;
          c = nc;
        }
      });

      if (removable) {
        setHintArrowId(removable.id);
        setTimeout(() => setHintArrowId(null), 2000);
      } else {
        const first = prev[0];
        if (first) {
          setHintArrowId(first.id);
          setTimeout(() => setHintArrowId(null), 2000);
        }
      }
      return prev;
    });
  }, [level]);

  const clearHint = useCallback(() => setHintArrowId(null), []);

  return (
    <GameContext.Provider value={{
      currentLevel, highestUnlocked, level, arrows, isLevelComplete,
      hintArrowId, slideArrow, restartLevel, nextLevel, goToLevel, showHint, clearHint,
    }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}
