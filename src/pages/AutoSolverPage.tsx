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
    onSolve,
    solved,
    error,
    setActiveLayer
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
          <Button primary={!solved} disabled={solved} onClick={solved ? onReset : onSolve}>{solved ? 'Start Over' : 'Solve Puzzle'}</Button>
          <div className={styles.keyList}>
            {keys.map((k, i) => (
              <Key
                key={i}
                prongs={k.prongs}
                layer={k.layer}
                onClick={() => solved ? k.layer && setActiveLayer(k.layer) : setEditKey(i)}
              />
            ))}
          </div>
        </>
      ) : (
        <KeyPicker />
      )}
    </div>
  );
}
