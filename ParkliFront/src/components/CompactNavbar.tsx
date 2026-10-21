import { CiUser } from "react-icons/ci";
import { ROUTE_REGISTRY } from "../routing/registry";
import Button from "./primitives/Button";

export function CompactNavbar() {
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
          <button
            type="button"
            aria-label="User profile"
            className="flex size-11 shrink-0 items-center justify-center rounded-md border border-border-subtle bg-brand-50 text-primary transition hover:bg-brand-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <CiUser aria-hidden="true" className="text-2xl" />
          </button>
        </nav>
      </div>
    </header>
  );
}