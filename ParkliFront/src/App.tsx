import React, { use } from 'react';
import { BrowserRouter } from 'react-router';
import { AppRoutes } from './routing/AppRoutes';
import { Navbar } from './components/Navbar';
// import { AuthProvider } from './hooks/useAuth';
import { useLocation } from 'react-router';
import { PromoBanner } from './features/homepage/components/promoBanner';
import { HomePageBackground } from './features/homepage/components/HomePageBackground';
import { AuthProvider, useAuth } from './context/AuthContext';

const AppLayout: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isAuthenticated = useAuth().isAuthenticated;

  return (
    <>
      {isHomePage  && !isAuthenticated && (
        <>
        <PromoBanner/>
        </>
      )}
      <HomePageBackground isHomePage={isHomePage}>
        <Navbar />
        <main>
          <AppRoutes />
        </main>
      </HomePageBackground>
    </>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </AuthProvider>
  );
};