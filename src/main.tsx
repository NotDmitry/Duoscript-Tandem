import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App/App.tsx';
import { BrowserRouter } from 'react-router';
import { AuthProvider } from './shared/context/authContext.tsx';
import { UIProvider } from './shared/context/UIContext.tsx';

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
