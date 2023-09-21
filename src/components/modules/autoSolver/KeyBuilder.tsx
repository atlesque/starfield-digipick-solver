import { useCallback, useState } from 'react';
import styles from './KeyBuilder.module.scss';
import { Key } from './Key';
import { Button } from '../button/Button';

interface KeyBuilderProps {
  onAddKey: (prongs: number[]) => void
}
export const KeyBuilder = ({
  onAddKey
}: KeyBuilderProps) => {
  const [prongs, setProngs] = useState<number[]>([]);
  const onSubmit = useCallback(() => {
    if (!prongs.length) {
      return;
    }
    onAddKey(prongs);
    setProngs([]);
  }, [prongs]);
  return (
    <div className={styles.builder}>
      <Key
        edit
        prongs={prongs}
        onChangeKey={setProngs}
      />
      <Button primary onClick={onSubmit}>Add Key</Button>
    </div>
  );
}
