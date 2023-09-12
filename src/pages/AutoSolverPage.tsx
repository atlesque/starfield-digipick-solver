import { useCallback, useEffect, useState } from 'react';
import { Key } from '../components/modules/auto-solver/Key';
import { Settings } from '../components/modules/settings/Settings';
import { Difficulty, TOTAL_KEYS_BY_DIFFICULTY } from '../constants';
import styles from './SolverPage.module.scss'

interface Key {
  prongs: number[]
  rotation: number
}

export const AutoSolverPage = () => {
  const [difficulty, setDifficulty] = useState(Difficulty.Novice);
  const [keys, setKeys] = useState<Key[]>([])

  useEffect(() => {
    setKeys(k => {
      return Array.from<unknown, Key>({ length: TOTAL_KEYS_BY_DIFFICULTY[difficulty] }, (_, i) => (
        k[i] ?? {
          prongs: [1, 3, 5],
          rotation: 0
        }
      ))
    })
  }, [difficulty]);

  const onReset = useCallback(() => {
    setKeys(Array.from<unknown, Key>({ length: TOTAL_KEYS_BY_DIFFICULTY[difficulty] }, () => ({
      prongs: [],
      rotation: 0
    })))
  }, [difficulty]);

  return (
    <div className={styles.root}>
      <Settings
        activeDifficulty={difficulty}
        setActiveDifficulty={setDifficulty}
        handleResetClick={onReset}
      />
      <div className={styles.keyList}>
        {keys.map((k, i) => (
          <Key
            key={i}
            prongs={k.prongs}
            rotation={k.rotation}
          />
        ))}
      </div>
    </div>
  );
}
