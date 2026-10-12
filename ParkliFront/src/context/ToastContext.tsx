import React, { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { Card } from '../components/primitives/Card';
import Button from '../components/primitives/Button';

export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = 'info') => {

    const id = Math.random().toString(36).substring(2, 9);

    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto-dismiss: Remove this toast from the state array after 4 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 4000);
  }, []);

  // Manual dismiss (when user clicks the '✕' button on the popup)
  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <div className="toast-container fixed right-4 top-4 z-[100] flex w-[calc(100%-2rem)] max-w-sm flex-col gap-3 sm:right-6 sm:top-6">
        {toasts.map((toast) => (
          <Card
            key={toast.id}
            className={`toast toast-${toast.type} !h-auto flex items-center justify-between gap-3 p-4 ${
              toast.type === 'success'
                ? '!border-emerald-300 !bg-emerald-50 !text-emerald-900'
                : toast.type === 'error'
                  ? '!border-red-300 !bg-red-50 !text-red-900'
                  : '!border-sky-300 !bg-sky-50 !text-sky-900'
            }`}
          >
            <span>{toast.message}</span>
            <Button
              type="button"
              aria-label="Dismiss notification"
              title="Dismiss notification"
              className="!min-h-0 !rounded-md !px-2 !py-1 !bg-transparent !text-slate-600 hover:!bg-slate-100"
              onClick={() => removeToast(toast.id)}
            >
              ✕
            </Button>
          </Card>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};