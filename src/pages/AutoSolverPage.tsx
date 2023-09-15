import { Key } from '../components/modules/autoSolver/Key';
import { Settings } from '../components/modules/settings/Settings';
import styles from './SolverPage.module.scss'
import { KeyPicker } from '../components/modules/autoSolver/KeyPicker';
import { Puzzle } from '../components/modules/autoSolver/Puzzle';
import { useAutoSolver } from '../hooks/useAutoSolver';
import { Button } from '../components/modules/button/Button';
import { ErrorMessage } from '../components/modules/errorMessage/ErrorMessage';

export const AutoSolverPage = () => {
  const {
    difficulty,
    setDifficulty,
    onReset,
    editKey,
    setEditKey,
    keys,
    setKeys,
    onSolve,
    solved,
    error
  } = useAutoSolver();

  return (
    <div className={styles.root}>
      <Settings
        activeDifficulty={difficulty}
        setActiveDifficulty={setDifficulty}
        handleResetClick={onReset}
      />
      <i>Disclaimer: Better mobile support and easier key entry coming soon!</i>
      {editKey === -1 ? (
        <>
          <Puzzle />
          {error && (<ErrorMessage>{error}</ErrorMessage>)}
          <Button primary disabled={solved} onClick={onSolve}>Solve Puzzle</Button>
          <div className={styles.keyList}>
            {keys.map((k, i) => (
              <Key
                key={i}
                prongs={k.prongs}
                layer={k.layer}
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
