export type Direction = 'up' | 'down' | 'left' | 'right';

export interface CellPos {
  row: number;
  col: number;
}

export interface LevelArrow {
  path: CellPos[];    // Full route: initial body cells + exit extension (EXTENSION more cells in dir)
  bodyLen: number;    // Initial body length (number of cells in the waypoint expansion)
  dir: Direction;     // Head's exit direction (also used for arrowhead)
  accent: boolean;
}

export interface Level {
  id: number;
  gridSize: number;
  mascotRow: number;
  mascotCol: number;
  character: string;
  characterColor: string;
  arrows: LevelArrow[];
}

type WP = [number, number];

// Extension: enough OOB cells for the tail to fully exit even from the farthest starting point.
// Max grid=9, max bodyLen≈10 → 20 cells guarantees the tail always exits.
const EXTENSION = 20;

// Expand waypoints into cells, then append EXTENSION exit cells.
function mkArrow(wpts: WP[], dir: Direction, accent = false): LevelArrow {
  const cells: CellPos[] = [{ row: wpts[0][0], col: wpts[0][1] }];
  for (let i = 1; i < wpts.length; i++) {
    const [pr, pc] = wpts[i - 1];
    const [nr, nc] = wpts[i];
    if (pr === nr) {
      const step = nc > pc ? 1 : -1;
      for (let c = pc + step; step > 0 ? c <= nc : c >= nc; c += step) {
        cells.push({ row: nr, col: c });
      }
    } else {
      const step = nr > pr ? 1 : -1;
      for (let r = pr + step; step > 0 ? r <= nr : r >= nr; r += step) {
        cells.push({ row: r, col: nc });
      }
    }
  }

  const bodyLen = cells.length;
  const head = cells[cells.length - 1];
  const dr = dir === 'down' ? 1 : dir === 'up' ? -1 : 0;
  const dc = dir === 'right' ? 1 : dir === 'left' ? -1 : 0;

  const path: CellPos[] = [...cells];
  for (let i = 1; i <= EXTENSION; i++) {
    path.push({ row: head.row + i * dr, col: head.col + i * dc });
  }

  return { path, bodyLen, dir, accent };
}

function lv(
  id: number, gs: number, mr: number, mc: number,
  character: string, characterColor: string,
  arrows: LevelArrow[]
): Level {
  return { id, gridSize: gs, mascotRow: mr, mascotCol: mc, character, characterColor, arrows };
}

// ══════════════════════════════════════════════════════
// LEVELS 1–10  7×7 grid · mascot 1×1 at (3,3)
// ══════════════════════════════════════════════════════
const LV1 = lv(1, 7, 3, 3, 'rabbit', '#C8F5D8', [
  mkArrow([[1, 5], [1, 6]], 'right', true),
  mkArrow([[1, 2], [1, 4]], 'right'),
  mkArrow([[4, 5], [6, 5]], 'down'),
  mkArrow([[6, 1], [6, 4]], 'right', true),
]);

const LV2 = lv(2, 7, 3, 3, 'rabbit', '#C8F5D8', [
  mkArrow([[4, 0], [0, 0]], 'up', true),
  mkArrow([[0, 5], [0, 1]], 'left'),
  mkArrow([[1, 4], [5, 4]], 'down'),
  mkArrow([[5, 2], [5, 3]], 'right', true),
]);

const LV3 = lv(3, 7, 3, 3, 'cat', '#FFD6E0', [
  mkArrow([[2, 4], [2, 5]], 'right', true),
  mkArrow([[0, 0], [2, 0], [2, 3]], 'right'),
  mkArrow([[6, 1], [4, 1]], 'up'),
  mkArrow([[0, 6], [2, 6]], 'down', true),
  mkArrow([[4, 2], [4, 4]], 'right'),
]);

