import { Platform } from 'react-native';
import { CHARACTER_IMAGE_DATA } from './characterImageData';

// On web: embedded base64 data URIs (bypasses picard proxy static-file issues).
// On native: Metro-bundled require() numbers for proper asset handling.
function img(id: string, nativeRef: number): number | { uri: string } {
  if (Platform.OS === 'web') {
    return { uri: CHARACTER_IMAGE_DATA[id] };
  }
  return nativeRef;
}

export const CHARACTER_IMAGES = {
  puppy1:     img('puppy1',     require('../assets/images/characters/puppy1.png')),
  cat:        img('cat',        require('../assets/images/characters/cat.png')),
  puppy2:     img('puppy2',     require('../assets/images/characters/puppy2.png')),
  sister:     img('sister',     require('../assets/images/characters/sister.png')),
  boy_cat:    img('boy_cat',    require('../assets/images/characters/boy_cat.png')),
  boy_batman: img('boy_batman', require('../assets/images/characters/boy_batman.png')),
  boy_cool:   img('boy_cool',   require('../assets/images/characters/boy_cool.png')),
} as Record<string, number | { uri: string }>;
