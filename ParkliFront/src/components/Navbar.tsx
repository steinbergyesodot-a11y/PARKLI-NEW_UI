import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { ROUTE_REGISTRY } from '../routing/registry';
import { useAuth } from '../context/AuthContext';
import Button from './primitives/Button';
import { IoChevronDown, IoCloseOutline, IoMenuOutline } from 'react-icons/io5';

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
  const navLinkClass = (path: string, inactiveClassName = 'text-text-muted hover:bg-surface-subtle hover:text-text-main') => {
    const isActive = location.pathname === path || location.pathname.startsWith(`${path}/`);
    return `rounded-md px-3 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${isActive ? 'bg-brand-50 text-primary' : inactiveClassName}`;
  };

  // Don't render Navbar on the login page
  if (location.pathname === ROUTE_REGISTRY.LOGIN.path || location.pathname === ROUTE_REGISTRY.SIGNUP.path ||
    location.pathname === ROUTE_REGISTRY.FIND_PARKING.path
  ) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border-subtle bg-surface-base">
        <nav className="relative mx-auto flex h-20 w-full max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <Button to={ROUTE_REGISTRY.HOME.path} variant="ghost" className="relative block h-16 w-36 shrink-0 overflow-hidden rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2" onClick={closeMenu}>
          <img src="/logo.png" alt="Parkli home" className="absolute left-1/2 top-1/2 h-48 w-48 max-w-none -translate-x-1/2 -translate-y-1/2 object-contain" />
        </Button>

        <button
          className="flex size-11 shrink-0 items-center justify-center rounded-md border border-border-subtle text-text-main transition hover:bg-surface-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 lg:hidden"
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <IoCloseOutline aria-hidden="true" className="text-2xl" /> : <IoMenuOutline aria-hidden="true" className="text-2xl" />}
        </button>

        <div
          className={`${menuOpen ? 'absolute left-0 right-0 top-full flex' : 'hidden'} z-40 max-h-[calc(100svh-9rem)] flex-col gap-4 overflow-y-auto border-t border-border-subtle bg-surface-base px-4 py-5 shadow-pop sm:px-6 lg:static lg:flex lg:max-h-none lg:flex-1 lg:flex-row lg:items-center lg:justify-between lg:gap-6 lg:overflow-visible lg:border-0 lg:bg-transparent lg:px-0 lg:py-0 lg:shadow-none`}
          id="primary-navigation"
        >
          <div className="flex flex-col gap-1 lg:flex-row lg:items-center lg:gap-1">
            <Button
              to={ROUTE_REGISTRY.FIND_PARKING.path}
              variant="ghost"
              className={navLinkClass(ROUTE_REGISTRY.FIND_PARKING.path)}
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

          <div className="flex flex-col gap-2 border-t border-border-subtle pt-4 lg:flex-row lg:items-center lg:gap-3 lg:border-0 lg:pt-0">
            {isAuthenticated ? (
              <>
                <Button to={ROUTE_REGISTRY.BECOME_HOST.path} className="inline-flex min-h-11 items-center justify-center rounded-md text-sm font-semibold text-white shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2" onClick={closeMenu}>
                  Host your space
                </Button>
                <div className="relative" ref={userMenuRef}>
                  <button
                    type="button"
                    className="flex min-h-11 w-full items-center gap-2 rounded-md border border-border-subtle p-1.5 pr-3 text-sm font-medium text-text-main transition-colors hover:bg-surface-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    aria-haspopup="menu"
                    aria-expanded={userMenuOpen}
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                  >
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-50 text-xs font-semibold uppercase text-primary" aria-hidden="true">
                      {user?.firstName?.charAt(0)}
                    </span>
                    <span className="max-w-36 truncate">Hello, {user?.firstName}</span>
                    <IoChevronDown aria-hidden="true" className={`ml-auto shrink-0 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {userMenuOpen && (
                    <div role="menu" className="mt-2 flex flex-col gap-1 rounded-lg border border-border-subtle bg-surface-base p-1.5 shadow-pop lg:absolute lg:right-0 lg:top-full lg:z-50 lg:w-48">
                      <Button to={ROUTE_REGISTRY.MY_BOOKINGS.path} variant="ghost" className="rounded-md px-3 py-2.5 text-sm font-medium text-text-main hover:bg-surface-subtle" onClick={closeMenu}>
                        My bookings
                      </Button>
                      <Button to={ROUTE_REGISTRY.MY_LISTINGS.path} variant="ghost" className="rounded-md px-3 py-2.5 text-sm font-medium text-text-main hover:bg-surface-subtle" onClick={closeMenu}>
                        My listings
                      </Button>
                      <hr className="my-1 border-border-subtle" />
                      <button type="button" role="menuitem" className="rounded-md px-3 py-2.5 text-left text-sm font-medium text-danger transition-colors hover:bg-danger-subtle" onClick={handleLogout}>
                        Log out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Button to={ROUTE_REGISTRY.LOGIN.path} variant="ghost" className={navLinkClass(ROUTE_REGISTRY.LOGIN.path)} onClick={closeMenu}>
                  Log in
                </Button>
                <Button to={ROUTE_REGISTRY.SIGNUP.path} className="inline-flex min-h-11 items-center justify-center rounded-md text-sm font-semibold text-white shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2" onClick={closeMenu}>
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