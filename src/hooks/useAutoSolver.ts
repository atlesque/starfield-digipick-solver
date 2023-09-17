import { useContext } from 'react';
import { AutoSolverContext } from '../context/AutoSolverContext';

const useAutoSolver = () => useContext(AutoSolverContext);

export default useAutoSolver;
