import { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import update from 'immutability-helper';
import useCanvasEventTransformers from './useCanvasEventTransformers';
import useAutoSolver from './useAutoSolver';

const useCanvasEdit = (canvasRef: RefObject<HTMLCanvasElement>, isPuzzle: boolean = false) => {
  const { puzzle, setPuzzle, solved } = useAutoSolver();
  // backup copy
  const [p, setP] = useState(puzzle!);
  const editingRef = useRef(false);

  useEffect(() => {
    if (editingRef.current) {
      return;
    }

    setP(puzzle!);
  }, [puzzle]);

  const onPick = useCallback(() => {
    if (!setPuzzle) {
      return;
    }
    editingRef.current = false;

    // trigger an update so our local copy P is saved.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setPuzzle((puz: any) => ({ ...puz }));
  }, [setPuzzle]);

  const onPicking = useCallback(
    (prong: number, _layer: number) => {
      if (!setPuzzle) {
        return;
      }
      editingRef.current = true;

      const layer = Math.min(p.layers.length - 1, _layer);
      if (!p.layers[layer].includes(prong)) {
        setPuzzle(
          update(p, {
            layers: {
              [layer]: { $push: [prong] },
            },
          })
        );
      } else {
        const index = p.layers[layer].indexOf(prong);
        setPuzzle(
          update(p, {
            layers: {
              [layer]: { $splice: [[index, 1]] },
            },
          })
        );
      }
    },
    [p, setPuzzle]
  );

  const onCancel = useCallback(() => {
    setPuzzle(p);
  }, [p, setPuzzle]);

  useEffect(() => {
    if (!isPuzzle) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      if (e.target !== canvasRef.current && editingRef.current) {
        editingRef.current = false;
        setPuzzle(p);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    // eslint-disable-next-line consistent-return
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, [canvasRef, isPuzzle, p, setPuzzle]);

  useCanvasEventTransformers(canvasRef, isPuzzle && !solved, onPick, onPicking, onCancel);
};

export default useCanvasEdit;
