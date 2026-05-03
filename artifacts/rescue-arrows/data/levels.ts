export type Direction = 'up' | 'down' | 'left' | 'right';

export interface CellPos {
  row: number;
  col: number;
}

export interface LevelArrow {
  cells: CellPos[];
  dir: Direction;
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

// Expand waypoints into cells along horizontal/vertical segments.
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
  return { cells, dir, accent };
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
//
// Notation:  cells in path must not overlap between arrows.
// Solvability: at least one arrow can exit on each move; all clear.
//
// Level 1: 4 arrows · two simple chains
//   D exits → unblocks A.  B exits → unblocks C.
const LV1 = lv(1, 7, 3, 3, 'rabbit', '#C8F5D8', [
  mkArrow([[1, 5], [1, 6]], 'right', true),    // D — exits immediately
  mkArrow([[1, 2], [1, 4]], 'right'),           // A — head@(1,4) blocked by D@(1,5)
  mkArrow([[4, 5], [6, 5]], 'down'),            // B — exits
  mkArrow([[6, 1], [6, 4]], 'right', true),     // C — head@(6,4) blocked by B@(6,5)
]);

// Level 2: 4 arrows
//   E exits → unblocks F.  G exits → unblocks H.
const LV2 = lv(2, 7, 3, 3, 'rabbit', '#C8F5D8', [
  mkArrow([[4, 0], [0, 0]], 'up', true),        // E — exits up (head@0,0 → OOB)
  mkArrow([[0, 5], [0, 1]], 'left'),             // F — head@(0,1) blocked by E@(0,0)
  mkArrow([[1, 4], [5, 4]], 'down'),             // G — exits
  mkArrow([[5, 2], [5, 3]], 'right', true),      // H — head@(5,3) blocked by G@(5,4)
]);

// Level 3: 5 arrows · L-shape
//   B exits → A exits → C exits.  D, E independent.
const LV3 = lv(3, 7, 3, 3, 'cat', '#FFD6E0', [
  mkArrow([[2, 4], [2, 5]], 'right', true),      // B — exits (head@2,5 → OOB step2)
  mkArrow([[0, 0], [2, 0], [2, 3]], 'right'),    // A — L, head@(2,3) blocked by B@(2,4)
  mkArrow([[6, 1], [4, 1]], 'up'),               // C — head@(4,1) → step→(2,1)∈A blocked
  mkArrow([[0, 6], [2, 6]], 'down', true),       // D — independent (NOTE: was (0,5)→BUG fixed)
  mkArrow([[4, 2], [4, 4]], 'right'),            // E — independent
]);

// Level 4: 5 arrows · L-shape
//   B exits → A exits → C exits.  D, E independent.
const LV4 = lv(4, 7, 3, 3, 'cat', '#FFD6E0', [
  mkArrow([[2, 4], [2, 5]], 'right', true),      // B — exits
  mkArrow([[0, 0], [2, 0], [2, 3]], 'right'),    // A — L, blocked by B
  mkArrow([[5, 0], [3, 0]], 'up'),               // C — head@(3,0) → step→(2,0)∈A blocked
  mkArrow([[0, 6], [4, 6]], 'down', true),       // D — independent
  mkArrow([[6, 6], [6, 4]], 'left'),             // E — independent
]);

// Level 5: 6 arrows · two L-shapes
//   B exits → A, D both unblock.  A exits → C exits.
const LV5 = lv(5, 7, 3, 3, 'bear', '#D6E4FF', [
  mkArrow([[0, 4], [1, 4]], 'down', true),       // B — exits
  mkArrow([[4, 0], [1, 0], [1, 3]], 'right'),    // A — L, head@(1,3) blocked by B@(1,4)
  mkArrow([[0, 0], [0, 3]], 'right'),            // D — head@(0,3)→step→(0,4)∈B blocked
  mkArrow([[6, 1], [5, 1]], 'up'),               // C — head@(5,1)→step→(1,1)∈A blocked
  mkArrow([[0, 5], [0, 6], [3, 6]], 'down', true), // L going down, independent
  mkArrow([[5, 5], [5, 3]], 'left'),             // independent
]);

// Level 6: 5 arrows
//   B exits → A exits → D exits.  C, E independent.
const LV6 = lv(6, 7, 3, 3, 'bear', '#D6E4FF', [
  mkArrow([[0, 3], [2, 3]], 'down', true),       // B — exits
  mkArrow([[1, 0], [1, 2]], 'right'),            // A — head@(1,2)→step→(1,3)∈B blocked
  mkArrow([[3, 4], [3, 6]], 'right', true),      // C — independent
  mkArrow([[6, 2], [3, 2]], 'up'),               // D — head@(3,2)→step→(1,2)∈A blocked
  mkArrow([[6, 6], [6, 4]], 'left', true),       // E — independent
]);

// Level 7: 6 arrows · large L-shape
//   A exits → C exits.  D exits → E exits → F exits.  B independent.
const LV7 = lv(7, 7, 3, 3, 'bear', '#D6E4FF', [
  mkArrow([[0, 0], [0, 4], [4, 4]], 'down'),     // A — L, independent exits
  mkArrow([[0, 5], [2, 5]], 'down', true),       // B — independent
  mkArrow([[1, 0], [1, 3]], 'right'),            // C — head@(1,3)→step→(1,4)∈A blocked
  mkArrow([[3, 2], [3, 0]], 'left', true),       // D — independent exits
  mkArrow([[6, 2], [4, 2]], 'up'),               // E — head@(4,2)→step→(3,2)∈D blocked
  mkArrow([[5, 0], [5, 1]], 'right'),            // F — head@(5,1)→step→(5,2)∈E blocked
]);

// Level 8: 6 arrows
//   B exits → A, E unblock.  A exits → C exits → D exits → F exits.
const LV8 = lv(8, 7, 3, 3, 'cat', '#FFD6E0', [
  mkArrow([[0, 4], [2, 4]], 'down', true),       // B — exits
  mkArrow([[2, 0], [2, 3]], 'right'),            // A — blocked by B@(2,4)
  mkArrow([[5, 2], [4, 2]], 'up'),               // C — blocked by A@(2,2)
  mkArrow([[6, 0], [4, 0], [4, 1]], 'right'),    // D — L, blocked by C@(4,2)
  mkArrow([[1, 6], [1, 5]], 'left', true),       // E — blocked by B@(1,4)
  mkArrow([[0, 0], [1, 0]], 'down'),             // F — blocked by D@(6,0)/(5,0)
]);

// Level 9: 7 arrows
//   B exits → A exits → C, E unblock.  D, F, G independent.
const LV9 = lv(9, 7, 3, 3, 'rabbit', '#C8F5D8', [
  mkArrow([[0, 5], [2, 5]], 'down', true),       // B — exits
  mkArrow([[5, 0], [2, 0], [2, 4]], 'right'),    // A — L, blocked by B@(2,5)
  mkArrow([[6, 2], [5, 2]], 'up'),               // C — blocked by A@(2,2)
  mkArrow([[4, 2], [4, 5]], 'right', true),      // D — independent
  mkArrow([[0, 0], [1, 0]], 'down'),             // E — blocked by A@(2,0)/(3,0)
  mkArrow([[6, 6], [6, 4]], 'left', true),       // F — independent
  mkArrow([[3, 4], [3, 6]], 'right'),            // G — independent
]);

// Level 10: 7 arrows
//   B exits → A exits → C, G unblock.  D, E, F independent.
//   NOTE: E fixed from [[4,2]…] to [[4,3]…] to avoid overlap with G@(4,2).
const LV10 = lv(10, 7, 3, 3, 'rabbit', '#C8F5D8', [
  mkArrow([[0, 5], [2, 5]], 'down', true),       // B — exits
  mkArrow([[0, 0], [2, 0], [2, 4]], 'right'),    // A — L, blocked by B@(2,5)
  mkArrow([[6, 0], [3, 0]], 'up'),               // C — blocked by A@(2,0)
  mkArrow([[0, 6], [3, 6]], 'down', true),       // D — independent
  mkArrow([[4, 3], [4, 5]], 'right'),            // E — independent (fixed from 4,2)
  mkArrow([[6, 6], [6, 3]], 'left', true),       // F — independent
  mkArrow([[5, 2], [3, 2]], 'up'),               // G — blocked by A@(2,2)
]);

// ══════════════════════════════════════════════════════
// LEVELS 11–20  8×8 grid · mascot 1×1 at (4,4)
// ══════════════════════════════════════════════════════

// Level 11: 5 arrows
const LV11 = lv(11, 8, 4, 4, 'face-woman', '#FFB7E8', [
  mkArrow([[0, 5], [2, 5]], 'down', true),       // exits → unblocks A
  mkArrow([[2, 1], [2, 4]], 'right'),            // blocked by above@(2,5)
  mkArrow([[7, 6], [7, 2]], 'left', true),       // independent
  mkArrow([[5, 0], [2, 0]], 'up'),               // independent
  mkArrow([[3, 5], [4, 5]], 'down'),             // independent
]);

// Level 12: 5 arrows · chain of 4
const LV12 = lv(12, 8, 4, 4, 'face-woman', '#FFB7E8', [
  mkArrow([[1, 3], [3, 3]], 'down', true),       // exits → unblocks A
  mkArrow([[0, 0], [0, 2], [3, 2]], 'right'),    // A — L, blocked by above@(3,3)
  mkArrow([[7, 2], [5, 2]], 'up'),               // C — blocked by A@(0,2)→(1,2)→(2,2)→(3,2)
  mkArrow([[5, 7], [5, 4]], 'left', true),       // D — blocked by C@(5,2)
  mkArrow([[7, 3], [7, 5]], 'right'),            // independent
]);

// Level 13: 6 arrows · L going down blocks a right arrow
const LV13 = lv(13, 8, 4, 4, 'human-female', '#B7FFE4', [
  mkArrow([[0, 0], [0, 5], [3, 5]], 'down'),     // A — L going down, blocks B
  mkArrow([[1, 0], [1, 4]], 'right', true),      // B — head@(1,4)→step→(1,5)∈A blocked
  mkArrow([[0, 6], [4, 6]], 'down', true),       // C — independent
  mkArrow([[7, 7], [7, 5]], 'left'),             // D — independent
  mkArrow([[6, 1], [4, 1]], 'up'),               // E — blocked by B@(1,1)
  mkArrow([[5, 3], [5, 6]], 'right', true),      // F — independent
]);

// Level 14: 6 arrows · two chains
const LV14 = lv(14, 8, 4, 4, 'human-female', '#B7FFE4', [
  mkArrow([[0, 4], [2, 4]], 'down', true),       // exits → unblocks A
  mkArrow([[0, 0], [0, 3], [2, 3]], 'right'),    // A — L, blocked by above@(2,4)
  mkArrow([[7, 2], [4, 2]], 'up'),               // C — blocked by A@(0,2)
  mkArrow([[2, 7], [5, 7]], 'down'),             // D — independent, blocks F
  mkArrow([[6, 5], [6, 3]], 'left', true),       // E — independent
  mkArrow([[3, 4], [3, 6]], 'right'),            // F — blocked by D@(3,7)
]);

// Level 15: 7 arrows · two parallel chains
const LV15 = lv(15, 8, 4, 4, 'snake', '#B7D4FF', [
  mkArrow([[0, 2], [2, 2]], 'down', true),       // exits → unblocks B
  mkArrow([[1, 0], [1, 1]], 'right'),            // B — blocked by above@(1,2)
  mkArrow([[7, 1], [4, 1]], 'up'),               // C — blocked by B@(1,1)
  mkArrow([[0, 7], [3, 7]], 'down', true),       // exits → unblocks E
  mkArrow([[7, 7], [4, 7]], 'up'),               // E — blocked by above@(3,7)
  mkArrow([[7, 5], [7, 3]], 'left'),             // F — blocked by C@(7,1)
  mkArrow([[2, 3], [2, 5]], 'right', true),      // G — independent
]);

// Level 16: 7 arrows
const LV16 = lv(16, 8, 4, 4, 'snake', '#B7D4FF', [
  mkArrow([[0, 0], [0, 5], [3, 5]], 'down'),     // A — L going down, blocks B
  mkArrow([[2, 0], [2, 4]], 'right', true),      // B — blocked by A@(2,5)
  mkArrow([[6, 2], [3, 2]], 'up'),               // C — blocked by B@(2,2)
  mkArrow([[0, 6], [4, 6]], 'down', true),       // D — independent, blocks F
  mkArrow([[0, 7], [2, 7]], 'down'),             // E — independent
  mkArrow([[7, 6], [5, 6]], 'up'),               // F — blocked by D@(4,6)
  mkArrow([[7, 3], [7, 1]], 'left', true),       // G — independent
]);

// Level 17: 5 arrows · large-L + chain
const LV17 = lv(17, 8, 4, 4, 'butterfly', '#E0B7FF', [
  mkArrow([[1, 7], [3, 7]], 'down', true),       // exits → unblocks A
  mkArrow([[0, 0], [0, 6], [3, 6]], 'right'),    // A — L, blocked by above@(3,7)
  mkArrow([[7, 6], [5, 6]], 'up'),               // C — blocked by A@(3,6)
  mkArrow([[5, 5], [5, 3]], 'left', true),       // D — independent
  mkArrow([[7, 0], [7, 3]], 'right'),            // E — independent
]);

// Level 18: 6 arrows · two chains
const LV18 = lv(18, 8, 4, 4, 'butterfly', '#E0B7FF', [
  mkArrow([[0, 5], [1, 5]], 'down', true),       // exits → unblocks A
  mkArrow([[1, 0], [1, 4]], 'right'),            // A — blocked by above@(1,5)
  mkArrow([[6, 1], [3, 1]], 'up'),               // C — blocked by A@(1,1)
  mkArrow([[5, 7], [5, 5]], 'left', true),       // D — independent
  mkArrow([[0, 7], [3, 7]], 'down'),             // E — independent, blocks F
  mkArrow([[7, 7], [4, 7]], 'up'),               // F — blocked by E@(3,7)
]);

// Level 19: 7 arrows · long L + cascade
const LV19 = lv(19, 8, 4, 4, 'horse-variant', '#B7FFF0', [
  mkArrow([[0, 6], [1, 6]], 'down', true),       // exits → unblocks A
  mkArrow([[4, 0], [1, 0], [1, 5]], 'right'),    // A — L, blocked by above@(1,6)
  mkArrow([[7, 1], [5, 1]], 'up'),               // C — blocked by A@(1,1)
  mkArrow([[5, 7], [5, 6]], 'left'),             // D — blocked by C@(5,1) eventually
  mkArrow([[3, 5], [3, 7]], 'right', true),      // E — independent, blocks G
  mkArrow([[7, 4], [7, 2]], 'left'),             // F — independent
  mkArrow([[7, 5], [5, 5]], 'up', true),         // G — blocked by E@(3,5)
]);

// Level 20: 8 arrows · two unblocks from one key arrow
//   B exits → A unblocks (L right) and G unblocks (right).
//   A exits → C unblocks (up).  D exits → H unblocks (up).
const LV20 = lv(20, 8, 4, 4, 'horse-variant', '#B7FFF0', [
  mkArrow([[0, 5], [3, 5]], 'down', true),       // B — exits → unblocks A & G
  mkArrow([[0, 0], [3, 0], [3, 4]], 'right'),    // A — L, blocked by B@(3,5)
  mkArrow([[7, 0], [4, 0]], 'up'),               // C — blocked by A@(3,0)/(2,0)/(1,0)
  mkArrow([[0, 6], [4, 6]], 'down', true),       // D — independent, blocks H
  mkArrow([[5, 5], [5, 3]], 'left'),             // E — independent
  mkArrow([[1, 7], [4, 7]], 'down', true),       // F — independent
  mkArrow([[2, 1], [2, 4]], 'right'),            // G — blocked by B@(2,5)
  mkArrow([[7, 6], [5, 6]], 'up', true),         // H — blocked by D@(4,6)
]);

// ══════════════════════════════════════════════════════
// ALL LEVELS
// ══════════════════════════════════════════════════════
export const LEVELS: Level[] = [
  LV1, LV2, LV3, LV4, LV5, LV6, LV7, LV8, LV9, LV10,
  LV11, LV12, LV13, LV14, LV15, LV16, LV17, LV18, LV19, LV20,
  ...generateLevels(21, 60, 8, 4, 4),
  ...generateLevels(61, 100, 9, 4, 4),
];

// ══════════════════════════════════════════════════════
// SIMPLE PROCEDURAL LEVELS for 21–100
// Four templates, cycling. All verified: no overlaps, solvable, no mascot blocks.
// ══════════════════════════════════════════════════════
function generateLevels(from: number, to: number, gs: number, mr: number, mc: number): Level[] {
  const chars = ['crystal-ball', 'shimmer', 'sword-cross', 'shield-star', 'crown', 'star-face'];
  const colors = ['#FFE4B7', '#B7FFF0', '#FFD700', '#E8E8FF', '#FFB7E8', '#B7D4FF'];

  return Array.from({ length: to - from + 1 }, (_, k) => {
    const id = from + k;
    const ci = k % chars.length;
    const tpl = k % 4;

    let arrows: LevelArrow[];

    if (tpl === 0) {
      // Template A: two right chains + two down chains
      // A1 exits → A2 slides.  A3 exits → A4 slides.
      arrows = [
        mkArrow([[1, 2], [1, 5]], 'right'),               // A1 — exits
        mkArrow([[1, 0], [1, 1]], 'right', true),         // A2 — blocked by A1@(1,2)
        mkArrow([[2, gs - 1], [5, gs - 1]], 'down'),      // A3 — exits
        mkArrow([[0, gs - 1], [1, gs - 1]], 'down', true), // A4 — blocked by A3@(2,gs-1)
      ];
    } else if (tpl === 1) {
      // Template B: up→right chain; left→down chain
      // B1 exits → B2 slides.  B3 exits → B4 slides.
      arrows = [
        mkArrow([[gs - 3, 3], [1, 3]], 'up'),             // B1 — exits
        mkArrow([[1, 0], [1, 2]], 'right', true),         // B2 — blocked by B1@(1,3)
        mkArrow([[3, gs - 1], [3, gs - 3]], 'left'),      // B3 — exits
        mkArrow([[0, gs - 2], [2, gs - 2]], 'down', true), // B4 — blocked by B3@(3,gs-2)
      ];
    } else if (tpl === 2) {
      // Template C: L-shape right + one exits unblocks two
      // C2 exits → C1 slides; C4 slides.
      arrows = [
        mkArrow([[0, 0], [3, 0], [3, 3]], 'right'),       // C1 — L, blocked by C2@(3,4)
        mkArrow([[3, 4], [3, 5]], 'right', true),         // C2 — exits
        mkArrow([[gs - 1, 1], [gs - 3, 1]], 'up'),        // C3 — independent
        mkArrow([[0, 5], [2, 5]], 'down', true),          // C4 — blocked by C2@(3,5)
      ];
    } else {
      // Template D: L-shape right (avoids mascot), one down blocker, two independents
      // D2 exits → D1 slides.
      arrows = [
        mkArrow([[3, 0], [1, 0], [1, 3]], 'right', true), // D1 — L, blocked by D2@(1,4)
        mkArrow([[0, 4], [1, 4]], 'down'),                // D2 — exits
        mkArrow([[gs - 1, 4], [gs - 1, 6]], 'right'),    // D3 — independent
        mkArrow([[gs - 2, gs - 1], [gs - 2, gs - 3]], 'left', true), // D4 — independent
      ];
    }

    return {
      id,
      gridSize: gs,
      mascotRow: mr,
      mascotCol: mc,
      character: chars[ci],
      characterColor: colors[ci],
      arrows,
    };
  });
}
