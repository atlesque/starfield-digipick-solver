import { Dispatch, PropsWithChildren, SetStateAction, createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { Difficulty, TOTAL_KEYS_BY_DIFFICULTY, TOTAL_LAYERS_BY_DIFFICULTY } from '../constants';
import { DigiKey } from '../types/DigiKey';
import { Puzzle } from '../types/Puzzle';
import { solvePuzzle } from '../utils/solvePuzzle';

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
  onSolve: () => void
  solved: boolean
  error?: string
  activeLayer: string
  setActiveLayer: Dispatch<SetStateAction<string>>
}

export const AutoSolverContext = createContext<AutoSolverContextValue>(null!);

export const AutoSolverProvider = ({ children }: PropsWithChildren) => {
  const saved = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('save') ?? '');
    } catch (e) {
      return {};
    }
  }, []);
  const [difficulty, setDifficulty] = useState<Difficulty>(saved.difficulty ?? Difficulty.Novice);
  const [keys, setKeys] = useState<DigiKey[]>(saved.keys ?? []);
  const [solved, setSolved] = useState<boolean>(saved.solved ?? false);
  const [error, setError] = useState<string>(saved.error ?? undefined);
  const [puzzle, setPuzzle] = useState<Puzzle>(saved.puzzle ?? { layers: [] });
  const [editKey, setEditKey] = useState<number>(saved.editKey ?? -1);
  const [activeLayer, setActiveLayer] = useState(saved.activeLayer ?? '');

  useEffect(() => {
    localStorage.setItem('save', JSON.stringify({
      difficulty,
      keys,
      solved,
      error,
      puzzle,
      editKey,
      activeLayer
    }))
  }, [difficulty, keys, solved, error, puzzle, editKey, activeLayer]);

  useEffect(() => {
    setKeys(k => {
      return Array.from<unknown, DigiKey>({ length: TOTAL_KEYS_BY_DIFFICULTY[difficulty] }, (_, i) => (
        k[i] ?? {
          prongs: [],
          rotation: 0
        }
      ))
    })
    setPuzzle(p => ({ layers: Array.from({ length: TOTAL_LAYERS_BY_DIFFICULTY[difficulty] }, (_, n) => (p.layers[n] ?? [])) }))
  }, [difficulty]);

  useEffect(() => {
    // @ts-expect-error
    window.debug = () => {
      console.log('==== PUZZLE ====');
      console.log(JSON.stringify(puzzle));
      console.log('==== KEYS ====');
      console.log(JSON.stringify(keys));
    };
  }, [puzzle, keys])

  const onReset = useCallback((ask?: boolean) => {
    const ok = confirm('Are you sure you want to reset?');
    if (!ok) return;
    setKeys(Array.from<unknown, DigiKey>({ length: TOTAL_KEYS_BY_DIFFICULTY[difficulty] }, () => ({
      prongs: [],
      rotation: 0
    })))
    setPuzzle({ layers: Array.from({ length: TOTAL_LAYERS_BY_DIFFICULTY[difficulty] }, () => ([])) })
    setSolved(false);
    setActiveLayer('');
  }, [difficulty]);

  const onSolve = useCallback(() => {
    try {
      if (!puzzle.layers.every(l => l.length)) {
        throw new Error('Not all layers have been configured. Please ensure your puzzle is fully mapped!');
      }

      if (!keys.every(k => k.prongs.length)) {
        throw new Error('Not all keys have been configured, please ensure you have chosen all the keys!');
      }

      try {
        setKeys(solvePuzzle(puzzle, keys));
        setSolved(true);
      } catch (e) {
        throw new Error('This puzzle is not solveable. Ensure you have entered everything correctly!');
      }
    } catch (e) {
      if (!(e instanceof Error)) return;
      setError(e.message);
    }
  }, [puzzle, keys]);

  useEffect(() => {
    if (!error) {
      return;
    }
    const timeout = setTimeout(() => setError(''), 6000);
    return () => clearTimeout(timeout);
  }, [error]);

  const value = useMemo(() => ({
    difficulty,
    setDifficulty,
    keys,
    setKeys,
    puzzle,
    setPuzzle,
    editKey,
    setEditKey,
    onReset,
    onSolve,
    solved,
    error,
    activeLayer,
    setActiveLayer,
  }), [difficulty, setDifficulty, keys, setKeys, puzzle, setPuzzle, editKey, setEditKey, onReset, onSolve, solved, error, activeLayer, setActiveLayer])

  return (
    <AutoSolverContext.Provider value={value}>
      {children}
    </AutoSolverContext.Provider>
  )
}
