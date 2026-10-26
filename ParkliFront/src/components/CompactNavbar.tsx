import { useEffect, useRef, useState } from "react";
import { CiUser } from "react-icons/ci";
import { ROUTE_REGISTRY } from "../routing/registry";
import Button from "./primitives/Button";
import { AvatarDropdown } from "./primitives/AvatarDropdown";
import { useAuth } from "../context/AuthContext";

export function CompactNavbar() {
  const [avatarOpen, setAvatarOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const profileRef = useRef<HTMLDivElement>(null);
  const profileButtonRef = useRef<HTMLButtonElement>(null);

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
    <header className="w-full border-b border-border-subtle bg-surface-base">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="flex h-20 items-center justify-between" aria-label="Page navigation">
            <Button
              to={ROUTE_REGISTRY.HOME.path}
              variant="ghost"
              aria-label="Parkli home"
              className="relative block h-16 w-36 shrink-0 overflow-hidden rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <img src="/logo.png" alt="Parkli" className="absolute left-1/2 top-1/2 h-48 w-48 max-w-none -translate-x-1/2 -translate-y-1/2 object-contain" />
            </Button>
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
              onClick={() => setAvatarOpen((open) => !open)}
              className="flex size-11 shrink-0 items-center justify-center rounded-md border border-border-subtle bg-brand-50 text-primary transition hover:bg-brand-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <CiUser aria-hidden="true" className="text-2xl" />
            </button>
            <AvatarDropdown open={avatarOpen} onClose={() => setAvatarOpen(false)} />
            </div>
            )}
        </nav>
      </div>
    </header>
  );
}