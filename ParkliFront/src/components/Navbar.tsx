import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import { ROUTE_REGISTRY } from '../routing/registry';
import { useAuth } from '../hooks/useAuth';
import Button from './primitives/Button';

export const Navbar = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  // Don't render Navbar on the login page
  if (location.pathname === ROUTE_REGISTRY.LOGIN.path) {
    return null;
  }

  return (
    <header className={`sticky top-3 z-50 mx-auto w-[calc(100%-2rem)] max-w-7xl rounded-xl border border-slate-200 ${location.pathname === '/' ? 'bg-white' : 'bg-white/95'} shadow-sm shadow-slate-900/5 backdrop-blur lg:w-[70%]`}>
      <nav className="relative mx-auto flex h-[76px] w-full items-center justify-between gap-10 px-5 sm:px-8" aria-label="Main navigation">
        <Link to={ROUTE_REGISTRY.HOME.path} className="flex shrink-0 items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-start focus-visible:ring-offset-2" onClick={closeMenu}>
          <img src="/logo.png" alt="Parkli home" className="h-12 w-40 object-cover" />
        </Link>

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
            <NavLink
              to={ROUTE_REGISTRY.DASHBOARD.path}
              className={({ isActive }) => `rounded-lg px-3.5 py-2.5 text-md font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-start focus-visible:ring-offset-2 ${isActive ? 'bg-blue-50 text-primary-start' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'}`}
              onClick={closeMenu}
            >
              Find parking
            </NavLink>
            <NavLink
              to={ROUTE_REGISTRY.ABOUT.path}
              className={({ isActive }) => `rounded-lg px-3.5 py-2.5 text-md font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-start focus-visible:ring-offset-2 ${isActive ? 'bg-blue-50 text-primary-start' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'}`}
              onClick={closeMenu}
            >
              About
            </NavLink>
            <NavLink
              to={ROUTE_REGISTRY.HELP.path}
              className={({ isActive }) => `rounded-lg px-3.5 py-2.5 text-md font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-start focus-visible:ring-offset-2 ${isActive ? 'bg-blue-50 text-primary-start' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'}`}
              onClick={closeMenu}
            >
              Help
            </NavLink>
          </div>

          <div className="flex flex-col gap-2 border-t border-slate-100 pt-4 md:flex-row md:items-center md:gap-3 md:border-0 md:pt-0">
            {isAuthenticated ? (
              <>
                <Link className="rounded-lg px-3.5 py-2.5 text-md font-semibold text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-start focus-visible:ring-offset-2" to={ROUTE_REGISTRY.MY_BOOKINGS.path} onClick={closeMenu}>
                  My bookings
                </Link>
                <Link className="rounded-lg px-3.5 py-2.5 text-md font-semibold text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-start focus-visible:ring-offset-2" to={ROUTE_REGISTRY.MY_LISTINGS.path} onClick={closeMenu}>
                  My listings
                </Link>
                <Button to={ROUTE_REGISTRY.BECOME_HOST.path} className="inline-flex min-h-10 items-center justify-center text-md font-bold text-white shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-start focus-visible:ring-offset-2" onClick={closeMenu}>
                  Host your space
                </Button>
              </>
            ) : (
              <>
                <Link className="rounded-lg px-3.5 py-2.5 text-md font-semibold text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-start focus-visible:ring-offset-2" to={ROUTE_REGISTRY.LOGIN.path} onClick={closeMenu}>
                  Log in
                </Link>
                <Button to={ROUTE_REGISTRY.SIGNUP.path} className="inline-flex bg-primary-start min-h-10 items-center justify-center text-md font-bold text-white shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-start focus-visible:ring-offset-2" onClick={closeMenu}>
                  Sign up
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};