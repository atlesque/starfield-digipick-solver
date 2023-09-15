import { useCallback, useEffect, useState } from 'react';
import { DigiKey } from '../types/DigiKey';
import { MAX_PRONGS } from '../constants';

const quickKeys: DigiKey[] = [
  [1],
  [1, 3],
  [1, 3, 31],
  [1, 5, 29],
  [31, 27, 3, 7],
  [31, 25, 5, 11],
].map(prongs => ({ prongs }));

export const useKeyPicker = () => {
  const [keys, setKeys] = useState<DigiKey[]>(quickKeys);
  const [prongQuantity, setProngQuantity] = useState(0);
  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    if (prongQuantity === 0) {
      setKeys(quickKeys);
      setOptions(o => o.length ? [] : o);
    }

    if (prongQuantity === 2) {
      const k: DigiKey[] = []
      for (let i = 3; i < MAX_PRONGS; i += 2) {
        k.push({ prongs: [1, i] });
      }
      setKeys(k);
      setOptions(o => o.length ? [] : o);
    }

    if (prongQuantity === 3) {
      const options: string[] = [];
      for (let i = 2; i <= Math.floor(MAX_PRONGS / 3); i += 2) {
        options.push(i.toString());
      }
      setOptions(options);
    }

    if (prongQuantity === 4) {
      const options: string[] = [];
      for (let i = 2; i <= Math.floor(MAX_PRONGS / 4); i += 2) {
        for (let j = 2; j <= Math.floor(MAX_PRONGS / 3); j += 2) {
          if (options.includes(`${j}-${i}`)) continue;
          options.push(`${i}-${j}`);
        }
      }
      setOptions(options);
    }
  }, [prongQuantity]);

  const onSetOption = useCallback((option: string) => {
    const [gap, gap2] = option.split('-').map(n => Number(n) + 1);
    const keys: DigiKey[] = [];
    if (gap2) {
      for (let i = gap + 2; (i + gap2 - 1) < MAX_PRONGS; i += 2) {
        keys.push({ prongs: [1, gap, i, i + gap2 - 1]})
      }
    } else {
      for (let i = gap + 4; i < MAX_PRONGS - 2; i += 2) {
        keys.push({ prongs: [1, gap, i] });
      }
    }
    setKeys(keys);
  }, []);

  return {
    keys,
    setProngQuantity,
    onSetOption,
    options
  };
};
