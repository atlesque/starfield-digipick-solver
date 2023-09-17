import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AutoSolverProvider } from './context/AutoSolverContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AutoSolverProvider>
        <App />
      </AutoSolverProvider>
    </BrowserRouter>
  </React.StrictMode>
);
