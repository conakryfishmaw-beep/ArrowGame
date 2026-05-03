import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { LEVELS, Level, CellPos } from '@/data/levels';
import { Character, getCharacterForLevel, getUnlockedIndices } from '@/data/characters';

export type { CellPos };

const STORAGE_KEY = '@rescue_arrows_progress_v3';

export interface ActiveArrow {
  id: string;
  path: CellPos[];
  tailIdx: number;
  headIdx: number;
  bodyLen: number;
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
  mascotHitTimestamp: number;
  currentCharacter: Character;
  unlockedIndices: number[];
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

function firstOOBIndex(path: CellPos[], gs: number): number {
  return path.findIndex(c => !isInGrid(c, gs));
}

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
  const [mascotHitTimestamp, setMascotHitTimestamp] = useState(0);
  const loadedRef = useRef(false);

  const arrowsRef = useRef<ActiveArrow[]>([]);
  useEffect(() => { arrowsRef.current = arrows; }, [arrows]);

  const level = LEVELS[Math.min(currentLevel - 1, LEVELS.length - 1)];
  const levelRef = useRef(level);
  useEffect(() => { levelRef.current = level; }, [level]);

  const currentLevelRef = useRef(currentLevel);
  useEffect(() => { currentLevelRef.current = currentLevel; }, [currentLevel]);

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

    let maxSteps = 0;
    let exits = false;

    for (let s = 1; arrow.headIdx + s < arrow.path.length; s++) {
      const newHead = arrow.path[arrow.headIdx + s];

      if (oobIdx !== -1 && arrow.headIdx + s >= oobIdx) {
        exits = true;
        break;
      }

      const key = `${newHead.row},${newHead.col}`;
      if (otherCells.has(key) || mascotCells.has(key)) {
        // If the very first step is blocked by the mascot → trigger danger shake
        if (s === 1 && mascotCells.has(key)) {
          setMascotHitTimestamp(Date.now());
        }
        break;
      }

      maxSteps = s;
    }

    if (maxSteps === 0 && !exits) return { moved: false, exited: false };

    setArrows(prev => prev.map(a => {
      if (a.id !== id) return a;
      if (exits) {
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
    const next = Math.min(currentLevelRef.current + 1, 100);
    setCurrentLevel(next);
    setHighestUnlocked(h => Math.max(h, next));
    setIsLevelComplete(false);
    setHintArrowId(null);
    setArrows(buildArrows(LEVELS[next - 1]));
  }, []);

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

    const hintable = current.filter(a => !a.exiting).find(arrow => {
      const nextIdx = arrow.headIdx + 1;
      if (nextIdx >= arrow.path.length) return false;
      const nextHead = arrow.path[nextIdx];
      if (!isInGrid(nextHead, gs)) return true;
      const ownCells = new Set(inGridBody(arrow, gs).map(c => `${c.row},${c.col}`));
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

  const currentCharacter = getCharacterForLevel(currentLevel);
  const unlockedIndices = getUnlockedIndices(highestUnlocked);

  return (
    <GameContext.Provider value={{
      currentLevel, highestUnlocked, level, arrows, isLevelComplete,
      hintArrowId, mascotHitTimestamp, currentCharacter, unlockedIndices,
      slideArrow, removeExitedArrow, restartLevel, nextLevel, goToLevel, showHint, clearHint,
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
