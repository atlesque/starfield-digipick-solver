import { useCallback, useEffect, useState } from 'react';
import { Key } from '../components/modules/auto-solver/Key';
import { DigiKey } from '../types/DigiKey'
import { Settings } from '../components/modules/settings/Settings';
import { Difficulty, TOTAL_KEYS_BY_DIFFICULTY } from '../constants';
import styles from './SolverPage.module.scss'
import { KeyPicker } from '../components/modules/auto-solver/KeyPicker';

export const AutoSolverPage = () => {
  const [difficulty, setDifficulty] = useState(Difficulty.Novice);
  const [keys, setKeys] = useState<DigiKey[]>([])
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
  }, [difficulty]);

  const onReset = useCallback(() => {
    setKeys(Array.from<unknown, DigiKey>({ length: TOTAL_KEYS_BY_DIFFICULTY[difficulty] }, () => ({
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
      {editKey === -1 ? (
        <div className={styles.keyList}>
          {keys.map((k, i) => (
            <Key
              key={i}
              prongs={k.prongs}
              rotation={k.rotation}
              onClick={() => setEditKey(i)}
            />
          ))}
        </div>
      ) : (
        <KeyPicker
          keys={keys}
          activeIndex={editKey}
          setActiveIndex={(i) => setEditKey(i)}
          setKeys={setKeys}
        />
      )}
    </div>
  );
}
