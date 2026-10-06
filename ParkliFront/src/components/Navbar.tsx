import { useState } from 'react';
import { useLocation } from 'react-router';
import { ROUTE_REGISTRY } from '../routing/registry';
import { useAuth } from '../context/AuthContext';
import Button from './primitives/Button';
import { Card } from './primitives/Card';

export const Navbar = () => {
  const location = useLocation();
  const { user } = useAuth();
  const isAuthenticated = user !== null;
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);
  const navLinkClass = (path: string, inactiveClassName = 'text-slate-600 hover:bg-slate-100 hover:text-slate-950') => {
    const isActive = location.pathname === path || location.pathname.startsWith(`${path}/`);
    return `rounded-lg px-3.5 py-2.5 text-md font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-start focus-visible:ring-offset-2 ${isActive ? 'bg-blue-50 text-primary-start' : inactiveClassName}`;
  };

  // Don't render Navbar on the login page
  if (location.pathname === ROUTE_REGISTRY.LOGIN.path || location.pathname === ROUTE_REGISTRY.SIGNUP.path) {
    return null;
  }

  return (
    <header className="sticky top-3 z-50 mx-auto w-[calc(100%-2rem)] max-w-7xl lg:w-[70%]">
      <Card className={`h-auto w-full rounded-xl border border-slate-200 ${location.pathname === '/' ? 'bg-white' : 'bg-white/95'} shadow-sm shadow-slate-900/5 backdrop-blur`}>
        <nav className="relative mx-auto flex h-[76px] w-full items-center justify-between gap-10 px-5 sm:px-8" aria-label="Main navigation">
        <Button to={ROUTE_REGISTRY.HOME.path} variant="ghost" className="flex shrink-0 items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-start focus-visible:ring-offset-2" onClick={closeMenu}>
          <img src="/logo.png" alt="Parkli home" className="h-12 w-40 object-cover" />
        </Button>

        <button
          className="flex size-10 flex-col items-center justify-center gap-1 rounded-lg text-slate-700 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-start focus-visible:ring-offset-2 md:hidden"
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={`h-0.5 w-5 rounded-full bg-current transition-transform duration-200 ${menuOpen ? 'translate-y-1.5 rotate-45' : '-translate-y-1.5'}`} />
          <span className={`h-0.5 w-5 rounded-full bg-current transition-opacity duration-200 ${menuOpen ? 'opacity-0' : 'opacity-100'}`} />
          <span className={`h-0.5 w-5 rounded-full bg-current transition-transform duration-200 ${menuOpen ? '-translate-y-1.5 -rotate-45' : 'translate-y-1.5'}`} />
        </button>

        <div
          className={`${menuOpen ? 'absolute left-0 right-0 top-full flex' : 'hidden'} z-40 flex-col gap-4 border-t border-slate-100 bg-white px-5 py-5 shadow-lg shadow-slate-900/10 sm:px-8 md:static md:flex md:flex-1 md:flex-row md:items-center md:justify-between md:gap-6 md:border-0 md:bg-transparent md:px-0 md:py-0 md:shadow-none`}
          id="primary-navigation"
        >
          <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-1">
            <Button
              to={ROUTE_REGISTRY.DASHBOARD.path}
              variant="ghost"
              className={navLinkClass(ROUTE_REGISTRY.DASHBOARD.path)}
              onClick={closeMenu}
            >
              Find parking
            </Button>
            <Button
              to={ROUTE_REGISTRY.ABOUT.path}
              variant="ghost"
              className={navLinkClass(ROUTE_REGISTRY.ABOUT.path)}
              onClick={closeMenu}
            >
              About
            </Button>
            <Button
              to={ROUTE_REGISTRY.HELP.path}
              variant="ghost"
              className={navLinkClass(ROUTE_REGISTRY.HELP.path)}
              onClick={closeMenu}
            >
              Help
            </Button>
          </div>

          <div className="flex flex-col gap-2 border-t border-slate-100 pt-4 md:flex-row md:items-center md:gap-3 md:border-0 md:pt-0">
            {isAuthenticated ? (
              <>
                <Button to={ROUTE_REGISTRY.MY_BOOKINGS.path} variant="ghost" className={navLinkClass(ROUTE_REGISTRY.MY_BOOKINGS.path)} onClick={closeMenu}>
                  My bookings
                </Button>
                <Button to={ROUTE_REGISTRY.MY_LISTINGS.path} variant="ghost" className={navLinkClass(ROUTE_REGISTRY.MY_LISTINGS.path)} onClick={closeMenu}>
                  My listings
                </Button>
                <Button to={ROUTE_REGISTRY.BECOME_HOST.path} className="inline-flex min-h-10 items-center justify-center text-md font-bold text-white shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-start focus-visible:ring-offset-2" onClick={closeMenu}>
                  Host your space
                </Button>
              </>
            ) : (
              <>
                <Button to={ROUTE_REGISTRY.LOGIN.path} variant="ghost" className={navLinkClass(ROUTE_REGISTRY.LOGIN.path, 'text-slate-700 hover:bg-slate-100 hover:text-slate-950')} onClick={closeMenu}>
                  Log in
                </Button>
                <Button to={ROUTE_REGISTRY.SIGNUP.path} className="inline-flex bg-primary-start min-h-10 items-center justify-center text-md font-bold text-white shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-start focus-visible:ring-offset-2" onClick={closeMenu}>
                  Sign up
                </Button>
              </>
            )}
          </div>
        </div>
        </nav>
      </Card>
    </header>
  );
};