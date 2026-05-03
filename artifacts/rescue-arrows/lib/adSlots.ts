import { Platform } from 'react-native';

// ─── Ad Unit IDs ────────────────────────────────────────────────
// These are Google's official public test IDs.
// Replace with your real IDs before publishing.
export const AD_UNIT_IDS = {
  REWARDED: Platform.select({
    ios: 'ca-app-pub-3940256099942544/1712485313',
    android: 'ca-app-pub-3940256099942544/5224354917',
    default: 'ca-app-pub-3940256099942544/5224354917',
  }) as string,

  BANNER: Platform.select({
    ios: 'ca-app-pub-3940256099942544/2934735716',
    android: 'ca-app-pub-3940256099942544/6300978111',
    default: 'ca-app-pub-3940256099942544/6300978111',
  }) as string,
};

// AdMob App IDs — add to app.json plugins when building with EAS.
// "plugins": [["react-native-google-mobile-ads", {
//   "androidAppId": ADMOB_APP_IDS.android,
//   "iosAppId": ADMOB_APP_IDS.ios
// }]]
export const ADMOB_APP_IDS = {
  android: 'ca-app-pub-3940256099942544~3347511713',
  ios: 'ca-app-pub-3940256099942544~1458002511',
};
