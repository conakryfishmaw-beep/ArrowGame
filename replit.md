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
| `artifacts/rescue-arrows/data/characters.ts` | 7 character definitions (pets=blue glow, family=gold glow) |
| `artifacts/rescue-arrows/context/GameContext.tsx` | Game state, `slideArrow`, `removeExitedArrow`, hint, `mascotHitTimestamp` |
| `artifacts/rescue-arrows/components/PathArrow.tsx` | SVG arrow component, FLIP animation, exit slide |
| `artifacts/rescue-arrows/components/MascotCell.tsx` | Family/pet photo in circular frame, breathing/shake/celebrate |
| `artifacts/rescue-arrows/components/LevelCompleteOverlay.tsx` | Win card + character rescue message + confetti |
| `artifacts/rescue-arrows/components/HintModal.tsx` | Watch-ad-for-hint UX with progress bar |
| `artifacts/rescue-arrows/components/AdBanner.tsx` | 50dp anchored banner placeholder |
| `artifacts/rescue-arrows/app/index.tsx` | Main game screen |
| `artifacts/rescue-arrows/app/album.tsx` | Family Album — 3-col grid, locked/unlocked characters |
| `artifacts/rescue-arrows/lib/characterImages.ts` | Platform-aware image source (base64 on web, require on native) |
| `artifacts/rescue-arrows/lib/characterImageData.ts` | Base64 JPEG data URIs for all 7 characters (~92KB) |
| `artifacts/rescue-arrows/lib/adService.ts` | Mock rewarded ad abstraction |
| `artifacts/rescue-arrows/assets/images/characters/` | 7 character PNG files (400×400, background-removed) |
| `artifacts/rescue-arrows/constants/colors.ts` | Color tokens (cream palette) |

### Character System

- 7 characters: puppy1, cat, puppy2 (pets, blue glow #5DADE2), sister, boy_cat, boy_batman, boy_cool (family, gold glow #F4D03F)
- Characters cycle through levels: level N → CHARACTERS[(N-1) % 7]
- Unlocked when player completes that character's first level
- Rescue messages in Turkish; shown on LevelCompleteOverlay
- Family Album button in header (image-multiple-outline icon)

### Web Notes

- `useNativeDriver: ND` — `ND = Platform.OS !== 'web'`; native driver unavailable on web, falls back to JS
- `pointerEvents` on Animated.View must be in `style` (not a prop) on web
- Fonts: `@expo-google-fonts/inter` loaded via `useFonts`; layout renders immediately without blocking on font load
- **Image loading on web**: Expo picard proxy doesn't serve public/ static files reliably to the browser. Solution: embed images as base64 JPEG data URIs in `lib/characterImageData.ts`. On native, use `require()` as normal.
- Character images: 400×400 PNG (assets), converted to 300×300 JPEG q75 for web (~6–14KB each, ~92KB total base64)
