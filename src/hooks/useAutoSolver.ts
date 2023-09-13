import { useContext } from 'react';
import { AutoSolverContext } from '../context/AutoSolverContext';

export const useAutoSolver = () => {
  return useContext(AutoSolverContext);
};
