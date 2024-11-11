import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import 'react-multi-carousel/lib/styles.css';
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';
import { DataContextProvider } from './context/DataContextProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DataContextProvider>
      <App />
    </DataContextProvider>
    <ToastContainer />
  </StrictMode>
);
