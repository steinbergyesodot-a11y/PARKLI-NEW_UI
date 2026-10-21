import { IoArrowForward, IoCarOutline, IoLocationOutline, IoWalkOutline } from "react-icons/io5";
import Button from "../components/primitives/Button";
import { ROUTE_REGISTRY } from "../routing/registry";

function HomePage() {
  return (
    <div className="-mx-4 -my-8 sm:-mx-6 lg:-mx-8">
      <section className="flex min-h-[calc(100svh-15rem)] items-center px-4 py-16 sm:min-h-[calc(100svh-14rem)] sm:px-6 sm:py-20 lg:px-8" aria-labelledby="home-title">
        <div className="w-full max-w-2xl text-white">
          <p className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-white">
            <IoLocationOutline aria-hidden="true" className="text-lg" />
            Wrigleyville, Chicago
          </p>
          <h1 id="home-title" className="text-6xl font-semibold leading-none tracking-normal sm:text-8xl">Parkli</h1>
          <p className="mt-6 max-w-lg text-2xl font-medium leading-snug sm:text-4xl">
            A neighborhood spot.<br />A better game day.
          </p>
          <p className="mt-5 max-w-md text-base leading-relaxed text-white/90 sm:text-lg">
            Park in a local driveway near Wrigley Field. Take the short walk. Be there for the first pitch.
          </p>
          <Button to={ROUTE_REGISTRY.FIND_PARKING.path} className="mt-8 inline-flex min-h-12 items-center justify-center gap-4 rounded-md px-6 text-base font-semibold shadow-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
            Find parking <IoArrowForward aria-hidden="true" className="text-xl" />
          </Button>
        </div>
      </section>
      <section className="border-t border-border-subtle bg-surface-base px-4 py-7 sm:px-6 sm:py-9 lg:px-8" aria-label="Game day parking">
        <div className="grid gap-6 sm:grid-cols-3 sm:gap-8">
          <div className="flex items-start gap-3">
            <IoLocationOutline aria-hidden="true" className="mt-1 shrink-0 text-2xl text-primary" />
            <div><h2 className="text-sm font-semibold tracking-normal text-text-main">Right in the neighborhood</h2><p className="mt-1 text-sm leading-relaxed text-text-muted">Local driveways near the ballpark.</p></div>
          </div>
          <div className="flex items-start gap-3">
            <IoCarOutline aria-hidden="true" className="mt-1 shrink-0 text-2xl text-primary" />
            <div><h2 className="text-sm font-semibold tracking-normal text-text-main">A spot for your game day</h2><p className="mt-1 text-sm leading-relaxed text-text-muted">Find parking for the game you choose.</p></div>
          </div>
          <div className="flex items-start gap-3">
            <IoWalkOutline aria-hidden="true" className="mt-1 shrink-0 text-2xl text-primary" />
            <div><h2 className="text-sm font-semibold tracking-normal text-text-main">Less driving. More baseball.</h2><p className="mt-1 text-sm leading-relaxed text-text-muted">Walk from your spot to Wrigley Field.</p></div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;