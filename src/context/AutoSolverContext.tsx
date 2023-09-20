import { Dispatch, MutableRefObject, PropsWithChildren, SetStateAction, createContext, useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { Difficulty, TOTAL_KEYS_BY_DIFFICULTY, TOTAL_LAYERS_BY_DIFFICULTY } from '../constants';
import { DigiKey } from '../types/DigiKey';
import { Puzzle } from '../types/Puzzle';
import { solvePuzzle } from '../utils/solvePuzzle';
import { NotSolveableError } from '../errors/NotSolveableError';

/**
 * Bump this version if breaking changes are made to state.
 * It will reset what is stored inside of localStorage.
 */
const SAVED_STATE_VERSION = 1;

type gapIllustrationMode = 'visual' | 'numbers' | 'none';
interface AutoSolverContextValue {
  difficulty: Difficulty
  keys: DigiKey[]
  puzzle: Puzzle
  editKey: number
  solved: boolean
  error?: string
  activeLayer: string
  guides: boolean
  mobileOffset: boolean
  gapIllustrationMode: gapIllustrationMode
}

interface AutoSolverContextActions {
  setDifficulty: Dispatch<SetStateAction<Difficulty>>
  setKeys: Dispatch<SetStateAction<DigiKey[]>>
  setPuzzle: Dispatch<SetStateAction<Puzzle>>
  setEditKey: Dispatch<SetStateAction<number>>
  setActiveLayer: Dispatch<SetStateAction<string>>
  setGuides: Dispatch<SetStateAction<boolean>>
  setMobileOffset: Dispatch<SetStateAction<boolean>>
  setGapIllustrationMode: Dispatch<SetStateAction<gapIllustrationMode>>
}

interface AutoSolverContextExtras {
  state: AutoSolverContextValue
  stateRef: MutableRefObject<AutoSolverContextValue>
  onReset: () => void
  onSolve: () => void
}

const defaultAutoSolverState: AutoSolverContextValue = {
  difficulty: Difficulty.Novice,
  keys: [],
  solved: false,
  error: undefined,
  puzzle: { layers: [] },
  editKey: -1,
  activeLayer: '',
  guides: false,
  mobileOffset: false,
  gapIllustrationMode: 'numbers'
}

type autoSolverContext = AutoSolverContextValue & AutoSolverContextActions & AutoSolverContextExtras;
const reducer = (state: AutoSolverContextValue, action: Partial<AutoSolverContextValue>): AutoSolverContextValue => ({ ...state, ...action });
const load = (init: AutoSolverContextValue): AutoSolverContextValue => {
  try {
    const savedState = JSON.parse(localStorage.getItem('save') ?? '')
    if (savedState.version !== SAVED_STATE_VERSION) {
      throw new Error('Version changed.');
    }
    delete savedState.version;
    return {
      init,
      ...savedState
    };
  } catch (e) {
    return init;
  }
}

export const AutoSolverContext = createContext<autoSolverContext>(null!);

export const AutoSolverProvider = ({ children }: PropsWithChildren) => {
  const [state, setState] = useReducer(reducer, defaultAutoSolverState, load);
  const stateRef = useRef(state);
  stateRef.current = state;

  useEffect(() => {
    localStorage.setItem('save', JSON.stringify({
      ...state,
      version: SAVED_STATE_VERSION
    }))
  }, [state]);

  useEffect(() => {
    setState({
      keys: Array.from<unknown, DigiKey>({ length: TOTAL_KEYS_BY_DIFFICULTY[stateRef.current.difficulty] }, (_, i) => (
        stateRef.current.keys[i] ?? {
          prongs: [],
          rotation: 0
        }
      )),
      puzzle: { layers: Array.from({ length: TOTAL_LAYERS_BY_DIFFICULTY[stateRef.current.difficulty] }, (_, n) => (stateRef.current.puzzle.layers[n] ?? [])) }
    });
  }, [state.difficulty]);

  useEffect(() => {
    // @ts-expect-error
    window.debug = () => {
      console.log('==== PUZZLE ====');
      console.log(JSON.stringify(stateRef.current.puzzle));
      console.log('==== KEYS ====');
      console.log(JSON.stringify(stateRef.current.keys));
    };
  }, [])

  const onReset = useCallback(() => {
    setState({
      keys: Array.from<unknown, DigiKey>({ length: TOTAL_KEYS_BY_DIFFICULTY[stateRef.current.difficulty] }, () => ({
        prongs: [],
        rotation: 0
      })),
      puzzle: { layers: Array.from({ length: TOTAL_LAYERS_BY_DIFFICULTY[stateRef.current.difficulty] }, () => ([])) },
      solved: false,
      activeLayer: ''
    })
  }, []);

  const onSolve = useCallback(() => {
    try {
      const { puzzle, keys } = stateRef.current;
      if (!puzzle.layers.every(l => l.length)) {
        throw new Error('Not all layers have been configured. Please ensure your puzzle is fully mapped!');
      }

      if (!keys.every(k => k.prongs.length)) {
        throw new Error('Not all keys have been configured, please ensure you have chosen all the keys!');
      }

      try {
        setState({
          keys: solvePuzzle(puzzle, keys),
          activeLayer: '',
          solved: true
        });
      } catch (e) {
        if (e instanceof NotSolveableError) {
          setState({ keys: e.keys });
        }
        throw new Error(
          'This puzzle is not solveable. ' +
          'Ensure you have entered everything correctly! ' +
          'Keys that don\'t fit into the puzzle are marked with a yellow question mark. ' +
          'These may be the culprit, but some puzzles come with keys intentionally meant to distract.'
        );
      }
    } catch (e) {
      if (!(e instanceof Error)) return;

      setState({ error: e.message });
    }
  }, []);

  useEffect(() => {
    if (!state.error) {
      return;
    }
    const timeout = setTimeout(() => setState({ error: undefined }), 8000);
    return () => clearTimeout(timeout);
  }, [state.error]);

  const actions = useMemo((): AutoSolverContextActions => {
    const actionNames: (keyof AutoSolverContextActions)[] = [
      'setActiveLayer',
      'setDifficulty',
      'setEditKey',
      'setGapIllustrationMode',
      'setGuides',
      'setKeys',
      'setMobileOffset',
      'setPuzzle'
    ];
    return actionNames.reduce((actions, funcName) => {
      const stateKey = funcName.charAt(3).toLowerCase() + funcName.slice(4) as keyof AutoSolverContextValue;
      actions[funcName] = (value: any) => {
        let result = value;
        if (typeof value === 'function') {
          result = value(stateRef.current[stateKey])
          if (result === stateRef.current[stateKey]) {
            return;
          }
        }
        setState({ [stateKey]: result });
      }
      return actions;
    }, {} as AutoSolverContextActions)
  }, []);

  const value = useMemo((): autoSolverContext => ({
    ...state,
    ...actions,
    onReset,
    onSolve,
    state,
    stateRef
  }), [state, actions, onReset, onSolve]);

  return (
    <AutoSolverContext.Provider value={value}>
      {children}
    </AutoSolverContext.Provider>
  )
}
