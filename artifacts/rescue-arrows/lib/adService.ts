/**
 * Ad Service — abstraction layer over react-native-google-mobile-ads.
 *
 * In development (Expo Go / web): simulates ad loading and playback with a
 * short delay so the full UX flow is testable without a native build.
 *
 * In production (EAS Build): install react-native-google-mobile-ads, then
 * replace the body of `showRewardedAd` with the real SDK calls below.
 *
 * ─── Production swap-in (EAS Build) ────────────────────────────
 *   import mobileAds, { RewardedAd, RewardedAdEventType } from 'react-native-google-mobile-ads';
 *
 *   export async function initAds() {
 *     await mobileAds().initialize();
 *   }
 *
 *   export async function showRewardedAd(unitId: string): Promise<boolean> {
 *     return new Promise(resolve => {
 *       const ad = RewardedAd.createForAdRequest(unitId, { requestNonPersonalizedAdsOnly: true });
 *       let earned = false;
 *       ad.addAdEventListener(RewardedAdEventType.EARNED_REWARD, () => { earned = true; });
 *       ad.addAdEventListener(RewardedAdEventType.CLOSED, () => resolve(earned));
 *       ad.addAdEventListener(RewardedAdEventType.ERROR, () => resolve(false));
 *       ad.load();
 *       // Ad shows automatically once loaded in this flow.
 *     });
 *   }
 * ────────────────────────────────────────────────────────────────
 */

const LOADING_MS = 800;   // "loading ad…" phase
const PLAYING_MS = 5000;  // "ad playing…" phase

export type AdPhase = 'idle' | 'loading' | 'playing' | 'done' | 'skipped';

export interface RewardedAdHandle {
  /** Resolves true if reward was earned, false if skipped/error. */
  promise: Promise<boolean>;
  /** Call this to simulate the user skipping (closes mid-play). */
  skip: () => void;
}

/**
 * Show a rewarded ad and return whether the user earned the reward.
 *
 * `onPhaseChange` fires as the ad moves through loading → playing → done/skipped
 * so the UI can display accurate feedback.
 */
export function createRewardedAd(
  _unitId: string,
  onPhaseChange: (phase: AdPhase) => void,
): RewardedAdHandle {
  let skipped = false;
  let resolveReward!: (earned: boolean) => void;

  const promise = new Promise<boolean>((resolve) => {
    resolveReward = resolve;
  });

  const run = async () => {
    onPhaseChange('loading');
    await delay(LOADING_MS);
    if (skipped) { onPhaseChange('skipped'); resolveReward(false); return; }

    onPhaseChange('playing');
    await delay(PLAYING_MS);
    if (skipped) { onPhaseChange('skipped'); resolveReward(false); return; }

    onPhaseChange('done');
    resolveReward(true);
  };

  run();

  return {
    promise,
    skip: () => { skipped = true; },
  };
}

function delay(ms: number) {
  return new Promise<void>(resolve => setTimeout(resolve, ms));
}
