import { Key } from '../components/modules/auto-solver/Key';
import { Settings } from '../components/modules/settings/Settings';
import styles from './SolverPage.module.scss'
import { KeyPicker } from '../components/modules/auto-solver/KeyPicker';
import { Puzzle } from '../components/modules/auto-solver/Puzzle';
import { useAutoSolver } from '../hooks/useAutoSolver';

export const AutoSolverPage = () => {
  const {
    difficulty,
    setDifficulty,
    onReset,
    editKey,
    setEditKey,
    keys,
    setKeys
  } = useAutoSolver();

  return (
    <div className={styles.root}>
      <Settings
        activeDifficulty={difficulty}
        setActiveDifficulty={setDifficulty}
        handleResetClick={onReset}
      />
      {editKey === -1 ? (
        <>
          <Puzzle />
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
        </>
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
