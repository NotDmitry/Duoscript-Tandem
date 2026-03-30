import { createContext, useState } from 'react';
import type { ReactNode } from 'react';

interface UIContextType {
  toast: ToastType | null;
  showToast: (message: string, type: 'error' | 'success') => void;
  clearToast: () => void;
}

interface ToastType {
  type: 'error' | 'success';
  message: string;
}

const UIContext = createContext<UIContextType | null>(null);

export const UIProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState<ToastType | null>(null);

  const showToast = (message: string, type: 'error' | 'success') => {
    setToast({ message, type });
  };

  const clearToast = () => {
    setToast(null);
  };

  return (
    <UIContext.Provider value={{ toast, clearToast, showToast }}>
      {children}
    </UIContext.Provider>
  );
};
export default UIContext;
