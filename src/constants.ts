export enum Difficulty {
  Novice = 'Novice',
  Advanced = 'Advanced',
  Expert = 'Expert',
  Master = 'Master',
}

type TotalKeysByDifficulty = {
  [key in Difficulty]: number;
};

export const TOTAL_KEYS_BY_DIFFICULTY: TotalKeysByDifficulty = {
  [Difficulty.Novice]: 4,
  [Difficulty.Advanced]: 6,
  [Difficulty.Expert]: 9,
  [Difficulty.Master]: 12,
};

type TotalLayersByDifficulty = {
  [key in Difficulty]: number;
};

export const TOTAL_LAYERS_BY_DIFFICULTY: TotalLayersByDifficulty = {
  [Difficulty.Novice]: 2,
  [Difficulty.Advanced]: 2,
  [Difficulty.Expert]: 3,
  [Difficulty.Master]: 4,
};

export const MAX_KEYS = TOTAL_KEYS_BY_DIFFICULTY[Difficulty.Master];

// NON-ZERO-INDEXED
export const MAX_PRONGS = 32;

// NON-ZERO-INDEXED
export const KEY_PRONG_CONFIGURATIONS: any[] = [[
  'Simple',
  [1],
  [1, 3],
  [1, 3, 31],
  [1, 5, 29],
  [31, 27, 3, 7],
  [31, 25, 5, 11],
], [
  "2 Prongs",
  [1, 5],
  [1, 7],
  [1, 9],
  [1, 11],
  [1, 13],
  [1, 15],
  [1, 17],
], [
  "1 -> 2 Prongs (2 Spaces)",
  [1, 5, 7],
  [1, 7, 9],
  [1, 9, 11],
  [1, 11, 13],
  [1, 13, 15],
  [1, 15, 17],
  [1, 17, 19],
  [1, 19, 21],
  [1, 21, 23],
  [1, 23, 25],
  [1, 25, 27],
  [1, 27, 29],
], [
  "1 -> 2 Prongs (4 Spaces)",
  [1, 7, 11],
  [1, 9, 13],
  [1, 11, 15],
  [1, 13, 17],
  [1, 15, 19],
  [1, 17, 21],
  [1, 19, 23],
  [1, 21, 25],
  [1, 23, 27],
], [
  "1 -> 2 Prongs (6 Spaces)",
  [1, 9, 15],
  [1, 11, 17],
  [1, 15, 21],
  [1, 19, 25],
  [1, 21, 27],
], [
  "1 -> 3 (2 Spaces)",
  [1, 5, 7, 9],
  [1, 7, 9, 11],
  [1, 9, 11, 13],
  [1, 11, 13, 15],
  [1, 13, 15, 17],
  [1, 15, 17, 19],
  [1, 17, 19, 21],
  [1, 19, 21, 23],
  [1, 21, 23, 25],
  [1, 23, 25, 27],
  [1, 25, 27, 29],
], [
  "1 -> 3 (4 spaces)",
  [1, 9, 13, 17],
  [1, 11, 15, 19],
  [1, 13, 17, 21],
  [1, 15, 19, 23]
], [
  "2 -> 2 Prongs (2 spaces)",
  [1, 3, 7, 9],
  [1, 3, 9, 11],
  [1, 3, 11, 13],
  [1, 3, 13, 15],
  [1, 3, 15, 17],
  [1, 3, 17, 19],
  [1, 3, 19, 21],
  [1, 3, 21, 23],
  [1, 3, 23, 25],
  [1, 3, 25, 27],
  [1, 3, 27, 29],
], [
  "2 -> 2 Prongs (4 spaces)",
  [1, 3, 7, 11],
  [1, 3, 9, 13],
  [1, 3, 11, 15],
  [1, 3, 13, 17],
  [1, 3, 15, 19],
  [1, 3, 17, 21],
  [1, 3, 21, 25],
  [1, 3, 23, 27],
  [1, 3, 25, 29],
], [
  "2 -> 2 Prongs (6 spaces)",
  [1, 3, 7, 13],
  [1, 3, 9, 15],
  [1, 3, 11, 17],
  [1, 3, 13, 19],
  [1, 3, 15, 21],
  [1, 3, 17, 23],
  [1, 3, 19, 25],
  [1, 3, 21, 27],
  [1, 3, 23, 29],
], [
  "2 -> 2 Prongs (8 spaces)",
  [1, 3, 7, 15],
  [1, 3, 9, 17],
  [1, 3, 11, 19],
  [1, 3, 13, 21],
  [1, 3, 15, 23],
  [1, 3, 17, 25],
  [1, 3, 19, 27],
  [1, 3, 21, 29],
], [
  "2 -> 2 Prongs (10 spaces)",
  [1, 3, 7, 17],
  [1, 3, 9, 19],
  [1, 3, 11, 21],
  [1, 3, 13, 23],
  [1, 3, 15, 25],
  [1, 3, 17, 27],
  [1, 3, 19, 29],
], [
  "90 Degrees -> 2",
  [1, 9, 13, 15],
  [1, 9, 15, 17],
  [1, 9, 17, 19],
  [1, 9, 19, 21],
  [1, 25, 13, 15],
  [1, 25, 15, 17],
  [1, 25, 17, 19],
  [1, 25, 19, 21],
], [
  "4 Prongs",
  [1, 7, 19, 21],
  [31, 3, 13, 21],
  [31, 3, 17, 15],
  [31, 3, 17, 19],
]]

// Validate No Duplicates
const set = new Set<string>();
KEY_PRONG_CONFIGURATIONS.forEach(k => k.forEach((p: any) => {
  if (typeof p === 'string') return;
  const key = p.join('-');
  if (set.has(key)) throw new Error(`Key ${p} already exists`);
  set.add(key);
}))
