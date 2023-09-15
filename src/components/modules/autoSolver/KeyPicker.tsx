import { Key } from './Key';
import styles from './KeyPicker.module.scss'
import { Button } from '../button/Button';
import { useKeyPicker } from '../../../hooks/useKeyPicker';
import { useAutoSolver } from '../../../hooks/useAutoSolver';

export const KeyPicker = () => {
  const { 
    keys,
    setProngQuantity,
    onSetOption,
    options
  } = useKeyPicker();

  const {
    keys: currentKeys,
    editKey,
    setEditKey,
    setKeys
  } = useAutoSolver();

  return (
    <div className={styles.root}>
      <div className={styles.status}>
        {currentKeys.map((k, i) => (
          <Key
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
        <>
          <hr style={{ width: '100%' }} />
          <span>Select Smallest Gap Distance</span>
          <div className={styles.optionsContainer}>
            {options.map(option => (
              <Button
                onClick={() => onSetOption(option)}
                key={option}
              >
                {`${option}`}
              </Button>
            ))}
          </div>
        </>
      )}
      <div className={styles.keys}>
        {keys.map(({ prongs }, i) => {
          return (
            <Key
              key={i}
              prongs={prongs}
              onClick={(prongs) => {
                setKeys(k => {
                  const newKeys = [...k];
                  newKeys.splice(editKey, 1, { prongs });
                  return newKeys;
                })
                const nextIndex = editKey + 1;
                if (nextIndex > keys.length - 1) {
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