import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { LEVELS, Level, CellPos } from '@/data/levels';

export type { CellPos };

const STORAGE_KEY = '@rescue_arrows_progress_v3';

export interface ActiveArrow {
  id: string;
  path: CellPos[];     // Full path: initial body + exit extension
  tailIdx: number;     // Index of tail cell in path (starts at 0)
  headIdx: number;     // Index of head cell in path (starts at bodyLen - 1)
  bodyLen: number;     // Fixed body length (headIdx - tailIdx + 1)
  dir: 'up' | 'down' | 'left' | 'right';
  color: string;
  accent: boolean;
  exiting: boolean;    // Head has gone OOB; tail still animating out
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

const ARROW_COLORS = ['#1A1A1A', '#2D2D2D', '#111111', '#222222'];

function getMascotCells(level: Level): Set<string> {
  return new Set([`${level.mascotRow},${level.mascotCol}`]);
}

function isInGrid(c: CellPos, gs: number): boolean {
  return c.row >= 0 && c.row < gs && c.col >= 0 && c.col < gs;
}

// Index of the first OOB cell in an arrow's path
function firstOOBIndex(path: CellPos[], gs: number): number {
  return path.findIndex(c => !isInGrid(c, gs));
}

// Current in-grid body cells
function inGridBody(a: ActiveArrow, gs: number): CellPos[] {
  return a.path.slice(a.tailIdx, a.headIdx + 1).filter(c => isInGrid(c, gs));
}

function buildArrows(level: Level): ActiveArrow[] {
  return level.arrows.map((a, i) => ({
    id: `arrow-${level.id}-${i}`,
    path: a.path,
    tailIdx: 0,
    headIdx: a.bodyLen - 1,
    bodyLen: a.bodyLen,
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

  // Use a ref so slideArrow can read current state without stale closures
  const arrowsRef = useRef<ActiveArrow[]>([]);
  useEffect(() => { arrowsRef.current = arrows; }, [arrows]);

  const level = LEVELS[Math.min(currentLevel - 1, LEVELS.length - 1)];
  const levelRef = useRef(level);
  useEffect(() => { levelRef.current = level; }, [level]);

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
    const lv = levelRef.current;
    const gs = lv.gridSize;

    // Read current arrows from ref (no stale closure issues)
    const current = arrowsRef.current;
    const arrow = current.find(a => a.id === id);
    if (!arrow || arrow.exiting) return { moved: false, exited: false };

    const mascotCells = getMascotCells(lv);
    const otherCells = new Set<string>(
      current
        .filter(a => a.id !== id && !a.exiting)
        .flatMap(a => inGridBody(a, gs))
        .map(c => `${c.row},${c.col}`)
    );

    const oobIdx = firstOOBIndex(arrow.path, gs);

    // Advance head one cell at a time until blocked or OOB
    let maxSteps = 0;
    let exits = false;

    for (let s = 1; arrow.headIdx + s < arrow.path.length; s++) {
      const newHead = arrow.path[arrow.headIdx + s];

      // Head goes out of bounds → arrow exits
      if (oobIdx !== -1 && arrow.headIdx + s >= oobIdx) {
        exits = true;
        break;
      }

      // Collision with other arrow or mascot
      const key = `${newHead.row},${newHead.col}`;
      if (otherCells.has(key) || mascotCells.has(key)) break;

      maxSteps = s;
    }

    if (maxSteps === 0 && !exits) return { moved: false, exited: false };

    setArrows(prev => prev.map(a => {
      if (a.id !== id) return a;
      if (exits) {
        // Advance tail to firstOOBIdx so entire body slides off
        const finalTailIdx = oobIdx !== -1 ? oobIdx : a.path.length;
        const finalHeadIdx = Math.min(finalTailIdx + a.bodyLen - 1, a.path.length - 1);
        return { ...a, tailIdx: finalTailIdx, headIdx: finalHeadIdx, exiting: true };
      } else {
        return { ...a, tailIdx: a.tailIdx + maxSteps, headIdx: a.headIdx + maxSteps };
      }
    }));

    return { moved: true, exited: exits };
  }, []);

  const removeExitedArrow = useCallback((id: string) => {
    setArrows(prev => {
      const remaining = prev.filter(a => a.id !== id);
      if (remaining.length === 0) {
        setTimeout(() => setIsLevelComplete(true), 120);
      }
      return remaining;
    });
  }, []);

  const restartLevel = useCallback(() => {
    setIsLevelComplete(false);
    setHintArrowId(null);
    setArrows(buildArrows(levelRef.current));
  }, []);

  const nextLevel = useCallback(() => {
    const next = Math.min(currentLevel + 1, 100);
    setCurrentLevel(next);
    setHighestUnlocked(h => Math.max(h, next));
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
    const lv = levelRef.current;
    const gs = lv.gridSize;
    const current = arrowsRef.current;

    const mascotCells = getMascotCells(lv);
    const allInGridCells = new Set<string>(
      current.filter(a => !a.exiting)
        .flatMap(a => inGridBody(a, gs))
        .map(c => `${c.row},${c.col}`)
    );

    // Find an arrow that can make at least one step
    const hintable = current.filter(a => !a.exiting).find(arrow => {
      const nextIdx = arrow.headIdx + 1;
      if (nextIdx >= arrow.path.length) return false;

      const nextHead = arrow.path[nextIdx];
      // Head can exit?
      if (!isInGrid(nextHead, gs)) return true;

      // Not blocked by others?
      const ownCells = new Set(
        inGridBody(arrow, gs).map(c => `${c.row},${c.col}`)
      );
      const others = new Set([...allInGridCells].filter(k => !ownCells.has(k)));
      const key = `${nextHead.row},${nextHead.col}`;
      return !others.has(key) && !mascotCells.has(key);
    });

    const target = hintable ?? current.filter(a => !a.exiting)[0];
    if (target) {
      setHintArrowId(target.id);
      setTimeout(() => setHintArrowId(null), 2000);
    }
  }, []);

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
