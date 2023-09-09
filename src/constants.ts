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

export const TOTAL_LAYERS = 3;

export const MAX_KEYS = TOTAL_KEYS_BY_DIFFICULTY[Difficulty.Master];
