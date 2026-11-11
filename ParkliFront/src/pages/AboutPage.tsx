import {
  IoArrowForward,
  IoCarOutline,
  IoHomeOutline,
  IoLeafOutline,
  IoLocationOutline,
  IoPeopleOutline,
} from "react-icons/io5";
import Button from "../components/primitives/Button";
import { ROUTE_REGISTRY } from "../routing/registry";

function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <header className="max-w-3xl">
        <p className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-primary">
          <IoLocationOutline aria-hidden="true" className="text-lg" />
          Wrigleyville, Chicago
        </p>
        <h1 className="text-4xl font-semibold text-text-main sm:text-5xl">Our Story</h1>
        <p className="mt-5 text-lg leading-relaxed text-text-muted sm:text-xl">
          Finding parking for a Cubs game at Wrigley Field can feel impossible. Between crowded
          streets, expensive lots, and the rush of fans all arriving at once, most people spend more
          time circling the neighborhood than enjoying the game.
        </p>
      </header>

      <section className="mt-10 max-w-3xl space-y-5 text-base leading-relaxed text-text-main sm:text-lg" aria-label="Why Parkli exists">
        <p>
          Parkli was created to make that experience easier. Here, local residents can list their
          personal driveways, garages, or parking spots, giving fans a simple, stress-free way to
          secure parking before they even leave home.
        </p>
        <p>
          Whether you're heading to the ballpark or you live nearby and want to earn extra income
          from your unused space, this community-driven marketplace connects neighbors in a way
          that benefits everyone.
        </p>
      </section>

      <section className="mt-12 grid gap-6 sm:grid-cols-2" aria-label="For fans and hosts">
        <article className="rounded-lg border border-border-subtle bg-surface-base p-6 shadow-card sm:p-8">
          <div className="mb-4 inline-flex size-11 items-center justify-center rounded-lg bg-brand-50 text-2xl text-primary">
            <IoCarOutline aria-hidden="true" />
          </div>
          <h2 className="text-xl font-semibold text-text-main">For fans</h2>
          <p className="mt-3 leading-relaxed text-text-muted">
            Parkli means peace of mind. No more last-minute stress, overpriced lots, or long walks
            from distant garages. Instead, you can reserve a driveway just minutes from the action,
            knowing your spot is waiting for you.
          </p>
        </article>
        <article className="rounded-lg border border-border-subtle bg-surface-base p-6 shadow-card sm:p-8">
          <div className="mb-4 inline-flex size-11 items-center justify-center rounded-lg bg-brand-50 text-2xl text-primary">
            <IoHomeOutline aria-hidden="true" />
          </div>
          <h2 className="text-xl font-semibold text-text-main">For hosts</h2>
          <p className="mt-3 leading-relaxed text-text-muted">
            Parkli is a chance to earn extra income effortlessly while supporting your community.
            By opening up their driveways, hosts help reduce traffic congestion, cut down on
            emissions from cars circling for parking, and make their neighborhoods more welcoming.
          </p>
        </article>
      </section>

      <section className="mt-12 rounded-lg bg-brand-900 px-6 py-10 text-white sm:px-10 sm:py-12" aria-labelledby="mission-title">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="max-w-2xl">
            <h2 id="mission-title" className="text-2xl font-semibold sm:text-3xl">Our mission</h2>
            <p className="mt-4 leading-relaxed text-blue-100 sm:text-lg">
              Our mission is simple: to make parking smarter, fairer, and more human. Whether you're
              a die-hard sports fan, a concert lover, or a local resident looking to share your
              space, Parkli is here to make the experience seamless. Together, we're transforming
              the way people think about parking, one driveway at a time.
            </p>
          </div>
          <ul className="grid gap-4 text-sm sm:grid-cols-3 lg:grid-cols-1">
            <li className="flex items-center gap-3">
              <IoPeopleOutline aria-hidden="true" className="shrink-0 text-2xl text-brand-200" />
              Neighbors helping neighbors
            </li>
            <li className="flex items-center gap-3">
              <IoLeafOutline aria-hidden="true" className="shrink-0 text-2xl text-brand-200" />
              Less circling, fewer emissions
            </li>
            <li className="flex items-center gap-3">
              <IoLocationOutline aria-hidden="true" className="shrink-0 text-2xl text-brand-200" />
              Minutes from Wrigley Field
            </li>
          </ul>
        </div>
      </section>

      <section className="mt-12 flex flex-col items-start justify-between gap-6 border-t border-border-subtle pt-10 sm:flex-row sm:items-center" aria-label="Get started">
        <div>
          <h2 className="text-xl font-semibold text-text-main">Ready for a better game day?</h2>
          <p className="mt-1 text-text-muted">Find a spot near the ballpark, or share your driveway with fans.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button to={ROUTE_REGISTRY.FIND_PARKING.path} className="inline-flex items-center gap-2 font-semibold">
            Find parking <IoArrowForward aria-hidden="true" className="text-lg" />
          </Button>
          <Button
            to={ROUTE_REGISTRY.BECOME_HOST.path}
            variant="ghost"
            className="inline-flex items-center gap-2 rounded-lg border border-border-subtle bg-surface-base px-4 py-2 font-semibold text-primary hover:bg-brand-50"
          >
            Become a host
          </Button>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
