import { FaPersonWalking } from "react-icons/fa6";
import { FiArrowLeft, FiArrowRight, FiCalendar, FiMapPin } from "react-icons/fi";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { useNavigate, useParams, useSearchParams } from "react-router";
import Button from "../../../components/primitives/Button";
import { Card, CardDescription, CardHeader } from "../../../components/primitives/Card";
import { useGetDrivewayById } from "../../find-parking/hooks/useFindParking";
import { usePayment } from "../hooks/usePayment";
import { StripePaymentForm } from "./StripePaymentForm";

export function MainPayment(){
    
    const drivewayId = useParams().drivewayId;
    const { driveway } = useGetDrivewayById(drivewayId);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const gameId = searchParams.get("gameId") ?? "";
    const game = driveway?.games.find((drivewayGame) => drivewayGame._id === gameId);
    const gameUnavailable = Boolean(game && (game.booked || game.blocked));
    const successUrl = `/payment-success?${new URLSearchParams({
        drivewayId: driveway?._id ?? drivewayId ?? "",
        gameId,
    }).toString()}`;
    const { handlePay, clientSecret, loading, errorMessage } = usePayment({ driveway, game: gameUnavailable ? undefined : game });
    const drivewayName = driveway ? driveway.publicDisplay || driveway.name : "";
    const images = driveway?.images ?? [];
    const rules = driveway?.rules ?? [];
    const formattedGameDate = game
        ? new Date(game.date).toLocaleDateString("en-US", {
            timeZone: "UTC",
            weekday: "short",
            month: "short",
            day: "numeric",
            year: "numeric",
        })
        : "";

    return (
        <>
        <button type="button" onClick={() => navigate("/find-parking")} className="inline-flex items-center gap-2 text-text-muted">
            <FiArrowLeft aria-hidden="true" />
            Back to spots
        </button>
        <div className="mt-6 flex flex-col gap-3">
        <h1 className="text-3xl font-semibold sm:text-4xl">Make it your game-day spot.</h1>
        <p className="text-text-muted text-sm sm:text-base">A driveway, a short walk, and a whole lot of baseball.</p>
        </div>

        {!driveway ? (
            <p role="status" className="mt-8 text-sm text-text-muted">Loading spot details...</p>
        ) : (
        <div className="mt-8 mb-8 grid w-full grid-cols-1 gap-8 lg:grid-cols-3 lg:items-start">
            <section aria-labelledby="spot-heading" className="min-w-0 space-y-6 lg:col-span-2">
                {images.length > 0 && (
                    <div className={`grid gap-2 ${images.length > 1 ? "grid-cols-4 grid-rows-2" : "grid-cols-1"}`}>
                        {images.slice(0, 5).map((src, index) => (
                            <img
                                key={src}
                                src={src}
                                alt={index === 0 ? drivewayName : `${drivewayName} photo ${index + 1}`}
                                className={`w-full rounded-lg object-cover ${
                                    images.length === 1
                                        ? "h-72 sm:h-96"
                                        : index === 0
                                            ? "col-span-2 row-span-2 h-full min-h-64 sm:min-h-80"
                                            : "h-32 sm:h-40"
                                }`}
                            />
                        ))}
                    </div>
                )}

                <div className="flex flex-col gap-2">
                    <h2 id="spot-heading" className="text-2xl font-semibold text-text-main">{drivewayName}</h2>
                    <p className="flex items-center gap-2 text-sm text-text-muted">
                        <FiMapPin aria-hidden="true" className="shrink-0" />
                        {driveway.address}
                    </p>
                    <p className="flex items-center gap-2 text-sm text-text-muted">
                        <FaPersonWalking aria-hidden="true" className="shrink-0" />
                        {driveway.walk} min walk to {driveway.stadium || "the ballpark"}
                    </p>
                    {driveway.PostedAt && (
                        <p className="text-sm text-text-muted">Posted {new Date(driveway.PostedAt).toLocaleDateString()}</p>
                    )}
                </div>

                {rules.length > 0 && (
                    <Card className="h-auto min-w-0 p-4 sm:p-6">
                        <CardHeader className="p-0 pb-3 text-base font-semibold">Notes from owner</CardHeader>
                        <ul className="divide-y divide-border-subtle">
                            {rules.map((rule, index) => (
                                <li key={index} className="flex items-start gap-3 py-2 first:pt-0 last:pb-0">
                                    <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                                    <CardDescription className="whitespace-pre-wrap wrap-anywhere text-text-main">{rule}</CardDescription>
                                </li>
                            ))}
                        </ul>
                    </Card>
                )}

                <div className="flex items-center gap-2 text-sm">
                    <IoShieldCheckmarkOutline aria-hidden="true" className="shrink-0 text-lg text-green-600" />
                    <p>Free cancellation up to 24 hours before parking begins</p>
                </div>
            </section>

            <aside aria-labelledby="summary-heading" className="min-w-0 lg:sticky lg:top-24">
                <Card className="h-auto w-full min-w-0 p-5 sm:p-6">
                    <h2 id="summary-heading" className="text-lg font-semibold text-text-main">Booking summary</h2>

                    <div className="mt-4">
                        {game ? (
                            <div className="flex items-start gap-4">
                                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                                    <FiCalendar aria-hidden="true" className="size-5" />
                                </span>
                                <div className="min-w-0 flex-1">
                                    <h3 className="font-semibold text-text-main">Cubs vs {game.visiting_team}</h3>
                                    <p className="mt-1 text-sm text-text-muted">{formattedGameDate}</p>
                                    <p className="text-sm text-text-muted">Game {game.game_time} CT &middot; Parking {game.parkingBegins} CT</p>
                                    {gameUnavailable && (
                                        <p role="status" className="mt-2 text-sm text-danger">
                                            This game is {game.blocked ? "blocked" : "already booked"} for this spot. Please pick another game.
                                        </p>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <p role="status" className="text-sm text-text-muted">
                                {gameId ? "We couldn't find that game for this spot." : "No game was selected for this spot."} Go back and choose a game date.
                            </p>
                        )}
                    </div>

                    <hr className="my-5 border-0 border-t border-border-subtle" />

                    <dl className="space-y-2 text-sm">
                        <div className="flex items-center justify-between gap-4">
                            <dt className="text-text-muted">Parking &times; 1 game</dt>
                            <dd className="font-medium text-text-main">${driveway.price.toFixed(2)}</dd>
                        </div>
                        <div className="flex items-center justify-between gap-4 border-t border-border-subtle pt-3 text-base">
                            <dt className="font-semibold text-text-main">Total</dt>
                            <dd className="font-semibold text-text-main">${driveway.price.toFixed(2)}</dd>
                        </div>
                    </dl>

                    <div className="mt-5 space-y-3">
                        {errorMessage && <p role="alert" className="text-sm text-red-600">{errorMessage}</p>}
                        {clientSecret ? (
                            <StripePaymentForm
                                clientSecret={clientSecret}
                                returnUrl={`${window.location.origin}${successUrl}`}
                                onPaymentComplete={(paymentIntentId) => navigate(
                                    `${successUrl}&redirect_status=succeeded&payment_intent=${encodeURIComponent(paymentIntentId)}`,
                                    { replace: true },
                                )}
                            />
                        ) : (
                            <Button
                                type="button"
                                onClick={handlePay}
                                disabled={!game || gameUnavailable || loading}
                                className="inline-flex min-h-12 w-full items-center justify-center gap-2 font-semibold disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading ? "Preparing payment..." : `Pay $${driveway.price.toFixed(2)}`}
                                <FiArrowRight aria-hidden="true" className="size-5 shrink-0" />
                            </Button>
                        )}
                    </div>
                </Card>
            </aside>
        </div>
        )}
        </>
    )
}