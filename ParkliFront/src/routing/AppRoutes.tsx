import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router';
import { ROUTE_REGISTRY } from './registry';
// import { useAuth } from '../hooks/useAuth';

export const AppRoutes: React.FC = () => {

  // const { isAuthenticated } = useAuth();
  
  return (
    <Suspense fallback={<div className="loading-spinner">Loading...</div>}>
      <Routes>
        {Object.entries(ROUTE_REGISTRY).map(([key, config]) => {
          const Component = config.component;
          
          return (
            <Route
              key={key}
              path={config.path}
              element={<Component />}
            />
          );
        })}
      </Routes>
    </Suspense>
  );
};