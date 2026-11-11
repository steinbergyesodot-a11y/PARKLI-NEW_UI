import type { ComponentType } from "react";
import {
  IoArrowForward,
  IoCarOutline,
  IoHelpBuoyOutline,
  IoHomeOutline,
  IoInformationCircleOutline,
  IoMailOutline,
  IoPersonCircleOutline,
} from "react-icons/io5";
import { Link } from "react-router";
import { ROUTE_REGISTRY } from "../routing/registry";

const SUPPORT_EMAIL = "support@parkli.com";

type HelpTopic = {
  icon: ComponentType<{ className?: string; "aria-hidden"?: boolean | "true" | "false" }>;
  title: string;
  description: string;
  to: string;
  linkLabel: string;
};

const HELP_TOPICS: HelpTopic[] = [
  {
    icon: IoCarOutline,
    title: "Find Parking",
    description: "Search for available driveways near stadiums and events.",
    to: ROUTE_REGISTRY.FIND_PARKING.path,
    linkLabel: "Go to Find Parking",
  },
  {
    icon: IoHomeOutline,
    title: "List Your Driveway",
    description: "Earn money by hosting your parking spot.",
    to: ROUTE_REGISTRY.BECOME_HOST.path,
    linkLabel: "List a Driveway",
  },
  {
    icon: IoPersonCircleOutline,
    title: "Manage Your Profile",
    description: "Update your info, view bookings, and manage listings.",
    to: ROUTE_REGISTRY.PROFILE.path,
    linkLabel: "Go to Profile",
  },
  {
    icon: IoInformationCircleOutline,
    title: "Learn About Parkli",
    description: "Understand how the platform works.",
    to: ROUTE_REGISTRY.ABOUT.path,
    linkLabel: "About Parkli",
  },
];

function HelpPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <header className="max-w-3xl">
        <p className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-primary">
          <IoHelpBuoyOutline aria-hidden="true" className="text-lg" />
          Help Center
        </p>
        <h1 className="text-4xl font-semibold text-text-main sm:text-5xl">How can we help?</h1>
        <p className="mt-5 text-lg leading-relaxed text-text-muted sm:text-xl">
          Everything you need to find a spot, host your driveway, and manage your account on Parkli.
        </p>
      </header>

      <section className="mt-12" aria-labelledby="help-topics-title">
        <h2 id="help-topics-title" className="text-2xl font-semibold text-text-main">
          What you can do on Parkli
        </h2>
        <ul className="mt-6 grid gap-6 sm:grid-cols-2">
          {HELP_TOPICS.map(({ icon: Icon, title, description, to, linkLabel }) => (
            <li
              key={title}
              className="flex flex-col rounded-lg border border-border-subtle bg-surface-base p-6 shadow-card transition hover:shadow-pop sm:p-8"
            >
              <div className="mb-4 inline-flex size-11 items-center justify-center rounded-lg bg-brand-50 text-2xl text-primary">
                <Icon aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold text-text-main">{title}</h3>
              <p className="mt-2 flex-1 leading-relaxed text-text-muted">{description}</p>
              <Link
                to={to}
                className="mt-5 inline-flex items-center gap-2 font-semibold text-primary transition hover:text-primary-hover"
              >
                {linkLabel} <IoArrowForward aria-hidden="true" className="text-lg" />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12 rounded-lg bg-brand-900 px-6 py-10 text-white sm:px-10 sm:py-12" aria-labelledby="support-title">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-xl">
            <h2 id="support-title" className="text-2xl font-semibold sm:text-3xl">Need more help?</h2>
            <p className="mt-3 leading-relaxed text-blue-100 sm:text-lg">
              If you&rsquo;re having issues with bookings or hosting, contact us and we&rsquo;ll get back to you.
            </p>
          </div>
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="inline-flex shrink-0 items-center gap-3 rounded-lg bg-white px-5 py-3 font-semibold text-primary shadow-none transition hover:bg-brand-50"
          >
            <IoMailOutline aria-hidden="true" className="text-xl" />
            {SUPPORT_EMAIL}
          </a>
        </div>
      </section>
    </div>
  );
}

export default HelpPage;
