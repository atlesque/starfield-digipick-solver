import { Key } from './Key';
import styles from './KeyPicker.module.scss'
import { Button } from '../button/Button';
import { useKeyPicker } from './useKeyPicker';
import { useAutoSolver } from '../../../hooks/useAutoSolver';
import { useMemo } from 'react';

export const KeyPicker = () => {
  const { 
    keys,
    setProngQuantity,
    prongQuantity,
    setChosenOption,
    chosenOption,
    options,
    helpText
  } = useKeyPicker();

  const {
    keys: currentKeys,
    editKey,
    setEditKey,
    setKeys,
    setGapIllustrationMode,
    gapIllustrationMode
  } = useAutoSolver();

  const [optionsA, optionsB] = useMemo(() => options.reduce<string[][]>(([a, b], option) => {
    const [first, second] = option.split('-');
    if (!a.includes(first)) a.push(first);
    if (second && !b.includes(second)) b.push(second);
    return [a, b];
  }, [[], []]), [options]);

  return (
    <div className={styles.root}>
      <div className={styles.status}>
        {currentKeys.map((k, i) => (
          <Key
            key={i}
            prongs={k.prongs}
            active={i === editKey}
            onClick={() => setEditKey(i)}
          />
        ))}
      </div>
      <div>
        <Button onClick={() => setEditKey(r => Math.max(r - 1, 0))}>&lt;</Button>
        <Button onClick={() => setEditKey(-1)}>BACK</Button>
        <Button onClick={() => setEditKey(r => Math.min(r + 1, currentKeys.length - 1))}>&gt;</Button>
      </div>
      <div className={styles.quantityContainer}>
        {[0, 2, 3, 4].map((n) => (
          <Button
            onClick={() => setProngQuantity(n)}
            key={n}
          >
            {n === 0 ? 'Basic' : `${n} Prongs`}
          </Button>
        ))}
      </div>
      {!!options.length && (
        <div className={styles.optionsWrapper}>
          <span>{helpText}</span>
          <div className={styles.optionsContainer}>
            {optionsA.map(o => (
              <Button
                onClick={() => setChosenOption(optionsB.length ? `${o}-${chosenOption.split('-')[1]}` : o)}
                primary={o === chosenOption.split('-')[0]}
                key={o}
              >
                {`${o}`}
              </Button>
            ))}
          </div>
          {!!optionsB.length && (
            <div className={styles.optionsContainer}>
              {optionsB.map(o => (
                <Button
                  onClick={() => setChosenOption(`${chosenOption.split('-')[0]}-${o}`)}
                  primary={o === chosenOption.split('-')[1]}
                  key={o}
                >
                  {`${o}`}
                </Button>
              ))}
            </div>
          )}
        </div>
      )}
      <div className={styles.gapIllustration}>
        <Button
          onClick={() => {
            if (gapIllustrationMode === 'none') {
              setGapIllustrationMode('visual');
            } else if (gapIllustrationMode === 'visual') {
              setGapIllustrationMode('numbers');
            } else {
              setGapIllustrationMode('none');
            }
          }}
        >
          {(() => {
            if (gapIllustrationMode === 'none') {
              return 'Show Gap Lines';
            }

            if (gapIllustrationMode === 'numbers') {
              return 'Hide Gap Helpers';
            }

            return 'Show Gap Distances';
          })()}
        </Button>
      </div>
      <div className={styles.keys}>
        {keys.map(({ prongs }, i) => {
          return (
            <Key
              key={i}
              illustrateGaps={prongQuantity !== 0}
              prongs={prongs}
              onClick={(prongs) => {
                setKeys(k => {
                  const newKeys = [...k];
                  newKeys.splice(editKey, 1, { prongs });
                  return newKeys;
                })
                const nextIndex = editKey + 1;
                if (nextIndex > currentKeys.length - 1) {
                  setEditKey(-1);
                } else {
                  setEditKey(nextIndex);
                }
              }}
            />
          );
        })}
      </div>
    </div>
  );
}