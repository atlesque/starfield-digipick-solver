import update from 'immutability-helper';
import { DigiKey } from '../types/DigiKey';
import { Puzzle } from '../types/Puzzle';
import { rotateKey } from './rotateKey';

class Key implements DigiKey {
  constructor(
    public id: number,
    public prongs: number[],
    public layers: number[][][]
  ) {}
}

let iterations = 0;

const findPath = (
  keys: Key[],
  path: string,
  layer: number,
  puzzle: Puzzle,
  failed: Set<string>
): string => {
  iterations++;
  const layerKeys = keys.filter(k => k.layers[layer].length);

  for (const key of layerKeys) {
    for (const prongs of key.layers[layer]) {
      // Check if this key is already used!
      if (path !== '|' && isKeyInPath(key, path)) {
        continue;
      }

      const nextPath = path + `${layer}-${key.id}-${prongs.join('-')}` + '|';

      // Create the new semi-solved puzzle
      let nextPuzzle: Puzzle;
      try {
        nextPuzzle = applyKeyToPuzzleOnLayer(prongs, puzzle, layer);
      } catch (e) {
        continue;
      }
      // Determine if the puzzle is solved!
      if (nextPuzzle.layers.every(l => !l.length)) {
        return nextPath;
      }

      try {
        return findPath(keys, nextPath, layer + (!nextPuzzle.layers[layer].length ? 1 : 0), nextPuzzle, failed);
      } catch (e) {}
    }
  }
  
  throw new Error('No path found :(');
}

export const solvePuzzle = (puzzle: Puzzle, _keys: DigiKey[]): DigiKey[] => {
  const keys = _keys.map((k, i) => new Key(i, k.prongs, getValidPositionsByLayer(k.prongs, puzzle.layers)));
  
  iterations = 0;
  const path = findPath(keys, '|', 0, puzzle, new Set<string>())
  console.log('Iterations: ', iterations);

  const solvedKeys = path.split('|').filter(f => f).map((stringKey) => {
    const [layer, id, ...prongs] = stringKey.split('-');
    return {
      id: Number(id),
      prongs: prongs.map(p => Number(p)),
      layer: Number(layer)
    }
  });
  
  return _keys.map((key, id) => {
    const sKey = solvedKeys.find(k => k.id === id);

    if (!sKey) {
      return { ...key, layer: 'X' };
    }

    return {
      prongs: sKey.prongs,
      layer: (sKey.layer + 1).toString()
    }
  });
};

/* UTILITIES */

const getValidPositionsByLayer = (prongs: number[], layers: number[][]) => {
  return layers.map(l => getValidPositionsForKeyOnLayer(prongs, l))
}

const getValidPositionsForKeyOnLayer = (prongs: number[], layer: number[]) => {
  const valid: number[][] = []
  for (let r = 0; r < 32; r += 2) {
    const p = rotateKey(prongs, r);
    if (doesKeyFit(p, layer)) {
      valid.push(p)
    }
  }
  return valid;
}

const doesKeyFit = (prongs: number[], layer: number[]) => {
  return prongs.every(p => layer.includes(p));
}

const applyKeyToPuzzleOnLayer = (prongs: number[], puzzle: Puzzle, layer: number) => {
  if (!doesKeyFit(prongs, puzzle.layers[layer])) {
    throw new Error('Key no longer fits!');
  }

  return update(puzzle, {
    layers: {
      [layer]: { $set: applyKeyToLayer(prongs, puzzle.layers[layer] )}
    }
  })
}

const applyKeyToLayer = (prongs: number[], layer: number[]) => {
  return layer.filter(p => !prongs.includes(p));
}

const isKeyInPath = (key: Key, path: string) => {
  const keys = path.split('|').filter(f => f);
  
  return keys.some(kString => {
    const [, id] = kString.split('-');
    return key.id.toString() === id;
  });
}
