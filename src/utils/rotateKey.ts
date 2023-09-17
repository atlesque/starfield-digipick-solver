import { MAX_PRONGS } from "../constants";

export const rotateKey = (prongs: number[], by: number) => {
  return prongs.map(n => {
    const next = (((n + by) - 1) % MAX_PRONGS) + 1;
    if (next < 1) return next + MAX_PRONGS;
    return next;
  })
}
