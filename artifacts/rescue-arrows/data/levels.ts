export type Direction = 'up' | 'down' | 'left' | 'right';

export interface LevelArrow {
  row: number;
  col: number;
  dir: Direction;
}

export interface Level {
  id: number;
  gridSize: number;
  mascotRow: number;
  mascotCol: number;
  mascotSize: 1 | 2;
  character: string;
  characterColor: string;
  arrows: LevelArrow[];
}

const RABBIT_COLOR = '#C8F5D8';
const CAT_COLOR = '#FFD6E0';
const BEAR_COLOR = '#D6E4FF';
const ANIME_PINK = '#FFB7E8';
const ANIME_MINT = '#B7FFE4';
const ANIME_BLUE = '#B7D4FF';
const MYSTIC_PURPLE = '#E0B7FF';
const MYSTIC_TEAL = '#B7FFF0';
const MYSTIC_GOLD = '#FFE4B7';
const HERO_GOLD = '#FFD700';
const HERO_SILVER = '#E8E8FF';
const QUEEN_RAINBOW = '#FFD700';

export const LEVELS: Level[] = [
  // ─────────────────────────────────────────────
  // LEVELS 1-10: Forest Animals | 5×5 | 1×1 mascot at (2,2)
  // ─────────────────────────────────────────────
  {
    id: 1, gridSize: 5, mascotRow: 2, mascotCol: 2, mascotSize: 1,
    character: 'rabbit', characterColor: RABBIT_COLOR,
    arrows: [{row:0,col:2,dir:'up'},{row:4,col:2,dir:'down'},{row:2,col:0,dir:'left'}],
  },
  {
    id: 2, gridSize: 5, mascotRow: 2, mascotCol: 2, mascotSize: 1,
    character: 'rabbit', characterColor: RABBIT_COLOR,
    arrows: [{row:0,col:2,dir:'up'},{row:4,col:2,dir:'down'},{row:2,col:0,dir:'left'},{row:2,col:4,dir:'right'}],
  },
  {
    id: 3, gridSize: 5, mascotRow: 2, mascotCol: 2, mascotSize: 1,
    character: 'rabbit', characterColor: RABBIT_COLOR,
    arrows: [{row:0,col:0,dir:'up'},{row:0,col:4,dir:'up'},{row:4,col:0,dir:'down'},{row:4,col:4,dir:'down'}],
  },
  {
    id: 4, gridSize: 5, mascotRow: 2, mascotCol: 2, mascotSize: 1,
    character: 'rabbit', characterColor: RABBIT_COLOR,
    arrows: [{row:0,col:1,dir:'up'},{row:0,col:3,dir:'up'},{row:4,col:1,dir:'down'},{row:4,col:3,dir:'down'},{row:2,col:0,dir:'left'}],
  },
  {
    id: 5, gridSize: 5, mascotRow: 2, mascotCol: 2, mascotSize: 1,
    character: 'rabbit', characterColor: RABBIT_COLOR,
    arrows: [{row:0,col:0,dir:'up'},{row:0,col:4,dir:'up'},{row:4,col:0,dir:'down'},{row:4,col:4,dir:'down'},{row:2,col:4,dir:'right'}],
  },
  {
    id: 6, gridSize: 5, mascotRow: 2, mascotCol: 2, mascotSize: 1,
    character: 'cat', characterColor: CAT_COLOR,
    arrows: [{row:1,col:0,dir:'left'},{row:1,col:4,dir:'right'},{row:3,col:0,dir:'left'},{row:3,col:4,dir:'right'},{row:0,col:2,dir:'up'}],
  },
  {
    id: 7, gridSize: 5, mascotRow: 2, mascotCol: 2, mascotSize: 1,
    character: 'cat', characterColor: CAT_COLOR,
    arrows: [{row:0,col:0,dir:'up'},{row:0,col:2,dir:'up'},{row:0,col:4,dir:'up'},{row:4,col:0,dir:'down'},{row:4,col:2,dir:'down'},{row:4,col:4,dir:'down'}],
  },
  {
    id: 8, gridSize: 5, mascotRow: 2, mascotCol: 2, mascotSize: 1,
    character: 'cat', characterColor: CAT_COLOR,
    arrows: [{row:0,col:0,dir:'right'},{row:0,col:3,dir:'right'},{row:2,col:0,dir:'left'},{row:4,col:0,dir:'down'},{row:1,col:4,dir:'up'},{row:3,col:4,dir:'down'}],
  },
  {
    id: 9, gridSize: 5, mascotRow: 2, mascotCol: 2, mascotSize: 1,
    character: 'cat', characterColor: CAT_COLOR,
    arrows: [{row:0,col:0,dir:'right'},{row:0,col:2,dir:'right'},{row:4,col:4,dir:'left'},{row:4,col:1,dir:'left'},{row:2,col:0,dir:'left'},{row:2,col:4,dir:'right'}],
  },
  {
    id: 10, gridSize: 5, mascotRow: 2, mascotCol: 2, mascotSize: 1,
    character: 'cat', characterColor: CAT_COLOR,
    arrows: [{row:0,col:1,dir:'up'},{row:0,col:2,dir:'up'},{row:0,col:3,dir:'up'},{row:4,col:1,dir:'down'},{row:4,col:2,dir:'down'},{row:4,col:3,dir:'down'},{row:2,col:4,dir:'right'}],
  },
  // ─────────────────────────────────────────────
  // LEVELS 11-20: Forest Animals | 5×5 | more arrows + chains
  // ─────────────────────────────────────────────
  {
    id: 11, gridSize: 5, mascotRow: 2, mascotCol: 2, mascotSize: 1,
    character: 'teddy-bear', characterColor: BEAR_COLOR,
    arrows: [{row:0,col:0,dir:'right'},{row:0,col:3,dir:'right'},{row:2,col:0,dir:'left'},{row:2,col:4,dir:'right'},{row:4,col:0,dir:'down'},{row:4,col:4,dir:'down'}],
  },
  {
    id: 12, gridSize: 5, mascotRow: 2, mascotCol: 2, mascotSize: 1,
    character: 'teddy-bear', characterColor: BEAR_COLOR,
    arrows: [{row:0,col:0,dir:'right'},{row:0,col:2,dir:'right'},{row:4,col:4,dir:'left'},{row:4,col:2,dir:'left'},{row:0,col:4,dir:'up'},{row:4,col:0,dir:'down'},{row:2,col:0,dir:'left'}],
  },
  {
    id: 13, gridSize: 5, mascotRow: 2, mascotCol: 2, mascotSize: 1,
    character: 'teddy-bear', characterColor: BEAR_COLOR,
    arrows: [{row:0,col:0,dir:'down'},{row:2,col:0,dir:'down'},{row:0,col:4,dir:'down'},{row:2,col:4,dir:'down'},{row:4,col:2,dir:'down'},{row:0,col:2,dir:'up'},{row:3,col:0,dir:'left'}],
  },
  {
    id: 14, gridSize: 5, mascotRow: 2, mascotCol: 2, mascotSize: 1,
    character: 'teddy-bear', characterColor: BEAR_COLOR,
    arrows: [{row:0,col:1,dir:'up'},{row:0,col:3,dir:'up'},{row:1,col:0,dir:'left'},{row:3,col:0,dir:'left'},{row:1,col:4,dir:'right'},{row:3,col:4,dir:'right'},{row:4,col:2,dir:'down'}],
  },
  {
    id: 15, gridSize: 5, mascotRow: 2, mascotCol: 2, mascotSize: 1,
    character: 'teddy-bear', characterColor: BEAR_COLOR,
    arrows: [{row:0,col:0,dir:'right'},{row:0,col:2,dir:'right'},{row:0,col:4,dir:'up'},{row:4,col:0,dir:'down'},{row:4,col:2,dir:'left'},{row:4,col:4,dir:'left'},{row:2,col:0,dir:'left'},{row:2,col:4,dir:'right'}],
  },
  {
    id: 16, gridSize: 5, mascotRow: 2, mascotCol: 2, mascotSize: 1,
    character: 'teddy-bear', characterColor: BEAR_COLOR,
    arrows: [{row:0,col:0,dir:'right'},{row:0,col:3,dir:'right'},{row:1,col:0,dir:'down'},{row:3,col:0,dir:'up'},{row:4,col:4,dir:'left'},{row:4,col:1,dir:'left'},{row:0,col:4,dir:'up'},{row:4,col:2,dir:'down'}],
  },
  {
    id: 17, gridSize: 5, mascotRow: 2, mascotCol: 2, mascotSize: 1,
    character: 'teddy-bear', characterColor: BEAR_COLOR,
    arrows: [{row:0,col:0,dir:'right'},{row:0,col:2,dir:'right'},{row:4,col:4,dir:'left'},{row:4,col:2,dir:'left'},{row:1,col:4,dir:'up'},{row:3,col:4,dir:'down'},{row:0,col:4,dir:'up'},{row:4,col:0,dir:'down'}],
  },
  {
    id: 18, gridSize: 5, mascotRow: 2, mascotCol: 2, mascotSize: 1,
    character: 'teddy-bear', characterColor: BEAR_COLOR,
    arrows: [{row:0,col:0,dir:'down'},{row:2,col:0,dir:'down'},{row:0,col:4,dir:'down'},{row:2,col:4,dir:'down'},{row:1,col:0,dir:'left'},{row:3,col:0,dir:'left'},{row:0,col:2,dir:'up'},{row:4,col:2,dir:'down'}],
  },
  {
    id: 19, gridSize: 5, mascotRow: 2, mascotCol: 2, mascotSize: 1,
    character: 'teddy-bear', characterColor: BEAR_COLOR,
    arrows: [{row:0,col:0,dir:'right'},{row:0,col:2,dir:'right'},{row:0,col:4,dir:'up'},{row:4,col:4,dir:'left'},{row:4,col:2,dir:'left'},{row:4,col:0,dir:'down'},{row:2,col:4,dir:'right'},{row:2,col:0,dir:'left'},{row:1,col:4,dir:'up'}],
  },
  {
    id: 20, gridSize: 5, mascotRow: 2, mascotCol: 2, mascotSize: 1,
    character: 'teddy-bear', characterColor: BEAR_COLOR,
    arrows: [{row:0,col:0,dir:'right'},{row:0,col:2,dir:'right'},{row:0,col:4,dir:'up'},{row:4,col:4,dir:'left'},{row:4,col:2,dir:'left'},{row:4,col:0,dir:'down'},{row:1,col:4,dir:'up'},{row:3,col:4,dir:'down'},{row:2,col:0,dir:'left'}],
  },
  // ─────────────────────────────────────────────
  // LEVELS 21-35: Chibi Anime | 6×6 | 2×2 mascot at (2,2)
  // ─────────────────────────────────────────────
  {
    id: 21, gridSize: 6, mascotRow: 2, mascotCol: 2, mascotSize: 2,
    character: 'face-woman', characterColor: ANIME_PINK,
    arrows: [{row:0,col:2,dir:'up'},{row:0,col:3,dir:'up'},{row:5,col:2,dir:'down'},{row:5,col:3,dir:'down'},{row:2,col:0,dir:'left'}],
  },
  {
    id: 22, gridSize: 6, mascotRow: 2, mascotCol: 2, mascotSize: 2,
    character: 'face-woman', characterColor: ANIME_PINK,
    arrows: [{row:0,col:2,dir:'up'},{row:0,col:3,dir:'up'},{row:5,col:2,dir:'down'},{row:5,col:3,dir:'down'},{row:3,col:5,dir:'right'}],
  },
  {
    id: 23, gridSize: 6, mascotRow: 2, mascotCol: 2, mascotSize: 2,
    character: 'face-woman', characterColor: ANIME_PINK,
    arrows: [{row:0,col:0,dir:'up'},{row:0,col:5,dir:'up'},{row:5,col:0,dir:'down'},{row:5,col:5,dir:'down'},{row:2,col:0,dir:'left'},{row:3,col:5,dir:'right'}],
  },
  {
    id: 24, gridSize: 6, mascotRow: 2, mascotCol: 2, mascotSize: 2,
    character: 'face-woman', characterColor: ANIME_PINK,
    arrows: [{row:0,col:2,dir:'up'},{row:0,col:3,dir:'up'},{row:5,col:2,dir:'down'},{row:5,col:3,dir:'down'},{row:2,col:0,dir:'left'},{row:3,col:5,dir:'right'}],
  },
  {
    id: 25, gridSize: 6, mascotRow: 2, mascotCol: 2, mascotSize: 2,
    character: 'face-woman', characterColor: ANIME_PINK,
    arrows: [{row:0,col:0,dir:'up'},{row:0,col:2,dir:'up'},{row:0,col:3,dir:'up'},{row:0,col:5,dir:'up'},{row:5,col:0,dir:'down'},{row:5,col:2,dir:'down'},{row:5,col:5,dir:'down'}],
  },
  {
    id: 26, gridSize: 6, mascotRow: 2, mascotCol: 2, mascotSize: 2,
    character: 'face-woman', characterColor: ANIME_PINK,
    arrows: [{row:0,col:0,dir:'up'},{row:0,col:5,dir:'up'},{row:5,col:0,dir:'down'},{row:5,col:5,dir:'down'},{row:2,col:0,dir:'left'},{row:3,col:5,dir:'right'},{row:1,col:5,dir:'right'}],
  },
  {
    id: 27, gridSize: 6, mascotRow: 2, mascotCol: 2, mascotSize: 2,
    character: 'face-woman', characterColor: ANIME_PINK,
    arrows: [{row:0,col:0,dir:'right'},{row:0,col:3,dir:'right'},{row:5,col:0,dir:'down'},{row:5,col:5,dir:'down'},{row:2,col:0,dir:'left'},{row:3,col:5,dir:'right'},{row:0,col:5,dir:'up'}],
  },
  {
    id: 28, gridSize: 6, mascotRow: 2, mascotCol: 2, mascotSize: 2,
    character: 'face-woman', characterColor: ANIME_PINK,
    arrows: [{row:0,col:0,dir:'up'},{row:0,col:2,dir:'up'},{row:0,col:3,dir:'up'},{row:0,col:5,dir:'up'},{row:5,col:0,dir:'down'},{row:5,col:2,dir:'down'},{row:5,col:3,dir:'down'},{row:5,col:5,dir:'down'}],
  },
  {
    id: 29, gridSize: 6, mascotRow: 2, mascotCol: 2, mascotSize: 2,
    character: 'face-woman', characterColor: ANIME_PINK,
    arrows: [{row:0,col:0,dir:'right'},{row:0,col:3,dir:'right'},{row:5,col:5,dir:'left'},{row:5,col:2,dir:'left'},{row:2,col:0,dir:'left'},{row:3,col:0,dir:'left'},{row:2,col:5,dir:'right'},{row:3,col:5,dir:'right'}],
  },
  {
    id: 30, gridSize: 6, mascotRow: 2, mascotCol: 2, mascotSize: 2,
    character: 'face-woman', characterColor: ANIME_PINK,
    arrows: [{row:0,col:0,dir:'right'},{row:0,col:3,dir:'right'},{row:0,col:5,dir:'up'},{row:5,col:5,dir:'left'},{row:5,col:2,dir:'left'},{row:5,col:0,dir:'down'},{row:2,col:5,dir:'right'},{row:3,col:0,dir:'left'}],
  },
  {
    id: 31, gridSize: 6, mascotRow: 2, mascotCol: 2, mascotSize: 2,
    character: 'face-woman-outline', characterColor: ANIME_MINT,
    arrows: [{row:0,col:0,dir:'up'},{row:0,col:2,dir:'up'},{row:0,col:3,dir:'up'},{row:0,col:5,dir:'up'},{row:5,col:1,dir:'down'},{row:5,col:3,dir:'down'},{row:5,col:4,dir:'down'},{row:2,col:0,dir:'left'}],
  },
  {
    id: 32, gridSize: 6, mascotRow: 2, mascotCol: 2, mascotSize: 2,
    character: 'face-woman-outline', characterColor: ANIME_MINT,
    arrows: [{row:0,col:0,dir:'right'},{row:0,col:2,dir:'right'},{row:0,col:5,dir:'up'},{row:5,col:5,dir:'left'},{row:5,col:3,dir:'left'},{row:5,col:0,dir:'down'},{row:2,col:0,dir:'left'},{row:3,col:5,dir:'right'},{row:1,col:5,dir:'right'}],
  },
  {
    id: 33, gridSize: 6, mascotRow: 2, mascotCol: 2, mascotSize: 2,
    character: 'face-woman-outline', characterColor: ANIME_MINT,
    arrows: [{row:0,col:0,dir:'down'},{row:2,col:0,dir:'down'},{row:0,col:5,dir:'down'},{row:2,col:5,dir:'down'},{row:0,col:2,dir:'up'},{row:0,col:3,dir:'up'},{row:5,col:2,dir:'down'},{row:5,col:3,dir:'down'},{row:3,col:0,dir:'left'}],
  },
  {
    id: 34, gridSize: 6, mascotRow: 2, mascotCol: 2, mascotSize: 2,
    character: 'face-woman-outline', characterColor: ANIME_MINT,
    arrows: [{row:0,col:0,dir:'right'},{row:0,col:3,dir:'right'},{row:0,col:5,dir:'up'},{row:5,col:5,dir:'left'},{row:5,col:2,dir:'left'},{row:5,col:0,dir:'down'},{row:2,col:0,dir:'left'},{row:3,col:5,dir:'right'},{row:4,col:0,dir:'up'}],
  },
  {
    id: 35, gridSize: 6, mascotRow: 2, mascotCol: 2, mascotSize: 2,
    character: 'face-woman-outline', characterColor: ANIME_MINT,
    arrows: [{row:0,col:0,dir:'right'},{row:0,col:3,dir:'right'},{row:0,col:5,dir:'up'},{row:5,col:5,dir:'left'},{row:5,col:2,dir:'left'},{row:5,col:0,dir:'down'},{row:1,col:0,dir:'left'},{row:4,col:0,dir:'left'},{row:1,col:5,dir:'right'},{row:4,col:5,dir:'right'}],
  },
  // ─────────────────────────────────────────────
  // LEVELS 36-50: Chibi Anime | 6×6 | harder (10-13 arrows)
  // ─────────────────────────────────────────────
  {
    id: 36, gridSize: 6, mascotRow: 2, mascotCol: 2, mascotSize: 2,
    character: 'human-female', characterColor: ANIME_BLUE,
    arrows: [{row:0,col:0,dir:'up'},{row:0,col:1,dir:'up'},{row:0,col:2,dir:'up'},{row:0,col:3,dir:'up'},{row:0,col:5,dir:'up'},{row:5,col:0,dir:'down'},{row:5,col:2,dir:'down'},{row:5,col:3,dir:'down'},{row:5,col:4,dir:'down'},{row:5,col:5,dir:'down'}],
  },
  {
    id: 37, gridSize: 6, mascotRow: 2, mascotCol: 2, mascotSize: 2,
    character: 'human-female', characterColor: ANIME_BLUE,
    arrows: [{row:0,col:0,dir:'right'},{row:0,col:2,dir:'right'},{row:0,col:5,dir:'up'},{row:5,col:5,dir:'left'},{row:5,col:3,dir:'left'},{row:5,col:0,dir:'down'},{row:2,col:0,dir:'left'},{row:3,col:5,dir:'right'},{row:1,col:5,dir:'right'},{row:4,col:0,dir:'left'}],
  },
  {
    id: 38, gridSize: 6, mascotRow: 2, mascotCol: 2, mascotSize: 2,
    character: 'human-female', characterColor: ANIME_BLUE,
    arrows: [{row:0,col:0,dir:'down'},{row:2,col:0,dir:'down'},{row:0,col:1,dir:'down'},{row:2,col:1,dir:'down'},{row:0,col:5,dir:'up'},{row:0,col:4,dir:'up'},{row:5,col:5,dir:'up'},{row:3,col:0,dir:'left'},{row:0,col:2,dir:'up'},{row:5,col:2,dir:'down'}],
  },
  {
    id: 39, gridSize: 6, mascotRow: 2, mascotCol: 2, mascotSize: 2,
    character: 'human-female', characterColor: ANIME_BLUE,
    arrows: [{row:0,col:0,dir:'right'},{row:0,col:3,dir:'right'},{row:0,col:5,dir:'up'},{row:5,col:0,dir:'down'},{row:5,col:5,dir:'left'},{row:5,col:2,dir:'left'},{row:1,col:0,dir:'left'},{row:4,col:5,dir:'right'},{row:2,col:0,dir:'left'},{row:3,col:5,dir:'right'},{row:0,col:2,dir:'up'}],
  },
  {
    id: 40, gridSize: 6, mascotRow: 2, mascotCol: 2, mascotSize: 2,
    character: 'human-female', characterColor: ANIME_BLUE,
    arrows: [{row:0,col:0,dir:'down'},{row:1,col:0,dir:'down'},{row:0,col:5,dir:'down'},{row:1,col:5,dir:'down'},{row:0,col:2,dir:'up'},{row:0,col:3,dir:'up'},{row:5,col:2,dir:'down'},{row:5,col:3,dir:'down'},{row:2,col:0,dir:'left'},{row:3,col:5,dir:'right'},{row:5,col:0,dir:'up'}],
  },
  {
    id: 41, gridSize: 6, mascotRow: 2, mascotCol: 2, mascotSize: 2,
    character: 'human-female', characterColor: ANIME_BLUE,
    arrows: [{row:0,col:0,dir:'right'},{row:0,col:2,dir:'right'},{row:0,col:5,dir:'up'},{row:5,col:5,dir:'left'},{row:5,col:3,dir:'left'},{row:5,col:0,dir:'down'},{row:2,col:0,dir:'left'},{row:3,col:5,dir:'right'},{row:1,col:0,dir:'left'},{row:4,col:5,dir:'right'},{row:4,col:0,dir:'up'}],
  },
  {
    id: 42, gridSize: 6, mascotRow: 2, mascotCol: 2, mascotSize: 2,
    character: 'human-female', characterColor: ANIME_BLUE,
    arrows: [{row:0,col:0,dir:'right'},{row:0,col:3,dir:'right'},{row:0,col:5,dir:'up'},{row:5,col:5,dir:'left'},{row:5,col:2,dir:'left'},{row:5,col:0,dir:'down'},{row:1,col:5,dir:'right'},{row:4,col:0,dir:'left'},{row:1,col:0,dir:'down'},{row:4,col:5,dir:'up'},{row:2,col:0,dir:'left'},{row:3,col:5,dir:'right'}],
  },
  {
    id: 43, gridSize: 6, mascotRow: 2, mascotCol: 2, mascotSize: 2,
    character: 'star-face', characterColor: ANIME_PINK,
    arrows: [{row:0,col:0,dir:'down'},{row:2,col:0,dir:'down'},{row:0,col:5,dir:'down'},{row:2,col:5,dir:'down'},{row:0,col:2,dir:'up'},{row:0,col:3,dir:'up'},{row:5,col:2,dir:'down'},{row:5,col:3,dir:'down'},{row:2,col:0,dir:'left'},{row:3,col:5,dir:'right'},{row:5,col:0,dir:'up'},{row:5,col:5,dir:'up'}],
  },
  {
    id: 44, gridSize: 6, mascotRow: 2, mascotCol: 2, mascotSize: 2,
    character: 'star-face', characterColor: ANIME_PINK,
    arrows: [{row:0,col:0,dir:'right'},{row:0,col:2,dir:'right'},{row:0,col:5,dir:'up'},{row:5,col:5,dir:'left'},{row:5,col:3,dir:'left'},{row:5,col:0,dir:'down'},{row:2,col:0,dir:'left'},{row:3,col:5,dir:'right'},{row:1,col:0,dir:'left'},{row:4,col:5,dir:'right'},{row:0,col:4,dir:'right'},{row:5,col:1,dir:'left'}],
  },
  {
    id: 45, gridSize: 6, mascotRow: 2, mascotCol: 2, mascotSize: 2,
    character: 'star-face', characterColor: ANIME_PINK,
    arrows: [{row:0,col:0,dir:'right'},{row:0,col:3,dir:'right'},{row:0,col:5,dir:'up'},{row:5,col:5,dir:'left'},{row:5,col:2,dir:'left'},{row:5,col:0,dir:'down'},{row:2,col:0,dir:'left'},{row:3,col:5,dir:'right'},{row:1,col:5,dir:'right'},{row:4,col:0,dir:'left'},{row:0,col:1,dir:'up'},{row:5,col:4,dir:'down'}],
  },
  {
    id: 46, gridSize: 6, mascotRow: 2, mascotCol: 2, mascotSize: 2,
    character: 'star-face', characterColor: ANIME_PINK,
    arrows: [{row:0,col:0,dir:'down'},{row:2,col:0,dir:'down'},{row:0,col:1,dir:'down'},{row:2,col:1,dir:'down'},{row:0,col:4,dir:'down'},{row:2,col:4,dir:'down'},{row:0,col:5,dir:'down'},{row:2,col:5,dir:'down'},{row:3,col:0,dir:'left'},{row:3,col:5,dir:'right'},{row:5,col:2,dir:'down'},{row:5,col:3,dir:'down'},{row:0,col:2,dir:'up'}],
  },
  {
    id: 47, gridSize: 6, mascotRow: 2, mascotCol: 2, mascotSize: 2,
    character: 'star-face', characterColor: ANIME_PINK,
    arrows: [{row:0,col:0,dir:'right'},{row:0,col:2,dir:'right'},{row:0,col:4,dir:'right'},{row:5,col:5,dir:'left'},{row:5,col:3,dir:'left'},{row:5,col:1,dir:'left'},{row:2,col:0,dir:'left'},{row:3,col:5,dir:'right'},{row:1,col:0,dir:'down'},{row:4,col:5,dir:'up'},{row:0,col:5,dir:'up'},{row:5,col:0,dir:'down'}],
  },
  {
    id: 48, gridSize: 6, mascotRow: 2, mascotCol: 2, mascotSize: 2,
    character: 'star-face', characterColor: ANIME_PINK,
    arrows: [{row:0,col:0,dir:'right'},{row:0,col:2,dir:'right'},{row:0,col:5,dir:'up'},{row:5,col:5,dir:'left'},{row:5,col:3,dir:'left'},{row:5,col:0,dir:'down'},{row:2,col:0,dir:'left'},{row:3,col:5,dir:'right'},{row:1,col:5,dir:'right'},{row:4,col:0,dir:'left'},{row:4,col:5,dir:'up'},{row:1,col:0,dir:'down'},{row:0,col:4,dir:'up'}],
  },
  {
    id: 49, gridSize: 6, mascotRow: 2, mascotCol: 2, mascotSize: 2,
    character: 'star-face', characterColor: ANIME_PINK,
    arrows: [{row:0,col:0,dir:'right'},{row:0,col:3,dir:'right'},{row:0,col:5,dir:'up'},{row:5,col:5,dir:'left'},{row:5,col:2,dir:'left'},{row:5,col:0,dir:'down'},{row:2,col:0,dir:'left'},{row:3,col:5,dir:'right'},{row:1,col:0,dir:'left'},{row:4,col:5,dir:'right'},{row:0,col:1,dir:'up'},{row:5,col:4,dir:'down'},{row:4,col:0,dir:'up'}],
  },
  {
    id: 50, gridSize: 6, mascotRow: 2, mascotCol: 2, mascotSize: 2,
    character: 'star-face', characterColor: ANIME_PINK,
    arrows: [{row:0,col:0,dir:'down'},{row:2,col:0,dir:'down'},{row:0,col:5,dir:'down'},{row:2,col:5,dir:'down'},{row:0,col:2,dir:'up'},{row:0,col:3,dir:'up'},{row:5,col:2,dir:'down'},{row:5,col:3,dir:'down'},{row:2,col:0,dir:'left'},{row:3,col:5,dir:'right'},{row:5,col:0,dir:'up'},{row:5,col:5,dir:'up'},{row:1,col:0,dir:'left'},{row:4,col:5,dir:'right'}],
  },
  // ─────────────────────────────────────────────
  // LEVELS 51-65: Mystic Creatures | 7×7 | 2×2 mascot at (2,2)
  // ─────────────────────────────────────────────
  {
    id: 51, gridSize: 7, mascotRow: 2, mascotCol: 2, mascotSize: 2,
    character: 'butterfly', characterColor: MYSTIC_PURPLE,
    arrows: [{row:0,col:2,dir:'up'},{row:0,col:3,dir:'up'},{row:6,col:2,dir:'down'},{row:6,col:3,dir:'down'},{row:2,col:0,dir:'left'},{row:3,col:0,dir:'left'},{row:2,col:6,dir:'right'},{row:3,col:6,dir:'right'}],
  },
  {
    id: 52, gridSize: 7, mascotRow: 2, mascotCol: 2, mascotSize: 2,
    character: 'butterfly', characterColor: MYSTIC_PURPLE,
    arrows: [{row:0,col:0,dir:'up'},{row:0,col:3,dir:'up'},{row:0,col:6,dir:'up'},{row:6,col:0,dir:'down'},{row:6,col:3,dir:'down'},{row:6,col:6,dir:'down'},{row:2,col:0,dir:'left'},{row:3,col:6,dir:'right'},{row:0,col:2,dir:'up'}],
  },
  {
    id: 53, gridSize: 7, mascotRow: 2, mascotCol: 2, mascotSize: 2,
    character: 'butterfly', characterColor: MYSTIC_PURPLE,
    arrows: [{row:0,col:0,dir:'right'},{row:0,col:3,dir:'right'},{row:6,col:6,dir:'left'},{row:6,col:3,dir:'left'},{row:2,col:0,dir:'left'},{row:3,col:6,dir:'right'},{row:0,col:6,dir:'up'},{row:6,col:0,dir:'down'},{row:0,col:2,dir:'up'},{row:6,col:2,dir:'down'}],
  },
  {
    id: 54, gridSize: 7, mascotRow: 2, mascotCol: 2, mascotSize: 2,
    character: 'butterfly', characterColor: MYSTIC_PURPLE,
    arrows: [{row:0,col:0,dir:'up'},{row:0,col:2,dir:'up'},{row:0,col:3,dir:'up'},{row:0,col:6,dir:'up'},{row:6,col:0,dir:'down'},{row:6,col:2,dir:'down'},{row:6,col:3,dir:'down'},{row:6,col:6,dir:'down'},{row:2,col:0,dir:'left'},{row:3,col:6,dir:'right'},{row:1,col:6,dir:'right'}],
  },
  {
    id: 55, gridSize: 7, mascotRow: 2, mascotCol: 2, mascotSize: 2,
    character: 'butterfly', characterColor: MYSTIC_PURPLE,
    arrows: [{row:0,col:0,dir:'right'},{row:0,col:3,dir:'right'},{row:0,col:6,dir:'up'},{row:6,col:6,dir:'left'},{row:6,col:3,dir:'left'},{row:6,col:0,dir:'down'},{row:2,col:0,dir:'left'},{row:3,col:6,dir:'right'},{row:1,col:0,dir:'left'},{row:5,col:6,dir:'right'},{row:0,col:2,dir:'up'},{row:6,col:2,dir:'down'}],
  },
  {
    id: 56, gridSize: 7, mascotRow: 2, mascotCol: 2, mascotSize: 2,
    character: 'snake', characterColor: MYSTIC_TEAL,
    arrows: [{row:0,col:0,dir:'down'},{row:2,col:0,dir:'down'},{row:0,col:6,dir:'down'},{row:2,col:6,dir:'down'},{row:0,col:2,dir:'up'},{row:0,col:3,dir:'up'},{row:6,col:2,dir:'down'},{row:6,col:3,dir:'down'},{row:3,col:0,dir:'left'},{row:3,col:6,dir:'right'},{row:6,col:0,dir:'up'},{row:6,col:6,dir:'up'}],
  },
  {
    id: 57, gridSize: 7, mascotRow: 2, mascotCol: 2, mascotSize: 2,
    character: 'snake', characterColor: MYSTIC_TEAL,
    arrows: [{row:0,col:0,dir:'right'},{row:0,col:3,dir:'right'},{row:0,col:6,dir:'up'},{row:6,col:6,dir:'left'},{row:6,col:3,dir:'left'},{row:6,col:0,dir:'down'},{row:2,col:0,dir:'left'},{row:3,col:6,dir:'right'},{row:1,col:6,dir:'right'},{row:5,col:0,dir:'left'},{row:0,col:2,dir:'up'},{row:6,col:2,dir:'down'},{row:4,col:6,dir:'right'}],
  },
  {
    id: 58, gridSize: 7, mascotRow: 2, mascotCol: 2, mascotSize: 2,
    character: 'snake', characterColor: MYSTIC_TEAL,
    arrows: [{row:0,col:0,dir:'right'},{row:0,col:2,dir:'right'},{row:0,col:6,dir:'up'},{row:6,col:6,dir:'left'},{row:6,col:4,dir:'left'},{row:6,col:0,dir:'down'},{row:2,col:0,dir:'left'},{row:3,col:6,dir:'right'},{row:1,col:0,dir:'left'},{row:5,col:6,dir:'right'},{row:4,col:0,dir:'up'},{row:0,col:4,dir:'up'},{row:6,col:2,dir:'down'}],
  },
  {
    id: 59, gridSize: 7, mascotRow: 2, mascotCol: 2, mascotSize: 2,
    character: 'snake', characterColor: MYSTIC_TEAL,
    arrows: [{row:0,col:0,dir:'down'},{row:2,col:0,dir:'down'},{row:0,col:1,dir:'down'},{row:2,col:1,dir:'down'},{row:0,col:5,dir:'down'},{row:2,col:5,dir:'down'},{row:0,col:6,dir:'down'},{row:2,col:6,dir:'down'},{row:3,col:0,dir:'left'},{row:3,col:6,dir:'right'},{row:6,col:2,dir:'down'},{row:6,col:3,dir:'down'},{row:0,col:2,dir:'up'},{row:6,col:0,dir:'up'}],
  },
  {
    id: 60, gridSize: 7, mascotRow: 2, mascotCol: 2, mascotSize: 2,
    character: 'snake', characterColor: MYSTIC_TEAL,
    arrows: [{row:0,col:0,dir:'right'},{row:0,col:3,dir:'right'},{row:0,col:6,dir:'up'},{row:6,col:6,dir:'left'},{row:6,col:3,dir:'left'},{row:6,col:0,dir:'down'},{row:2,col:0,dir:'left'},{row:3,col:6,dir:'right'},{row:1,col:0,dir:'left'},{row:5,col:6,dir:'right'},{row:4,col:0,dir:'left'},{row:4,col:6,dir:'right'},{row:0,col:2,dir:'up'},{row:6,col:4,dir:'down'}],
  },
  {
    id: 61, gridSize: 7, mascotRow: 2, mascotCol: 2, mascotSize: 2,
    character: 'horse-variant', characterColor: MYSTIC_GOLD,
    arrows: [{row:0,col:0,dir:'right'},{row:0,col:2,dir:'right'},{row:0,col:6,dir:'up'},{row:6,col:6,dir:'left'},{row:6,col:4,dir:'left'},{row:6,col:0,dir:'down'},{row:2,col:0,dir:'left'},{row:3,col:6,dir:'right'},{row:1,col:6,dir:'right'},{row:5,col:0,dir:'left'},{row:4,col:6,dir:'up'},{row:0,col:4,dir:'up'},{row:6,col:2,dir:'down'},{row:1,col:0,dir:'down'}],
  },
  {
    id: 62, gridSize: 7, mascotRow: 2, mascotCol: 2, mascotSize: 2,
    character: 'horse-variant', characterColor: MYSTIC_GOLD,
    arrows: [{row:0,col:0,dir:'down'},{row:2,col:0,dir:'down'},{row:0,col:6,dir:'down'},{row:2,col:6,dir:'down'},{row:0,col:2,dir:'up'},{row:0,col:3,dir:'up'},{row:6,col:2,dir:'down'},{row:6,col:3,dir:'down'},{row:3,col:0,dir:'left'},{row:3,col:6,dir:'right'},{row:6,col:0,dir:'up'},{row:6,col:6,dir:'up'},{row:1,col:0,dir:'left'},{row:5,col:6,dir:'right'},{row:4,col:0,dir:'up'}],
  },
  {
    id: 63, gridSize: 7, mascotRow: 2, mascotCol: 2, mascotSize: 2,
    character: 'horse-variant', characterColor: MYSTIC_GOLD,
    arrows: [{row:0,col:0,dir:'right'},{row:0,col:3,dir:'right'},{row:0,col:6,dir:'up'},{row:6,col:6,dir:'left'},{row:6,col:3,dir:'left'},{row:6,col:0,dir:'down'},{row:2,col:0,dir:'left'},{row:3,col:6,dir:'right'},{row:1,col:6,dir:'right'},{row:5,col:0,dir:'left'},{row:4,col:6,dir:'right'},{row:1,col:0,dir:'left'},{row:0,col:2,dir:'up'},{row:6,col:4,dir:'down'},{row:5,col:6,dir:'up'}],
  },
  {
    id: 64, gridSize: 7, mascotRow: 2, mascotCol: 2, mascotSize: 2,
    character: 'horse-variant', characterColor: MYSTIC_GOLD,
    arrows: [{row:0,col:0,dir:'right'},{row:0,col:2,dir:'right'},{row:0,col:5,dir:'right'},{row:6,col:6,dir:'left'},{row:6,col:4,dir:'left'},{row:6,col:1,dir:'left'},{row:2,col:0,dir:'left'},{row:3,col:6,dir:'right'},{row:1,col:0,dir:'down'},{row:5,col:6,dir:'up'},{row:0,col:6,dir:'up'},{row:6,col:0,dir:'down'},{row:4,col:0,dir:'left'},{row:4,col:6,dir:'right'},{row:0,col:4,dir:'up'},{row:6,col:2,dir:'down'}],
  },
  {
    id: 65, gridSize: 7, mascotRow: 2, mascotCol: 2, mascotSize: 2,
    character: 'horse-variant', characterColor: MYSTIC_GOLD,
    arrows: [{row:0,col:0,dir:'down'},{row:2,col:0,dir:'down'},{row:0,col:1,dir:'down'},{row:2,col:1,dir:'down'},{row:0,col:5,dir:'down'},{row:2,col:5,dir:'down'},{row:0,col:6,dir:'down'},{row:2,col:6,dir:'down'},{row:3,col:0,dir:'left'},{row:3,col:6,dir:'right'},{row:6,col:2,dir:'down'},{row:6,col:3,dir:'down'},{row:0,col:2,dir:'up'},{row:0,col:3,dir:'up'},{row:6,col:0,dir:'up'},{row:6,col:6,dir:'up'}],
  },
  // ─────────────────────────────────────────────
  // LEVELS 66-80: Mystic Creatures | 7×7 | harder
  // ─────────────────────────────────────────────
  {
    id: 66, gridSize: 7, mascotRow: 2, mascotCol: 2, mascotSize: 2,
    character: 'crystal-ball', characterColor: MYSTIC_PURPLE,
    arrows: [{row:0,col:0,dir:'right'},{row:0,col:3,dir:'right'},{row:0,col:6,dir:'up'},{row:6,col:6,dir:'left'},{row:6,col:3,dir:'left'},{row:6,col:0,dir:'down'},{row:2,col:0,dir:'left'},{row:3,col:6,dir:'right'},{row:1,col:6,dir:'right'},{row:5,col:0,dir:'left'},{row:4,col:6,dir:'right'},{row:1,col:0,dir:'left'},{row:0,col:2,dir:'up'},{row:6,col:4,dir:'down'},{row:5,col:6,dir:'up'},{row:4,col:0,dir:'up'}],
  },
  {
    id: 67, gridSize: 7, mascotRow: 2, mascotCol: 2, mascotSize: 2,
    character: 'crystal-ball', characterColor: MYSTIC_PURPLE,
    arrows: [{row:0,col:0,dir:'down'},{row:2,col:0,dir:'down'},{row:0,col:6,dir:'down'},{row:2,col:6,dir:'down'},{row:0,col:2,dir:'up'},{row:0,col:3,dir:'up'},{row:6,col:2,dir:'down'},{row:6,col:3,dir:'down'},{row:3,col:0,dir:'left'},{row:3,col:6,dir:'right'},{row:6,col:0,dir:'up'},{row:6,col:6,dir:'up'},{row:1,col:0,dir:'left'},{row:5,col:6,dir:'right'},{row:4,col:0,dir:'up'},{row:1,col:6,dir:'right'}],
  },
  {
    id: 68, gridSize: 7, mascotRow: 2, mascotCol: 2, mascotSize: 2,
    character: 'crystal-ball', characterColor: MYSTIC_PURPLE,
    arrows: [{row:0,col:0,dir:'right'},{row:0,col:2,dir:'right'},{row:0,col:5,dir:'right'},{row:6,col:6,dir:'left'},{row:6,col:4,dir:'left'},{row:6,col:1,dir:'left'},{row:2,col:0,dir:'left'},{row:3,col:6,dir:'right'},{row:1,col:0,dir:'down'},{row:5,col:6,dir:'up'},{row:0,col:6,dir:'up'},{row:6,col:0,dir:'down'},{row:4,col:0,dir:'left'},{row:4,col:6,dir:'right'},{row:0,col:4,dir:'up'},{row:6,col:2,dir:'down'},{row:5,col:0,dir:'up'}],
  },
  {
    id: 69, gridSize: 7, mascotRow: 2, mascotCol: 2, mascotSize: 2,
    character: 'crystal-ball', characterColor: MYSTIC_PURPLE,
    arrows: [{row:0,col:0,dir:'down'},{row:2,col:0,dir:'down'},{row:0,col:1,dir:'down'},{row:2,col:1,dir:'down'},{row:0,col:5,dir:'down'},{row:2,col:5,dir:'down'},{row:0,col:6,dir:'down'},{row:2,col:6,dir:'down'},{row:3,col:0,dir:'left'},{row:3,col:6,dir:'right'},{row:6,col:2,dir:'down'},{row:6,col:3,dir:'down'},{row:0,col:2,dir:'up'},{row:6,col:0,dir:'up'},{row:5,col:6,dir:'right'},{row:4,col:0,dir:'left'},{row:6,col:4,dir:'down'}],
  },
  {
    id: 70, gridSize: 7, mascotRow: 2, mascotCol: 2, mascotSize: 2,
    character: 'crystal-ball', characterColor: MYSTIC_PURPLE,
    arrows: [{row:0,col:0,dir:'right'},{row:0,col:3,dir:'right'},{row:0,col:6,dir:'up'},{row:6,col:6,dir:'left'},{row:6,col:3,dir:'left'},{row:6,col:0,dir:'down'},{row:2,col:0,dir:'left'},{row:3,col:6,dir:'right'},{row:1,col:6,dir:'right'},{row:5,col:0,dir:'left'},{row:4,col:6,dir:'right'},{row:1,col:0,dir:'left'},{row:0,col:2,dir:'up'},{row:6,col:4,dir:'down'},{row:5,col:6,dir:'up'},{row:4,col:0,dir:'up'},{row:0,col:5,dir:'up'},{row:6,col:1,dir:'down'}],
  },
  {
    id: 71, gridSize: 7, mascotRow: 2, mascotCol: 2, mascotSize: 2,
    character: 'shimmer', characterColor: MYSTIC_GOLD,
    arrows: [{row:0,col:0,dir:'down'},{row:2,col:0,dir:'down'},{row:0,col:6,dir:'down'},{row:2,col:6,dir:'down'},{row:0,col:2,dir:'up'},{row:0,col:3,dir:'up'},{row:6,col:2,dir:'down'},{row:6,col:3,dir:'down'},{row:3,col:0,dir:'left'},{row:3,col:6,dir:'right'},{row:6,col:0,dir:'up'},{row:6,col:6,dir:'up'},{row:1,col:0,dir:'left'},{row:5,col:6,dir:'right'},{row:4,col:0,dir:'left'},{row:1,col:6,dir:'right'},{row:5,col:0,dir:'up'},{row:0,col:5,dir:'up'}],
  },
  {
    id: 72, gridSize: 7, mascotRow: 2, mascotCol: 2, mascotSize: 2,
    character: 'shimmer', characterColor: MYSTIC_GOLD,
    arrows: [{row:0,col:0,dir:'right'},{row:0,col:2,dir:'right'},{row:0,col:5,dir:'right'},{row:6,col:6,dir:'left'},{row:6,col:4,dir:'left'},{row:6,col:1,dir:'left'},{row:2,col:0,dir:'left'},{row:3,col:6,dir:'right'},{row:1,col:0,dir:'down'},{row:5,col:6,dir:'up'},{row:0,col:6,dir:'up'},{row:6,col:0,dir:'down'},{row:4,col:0,dir:'left'},{row:4,col:6,dir:'right'},{row:0,col:4,dir:'up'},{row:6,col:2,dir:'down'},{row:5,col:0,dir:'up'},{row:1,col:6,dir:'right'}],
  },
  {
    id: 73, gridSize: 7, mascotRow: 2, mascotCol: 2, mascotSize: 2,
    character: 'shimmer', characterColor: MYSTIC_GOLD,
    arrows: [{row:0,col:0,dir:'down'},{row:2,col:0,dir:'down'},{row:0,col:1,dir:'down'},{row:2,col:1,dir:'down'},{row:0,col:5,dir:'down'},{row:2,col:5,dir:'down'},{row:0,col:6,dir:'down'},{row:2,col:6,dir:'down'},{row:3,col:0,dir:'left'},{row:3,col:6,dir:'right'},{row:6,col:2,dir:'down'},{row:6,col:3,dir:'down'},{row:0,col:2,dir:'up'},{row:0,col:3,dir:'up'},{row:6,col:0,dir:'up'},{row:6,col:6,dir:'up'},{row:5,col:0,dir:'up'},{row:5,col:6,dir:'right'},{row:4,col:0,dir:'left'}],
  },
  {
    id: 74, gridSize: 7, mascotRow: 2, mascotCol: 2, mascotSize: 2,
    character: 'shimmer', characterColor: MYSTIC_GOLD,
    arrows: [{row:0,col:0,dir:'right'},{row:0,col:3,dir:'right'},{row:0,col:6,dir:'up'},{row:6,col:6,dir:'left'},{row:6,col:3,dir:'left'},{row:6,col:0,dir:'down'},{row:2,col:0,dir:'left'},{row:3,col:6,dir:'right'},{row:1,col:6,dir:'right'},{row:5,col:0,dir:'left'},{row:4,col:6,dir:'right'},{row:1,col:0,dir:'left'},{row:0,col:2,dir:'up'},{row:6,col:4,dir:'down'},{row:5,col:6,dir:'up'},{row:4,col:0,dir:'up'},{row:0,col:5,dir:'up'},{row:6,col:1,dir:'down'},{row:0,col:4,dir:'right'}],
  },
  {
    id: 75, gridSize: 7, mascotRow: 2, mascotCol: 2, mascotSize: 2,
    character: 'shimmer', characterColor: MYSTIC_GOLD,
    arrows: [{row:0,col:0,dir:'down'},{row:2,col:0,dir:'down'},{row:0,col:6,dir:'down'},{row:2,col:6,dir:'down'},{row:0,col:2,dir:'up'},{row:0,col:3,dir:'up'},{row:6,col:2,dir:'down'},{row:6,col:3,dir:'down'},{row:3,col:0,dir:'left'},{row:3,col:6,dir:'right'},{row:6,col:0,dir:'up'},{row:6,col:6,dir:'up'},{row:1,col:0,dir:'left'},{row:5,col:6,dir:'right'},{row:4,col:0,dir:'left'},{row:1,col:6,dir:'right'},{row:5,col:0,dir:'up'},{row:0,col:5,dir:'up'},{row:4,col:6,dir:'up'},{row:6,col:1,dir:'right'}],
  },
  {
    id: 76, gridSize: 7, mascotRow: 2, mascotCol: 2, mascotSize: 2,
    character: 'magic-staff', characterColor: MYSTIC_TEAL,
    arrows: [{row:0,col:0,dir:'right'},{row:0,col:2,dir:'right'},{row:0,col:5,dir:'right'},{row:6,col:6,dir:'left'},{row:6,col:4,dir:'left'},{row:6,col:1,dir:'left'},{row:2,col:0,dir:'left'},{row:3,col:6,dir:'right'},{row:1,col:0,dir:'down'},{row:5,col:6,dir:'up'},{row:0,col:6,dir:'up'},{row:6,col:0,dir:'down'},{row:4,col:0,dir:'left'},{row:4,col:6,dir:'right'},{row:0,col:4,dir:'up'},{row:6,col:2,dir:'down'},{row:5,col:0,dir:'up'},{row:1,col:6,dir:'right'},{row:0,col:1,dir:'up'},{row:6,col:5,dir:'left'}],
  },
  {
    id: 77, gridSize: 7, mascotRow: 2, mascotCol: 2, mascotSize: 2,
    character: 'magic-staff', characterColor: MYSTIC_TEAL,
    arrows: [{row:0,col:0,dir:'down'},{row:2,col:0,dir:'down'},{row:0,col:1,dir:'down'},{row:2,col:1,dir:'down'},{row:0,col:5,dir:'down'},{row:2,col:5,dir:'down'},{row:0,col:6,dir:'down'},{row:2,col:6,dir:'down'},{row:3,col:0,dir:'left'},{row:3,col:6,dir:'right'},{row:6,col:2,dir:'down'},{row:6,col:3,dir:'down'},{row:0,col:2,dir:'up'},{row:0,col:3,dir:'up'},{row:6,col:0,dir:'up'},{row:6,col:6,dir:'up'},{row:5,col:0,dir:'up'},{row:5,col:6,dir:'right'},{row:4,col:0,dir:'left'},{row:4,col:6,dir:'up'}],
  },
  {
    id: 78, gridSize: 7, mascotRow: 2, mascotCol: 2, mascotSize: 2,
    character: 'magic-staff', characterColor: MYSTIC_TEAL,
    arrows: [{row:0,col:0,dir:'right'},{row:0,col:3,dir:'right'},{row:0,col:6,dir:'up'},{row:6,col:6,dir:'left'},{row:6,col:3,dir:'left'},{row:6,col:0,dir:'down'},{row:2,col:0,dir:'left'},{row:3,col:6,dir:'right'},{row:1,col:6,dir:'right'},{row:5,col:0,dir:'left'},{row:4,col:6,dir:'right'},{row:1,col:0,dir:'left'},{row:0,col:2,dir:'up'},{row:6,col:4,dir:'down'},{row:5,col:6,dir:'up'},{row:4,col:0,dir:'up'},{row:0,col:5,dir:'up'},{row:6,col:1,dir:'down'},{row:0,col:4,dir:'right'},{row:6,col:5,dir:'up'}],
  },
  {
    id: 79, gridSize: 7, mascotRow: 2, mascotCol: 2, mascotSize: 2,
    character: 'magic-staff', characterColor: MYSTIC_TEAL,
    arrows: [{row:0,col:0,dir:'down'},{row:2,col:0,dir:'down'},{row:0,col:6,dir:'down'},{row:2,col:6,dir:'down'},{row:0,col:2,dir:'up'},{row:0,col:3,dir:'up'},{row:6,col:2,dir:'down'},{row:6,col:3,dir:'down'},{row:3,col:0,dir:'left'},{row:3,col:6,dir:'right'},{row:6,col:0,dir:'up'},{row:6,col:6,dir:'up'},{row:1,col:0,dir:'left'},{row:5,col:6,dir:'right'},{row:4,col:0,dir:'left'},{row:1,col:6,dir:'right'},{row:5,col:0,dir:'up'},{row:0,col:5,dir:'up'},{row:4,col:6,dir:'up'},{row:6,col:1,dir:'right'},{row:0,col:4,dir:'right'}],
  },
  {
    id: 80, gridSize: 7, mascotRow: 2, mascotCol: 2, mascotSize: 2,
    character: 'magic-staff', characterColor: MYSTIC_TEAL,
    arrows: [{row:0,col:0,dir:'right'},{row:0,col:2,dir:'right'},{row:0,col:5,dir:'right'},{row:6,col:6,dir:'left'},{row:6,col:4,dir:'left'},{row:6,col:1,dir:'left'},{row:2,col:0,dir:'left'},{row:3,col:6,dir:'right'},{row:1,col:0,dir:'down'},{row:5,col:6,dir:'up'},{row:0,col:6,dir:'up'},{row:6,col:0,dir:'down'},{row:4,col:0,dir:'left'},{row:4,col:6,dir:'right'},{row:0,col:4,dir:'up'},{row:6,col:2,dir:'down'},{row:5,col:0,dir:'up'},{row:1,col:6,dir:'right'},{row:0,col:1,dir:'up'},{row:6,col:5,dir:'left'},{row:3,col:0,dir:'down'}],
  },
  // ─────────────────────────────────────────────
  // LEVELS 81-95: Legendary Heroes | 8×8 | 2×2 mascot at (3,3)
  // ─────────────────────────────────────────────
  {
    id: 81, gridSize: 8, mascotRow: 3, mascotCol: 3, mascotSize: 2,
    character: 'sword-cross', characterColor: HERO_GOLD,
    arrows: [{row:0,col:3,dir:'up'},{row:0,col:4,dir:'up'},{row:7,col:3,dir:'down'},{row:7,col:4,dir:'down'},{row:3,col:0,dir:'left'},{row:4,col:0,dir:'left'},{row:3,col:7,dir:'right'},{row:4,col:7,dir:'right'},{row:0,col:0,dir:'up'},{row:0,col:7,dir:'up'},{row:7,col:0,dir:'down'},{row:7,col:7,dir:'down'}],
  },
  {
    id: 82, gridSize: 8, mascotRow: 3, mascotCol: 3, mascotSize: 2,
    character: 'sword-cross', characterColor: HERO_GOLD,
    arrows: [{row:0,col:0,dir:'right'},{row:0,col:4,dir:'right'},{row:7,col:7,dir:'left'},{row:7,col:3,dir:'left'},{row:3,col:0,dir:'left'},{row:4,col:7,dir:'right'},{row:0,col:7,dir:'up'},{row:7,col:0,dir:'down'},{row:0,col:3,dir:'up'},{row:0,col:4,dir:'up'},{row:7,col:3,dir:'down'},{row:7,col:4,dir:'down'},{row:1,col:0,dir:'left'},{row:6,col:7,dir:'right'}],
  },
  {
    id: 83, gridSize: 8, mascotRow: 3, mascotCol: 3, mascotSize: 2,
    character: 'sword-cross', characterColor: HERO_GOLD,
    arrows: [{row:0,col:0,dir:'down'},{row:3,col:0,dir:'down'},{row:0,col:7,dir:'down'},{row:3,col:7,dir:'down'},{row:0,col:3,dir:'up'},{row:0,col:4,dir:'up'},{row:7,col:3,dir:'down'},{row:7,col:4,dir:'down'},{row:4,col:0,dir:'left'},{row:4,col:7,dir:'right'},{row:7,col:0,dir:'up'},{row:7,col:7,dir:'up'},{row:1,col:0,dir:'left'},{row:6,col:7,dir:'right'},{row:2,col:7,dir:'right'}],
  },
  {
    id: 84, gridSize: 8, mascotRow: 3, mascotCol: 3, mascotSize: 2,
    character: 'sword-cross', characterColor: HERO_GOLD,
    arrows: [{row:0,col:0,dir:'right'},{row:0,col:4,dir:'right'},{row:7,col:7,dir:'left'},{row:7,col:3,dir:'left'},{row:3,col:0,dir:'left'},{row:4,col:7,dir:'right'},{row:0,col:7,dir:'up'},{row:7,col:0,dir:'down'},{row:0,col:3,dir:'up'},{row:7,col:4,dir:'down'},{row:1,col:0,dir:'left'},{row:6,col:7,dir:'right'},{row:2,col:7,dir:'right'},{row:5,col:0,dir:'left'},{row:0,col:6,dir:'up'},{row:7,col:1,dir:'down'}],
  },
  {
    id: 85, gridSize: 8, mascotRow: 3, mascotCol: 3, mascotSize: 2,
    character: 'sword-cross', characterColor: HERO_GOLD,
    arrows: [{row:0,col:0,dir:'down'},{row:3,col:0,dir:'down'},{row:0,col:7,dir:'down'},{row:3,col:7,dir:'down'},{row:0,col:3,dir:'up'},{row:0,col:4,dir:'up'},{row:7,col:3,dir:'down'},{row:7,col:4,dir:'down'},{row:4,col:0,dir:'left'},{row:4,col:7,dir:'right'},{row:7,col:0,dir:'up'},{row:7,col:7,dir:'up'},{row:1,col:0,dir:'left'},{row:6,col:7,dir:'right'},{row:2,col:7,dir:'right'},{row:5,col:0,dir:'up'},{row:0,col:2,dir:'up'}],
  },
  {
    id: 86, gridSize: 8, mascotRow: 3, mascotCol: 3, mascotSize: 2,
    character: 'shield-star', characterColor: HERO_SILVER,
    arrows: [{row:0,col:0,dir:'right'},{row:0,col:3,dir:'right'},{row:0,col:7,dir:'up'},{row:7,col:7,dir:'left'},{row:7,col:4,dir:'left'},{row:7,col:0,dir:'down'},{row:3,col:0,dir:'left'},{row:4,col:7,dir:'right'},{row:1,col:7,dir:'right'},{row:6,col:0,dir:'left'},{row:5,col:7,dir:'right'},{row:2,col:0,dir:'left'},{row:0,col:5,dir:'up'},{row:7,col:2,dir:'down'},{row:6,col:7,dir:'up'},{row:1,col:0,dir:'down'},{row:0,col:6,dir:'up'}],
  },
  {
    id: 87, gridSize: 8, mascotRow: 3, mascotCol: 3, mascotSize: 2,
    character: 'shield-star', characterColor: HERO_SILVER,
    arrows: [{row:0,col:0,dir:'down'},{row:3,col:0,dir:'down'},{row:0,col:1,dir:'down'},{row:3,col:1,dir:'down'},{row:0,col:6,dir:'down'},{row:3,col:6,dir:'down'},{row:0,col:7,dir:'down'},{row:3,col:7,dir:'down'},{row:4,col:0,dir:'left'},{row:4,col:7,dir:'right'},{row:7,col:3,dir:'down'},{row:7,col:4,dir:'down'},{row:0,col:3,dir:'up'},{row:0,col:4,dir:'up'},{row:7,col:0,dir:'up'},{row:7,col:7,dir:'up'},{row:6,col:0,dir:'up'},{row:6,col:7,dir:'right'},{row:5,col:0,dir:'left'}],
  },
  {
    id: 88, gridSize: 8, mascotRow: 3, mascotCol: 3, mascotSize: 2,
    character: 'shield-star', characterColor: HERO_SILVER,
    arrows: [{row:0,col:0,dir:'right'},{row:0,col:3,dir:'right'},{row:0,col:6,dir:'right'},{row:7,col:7,dir:'left'},{row:7,col:4,dir:'left'},{row:7,col:1,dir:'left'},{row:3,col:0,dir:'left'},{row:4,col:7,dir:'right'},{row:1,col:0,dir:'down'},{row:6,col:7,dir:'up'},{row:0,col:7,dir:'up'},{row:7,col:0,dir:'down'},{row:5,col:0,dir:'left'},{row:5,col:7,dir:'right'},{row:0,col:5,dir:'up'},{row:7,col:2,dir:'down'},{row:6,col:0,dir:'up'},{row:2,col:7,dir:'right'},{row:0,col:1,dir:'up'},{row:7,col:6,dir:'left'}],
  },
  {
    id: 89, gridSize: 8, mascotRow: 3, mascotCol: 3, mascotSize: 2,
    character: 'shield-star', characterColor: HERO_SILVER,
    arrows: [{row:0,col:0,dir:'down'},{row:3,col:0,dir:'down'},{row:0,col:7,dir:'down'},{row:3,col:7,dir:'down'},{row:0,col:3,dir:'up'},{row:0,col:4,dir:'up'},{row:7,col:3,dir:'down'},{row:7,col:4,dir:'down'},{row:4,col:0,dir:'left'},{row:4,col:7,dir:'right'},{row:7,col:0,dir:'up'},{row:7,col:7,dir:'up'},{row:1,col:0,dir:'left'},{row:6,col:7,dir:'right'},{row:2,col:7,dir:'right'},{row:5,col:0,dir:'up'},{row:0,col:2,dir:'up'},{row:0,col:5,dir:'up'},{row:7,col:2,dir:'down'},{row:7,col:5,dir:'left'}],
  },
  {
    id: 90, gridSize: 8, mascotRow: 3, mascotCol: 3, mascotSize: 2,
    character: 'shield-star', characterColor: HERO_SILVER,
    arrows: [{row:0,col:0,dir:'right'},{row:0,col:4,dir:'right'},{row:7,col:7,dir:'left'},{row:7,col:3,dir:'left'},{row:3,col:0,dir:'left'},{row:4,col:7,dir:'right'},{row:0,col:7,dir:'up'},{row:7,col:0,dir:'down'},{row:0,col:3,dir:'up'},{row:0,col:4,dir:'up'},{row:7,col:3,dir:'down'},{row:7,col:4,dir:'down'},{row:1,col:0,dir:'left'},{row:6,col:7,dir:'right'},{row:2,col:0,dir:'left'},{row:5,col:7,dir:'right'},{row:0,col:2,dir:'up'},{row:7,col:5,dir:'down'},{row:0,col:6,dir:'up'},{row:7,col:1,dir:'down'}],
  },
  // ─────────────────────────────────────────────
  // LEVELS 91-99: Legendary Heroes | 8×8 | hardest
  // ─────────────────────────────────────────────
  {
    id: 91, gridSize: 8, mascotRow: 3, mascotCol: 3, mascotSize: 2,
    character: 'crown', characterColor: QUEEN_RAINBOW,
    arrows: [{row:0,col:0,dir:'down'},{row:3,col:0,dir:'down'},{row:0,col:1,dir:'down'},{row:3,col:1,dir:'down'},{row:0,col:6,dir:'down'},{row:3,col:6,dir:'down'},{row:0,col:7,dir:'down'},{row:3,col:7,dir:'down'},{row:4,col:0,dir:'left'},{row:4,col:7,dir:'right'},{row:7,col:3,dir:'down'},{row:7,col:4,dir:'down'},{row:0,col:3,dir:'up'},{row:0,col:4,dir:'up'},{row:7,col:0,dir:'up'},{row:7,col:7,dir:'up'},{row:6,col:0,dir:'up'},{row:6,col:7,dir:'right'},{row:5,col:0,dir:'left'},{row:2,col:7,dir:'right'}],
  },
  {
    id: 92, gridSize: 8, mascotRow: 3, mascotCol: 3, mascotSize: 2,
    character: 'crown', characterColor: QUEEN_RAINBOW,
    arrows: [{row:0,col:0,dir:'right'},{row:0,col:3,dir:'right'},{row:0,col:6,dir:'right'},{row:7,col:7,dir:'left'},{row:7,col:4,dir:'left'},{row:7,col:1,dir:'left'},{row:3,col:0,dir:'left'},{row:4,col:7,dir:'right'},{row:1,col:0,dir:'down'},{row:6,col:7,dir:'up'},{row:0,col:7,dir:'up'},{row:7,col:0,dir:'down'},{row:5,col:0,dir:'left'},{row:5,col:7,dir:'right'},{row:0,col:5,dir:'up'},{row:7,col:2,dir:'down'},{row:6,col:0,dir:'up'},{row:2,col:7,dir:'right'},{row:0,col:1,dir:'up'},{row:7,col:6,dir:'left'},{row:2,col:0,dir:'left'}],
  },
  {
    id: 93, gridSize: 8, mascotRow: 3, mascotCol: 3, mascotSize: 2,
    character: 'crown', characterColor: QUEEN_RAINBOW,
    arrows: [{row:0,col:0,dir:'down'},{row:3,col:0,dir:'down'},{row:0,col:7,dir:'down'},{row:3,col:7,dir:'down'},{row:0,col:3,dir:'up'},{row:0,col:4,dir:'up'},{row:7,col:3,dir:'down'},{row:7,col:4,dir:'down'},{row:4,col:0,dir:'left'},{row:4,col:7,dir:'right'},{row:7,col:0,dir:'up'},{row:7,col:7,dir:'up'},{row:1,col:0,dir:'left'},{row:6,col:7,dir:'right'},{row:2,col:7,dir:'right'},{row:5,col:0,dir:'up'},{row:0,col:2,dir:'up'},{row:0,col:5,dir:'up'},{row:7,col:2,dir:'down'},{row:7,col:5,dir:'left'},{row:6,col:0,dir:'up'},{row:1,col:7,dir:'right'}],
  },
  {
    id: 94, gridSize: 8, mascotRow: 3, mascotCol: 3, mascotSize: 2,
    character: 'crown', characterColor: QUEEN_RAINBOW,
    arrows: [{row:0,col:0,dir:'right'},{row:0,col:4,dir:'right'},{row:7,col:7,dir:'left'},{row:7,col:3,dir:'left'},{row:3,col:0,dir:'left'},{row:4,col:7,dir:'right'},{row:0,col:7,dir:'up'},{row:7,col:0,dir:'down'},{row:0,col:3,dir:'up'},{row:0,col:4,dir:'up'},{row:7,col:3,dir:'down'},{row:7,col:4,dir:'down'},{row:1,col:0,dir:'left'},{row:6,col:7,dir:'right'},{row:2,col:0,dir:'left'},{row:5,col:7,dir:'right'},{row:0,col:2,dir:'up'},{row:7,col:5,dir:'down'},{row:0,col:6,dir:'up'},{row:7,col:1,dir:'down'},{row:0,col:1,dir:'up'},{row:7,col:6,dir:'left'}],
  },
  {
    id: 95, gridSize: 8, mascotRow: 3, mascotCol: 3, mascotSize: 2,
    character: 'crown', characterColor: QUEEN_RAINBOW,
    arrows: [{row:0,col:0,dir:'down'},{row:3,col:0,dir:'down'},{row:0,col:1,dir:'down'},{row:3,col:1,dir:'down'},{row:0,col:6,dir:'down'},{row:3,col:6,dir:'down'},{row:0,col:7,dir:'down'},{row:3,col:7,dir:'down'},{row:4,col:0,dir:'left'},{row:4,col:7,dir:'right'},{row:7,col:3,dir:'down'},{row:7,col:4,dir:'down'},{row:0,col:3,dir:'up'},{row:0,col:4,dir:'up'},{row:7,col:0,dir:'up'},{row:7,col:7,dir:'up'},{row:6,col:0,dir:'up'},{row:6,col:7,dir:'right'},{row:5,col:0,dir:'left'},{row:2,col:7,dir:'right'},{row:0,col:2,dir:'up'},{row:7,col:5,dir:'left'},{row:5,col:7,dir:'up'}],
  },
  // ─────────────────────────────────────────────
  // LEVELS 96-100: FINAL QUEEN — hardest
  // ─────────────────────────────────────────────
  {
    id: 96, gridSize: 8, mascotRow: 3, mascotCol: 3, mascotSize: 2,
    character: 'crown', characterColor: QUEEN_RAINBOW,
    arrows: [{row:0,col:0,dir:'right'},{row:0,col:3,dir:'right'},{row:0,col:6,dir:'right'},{row:7,col:7,dir:'left'},{row:7,col:4,dir:'left'},{row:7,col:1,dir:'left'},{row:3,col:0,dir:'left'},{row:4,col:7,dir:'right'},{row:1,col:0,dir:'down'},{row:6,col:7,dir:'up'},{row:0,col:7,dir:'up'},{row:7,col:0,dir:'down'},{row:5,col:0,dir:'left'},{row:5,col:7,dir:'right'},{row:0,col:5,dir:'up'},{row:7,col:2,dir:'down'},{row:6,col:0,dir:'up'},{row:2,col:7,dir:'right'},{row:0,col:1,dir:'up'},{row:7,col:6,dir:'left'},{row:2,col:0,dir:'left'},{row:4,col:0,dir:'up'},{row:0,col:2,dir:'up'}],
  },
  {
    id: 97, gridSize: 8, mascotRow: 3, mascotCol: 3, mascotSize: 2,
    character: 'crown', characterColor: QUEEN_RAINBOW,
    arrows: [{row:0,col:0,dir:'down'},{row:3,col:0,dir:'down'},{row:0,col:7,dir:'down'},{row:3,col:7,dir:'down'},{row:0,col:3,dir:'up'},{row:0,col:4,dir:'up'},{row:7,col:3,dir:'down'},{row:7,col:4,dir:'down'},{row:4,col:0,dir:'left'},{row:4,col:7,dir:'right'},{row:7,col:0,dir:'up'},{row:7,col:7,dir:'up'},{row:1,col:0,dir:'left'},{row:6,col:7,dir:'right'},{row:2,col:7,dir:'right'},{row:5,col:0,dir:'up'},{row:0,col:2,dir:'up'},{row:0,col:5,dir:'up'},{row:7,col:2,dir:'down'},{row:7,col:5,dir:'left'},{row:6,col:0,dir:'up'},{row:1,col:7,dir:'right'},{row:0,col:6,dir:'up'}],
  },
  {
    id: 98, gridSize: 8, mascotRow: 3, mascotCol: 3, mascotSize: 2,
    character: 'crown', characterColor: QUEEN_RAINBOW,
    arrows: [{row:0,col:0,dir:'right'},{row:0,col:3,dir:'right'},{row:0,col:6,dir:'right'},{row:7,col:7,dir:'left'},{row:7,col:4,dir:'left'},{row:7,col:1,dir:'left'},{row:3,col:0,dir:'left'},{row:4,col:7,dir:'right'},{row:1,col:0,dir:'down'},{row:6,col:7,dir:'up'},{row:0,col:7,dir:'up'},{row:7,col:0,dir:'down'},{row:5,col:0,dir:'left'},{row:5,col:7,dir:'right'},{row:0,col:5,dir:'up'},{row:7,col:2,dir:'down'},{row:6,col:0,dir:'up'},{row:2,col:7,dir:'right'},{row:0,col:1,dir:'up'},{row:7,col:6,dir:'left'},{row:2,col:0,dir:'left'},{row:4,col:0,dir:'up'},{row:0,col:2,dir:'up'},{row:7,col:5,dir:'up'}],
  },
  {
    id: 99, gridSize: 8, mascotRow: 3, mascotCol: 3, mascotSize: 2,
    character: 'crown', characterColor: QUEEN_RAINBOW,
    arrows: [{row:0,col:0,dir:'down'},{row:3,col:0,dir:'down'},{row:0,col:1,dir:'down'},{row:3,col:1,dir:'down'},{row:0,col:6,dir:'down'},{row:3,col:6,dir:'down'},{row:0,col:7,dir:'down'},{row:3,col:7,dir:'down'},{row:4,col:0,dir:'left'},{row:4,col:7,dir:'right'},{row:7,col:3,dir:'down'},{row:7,col:4,dir:'down'},{row:0,col:3,dir:'up'},{row:0,col:4,dir:'up'},{row:7,col:0,dir:'up'},{row:7,col:7,dir:'up'},{row:6,col:0,dir:'up'},{row:6,col:7,dir:'right'},{row:5,col:0,dir:'left'},{row:2,col:7,dir:'right'},{row:0,col:2,dir:'up'},{row:7,col:5,dir:'left'},{row:5,col:7,dir:'up'},{row:2,col:0,dir:'left'}],
  },
  {
    id: 100, gridSize: 8, mascotRow: 3, mascotCol: 3, mascotSize: 2,
    character: 'crown', characterColor: '#FFD700',
    arrows: [{row:0,col:0,dir:'right'},{row:0,col:4,dir:'right'},{row:7,col:7,dir:'left'},{row:7,col:3,dir:'left'},{row:3,col:0,dir:'left'},{row:4,col:7,dir:'right'},{row:0,col:7,dir:'up'},{row:7,col:0,dir:'down'},{row:0,col:3,dir:'up'},{row:0,col:4,dir:'up'},{row:7,col:3,dir:'down'},{row:7,col:4,dir:'down'},{row:1,col:0,dir:'left'},{row:6,col:7,dir:'right'},{row:2,col:0,dir:'left'},{row:5,col:7,dir:'right'},{row:0,col:2,dir:'up'},{row:7,col:5,dir:'down'},{row:0,col:6,dir:'up'},{row:7,col:1,dir:'down'},{row:0,col:1,dir:'up'},{row:7,col:6,dir:'left'},{row:1,col:7,dir:'right'},{row:6,col:0,dir:'left'}],
  },
];
