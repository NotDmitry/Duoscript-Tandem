import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App/App';
import { BrowserRouter } from 'react-router';
import { AuthProvider } from '@context/authContext';
import { UIProvider } from '@context/UIContext';

const root: HTMLElement | null = document.getElementById('root');
if (root) {
  createRoot(root).render(
    <StrictMode>
      <BrowserRouter>
        <UIProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </UIProvider>
      </BrowserRouter>
    </StrictMode>
  );
}
