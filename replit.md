# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Rescue Arrows (Mobile Game)

Expo/React Native puzzle game — 100 levels, slide arrows to clear the board.

### Design

- **Visual style**: SVG line-art on cream background (`#F8F5F0`)
- **Arrows**: thick black polyline (`#1A1A1A`) + red accent (`#E84855`), arrowhead polygon
- **Grid**: white (`#FFFFFF`) with subtle dot pattern (`#D6D1CA`) at intersections — no grid lines
- **Mascot**: colored circle + MaterialCommunityIcons icon, 1×1 cell, breathing + celebrate animation

### Level Format

```ts
interface LevelArrow { cells: CellPos[]; dir: Direction; accent: boolean; }
interface Level { id, gridSize, mascotRow, mascotCol, character, characterColor, arrows }
```

- Levels 1–10: 7×7 grid, mascot at (3,3)
- Levels 11–20: 8×8 grid, mascot at (4,4)
- Levels 21–60: 8×8, mascot at (4,4) — procedural (4 templates)
- Levels 61–100: 9×9, mascot at (4,4) — procedural (4 templates)

### Movement Logic (`GameContext.tsx`)

- Tap an arrow → all its cells shift as a unit in `dir` until blocked or exits
- Exit = head cell goes out of bounds → exiting animation, then `removeExitedArrow`
- Collision = any new cell overlaps another active arrow or the mascot
- Level complete when all arrows removed

### Key Files

| File | Purpose |
|------|---------|
| `artifacts/rescue-arrows/data/levels.ts` | All 100 level definitions + `mkArrow` helper |
| `artifacts/rescue-arrows/context/GameContext.tsx` | Game state, `slideArrow`, `removeExitedArrow`, hint |
| `artifacts/rescue-arrows/components/PathArrow.tsx` | SVG arrow component, FLIP animation, exit slide |
| `artifacts/rescue-arrows/components/MascotCell.tsx` | Mascot with breathing/celebration animation |
| `artifacts/rescue-arrows/components/LevelCompleteOverlay.tsx` | Win card + confetti |
| `artifacts/rescue-arrows/app/index.tsx` | Main game screen |
| `artifacts/rescue-arrows/constants/colors.ts` | Color tokens (cream palette) |

### Web Notes

- `useNativeDriver: ND` — `ND = Platform.OS !== 'web'`; native driver unavailable on web, falls back to JS
- `pointerEvents` on Animated.View must be in `style` (not a prop) on web
- Fonts: `@expo-google-fonts/inter` loaded via `useFonts`; layout renders immediately without blocking on font load
