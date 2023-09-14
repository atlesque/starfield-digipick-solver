import { KEY_PRONG_CONFIGURATIONS } from '../../../constants';
import { DigiKey } from '../../../types/DigiKey';
import { Key } from './Key';
import styles from './KeyPicker.module.scss'
import clsx from 'clsx';
import { Button } from '../button/Button';

interface KeyPickerProps {
  keys: DigiKey[]
  activeIndex: number
  setActiveIndex: (i: number) => void
  setKeys: React.Dispatch<React.SetStateAction<DigiKey[]>>
}
export const KeyPicker = ({
  keys,
  activeIndex,
  setActiveIndex,
  setKeys
}: KeyPickerProps) => {
  return (
    <div className={styles.root}>
      <div className={styles.status}>
        {keys.map((k, i) => (
          <div key={i} className={clsx(styles.statusKey, {
            [styles.valid]: !!k.prongs.length,
            [styles.active]: i === activeIndex
          })} />
        ))}
      </div>
      <Button onClick={() => setActiveIndex(-1)}>BACK</Button>
      <div className={styles.keys}>
        {KEY_PRONG_CONFIGURATIONS.map((prongs, i) => (
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
                setActiveIndex(nextIndex);
              }
            }}
          />
        ))}
      </div>
    </div>
  );
}