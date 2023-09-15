import { DigiKey } from '../../../types/DigiKey';
import { Key } from './Key';
import styles from './KeyPicker.module.scss'
import clsx from 'clsx';
import { Button } from '../button/Button';
import { useKeyPicker } from '../../../hooks/useKeyPicker';

interface KeyPickerProps {
  keys: DigiKey[]
  activeIndex: number
  setActiveIndex: (i: number) => void
  setKeys: React.Dispatch<React.SetStateAction<DigiKey[]>>
}
export const KeyPicker = ({
  keys: currentKeys,
  activeIndex,
  setActiveIndex,
  setKeys
}: KeyPickerProps) => {
  const { 
    keys,
    setProngQuantity,
    onSetOption,
    options
  } = useKeyPicker();

  return (
    <div className={styles.root}>
      <div className={styles.status}>
        {currentKeys.map((k, i) => (
          <div key={i} className={clsx(styles.statusKey, {
            [styles.valid]: !!k.prongs.length,
            [styles.active]: i === activeIndex
          })} />
        ))}
      </div>
      <Button onClick={() => setActiveIndex(-1)}>BACK</Button>
      <div className={styles.quantityContainer}>
        {[0, 2, 3, 4].map((n) => (
          <Button
            onClick={() => setProngQuantity(n)}
            key={n}
          >
            {n === 0 ? 'Clear' : `${n} Prongs`}
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
                  newKeys.splice(activeIndex, 1, { prongs });
                  return newKeys;
                })
                const nextIndex = activeIndex + 1;
                if (nextIndex > keys.length - 1) {
                  setActiveIndex(-1);
                } else {
                  setProngQuantity(0);
                  setActiveIndex(nextIndex);
                }
              }}
            />
          );
        })}
      </div>
    </div>
  );
}