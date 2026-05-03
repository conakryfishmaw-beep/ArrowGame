import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { LEVELS, Level, CellPos } from '@/data/levels';

export type { CellPos };

const STORAGE_KEY = '@rescue_arrows_progress_v2';

export interface ActiveArrow {
  id: string;
  cells: CellPos[];
  dir: 'up' | 'down' | 'left' | 'right';
  color: string;
  accent: boolean;
  exiting: boolean;
}

interface SlideResult {
  moved: boolean;
  exited: boolean;
}

interface GameContextValue {
  currentLevel: number;
  highestUnlocked: number;
  level: Level;
  arrows: ActiveArrow[];
  isLevelComplete: boolean;
  hintArrowId: string | null;
  slideArrow: (id: string) => SlideResult;
  removeExitedArrow: (id: string) => void;
  restartLevel: () => void;
  nextLevel: () => void;
  goToLevel: (n: number) => void;
  showHint: () => void;
  clearHint: () => void;
}

const GameContext = createContext<GameContextValue | null>(null);

// Arrow colors: two charcoal variants (slightly different shades)
const ARROW_COLORS = ['#1A1A1A', '#2D2D2D', '#111111', '#222222'];

function getMascotCells(level: Level): Set<string> {
  // 1×1 mascot for all levels in new design
  return new Set([`${level.mascotRow},${level.mascotCol}`]);
}

function buildArrows(level: Level): ActiveArrow[] {
  return level.arrows.map((a, i) => ({
    id: `arrow-${level.id}-${i}`,
    cells: a.cells,
    dir: a.dir,
    color: a.accent ? '#E84855' : ARROW_COLORS[i % ARROW_COLORS.length],
    accent: a.accent,
    exiting: false,
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

  const slideArrow = useCallback((id: string): SlideResult => {
    let result: SlideResult = { moved: false, exited: false };

    setArrows((prev) => {
      const arrow = prev.find((a) => a.id === id);
      if (!arrow || arrow.exiting) return prev;

      const mascotCells = getMascotCells(level);
      const otherCells = new Set<string>(
        prev
          .filter((a) => a.id !== id && !a.exiting)
          .flatMap((a) => a.cells)
          .map((c) => `${c.row},${c.col}`)
      );

      const dr = arrow.dir === 'down' ? 1 : arrow.dir === 'up' ? -1 : 0;
      const dc = arrow.dir === 'right' ? 1 : arrow.dir === 'left' ? -1 : 0;

      let steps = 0;
      let exits = false;

      // eslint-disable-next-line no-constant-condition
      while (true) {
        const s = steps + 1;
        const newCells = arrow.cells.map((c) => ({ row: c.row + s * dr, col: c.col + s * dc }));
        const head = newCells[newCells.length - 1];

        // Check exit condition
        if (head.row < 0 || head.row >= level.gridSize || head.col < 0 || head.col >= level.gridSize) {
          exits = true;
          // steps stays at current value (arrow moved `steps` cells within grid)
          break;
        }

        // Check collision
        const collision = newCells.some(
          (c) => otherCells.has(`${c.row},${c.col}`) || mascotCells.has(`${c.row},${c.col}`)
        );
        if (collision) break;

        steps = s;
      }

      if (steps === 0 && !exits) {
        result = { moved: false, exited: false };
        return prev;
      }

      const finalCells = arrow.cells.map((c) => ({
        row: c.row + steps * dr,
        col: c.col + steps * dc,
      }));

      result = { moved: steps > 0 || exits, exited: exits };

      if (exits) {
        return prev.map((a) =>
          a.id === id ? { ...a, cells: finalCells, exiting: true } : a
        );
      } else {
        return prev.map((a) =>
          a.id === id ? { ...a, cells: finalCells } : a
        );
      }
    });

    return result;
  }, [level]);

  const removeExitedArrow = useCallback((id: string) => {
    setArrows((prev) => {
      const remaining = prev.filter((a) => a.id !== id);
      const hasActive = remaining.some((a) => !a.exiting);
      const hasExiting = remaining.some((a) => a.exiting);
      if (!hasActive && !hasExiting) {
        setTimeout(() => setIsLevelComplete(true), 120);
      }
      return remaining;
    });
  }, []);

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
      const allCells = new Set<string>(
        prev.filter((a) => !a.exiting).flatMap((a) => a.cells).map((c) => `${c.row},${c.col}`)
      );

      const removable = prev.filter((a) => !a.exiting).find((arrow) => {
        const dr = arrow.dir === 'down' ? 1 : arrow.dir === 'up' ? -1 : 0;
        const dc = arrow.dir === 'right' ? 1 : arrow.dir === 'left' ? -1 : 0;
        const otherCells = new Set(
          [...allCells].filter(
            (k) => !arrow.cells.some((c) => `${c.row},${c.col}` === k)
          )
        );

        let s = 1;
        // eslint-disable-next-line no-constant-condition
        while (true) {
          const newCells = arrow.cells.map((c) => ({ row: c.row + s * dr, col: c.col + s * dc }));
          const head = newCells[newCells.length - 1];
          if (head.row < 0 || head.row >= level.gridSize || head.col < 0 || head.col >= level.gridSize) {
            return true;
          }
          const collision = newCells.some(
            (c) => otherCells.has(`${c.row},${c.col}`) || mascotCells.has(`${c.row},${c.col}`)
          );
          if (collision) return false;
          s++;
        }
      });

      const target = removable ?? prev.filter((a) => !a.exiting)[0];
      if (target) {
        setHintArrowId(target.id);
        setTimeout(() => setHintArrowId(null), 2000);
      }
      return prev;
    });
  }, [level]);

  const clearHint = useCallback(() => setHintArrowId(null), []);

  return (
    <GameContext.Provider value={{
      currentLevel, highestUnlocked, level, arrows, isLevelComplete,
      hintArrowId, slideArrow, removeExitedArrow, restartLevel, nextLevel, goToLevel, showHint, clearHint,
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
