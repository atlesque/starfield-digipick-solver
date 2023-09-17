import { useEffect, useState } from 'react';
import { DigiKey } from '../../../types/DigiKey';
import { MAX_PRONGS } from '../../../constants';
import rotateKey from '../../../utils/rotateKey';

const quickKeys: DigiKey[] = [
  [1],
  [1, 3],
  [1, 3, 31],
  [1, 5, 29],
  [31, 27, 3, 7],
  [31, 25, 5, 11],
].map(prongs => ({ prongs }));

const useKeyPicker = () => {
  const [keys, setKeys] = useState<DigiKey[]>(quickKeys);
  const [rotation, setRotation] = useState(0);
  const [prongQuantity, setProngQuantity] = useState(0);
  const [options, setOptions] = useState<string[]>([]);
  const [chosenOption, setChosenOption] = useState<string>('');
  const [helpText, setHelpText] = useState('');

  useEffect(() => {
    const [gapA, gapB] = chosenOption.split('-').map(n => Number(n) + 1);
    const newKeys: DigiKey[] = [];
    if (gapB) {
      for (let i = gapA + 2; i + gapB - 1 < MAX_PRONGS; i += 2) {
        newKeys.push({ prongs: rotateKey([1, gapA, i, i + gapB - 1], rotation) });
      }
    } else {
      for (let i = gapA + 4; i < MAX_PRONGS - 2; i += 2) {
        newKeys.push({ prongs: rotateKey([1, gapA, i], rotation) });
      }
    }
    setKeys(newKeys);
  }, [rotation, chosenOption]);

  useEffect(() => {
    if (prongQuantity === 0) {
      setKeys(quickKeys.map(k => ({ prongs: rotateKey(k.prongs, rotation) })));
      setOptions(o => (o.length ? [] : o));
    }

    if (prongQuantity === 2) {
      const k: DigiKey[] = [];
      for (let i = 3; i < MAX_PRONGS; i += 2) {
        k.push({ prongs: rotateKey([1, i], rotation) });
      }
      setKeys(k);
      setOptions(o => (o.length ? [] : o));
    }

    if (prongQuantity === 3) {
      const newOptions: string[] = [];
      for (let i = 2; i <= Math.floor(MAX_PRONGS / 3); i += 2) {
        newOptions.push(i.toString());
      }
      setOptions(newOptions);
      setHelpText('Select the smallest gap between two prongs');
      setChosenOption('2');
    }

    if (prongQuantity === 4) {
      const newOptions: string[] = [];
      for (let i = 2; i <= Math.floor(MAX_PRONGS / 2); i += 2) {
        for (let j = 2; j <= Math.floor(MAX_PRONGS / 2); j += 2) {
          if (newOptions.includes(`${j}-${i}`)) {
            // eslint-disable-next-line no-continue
            continue;
          }
          newOptions.push(`${i}-${j}`);
        }
      }
      setOptions(newOptions);
      setHelpText('Select the gap sizes of the two separate pairs of prongs');
      setChosenOption('2-2');
    }
  }, [prongQuantity, rotation, setChosenOption]);

  return {
    keys,
    setProngQuantity,
    prongQuantity,
    setChosenOption,
    chosenOption,
    options,
    setRotation,
    helpText,
  };
};

export default useKeyPicker;
