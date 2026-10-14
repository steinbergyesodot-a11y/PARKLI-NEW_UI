import { CiUser } from "react-icons/ci";
import { ROUTE_REGISTRY } from "../routing/registry";
import Button from "./primitives/Button";

export function CompactNavbar() {
  return (
    <header className="w-full">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="flex h-20 items-center justify-between" aria-label="Page navigation">
          <Button
            to={ROUTE_REGISTRY.HOME.path}
            variant="ghost"
            aria-label="Parkli home"
            className="rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-start"
          >
            <img src="/logo.png" alt="Parkli" className="h-25 w-40 object-contain" />
          </Button>
          <button
            type="button"
            aria-label="User profile"
            className="flex size-10 items-center justify-center rounded-full text-text-main transition hover:bg-surface-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-start"
          >
            <CiUser aria-hidden="true" className="text-2xl" />
          </button>
        </nav>
      </div>
      <div aria-hidden="true" className="h-0.5 w-full bg-border-subtle" />
    </header>
  );
}