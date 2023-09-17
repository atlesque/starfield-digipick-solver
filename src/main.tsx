import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
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
