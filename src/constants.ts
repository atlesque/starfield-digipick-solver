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

export const LOCAL_STORAGE_ACTIVE_DIFFICULTY = 'activeDifficulty';
export const LOCAL_STORAGE_FILTERED_LAYER = 'filteredLayer';
export const LOCAL_STORAGE_KEY_CIRCLES = 'keyCircles';
