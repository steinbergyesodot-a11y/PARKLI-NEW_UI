import React, { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

interface LoadingContextType {
  isLoading: boolean;
  showLoading: (message?: string) => void;
  hideLoading: () => void;
}

const LoadingContext = createContext<LoadingContextType | null>(null);

export const LoadingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [message, setMessage] = useState<string | null>(null);
  const isLoading = message !== null;

  const showLoading = useCallback((text: string = 'Loading…') => {
    setMessage(text);
  }, []);

  const hideLoading = useCallback(() => {
    setMessage(null);
  }, []);

  return (
    <LoadingContext.Provider value={{ isLoading, showLoading, hideLoading }}>
      {children}

      {isLoading && (
        <div
          role="status"
          aria-live="polite"
          aria-busy="true"
          className="fixed inset-0 z-[90] flex flex-col items-center justify-center gap-6 bg-surface-base"
        >
          <img
            src="/logo.png"
            alt="Parkli"
            className="h-56 w-56 max-w-none object-contain animate-logo-pulse"
          />

          <div className="flex flex-col items-center gap-4">
            <p className="font-heading text-lg font-semibold text-text-main">{message}</p>
            <div className="flex items-center gap-2" aria-hidden="true">
              <span className="size-2.5 rounded-full bg-primary animate-dot-bounce" />
              <span className="size-2.5 rounded-full bg-primary animate-dot-bounce [animation-delay:150ms]" />
              <span className="size-2.5 rounded-full bg-primary animate-dot-bounce [animation-delay:300ms]" />
            </div>
          </div>
        </div>
      )}
    </LoadingContext.Provider>
  );
};

export const useLoading = (): LoadingContextType => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};
