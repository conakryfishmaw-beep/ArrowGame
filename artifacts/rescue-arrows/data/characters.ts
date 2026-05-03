import { CHARACTER_IMAGES } from '@/lib/characterImages';

export type CharacterType = 'pet' | 'family';

export interface Character {
  id: string;
  name: string;
  type: CharacterType;
  image: number | { uri: string };
  glowColor: string;
  rescueMessages: string[];
  dangerEmoji: string;
}

export const CHARACTERS: Character[] = [
  {
    id: 'puppy1',
    name: 'Minik Köpek',
    type: 'pet',
    image: CHARACTER_IMAGES.puppy1,
    glowColor: '#5DADE2',
    rescueMessages: ['Hav! Kahramanım!', 'Woof! Teşekkürler!', 'En iyi arkadaşımsın!'],
    dangerEmoji: '😨',
  },
  {
    id: 'cat',
    name: 'Tekir Kedi',
    type: 'pet',
    image: CHARACTER_IMAGES.cat,
    glowColor: '#5DADE2',
    rescueMessages: ['Miyav! Teşekkürler!', 'Purrr... Harikasın!', 'Miyav! Kahramanım!'],
    dangerEmoji: '😾',
  },
  {
    id: 'puppy2',
    name: 'Tüylü Köpek',
    type: 'pet',
    image: CHARACTER_IMAGES.puppy2,
    glowColor: '#5DADE2',
    rescueMessages: ['Hav! Kahramanım!', 'En iyi insan sensin!', 'Woof! Teşekkürler!'],
    dangerEmoji: '🐶',
  },
  {
    id: 'sister',
    name: 'Abla',
    type: 'family',
    image: CHARACTER_IMAGES.sister,
    glowColor: '#F4D03F',
    rescueMessages: ['Harikasın!', 'Beni kurtardın!', 'Seni seviyorum!', 'Süpersin!'],
    dangerEmoji: '😱',
  },
  {
    id: 'boy_cat',
    name: 'Küçük Kardeş',
    type: 'family',
    image: CHARACTER_IMAGES.boy_cat,
    glowColor: '#F4D03F',
    rescueMessages: ['Harikasın!', 'Beni kurtardın!', 'Teşekkürler!'],
    dangerEmoji: '😮',
  },
  {
    id: 'boy_batman',
    name: 'Batman Kardeş',
    type: 'family',
    image: CHARACTER_IMAGES.boy_batman,
    glowColor: '#F4D03F',
    rescueMessages: ['Beni kurtardın!', 'Sen de benim kahramanımsın!', 'Harikasın!'],
    dangerEmoji: '😨',
  },
  {
    id: 'boy_cool',
    name: 'Havalı Kardeş',
    type: 'family',
    image: CHARACTER_IMAGES.boy_cool,
    glowColor: '#F4D03F',
    rescueMessages: ['Süpersin!', 'Kahramanımsın!', 'Beni kurtardın!'],
    dangerEmoji: '😅',
  },
];

export function getCharacterForLevel(levelNum: number): Character {
  return CHARACTERS[(levelNum - 1) % CHARACTERS.length];
}

// Character index i is first encountered at level (i+1).
// Returns indices of all characters the player has already met.
export function getUnlockedIndices(highestUnlocked: number): number[] {
  return CHARACTERS.map((_, i) => i).filter(i => highestUnlocked > i);
}
