import { Dispatch, PropsWithChildren, SetStateAction, createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { Difficulty, TOTAL_KEYS_BY_DIFFICULTY, TOTAL_LAYERS_BY_DIFFICULTY } from '../constants';
import { DigiKey } from '../types/DigiKey';
import { Puzzle } from '../types/Puzzle';

interface AutoSolverContextValue {
  difficulty: Difficulty
  setDifficulty: Dispatch<SetStateAction<Difficulty>>
  keys: DigiKey[]
  setKeys: Dispatch<SetStateAction<DigiKey[]>>
  puzzle: Puzzle
  setPuzzle: Dispatch<SetStateAction<Puzzle>>
  editKey: number
  setEditKey: Dispatch<SetStateAction<number>>
  onReset: () => void
}

export const AutoSolverContext = createContext<AutoSolverContextValue>(null!);

export const AutoSolverProvider = ({ children }: PropsWithChildren) => {
  const [difficulty, setDifficulty] = useState(Difficulty.Novice);
  const [keys, setKeys] = useState<DigiKey[]>([]);
  const [puzzle, setPuzzle] = useState<Puzzle>({ layers: [] });
  const [editKey, setEditKey] = useState(-1);

  useEffect(() => {
    setKeys(k => {
      return Array.from<unknown, DigiKey>({ length: TOTAL_KEYS_BY_DIFFICULTY[difficulty] }, (_, i) => (
        k[i] ?? {
          prongs: [],
          rotation: 0
        }
      ))
    })
    setPuzzle({ layers: Array.from({ length: TOTAL_LAYERS_BY_DIFFICULTY[difficulty] }, () => ([])) })
  }, [difficulty]);

  const onReset = useCallback(() => {
    setKeys(Array.from<unknown, DigiKey>({ length: TOTAL_KEYS_BY_DIFFICULTY[difficulty] }, () => ({
      prongs: [],
      rotation: 0
    })))
    setPuzzle({ layers: Array.from({ length: TOTAL_LAYERS_BY_DIFFICULTY[difficulty] }, () => ([])) })
  }, [difficulty]);

  const value = useMemo(() => ({
    difficulty,
    setDifficulty,
    keys,
    setKeys,
    puzzle,
    setPuzzle,
    editKey,
    setEditKey,
    onReset
  }), [difficulty, setDifficulty, keys, setKeys, puzzle, setPuzzle, editKey, setEditKey, onReset])

  return (
    <AutoSolverContext.Provider value={value}>
      {children}
    </AutoSolverContext.Provider>
  )
}
