import { Key } from '../components/modules/autoSolver/Key';
import { Settings } from '../components/modules/settings/Settings';
import styles from './SolverPage.module.scss'
import { KeyPicker } from '../components/modules/autoSolver/KeyPicker';
import { Puzzle } from '../components/modules/autoSolver/Puzzle';
import { useAutoSolver } from '../hooks/useAutoSolver';
import { Button } from '../components/modules/button/Button';
import { ErrorMessage } from '../components/modules/errorMessage/ErrorMessage';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../routes';
import { Confirm } from '../components/shared/modal/Confirm';
import { useCallback, useState } from 'react';

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
    puzzle,
    setActiveLayer,
  } = useAutoSolver();

  const [showConfirmReset, setShowConfirmReset] = useState(false);
  const onConfirmReset = useCallback(() => {
    setShowConfirmReset(false);
    onReset();
  }, []);

  return (
    <div className={styles.root}>
      <Confirm
        title="Are you sure?"
        prompt="This action presently can't be undone."
        open={showConfirmReset}
        onConfirm={onConfirmReset}
        onCancel={() => setShowConfirmReset(false)}
      />
      <Settings
        activeDifficulty={difficulty}
        setActiveDifficulty={setDifficulty}
        handleResetClick={() => setShowConfirmReset(true)}
      />
      {editKey === -1 ? (
        <>
          <Puzzle />
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <div>
            {!solved && (
              <Button
                primary
                onClick={() =>
                  setActiveLayer(l => (l === '1' || !l ? '' : (Number(l) - 1).toString()))
                }
              >
                &lt;
              </Button>
            )}
            <Button primary={!solved} disabled={solved} onClick={solved ? () => setShowConfirmReset(true) : onSolve}>
              {solved ? 'Start Over' : 'Solve Puzzle'}
            </Button>
            {!solved && (
              <Button
                primary
                onClick={() =>
                  setActiveLayer(l =>
                    !l ? '1' : Math.min(Number(l) + 1, puzzle.layers.length).toString()
                  )
                }
              >
                &gt;
              </Button>
            )}
          </div>
          <div className={styles.keyList}>
            {keys.map((k, i) => (
              <Key
                key={i}
                prongs={k.prongs}
                layer={k.layer}
                onClick={() => (solved ? k.layer && setActiveLayer(k.layer) : setEditKey(i))}
              />
            ))}
          </div>
        </>
      ) : (
        <KeyPicker />
      )}
      <div className={styles.footerLinkWrapper}>
        <Link to={AppRoutes.Home} className="link">
          Back to manual solver
        </Link>
      </div>
    </div>
  );
};
