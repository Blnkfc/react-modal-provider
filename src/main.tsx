import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { ModalProvider } from './components/ModalProvider.tsx';
// import { DefaultOverrideExample } from './components/DefaultOverrideExample.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <ModalProvider ModalOverride={DefaultOverrideExample}> */}
    <ModalProvider options={{ universalLogs: true, rethrowOnCloseError: false }}>
      <App />
    </ModalProvider>
  </StrictMode>
);
