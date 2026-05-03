# Rescue Arrows 🏹

A 100-level mobile puzzle game built with **Expo / React Native**. Slide thick line-art arrows along snake-like paths to clear the grid and rescue the bunny mascot. Clean cream visual style, smooth SVG animations, haptic feedback, and a full ad-monetization layer.

> **Live preview (web):** `pnpm --filter @workspace/rescue-arrows run dev` → opens Metro / Expo dev server.

---

## ✨ Features

- **100 hand-crafted levels** across three grid sizes (7×7, 8×8, 9×9)
- **Snake-style arrow movement** — head leads, body follows around corners, tail shrinks as it exits
- **SVG-rendered arrows** with rounded joins/caps and a separate arrowhead polygon flush against the body
- **Persistent progress** stored via `AsyncStorage` (`@rescue_arrows_progress_v3`)
- **Hint system** with rewarded-video flow (AdMob)
- **Anchored adaptive banner ad** at the bottom
- **Haptics** on level-complete and arrow exit
- **Web preview support** for rapid iteration in the Replit canvas

---

## 🧱 Tech Stack

| Layer       | Tech                                            |
| ----------- | ----------------------------------------------- |
| Framework   | Expo SDK 54, React Native 0.81.5, expo-router 6 |
| Language    | TypeScript (strict)                             |
| Rendering   | `react-native-svg` 15                           |
| Animation   | `react-native-reanimated` 4 + Animated API      |
| State       | React Context (`GameContext`)                   |
| Storage     | `@react-native-async-storage/async-storage`     |
| Haptics     | `expo-haptics`                                  |
| Monorepo    | pnpm workspaces                                 |

---

## 📁 Project Layout

```
artifacts/rescue-arrows/
├── app/                    # expo-router routes
│   ├── _layout.tsx         # root layout, font loading
│   └── index.tsx           # main game screen
├── components/
│   ├── PathArrow.tsx       # snake-animated SVG arrow
│   ├── MascotCell.tsx      # bunny mascot
│   ├── LevelCompleteOverlay.tsx
│   ├── HintModal.tsx       # rewarded-video popup
│   └── AdBanner.tsx        # anchored adaptive banner
├── context/
│   └── GameContext.tsx     # game state, level progression, hints
├── data/
│   └── levels.ts           # all 100 levels (path + bodyLen per arrow)
├── lib/
│   ├── adService.ts        # ad abstraction (mock now → real AdMob in EAS)
│   └── adSlots.ts          # AdMob unit IDs (test IDs by default)
├── assets/images/          # icon + splash
├── app.json                # Expo config
└── eas.json                # EAS build profiles (APK + AAB)
```

---

## 🚀 Run Locally

```bash
# From repo root
pnpm install
pnpm --filter @workspace/rescue-arrows run dev
```

Then either:
- Press **`w`** to open the web preview, or
- Scan the QR code with **Expo Go** on Android / iOS

---

## 📱 Building APK & AAB (Production)

The Replit dev environment cannot produce native binaries (no Android SDK / Xcode). Builds are produced via **EAS Build** in the cloud.

### 1. One-time setup

```bash
# Install the EAS CLI globally
npm install -g eas-cli

# Login to your Expo account (free at expo.dev)
eas login

# Inside the app directory
cd artifacts/rescue-arrows

# Link this project to your Expo account (creates the projectId in app.json → extra.eas.projectId)
eas init
```

### 2. Build an APK (for sideloading / testing)

```bash
cd artifacts/rescue-arrows
eas build --platform android --profile preview
```

- Output: a downloadable `.apk` file (link shown in terminal + on https://expo.dev)
- Use this to install directly on Android devices via "Install unknown apps"

### 3. Build an AAB (for Google Play Store)

```bash
cd artifacts/rescue-arrows
eas build --platform android --profile production
```

- Output: a `.aab` (Android App Bundle) — required format for Play Store uploads
- `eas.json` is configured with `autoIncrement: true` so each build bumps `versionCode`

### 4. Build for iOS (optional)

```bash
eas build --platform ios --profile production
```

- Requires an Apple Developer account ($99/year)
- EAS will guide you through certificate / provisioning profile setup

### 5. Submit to stores (optional)

```bash
eas submit -p android --latest
eas submit -p ios --latest
```

---

## 💰 AdMob — From Test IDs to Production

The game currently uses **Google's public test ad unit IDs** so you can develop safely without risking your AdMob account. The integration code lives in:

- `lib/adService.ts` — abstraction layer (currently simulates ads in dev)
- `lib/adSlots.ts` — unit IDs (rewarded + banner) and AdMob app IDs
- `components/HintModal.tsx` — rewarded-video flow UI
- `components/AdBanner.tsx` — anchored adaptive banner UI

### Switching to real AdMob (required for any real build)

1. **Install the native module:**
   ```bash
   cd artifacts/rescue-arrows
   pnpm add react-native-google-mobile-ads
   ```
   > ⚠️ This package is **native-only** and breaks Metro in the Replit web preview. After installing, you can no longer run `pnpm dev` here — you must run it locally or use EAS dev-builds.

2. **Add the plugin to `app.json`** under `"plugins"`:
   ```json
   [
     "react-native-google-mobile-ads",
     {
       "androidAppId": "ca-app-pub-XXXXXXXXXXXXXXXX~XXXXXXXXXX",
       "iosAppId": "ca-app-pub-XXXXXXXXXXXXXXXX~XXXXXXXXXX"
     }
   ]
   ```

3. **Replace test IDs in `lib/adSlots.ts`** with your real rewarded + banner unit IDs from your AdMob account.

4. **Swap the mock implementation in `lib/adService.ts`** with the real SDK calls. The exact swap-in code is documented as a comment block at the top of that file.

5. **Initialize AdMob once** in `app/_layout.tsx`:
   ```ts
   import mobileAds from 'react-native-google-mobile-ads';
   mobileAds().initialize();
   ```

6. **Replace the placeholder in `components/AdBanner.tsx`** with the real `<BannerAd>`:
   ```tsx
   import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
   <BannerAd unitId={AD_UNIT_IDS.BANNER} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} />
   ```

7. **Build via EAS** (`eas build`) — the native module will be compiled into your APK/AAB.

---

## 🎮 Game Mechanics

Each arrow has:
- A **path** (sequence of grid cells it will travel along)
- A **bodyLen** (how long the snake body is on the grid)
- A `tailIdx` and `headIdx` that advance one cell at a time

When tapped, an arrow slides forward along its path, head leading and tail catching up. When the head reaches the mascot's row/column, that arrow exits the grid and the tail shrinks until empty.

A level is complete when **all arrows have exited** without any arrow being blocked by another. Tap the **Hint** button to watch a short ad and get a glowing indicator on the next correct arrow.

---

## 🛠 Useful Commands

```bash
pnpm --filter @workspace/rescue-arrows run dev          # start Expo
pnpm --filter @workspace/rescue-arrows run typecheck    # TS check
pnpm run typecheck                                      # check entire monorepo

# EAS
eas build --platform android --profile preview          # APK
eas build --platform android --profile production       # AAB
eas build --platform ios --profile production           # iOS
eas build --list                                        # see past builds
```

---

## 📝 License

MIT — do whatever you want, attribution appreciated.
