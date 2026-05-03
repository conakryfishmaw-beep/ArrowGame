/**
 * AdBanner — anchored adaptive banner at the bottom of the screen.
 *
 * Development / Expo Go / web: renders a styled placeholder so layout is correct.
 * EAS Build with real AdMob: replace the interior with BannerAd from
 *   react-native-google-mobile-ads once installed:
 *
 *   import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
 *   <BannerAd unitId={AD_UNIT_IDS.BANNER} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} />
 */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// Height Google recommends for adaptive banners (~50dp is safe for all phones)
export const BANNER_HEIGHT = 50;

export function AdBanner() {
  return (
    <View style={styles.container}>
      <View style={styles.separator} />
      <View style={styles.banner}>
        <Text style={styles.label}>Advertisement</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  separator: {
    width: '100%',
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#E0DDD8',
  },
  banner: {
    width: '100%',
    height: BANNER_HEIGHT,
    backgroundColor: '#F0EDE8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontFamily: 'Inter_400Regular',
    fontSize: 11,
    color: '#C0BDB8',
    letterSpacing: 1,
  },
});
