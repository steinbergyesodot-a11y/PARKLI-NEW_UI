import { useEffect, useRef, useState } from "react";
import { CiUser } from "react-icons/ci";
import { IoCloseOutline, IoMenuOutline } from "react-icons/io5";
import { useLocation } from "react-router";
import { ROUTE_REGISTRY } from "../routing/registry";
import Button from "./primitives/Button";
import { AvatarDropdown } from "./primitives/AvatarDropdown";
import { useAuth } from "../context/AuthContext";

export function CompactNavbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const profileRef = useRef<HTMLDivElement>(null);
  const profileButtonRef = useRef<HTMLButtonElement>(null);

  const closeMenu = () => {
    setMenuOpen(false);
    setAvatarOpen(false);
  };
  const navLinkClass = (path: string) => {
    const isActive = location.pathname === path || location.pathname.startsWith(`${path}/`);
    return `rounded-md px-3 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${isActive ? "bg-brand-50 text-primary" : "text-text-muted hover:bg-surface-subtle hover:text-text-main"}`;
  };
  const profileClassName = "flex size-11 shrink-0 items-center justify-center rounded-md border border-border-subtle bg-brand-50 text-primary transition hover:bg-brand-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";

  useEffect(() => {
    if (!avatarOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !profileRef.current?.contains(event.target)) {
        setAvatarOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setAvatarOpen(false);
        profileButtonRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [avatarOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border-subtle bg-surface-base">
        <nav className="relative mx-auto flex h-20 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:gap-8 lg:px-8" aria-label="Main navigation">
            <Button
              to={ROUTE_REGISTRY.HOME.path}
              variant="ghost"
              aria-label="Parkli home"
              className="relative block h-16 w-36 shrink-0 overflow-hidden rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              onClick={closeMenu}
            >
              <img src="/logo.png" alt="Parkli" className="absolute left-1/2 top-1/2 h-48 w-48 max-w-none -translate-x-1/2 -translate-y-1/2 object-contain" />
            </Button>
            <button
              type="button"
              className="ml-auto flex size-11 shrink-0 items-center justify-center rounded-md border border-border-subtle text-text-main transition hover:bg-surface-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 lg:hidden"
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              aria-controls="compact-navigation"
              onClick={() => {
                setMenuOpen((open) => !open);
                setAvatarOpen(false);
              }}
            >
              {menuOpen ? <IoCloseOutline aria-hidden="true" className="text-2xl" /> : <IoMenuOutline aria-hidden="true" className="text-2xl" />}
            </button>
            <div
              id="compact-navigation"
              className={`${menuOpen ? "absolute left-0 right-0 top-full flex" : "hidden"} z-40 max-h-[calc(100svh-9rem)] flex-col gap-4 overflow-y-auto border-t border-border-subtle bg-surface-base px-4 py-5 shadow-pop sm:px-6 lg:static lg:flex lg:max-h-none lg:flex-1 lg:flex-row lg:items-center lg:justify-between lg:gap-6 lg:overflow-visible lg:border-0 lg:bg-transparent lg:px-0 lg:py-0 lg:shadow-none`}
            >
              <div className="flex flex-col gap-1 lg:flex-row lg:items-center">
                <Button to={ROUTE_REGISTRY.FIND_PARKING.path} variant="ghost" className={navLinkClass(ROUTE_REGISTRY.FIND_PARKING.path)} onClick={closeMenu}>
                  Find parking
                </Button>
                <Button to={ROUTE_REGISTRY.ABOUT.path} variant="ghost" className={navLinkClass(ROUTE_REGISTRY.ABOUT.path)} onClick={closeMenu}>
                  About
                </Button>
                <Button to={ROUTE_REGISTRY.HELP.path} variant="ghost" className={navLinkClass(ROUTE_REGISTRY.HELP.path)} onClick={closeMenu}>
                  Help
                </Button>
              </div>
              {isAuthenticated && (
                <Button to={ROUTE_REGISTRY.BECOME_HOST.path} className="inline-flex min-h-11 items-center justify-center rounded-md text-sm font-semibold text-white shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2" onClick={closeMenu}>
                  Host your space
                </Button>
              )}
            </div>
            {isAuthenticated && (
            <div ref={profileRef} className="relative shrink-0" onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) setAvatarOpen(false);
            }}>
            <button
              ref={profileButtonRef}
              type="button"
              aria-label="User profile"
              aria-controls="account-dropdown"
              aria-expanded={avatarOpen}
              onClick={() => {
                setAvatarOpen((open) => !open);
                setMenuOpen(false);
              }}
              className={profileClassName}
            >
              <CiUser aria-hidden="true" className="text-2xl" />
            </button>
            <AvatarDropdown open={avatarOpen} onClose={closeMenu} />
            </div>
            )}
            {!isAuthenticated && (
              <Button to={ROUTE_REGISTRY.PROFILE.path} variant="ghost" aria-label="User profile" className={profileClassName} onClick={closeMenu}>
                <CiUser aria-hidden="true" className="text-2xl" />
              </Button>
            )}
        </nav>
    </header>
  );
}