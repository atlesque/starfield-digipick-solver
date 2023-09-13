import { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { getProngNumber } from '../utils/getProngNumber';

export const useCanvasEventTransformers = (
  canvasRef: RefObject<HTMLCanvasElement>,
  edit: boolean = false,
  onPick: (prong: number, layer: number) => void,
  onPicking: (prong: number, layer: number) => void
) => {
  const draggingRef = useRef(false);
  // prong:layer
  const [prong, setProng] = useState('-1:-1');
  const prongRef = useRef(prong);
  prongRef.current = prong;

  useEffect(() => {
    const [p, l] = prong.split(':').map(n => Number(n));
    if (p === -1 || l === -1) return;

    onPicking(p, l);
  }, [prong]);

  const onCommit = useCallback(() => {
    const [p, l] = prongRef.current.split(':').map(n => Number(n))
    onPick(p, l);
  }, [])

  const onStart = useCallback((x: number, y: number) => {
    if (!canvasRef.current) return;
    const center = canvasRef.current.width / 2;
    setProng(() => getProngNumber(x, y, center));
  }, [])

  const onMove = useCallback((x: number, y: number) => {
    if (!canvasRef.current) return;
    const center = canvasRef.current.width / 2;
    setProng(() => getProngNumber(x, y, center));
  }, [])

  const onRelease = useCallback(() => {
    onCommit();
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !edit) return;

    const onMouseDown = (e: MouseEvent) => {
      draggingRef.current = true;
      onStart(e.offsetX, e.offsetY);
    }
    const onMouseMove = (e: MouseEvent) => {
      if (!draggingRef.current) return;
      const { offsetX, offsetY } = e;
      requestAnimationFrame(() => {
        onMove(offsetX, offsetY);
      })
    }
    const onMouseUp = () => {
      draggingRef.current = false;
      onRelease();
    }
    canvas.addEventListener('mousedown', onMouseDown)
    canvas.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('mouseup', onMouseUp)
    window.addEventListener('mouseup', onMouseUp)

    const onTouchStart = () => {
      draggingRef.current = true;
    }
    const onTouchMove = () => {
      if (!draggingRef.current) return;
    }
    const onTouchEnd = () => {
      draggingRef.current = false;
    }
    canvas.addEventListener('touchstart', onTouchStart)
    canvas.addEventListener('touchmove', onTouchMove)
    canvas.addEventListener('touchend', onTouchEnd)

    return () => {
      canvas.removeEventListener('mousedown', onMouseDown)
      canvas.removeEventListener('mousemove', onMouseMove)
      canvas.removeEventListener('mouseup', onMouseUp)
      canvas.removeEventListener('touchstart', onTouchStart)
      canvas.removeEventListener('touchmove', onTouchMove)
      canvas.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('mouseup', onMouseUp)
    }
  }, [canvasRef.current, edit, onStart])
};
