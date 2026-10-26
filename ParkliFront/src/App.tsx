import { BrowserRouter } from 'react-router';
import { AppRoutes } from './routing/AppRoutes';
import { Navbar } from './components/Navbar';
import { CompactNavbar } from './components/CompactNavbar';
import { useLocation } from 'react-router';
import { PromoBanner } from './features/homepage/components/promoBanner';
import { HomePageBackground } from './features/homepage/components/HomePageBackground';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { ROUTE_REGISTRY } from './routing/registry';

const AppLayout: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isFindParkingPage = location.pathname === ROUTE_REGISTRY.FIND_PARKING.path;
  const isAuthenticated = useAuth().isAuthenticated;

  return (
    <>
      {isHomePage  && !isAuthenticated && (
        <>
        <PromoBanner/>
        </>
      )}
      <HomePageBackground isHomePage={isHomePage}>
        {isAuthenticated ? <CompactNavbar /> : <Navbar />}
        <main className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-8">
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