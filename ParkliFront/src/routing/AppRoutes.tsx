import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router';
import { ROUTE_REGISTRY } from './registry';
import { useAuth } from '../hooks/useAuth';

export const AppRoutes: React.FC = () => {

  const { isAuthenticated } = useAuth();
  
  return (
    <Suspense fallback={<div className="loading-spinner">Loading...</div>}>
      <Routes>
        {Object.entries(ROUTE_REGISTRY).map(([key, config]) => {
          const Component = config.component;

          // Guard 1: Unauthenticated user trying to access protected route
        //   if (config.isProtected && !isAuthenticated) {
        //     return (
        //       <Route
        //         key={key}
        //         path={config.path}
        //         element={<Navigate to={ROUTE_REGISTRY.LOGIN.path} replace />}
        //       />
        //     );
        //   }

          // Guard 2: Unauthorized role
        //   if (
        //     config.roles &&
        //     userRole &&
        //     !config.roles.includes(userRole)
        //   ) {
        //     return (
        //       <Route
        //         key={key}
        //         path={config.path}
        //         element={<Navigate to={ROUTE_REGISTRY.HOME.path} replace />}
        //       />
        //     );
        //   }

          // Default: Render the route normally
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