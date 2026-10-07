import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { ROUTE_REGISTRY } from '../routing/registry';
import { useAuth } from '../context/AuthContext';
import Button from './primitives/Button';
import { Card } from './primitives/Card';

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
    setUserMenuOpen(false);
  };
  const handleLogout = async () => {
    closeMenu();
    await logout();
    navigate(ROUTE_REGISTRY.HOME.path);
  };
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
                <Button to={ROUTE_REGISTRY.BECOME_HOST.path} className="inline-flex min-h-10 items-center justify-center text-md font-bold text-white shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-start focus-visible:ring-offset-2" onClick={closeMenu}>
                  Host your space
                </Button>
                <div className="relative" ref={userMenuRef}>
                  <button
                    type="button"
                    className="flex w-full items-center gap-2 rounded-full border border-slate-200 py-1 pl-1 pr-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-start focus-visible:ring-offset-2"
                    aria-haspopup="menu"
                    aria-expanded={userMenuOpen}
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                  >
                    <span className="flex size-8 items-center justify-center rounded-full bg-primary-start text-sm font-bold uppercase text-white" aria-hidden="true">
                      {user?.firstName?.charAt(0)}
                    </span>
                    <span>Hello, {user?.firstName}</span>
                  </button>
                  {userMenuOpen && (
                    <div role="menu" className="mt-2 flex flex-col gap-1 rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg shadow-slate-900/10 md:absolute md:right-0 md:top-full md:z-50 md:w-48">
                      <Button to={ROUTE_REGISTRY.MY_BOOKINGS.path} variant="ghost" className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100" onClick={closeMenu}>
                        My bookings
                      </Button>
                      <Button to={ROUTE_REGISTRY.MY_LISTINGS.path} variant="ghost" className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100" onClick={closeMenu}>
                        My listings
                      </Button>
                      <hr className="my-1 border-slate-100" />
                      <button type="button" role="menuitem" className="rounded-lg px-3 py-2 text-left text-sm font-semibold text-red-600 transition-colors hover:bg-red-50" onClick={handleLogout}>
                        Log out
                      </button>
                    </div>
                  )}
                </div>
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