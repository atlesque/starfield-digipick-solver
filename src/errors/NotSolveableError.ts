import { DigiKey } from '../types/DigiKey';

export class NotSolveableError extends Error {
  constructor(
    message: string,
    public keys: DigiKey[]
  ) {
    super(message);
  }
}
