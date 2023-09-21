import { Dispatch, RefObject, SetStateAction, useCallback, useEffect, useRef, useState } from "react";
import update from 'immutability-helper';
import { useCanvasEventTransformers } from "./useCanvasEventTransformers";

export const useCanvasEditKey = (
  canvasRef: RefObject<HTMLCanvasElement>,
  isActive = false,
  prongs: number[],
  onChangeKey?: Dispatch<SetStateAction<number[]>>
) => {
  const draggingRef = useRef(false);
  const exitDelayRef = useRef(false);
  const backupRef = useRef(prongs);
  const currentProngsRef = useRef(prongs);

  useEffect(() => {
    if (draggingRef.current) return;

    backupRef.current = prongs;
    currentProngsRef.current = prongs;
  }, [prongs]);

  const onPick = useCallback(() => {
    draggingRef.current = false;
    backupRef.current = currentProngsRef.current;
  }, []);

  const onPicking = useCallback((prong: number) => {
    if (!onChangeKey || exitDelayRef.current) return;
    draggingRef.current = true;
    const index = backupRef.current.indexOf(prong);
    let next: number[];
    if (index === -1) {
      next = update(backupRef.current, { $push: [prong] });
    } else {
      next = update(backupRef.current, { $splice: [[index, 1]] });
    }
    currentProngsRef.current = next;
    onChangeKey(next);
  }, [onChangeKey]);

  const onCancel = useCallback(() => {
    draggingRef.current = false;
    exitDelayRef.current = true;
    setTimeout(() => exitDelayRef.current = false, 50);
    onChangeKey?.(backupRef.current);
  }, []);

  useCanvasEventTransformers(canvasRef, isActive, onPick, onPicking, onCancel);
}