const LV4 = lv(4, 7, 3, 3, 'cat', '#FFD6E0', [
  mkArrow([[2, 4], [2, 5]], 'right', true),
  mkArrow([[0, 0], [2, 0], [2, 3]], 'right'),
  mkArrow([[5, 0], [3, 0]], 'up'),
  mkArrow([[0, 6], [4, 6]], 'down', true),
  mkArrow([[6, 6], [6, 4]], 'left'),
]);

const LV5 = lv(5, 7, 3, 3, 'bear', '#D6E4FF', [
  mkArrow([[0, 4], [1, 4]], 'down', true),
  mkArrow([[4, 0], [1, 0], [1, 3]], 'right'),
  mkArrow([[0, 0], [0, 3]], 'right'),
  mkArrow([[6, 1], [5, 1]], 'up'),
  mkArrow([[0, 5], [0, 6], [3, 6]], 'down', true),
  mkArrow([[5, 5], [5, 3]], 'left'),
]);

const LV6 = lv(6, 7, 3, 3, 'bear', '#D6E4FF', [
  mkArrow([[0, 3], [0, 5], [2, 5]], 'down', true),
  mkArrow([[1, 0], [1, 2]], 'right'),
  mkArrow([[3, 4], [3, 6]], 'right', true),
  mkArrow([[6, 2], [3, 2]], 'up'),
  mkArrow([[6, 6], [6, 4]], 'left', true),
]);

const LV7 = lv(7, 7, 3, 3, 'bear', '#D6E4FF', [
  mkArrow([[0, 0], [0, 4], [4, 4]], 'down'),
  mkArrow([[0, 5], [2, 5]], 'down', true),
  mkArrow([[1, 0], [1, 3]], 'right'),
  mkArrow([[3, 2], [3, 0]], 'left', true),
  mkArrow([[6, 2], [4, 2]], 'up'),
  mkArrow([[5, 0], [5, 1]], 'right'),
]);

const LV8 = lv(8, 7, 3, 3, 'cat', '#FFD6E0', [
  mkArrow([[0, 4], [2, 4]], 'down', true),
  mkArrow([[2, 0], [2, 3]], 'right'),
  mkArrow([[5, 2], [4, 2]], 'up'),
  mkArrow([[6, 0], [4, 0], [4, 1]], 'right'),
  mkArrow([[1, 6], [1, 5]], 'left', true),
  mkArrow([[0, 0], [1, 0]], 'down'),
]);

const LV9 = lv(9, 7, 3, 3, 'rabbit', '#C8F5D8', [
  mkArrow([[0, 5], [2, 5]], 'down', true),
  mkArrow([[5, 0], [2, 0], [2, 4]], 'right'),
  mkArrow([[6, 2], [5, 2]], 'up'),
  mkArrow([[4, 2], [4, 5]], 'right', true),
  mkArrow([[0, 0], [1, 0]], 'down'),
  mkArrow([[6, 6], [6, 4]], 'left', true),
  mkArrow([[3, 4], [3, 6]], 'right'),
]);

const LV10 = lv(10, 7, 3, 3, 'rabbit', '#C8F5D8', [
  mkArrow([[0, 5], [2, 5]], 'down', true),
  mkArrow([[0, 0], [2, 0], [2, 4]], 'right'),
  mkArrow([[6, 0], [3, 0]], 'up'),
  mkArrow([[0, 6], [3, 6]], 'down', true),
  mkArrow([[4, 3], [4, 5]], 'right'),
  mkArrow([[6, 6], [6, 3]], 'left', true),
  mkArrow([[5, 2], [3, 2]], 'up'),
]);

// ══════════════════════════════════════════════════════
// LEVELS 11–20  8×8 grid · mascot 1×1 at (4,4)
// ══════════════════════════════════════════════════════
const LV11 = lv(11, 8, 4, 4, 'face-woman', '#FFB7E8', [
  mkArrow([[0, 5], [2, 5]], 'down', true),
  mkArrow([[2, 1], [2, 4]], 'right'),
  mkArrow([[7, 6], [7, 2]], 'left', true),
  mkArrow([[5, 0], [2, 0]], 'up'),
  mkArrow([[3, 5], [4, 5]], 'down'),
]);

