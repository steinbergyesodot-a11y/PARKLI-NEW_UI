import { BrowserRouter } from 'react-router';
import { AppRoutes } from './routing/AppRoutes';
import { Navbar } from './components/Navbar';
import { useLocation } from 'react-router';
import { PromoBanner } from './features/homepage/components/promoBanner';
import { HomePageBackground } from './features/homepage/components/HomePageBackground';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';

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
    <ToastProvider>
    <AuthProvider>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </AuthProvider>
    </ToastProvider>
  );
};