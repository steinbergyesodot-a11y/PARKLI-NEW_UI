import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { useNavigate, useParams, useSearchParams } from "react-router";
import Button from "../../../components/primitives/Button";
import { Select } from "../../../components/primitives/Select";
import { useGetDrivewayById } from "../../find-parking/hooks/useFindParking";
import { usePayment } from "../hooks/usePayment";
import { StripePaymentForm } from "./StripePaymentForm";

export function MainPayment(){
    
    const drivewayId = useParams().drivewayId;
    const { driveway } = useGetDrivewayById(drivewayId);
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const selectedGameId = searchParams.get("gameId") ?? "";
    const availableGames = driveway?.games.filter((game) => !game.booked && !game.blocked) ?? [];
    const game = availableGames.find((game) => game._id === selectedGameId);
    const { handlePay, clientSecret, loading, errorMessage } = usePayment({ driveway, game });

    return (
        <>
        <button type="button" onClick={() => navigate("/find-parking")} className="inline-flex items-center gap-2 text-text-muted">
            <FiArrowLeft aria-hidden="true" />
            Back to spots
        </button>
        <div className="mt-6 flex flex-col gap-3">
        <p className="text-3xl font-semibold">Make it your game-day spot.</p>
        <p className="text-text-muted text-sm">A driveway, a short walk, and a whole lot of baseball.</p>
        </div>

        {/* <section aria-labelledby="payment-details-heading" className="mt-12 w-full max-w-2xl">
            <h2 id="payment-details-heading" className="flex items-center gap-3 text-lg font-semibold text-text-main">
                <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-primary text-sm text-primary">
                    <span className="sr-only">Step </span>1
                </span>
                Your details
            </h2>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input
                    label="Full name"
                    className="border-gray-300"
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    placeholder="Full name"
                />
                <Input
                    label="Email"
                    className="border-gray-300"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                />
            </div>
        </section>
        <hr className="my-8 w-full max-w-2xl border-0 border-t border-gray-300" />
         <h2 id="payment-card-heading" className="flex items-center gap-3 text-lg font-semibold text-text-main mb-5">
                <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-primary text-sm text-primary">
                    <span className="sr-only">Step </span>2
                </span>
                Payment details
        </h2>
        <PaymentDetails />
                <hr className="my-8 w-full max-w-2xl border-0 border-t border-gray-300" />
        <div className="mb-6 flex w-full max-w-2xl items-start gap-3">
            <IoShieldCheckmarkOutline aria-hidden="true" className="mt-0.5 size-6 shrink-0 text-green-600" />
            <div className="min-w-0">
                <p className="text-sm font-semibold text-text-main">Free cancellation</p>
                <p className="mt-1 text-sm text-text-muted">Cancel Up to 24 hours before your parking begins.</p>
            </div>
        </div> */}
        <div className="mt-8 mb-8 w-full max-w-2xl space-y-5">
            <label className="flex flex-col gap-2 text-sm font-semibold">
                Game
                <Select
                    aria-label="Game"
                    value={selectedGameId}
                    disabled={!driveway || loading || Boolean(clientSecret)}
                    options={[
                        { value: "", label: "Select a game" },
                        ...availableGames.map((game) => ({
                            value: game._id,
                            label: `Cubs vs ${game.visiting_team} - ${new Date(game.date).toLocaleDateString("en-US", { timeZone: "UTC" })} - Parking ${game.parkingBegins} CT`,
                        })),
                    ]}
                    onChange={(event) => {
                        setSearchParams((params) => {
                            params.set("gameId", event.target.value);
                            return params;
                        });
                    }}
                />
            </label>
            {driveway && availableGames.length === 0 && (
                <p role="status" className="text-sm text-text-muted">No games are available for this spot.</p>
            )}
            {errorMessage && <p role="alert" className="text-sm text-red-600">{errorMessage}</p>}
            {clientSecret ? (
                <StripePaymentForm clientSecret={clientSecret} />
            ) : (
                <Button
                    type="button"
                    onClick={handlePay}
                    disabled={!driveway || !game || loading}
                    className="inline-flex min-h-12 w-full items-center justify-center gap-2 font-semibold disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {loading ? "Preparing payment..." : driveway ? `Pay $${driveway.price.toFixed(2)}` : "Pay now"}
                    <FiArrowRight aria-hidden="true" className="size-5 shrink-0" />
                </Button>
            )}
        </div>
        </>
    )
}