import { RefObject, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';
import update from 'immutability-helper';
import { useCanvasEventTransformers } from './useCanvasEventTransformers';
import { Puzzle } from '../types/Puzzle';

export const useCanvasEdit = (canvasRef: RefObject<HTMLCanvasElement>, puzzle?: Puzzle, setPuzzle?: React.Dispatch<SetStateAction<Puzzle>>) => {
  // backup copy
  const [p, setP] = useState(puzzle!);
  const editingRef = useRef(false);

  useEffect(() => {
    if (editingRef.current) return;

    setP(puzzle!);
  }, [puzzle]);

  const onPick = useCallback(() => {
    if (!setPuzzle) return;
    editingRef.current = false;

    // trigger an update so our local copy P is saved.
    setPuzzle(puz => ({ ...puz }));
  }, [])

  const onPicking = useCallback((prong: number, _layer: number) => {
    if (!setPuzzle) return;
    editingRef.current = true;

    const layer = Math.min(p.layers.length - 1, _layer);
    if (!p.layers[layer].includes(prong)) {
      setPuzzle(update(p, {
        layers: {
          [layer]: { $push: [prong] }
        }
      }))
    } else {
      const index = p.layers[layer].indexOf(prong)
      setPuzzle(update(p, {
        layers: {
          [layer]: { $splice: [[index, 1]] }
        }
      }))
    }
  }, [p])

  useCanvasEventTransformers(canvasRef, !!puzzle, onPick, onPicking)
}
