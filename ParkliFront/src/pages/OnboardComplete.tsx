import { useEffect, useState } from "react";
import { Link } from "react-router";
import { FiCheckCircle, FiMapPin, FiCamera, FiClock, FiDollarSign } from "react-icons/fi";
import { Card } from "../components/primitives/Card";
import { WALK_OPTIONS } from "../features/become-host/components/step2";
import {
    loadNewDriveway,
    type NewDrivewaySummary,
} from "../features/become-host/utils/newDrivewayStorage";

function OnboardCompletePage() {
    const [driveway, setDriveway] = useState<NewDrivewaySummary | null | undefined>(undefined);

    useEffect(() => {
        setDriveway(loadNewDriveway());
    }, []);

    if (driveway === undefined) {
        return (
            <main className="mx-auto w-full max-w-2xl px-4 py-12">
                <p role="status" className="text-text-muted">Loading your listing...</p>
            </main>
        );
    }

    if (!driveway) {
        return (
            <main className="mx-auto w-full max-w-2xl px-4 py-12 text-center">
                <FiCheckCircle aria-hidden="true" className="mx-auto size-10 text-blue-600" />
                <h1 className="mt-4 text-3xl font-semibold text-text-main">You&rsquo;re all set up as a host.</h1>
                <p className="mt-3 text-text-muted">
                    Your Stripe payouts are connected. You can manage your driveways from your listings.
                </p>
                <Link to="/my-listings" className="mt-6 inline-flex font-semibold text-primary hover:underline">
                    View my listings
                </Link>
            </main>
        );
    }

    const fullAddress = [driveway.address, driveway.city, driveway.state, driveway.zipcode]
        .filter(Boolean)
        .join(", ");
    const walkLabel =
        WALK_OPTIONS.find((option) => option.value === driveway.walk)?.label ??
        (driveway.walk ? `${driveway.walk} min` : "—");
    const price = Number(driveway.price);
    const priceLabel = Number.isFinite(price) && price > 0 ? `$${price.toFixed(2)}` : "—";
    const photosLabel =
        driveway.imageCount === 1 ? "1 photo" : `${driveway.imageCount} photos`;

    return (
        <main className="mx-auto w-full max-w-3xl px-4 py-10">
            <header className="text-center">
                <div className="flex items-center justify-center gap-3">
                    <FiCheckCircle aria-hidden="true" className="size-8 shrink-0 text-blue-600" />
                    <h1 className="text-3xl font-semibold text-text-main sm:text-4xl">
                        Your driveway is listed.
                    </h1>
                </div>
                <p className="mt-3 text-sm text-text-muted">
                    Payouts are connected through Stripe. Fans can now book your spot on game days.
                </p>
            </header>

            <Card className="mt-8 h-auto w-full rounded-lg border border-border-subtle bg-white p-5 shadow-sm sm:p-7">
                <div className="min-w-0">
                    <h2 className="text-xl font-semibold text-text-main">{driveway.name || "Your driveway"}</h2>
                    {fullAddress && (
                        <p className="mt-2 flex items-center gap-2 text-sm text-text-muted">
                            <FiMapPin aria-hidden="true" className="shrink-0" />
                            {fullAddress}
                        </p>
                    )}
                </div>

                <hr className="my-6 border-0 border-t border-border-subtle" />

                <dl className="grid grid-cols-1 gap-4 rounded-lg bg-brand-50 px-4 py-4 sm:grid-cols-3 sm:px-5">
                    <div className="flex items-start gap-3">
                        <FiDollarSign aria-hidden="true" className="mt-0.5 shrink-0 text-primary" />
                        <div>
                            <dt className="text-sm text-text-muted">Price per game</dt>
                            <dd className="mt-1 font-semibold text-text-main">{priceLabel}</dd>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <FiClock aria-hidden="true" className="mt-0.5 shrink-0 text-primary" />
                        <div>
                            <dt className="text-sm text-text-muted">Walk to stadium</dt>
                            <dd className="mt-1 font-semibold text-text-main">{walkLabel}</dd>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <FiCamera aria-hidden="true" className="mt-0.5 shrink-0 text-primary" />
                        <div>
                            <dt className="text-sm text-text-muted">Photos</dt>
                            <dd className="mt-1 font-semibold text-text-main">{photosLabel}</dd>
                        </div>
                    </div>
                </dl>

                {driveway.id && (
                    <p className="mt-5 break-all text-sm text-text-muted">Listing ID {driveway.id}</p>
                )}
            </Card>

            <div className="mx-auto mt-6 flex w-fit flex-col items-center gap-3 sm:flex-row sm:gap-6">
                <Link to="/my-listings" className="font-semibold text-primary hover:underline">
                    View my listings
                </Link>
                <Link to="/become-host" className="font-semibold text-primary hover:underline">
                    List another driveway
                </Link>
            </div>
        </main>
    );
}

export default OnboardCompletePage