const LV12 = lv(12, 8, 4, 4, 'face-woman', '#FFB7E8', [
  mkArrow([[1, 3], [3, 3]], 'down', true),
  mkArrow([[0, 0], [0, 2], [3, 2]], 'right'),
  mkArrow([[7, 2], [5, 2]], 'up'),
  mkArrow([[5, 7], [5, 4]], 'left', true),
  mkArrow([[7, 3], [7, 5]], 'right'),
]);

const LV13 = lv(13, 8, 4, 4, 'human-female', '#B7FFE4', [
  mkArrow([[0, 0], [0, 5], [3, 5]], 'down'),
  mkArrow([[1, 0], [1, 4]], 'right', true),
  mkArrow([[0, 6], [4, 6]], 'down', true),
  mkArrow([[7, 7], [7, 5]], 'left'),
  mkArrow([[6, 1], [4, 1]], 'up'),
  mkArrow([[5, 3], [5, 6]], 'right', true),
]);

const LV14 = lv(14, 8, 4, 4, 'human-female', '#B7FFE4', [
  mkArrow([[0, 5], [2, 5]], 'down', true),
  mkArrow([[0, 0], [0, 3], [2, 3]], 'right'),
  mkArrow([[7, 2], [4, 2]], 'up'),
  mkArrow([[2, 7], [5, 7]], 'down'),
  mkArrow([[6, 5], [6, 3]], 'left', true),
  mkArrow([[3, 4], [3, 6]], 'right'),
]);

const LV15 = lv(15, 8, 4, 4, 'snake', '#B7D4FF', [
  mkArrow([[0, 2], [2, 2]], 'down', true),
  mkArrow([[1, 0], [1, 1]], 'right'),
  mkArrow([[7, 1], [4, 1]], 'up'),
  mkArrow([[0, 7], [3, 7]], 'down', true),
  mkArrow([[7, 7], [4, 7]], 'up'),
  mkArrow([[7, 5], [7, 3]], 'left'),
  mkArrow([[2, 3], [2, 5]], 'right', true),
]);

const LV16 = lv(16, 8, 4, 4, 'snake', '#B7D4FF', [
  mkArrow([[0, 0], [0, 5], [3, 5]], 'down'),
  mkArrow([[2, 0], [2, 4]], 'right', true),
  mkArrow([[6, 2], [3, 2]], 'up'),
  mkArrow([[0, 6], [4, 6]], 'down', true),
  mkArrow([[0, 7], [2, 7]], 'down'),
  mkArrow([[7, 6], [5, 6]], 'up'),
  mkArrow([[7, 3], [7, 1]], 'left', true),
]);

const LV17 = lv(17, 8, 4, 4, 'butterfly', '#E0B7FF', [
  mkArrow([[1, 7], [3, 7]], 'down', true),
  mkArrow([[0, 0], [0, 6], [3, 6]], 'right'),
  mkArrow([[7, 6], [5, 6]], 'up'),
  mkArrow([[5, 5], [5, 3]], 'left', true),
  mkArrow([[7, 0], [7, 3]], 'right'),
]);

const LV18 = lv(18, 8, 4, 4, 'butterfly', '#E0B7FF', [
  mkArrow([[0, 5], [1, 5]], 'down', true),
  mkArrow([[1, 0], [1, 4]], 'right'),
  mkArrow([[6, 1], [3, 1]], 'up'),
  mkArrow([[5, 7], [5, 5]], 'left', true),
  mkArrow([[0, 7], [3, 7]], 'down'),
  mkArrow([[7, 7], [4, 7]], 'up'),
]);

