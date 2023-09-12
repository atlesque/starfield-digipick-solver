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
export const KEY_PRONG_CONFIGURATIONS = [
  [1],
  [1, 3],
  [1, 11],
  [1, 19, 21],
  [1, 17, 19],
  [1, 5, 13],
  [1, 9, 11],
  [1, 3, 5],
  [1, 5, 9, 21],
  [1, 14],
  [1, 15, 21],
  [1, 7, 19, 21],
  [1, 9, 15, 17],
  [1, 3, 11, 13],
  [1, 17, 21, 25]
]
