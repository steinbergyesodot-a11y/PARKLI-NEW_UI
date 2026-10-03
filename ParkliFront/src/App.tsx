import React from 'react';
import { BrowserRouter } from 'react-router';
import { AppRoutes } from './routing/AppRoutes';
import { Navbar } from './components/Navbar';
import { AuthProvider } from './hooks/useAuth';
import { useLocation } from 'react-router';
import { Card, CardDescription, CardTitle } from './components/primitives/Card';
import Button from './components/primitives/Button';

const AppLayout: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <>
      {isHomePage && (
        <>
          <Card className="mx-auto rounded-lg border border-slate-200 bg-primary-start">
            <div className="mx-auto flex h-25 w-full max-w-6xl items-center justify-between px-6 sm:px-10 lg:px-16">
              <div className="flex flex-col gap-2">
              <CardTitle className="text-white text-2xl font-black">Earn money from your driveway</CardTitle>
              <CardDescription className="text-white text-md">List your driveway and start earning with Parkli</CardDescription>
              </div>
            <Button className="h-10 w-32 bg-white text-primary-start">Get Started</Button>
            </div>
          </Card>

        </>
      )}
      <div
        className={isHomePage ? 'min-h-screen bg-cover bg-center bg-no-repeat' : undefined}
        style={isHomePage ? {
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35)), url('/assets/wrigley.jpg')",
        } : undefined}
      >
        <Navbar />
        <main>
          <AppRoutes />
        </main>
      </div>
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