const LV19 = lv(19, 8, 4, 4, 'horse-variant', '#B7FFF0', [
  mkArrow([[0, 6], [1, 6]], 'down', true),
  mkArrow([[4, 0], [1, 0], [1, 5]], 'right'),
  mkArrow([[7, 1], [5, 1]], 'up'),
  mkArrow([[5, 7], [5, 6]], 'left'),
  mkArrow([[3, 5], [3, 7]], 'right', true),
  mkArrow([[7, 4], [7, 2]], 'left'),
  mkArrow([[7, 5], [5, 5]], 'up', true),
]);

const LV20 = lv(20, 8, 4, 4, 'horse-variant', '#B7FFF0', [
  mkArrow([[0, 5], [3, 5]], 'down', true),
  mkArrow([[0, 0], [3, 0], [3, 4]], 'right'),
  mkArrow([[7, 0], [4, 0]], 'up'),
  mkArrow([[0, 6], [4, 6]], 'down', true),
  mkArrow([[5, 5], [5, 3]], 'left'),
  mkArrow([[1, 7], [4, 7]], 'down', true),
  mkArrow([[2, 1], [2, 4]], 'right'),
  mkArrow([[7, 6], [5, 6]], 'up', true),
]);

// ══════════════════════════════════════════════════════
// PROCEDURAL LEVELS 21–100
// ══════════════════════════════════════════════════════
function generateLevels(from: number, to: number, gs: number, mr: number, mc: number): Level[] {
  const chars = ['crystal-ball', 'shimmer', 'sword-cross', 'shield-star', 'crown', 'star-face'];
  const charColors = ['#FFE4B7', '#B7FFF0', '#FFD700', '#E8E8FF', '#FFB7E8', '#B7D4FF'];

  return Array.from({ length: to - from + 1 }, (_, k) => {
    const id = from + k;
    const ci = k % chars.length;
    const tpl = k % 4;

    let arrows: LevelArrow[];

    if (tpl === 0) {
      arrows = [
        mkArrow([[1, 2], [1, 5]], 'right'),
        mkArrow([[1, 0], [1, 1]], 'right', true),
        mkArrow([[2, gs - 1], [5, gs - 1]], 'down'),
        mkArrow([[0, gs - 1], [1, gs - 1]], 'down', true),
      ];
    } else if (tpl === 1) {
      arrows = [
        mkArrow([[gs - 3, 3], [1, 3]], 'up'),
        mkArrow([[1, 0], [1, 2]], 'right', true),
        mkArrow([[3, gs - 1], [3, gs - 3]], 'left'),
        mkArrow([[0, gs - 2], [2, gs - 2]], 'down', true),
      ];
    } else if (tpl === 2) {
      arrows = [
        mkArrow([[0, 0], [3, 0], [3, 3]], 'right'),
        mkArrow([[3, 4], [3, 5]], 'right', true),
        mkArrow([[gs - 1, 1], [gs - 3, 1]], 'up'),
        mkArrow([[0, 5], [2, 5]], 'down', true),
      ];
    } else {
      arrows = [
        mkArrow([[3, 0], [1, 0], [1, 3]], 'right', true),
        mkArrow([[0, 5], [1, 5]], 'down'),
        mkArrow([[gs - 1, 4], [gs - 1, 6]], 'right'),
        mkArrow([[gs - 2, gs - 1], [gs - 2, gs - 3]], 'left', true),
      ];
    }

    return {
      id,
      gridSize: gs,
      mascotRow: mr,
      mascotCol: mc,
      character: chars[ci],
      characterColor: charColors[ci],
      arrows,
    };
  });
}

export const LEVELS: Level[] = [
  LV1, LV2, LV3, LV4, LV5, LV6, LV7, LV8, LV9, LV10,
  LV11, LV12, LV13, LV14, LV15, LV16, LV17, LV18, LV19, LV20,
  ...generateLevels(21, 60, 8, 4, 4),
  ...generateLevels(61, 100, 9, 4, 4),
];
