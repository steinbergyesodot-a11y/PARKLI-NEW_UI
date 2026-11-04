import { Link, useSearchParams } from "react-router";
import { FiCalendar, FiCheckCircle, FiMapPin, FiShield } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { useGetDrivewayById } from "../features/find-parking/hooks/useFindParking";
import { Card } from "../components/primitives/Card";

function getCancellationDeadline(dateValue: string, parkingBegins: string): string {
    const date = new Date(dateValue);
    const timeMatch = parkingBegins.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);

    if (Number.isNaN(date.getTime()) || !timeMatch) {
        return "24 hours before parking begins";
    }

    let hour = Number(timeMatch[1]) % 12;
    if (timeMatch[3].toUpperCase() === "PM") hour += 12;
    const localTimeAsUtc = Date.UTC(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate(),
        hour,
        Number(timeMatch[2]),
    );
    const centralTimeFormatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/Chicago",
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hourCycle: "h23",
    });
    const centralParts = centralTimeFormatter.formatToParts(new Date(localTimeAsUtc));
    const getPart = (type: Intl.DateTimeFormatPartTypes) => Number(centralParts.find((part) => part.type === type)?.value);
    const timezoneOffset = Date.UTC(
        getPart("year"),
        getPart("month") - 1,
        getPart("day"),
        getPart("hour"),
        getPart("minute"),
    ) - localTimeAsUtc;
    const parkingStartUtc = localTimeAsUtc - timezoneOffset;
    const deadline = new Date(parkingStartUtc - 24 * 60 * 60 * 1000);
    const formattedDate = deadline.toLocaleDateString("en-US", {
        timeZone: "America/Chicago",
        weekday: "short",
        month: "short",
        day: "numeric",
    });
    const formattedTime = deadline.toLocaleTimeString("en-US", {
        timeZone: "America/Chicago",
        hour: "numeric",
        minute: "2-digit",
    });

    return `${formattedDate} at ${formattedTime} CT`;
}

function PaymentSuccess() {
    const { user } = useAuth();
    const [searchParams] = useSearchParams();
    const drivewayId = searchParams.get("drivewayId") ?? undefined;
    const gameId = searchParams.get("gameId");
    const paymentStatus = searchParams.get("redirect_status");
    const paymentIntentId = searchParams.get("payment_intent");
    const { driveway } = useGetDrivewayById(drivewayId);
    const game = driveway?.games.find((drivewayGame) => drivewayGame._id === gameId);

    if (paymentStatus === "failed") {
        return (
            <main className="mx-auto w-full max-w-2xl px-4 py-12">
                <h1 className="text-2xl font-semibold text-text-main">Payment was not completed</h1>
                <p className="mt-3 text-text-muted">Your payment could not be confirmed. Please try again.</p>
                <Link to="/find-parking" className="mt-6 inline-flex font-semibold text-primary hover:underline">
                    Back to parking
                </Link>
            </main>
        );
    }

    if (!drivewayId || !gameId) {
        return (
            <main className="mx-auto w-full max-w-2xl px-4 py-12">
                <h1 className="text-2xl font-semibold text-text-main">Booking details unavailable</h1>
                <p className="mt-3 text-text-muted">We could not find the driveway and game for this payment.</p>
                <Link to="/find-parking" className="mt-6 inline-flex font-semibold text-primary hover:underline">
                    Browse parking
                </Link>
            </main>
        );
    }

    if (!driveway || !game) {
        return (
            <main className="mx-auto w-full max-w-2xl px-4 py-12">
                <p role="status" className="text-text-muted">Loading your booking details...</p>
            </main>
        );
    }

    const formattedDate = new Date(game.date).toLocaleDateString("en-US", {
        timeZone: "UTC",
        weekday: "short",
        month: "short",
        day: "numeric",
    });
    const drivewayName = driveway.publicDisplay || driveway.name;
    const cancellationDeadline = getCancellationDeadline(game.date, game.parkingBegins);

    return (
        <main className="mx-auto w-full max-w-3xl px-4 py-10">
            <header className="text-center">
                <div className="flex items-center justify-center gap-3">
                    <FiCheckCircle aria-hidden="true" className="size-8 shrink-0 text-blue-600" />
                    <h1 className="text-3xl font-semibold text-text-main sm:text-4lg">Your spot is booked.</h1>
                </div>
                <p className="mt-3 text-sm text-text-muted">
                    A receipt will be sent to {user?.email ?? "your account email address"}.
                </p>
            </header>

            <Card className="mt-8 h-auto w-full rounded-lg border border-border-subtle bg-white p-5 shadow-sm sm:p-7">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                    {driveway.images[0] && (
                        <img
                            src={driveway.images[0]}
                            alt={drivewayName}
                            className="size-28 shrink-0 rounded-lg object-cover"
                        />
                    )}
                    <div className="min-w-0">
                        <h2 className="text-xl font-semibold text-text-main">{drivewayName}</h2>
                        <p className="mt-2 flex items-center gap-2 text-sm text-text-muted">
                            <FiMapPin aria-hidden="true" className="shrink-0" />
                            {driveway.address}
                        </p>
                    </div>
                </div>

                <hr className="my-6 border-0 border-t border-border-subtle" />

                <div className="flex items-start gap-4">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                        <FiCalendar aria-hidden="true" className="size-5" />
                    </span>
                    <div className="min-w-0">
                        <h3 className="font-semibold text-text-main">Cubs vs. {game.visiting_team}</h3>
                        <p className="mt-1 text-sm text-text-muted">
                            {formattedDate}{driveway.stadium ? ` · ${driveway.stadium}` : ""}
                        </p>
                    </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-4 rounded-lg bg-brand-50 px-4 py-4 sm:px-5">
                    <div>
                        <p className="text-sm text-text-muted">Game begins</p>
                        <p className="mt-1 font-semibold text-text-main">{game.game_time}</p>
                    </div>
                    <div>
                        <p className="text-sm text-text-muted">Parking begins</p>
                        <p className="mt-1 font-semibold text-text-main">{game.parkingBegins}</p>
                    </div>
                </div>

                <p className="mt-5 flex items-start gap-2 text-sm text-text-main">
                    <FiShield aria-hidden="true" className="mt-0.5 shrink-0 text-primary" />
                    <span>Free cancellation until <strong>{cancellationDeadline}</strong>.</span>
                </p>

                <hr className="my-6 border-0 border-t border-border-subtle" />

                <div className="flex items-end justify-between gap-4">
                    <div className="min-w-0">
                        <h3 className="font-semibold text-text-main">Total paid</h3>
                        <p className="mt-1 break-all text-sm text-text-muted">
                            Confirmation {paymentIntentId ?? "details unavailable"}
                        </p>
                    </div>
                    <p className="shrink-0 text-2xl font-semibold text-text-main">${driveway.price.toFixed(2)}</p>
                </div>
            </Card>

            <Link to="/my-bookings" className="mx-auto mt-6 flex w-fit font-semibold text-primary hover:underline">
                View my bookings
            </Link>
        </main>
    );
}

export default PaymentSuccess