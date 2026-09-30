import React from 'react';
import { BrowserRouter } from 'react-router';
import { AppRoutes } from './routing/AppRoutes';
import { Navbar } from './components/Navbar';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
    <Navbar />
      <main>
        <AppRoutes />
      </main>
    </BrowserRouter>
  );
};