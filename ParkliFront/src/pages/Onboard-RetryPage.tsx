import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router";
import { FiAlertTriangle, FiClock, FiLoader, FiRefreshCw } from "react-icons/fi";
import api from "../lib/axiosClient";
import Button from "../components/primitives/Button";
import { Card } from "../components/primitives/Card";

type Status = "loading" | "redirecting" | "error";

function OnboardRetryPage() {
    const [status, setStatus] = useState<Status>("loading");

    const refreshLink = useCallback(async () => {
        setStatus("loading");
        try {
            const response = await api.get("/api/users/stripe/onboarding-link");
            const newStripeUrl: string | undefined = response.data?.data?.onboardingUrl;
            if (!newStripeUrl) throw new Error("Missing onboarding URL");

            setStatus("redirecting");
            window.location.href = newStripeUrl;
        } catch (err) {
            console.error("Failed to refresh Stripe onboarding link", err);
            setStatus("error");
        }
    }, []);

    useEffect(() => {
        refreshLink();
    }, [refreshLink]);

    const isError = status === "error";

    return (
        <main className="mx-auto flex min-h-[70vh] w-full max-w-lg items-center px-4 py-12">
            <Card className="h-auto w-full p-8 text-center sm:p-10">
                <div
                    className={`mx-auto flex size-16 items-center justify-center rounded-full ${
                        isError ? "bg-danger-subtle text-danger" : "bg-brand-50 text-primary"
                    }`}
                >
                    {isError ? (
                        <FiAlertTriangle aria-hidden="true" className="size-8" />
                    ) : (
                        <FiClock aria-hidden="true" className="size-8" />
                    )}
                </div>

                <h1 className="mt-6 text-2xl font-semibold text-text-main sm:text-3xl">
                    {isError ? "We couldn't create a new link" : "Your payment setup link expired"}
                </h1>

                <p className="mt-3 text-text-muted">
                    {isError
                        ? "Something went wrong while generating a fresh Stripe link. Please try again."
                        : "No worries, Stripe links expire after a short while for security. We're creating a fresh one for you now."}
                </p>

                <div
                    role="status"
                    aria-live="polite"
                    className="mt-8 flex items-center justify-center gap-3 rounded-lg border border-border-subtle bg-surface-subtle px-4 py-3 text-sm font-medium text-text-main"
                >
                    {isError ? (
                        <span className="text-danger">Link generation failed</span>
                    ) : (
                        <>
                            <FiLoader aria-hidden="true" className="size-4 shrink-0 animate-spin text-primary" />
                            <span>
                                {status === "redirecting"
                                    ? "New link ready, taking you to Stripe…"
                                    : "Generating your new payment setup link…"}
                            </span>
                        </>
                    )}
                </div>

                {isError && (
                    <Button
                        type="button"
                        onClick={refreshLink}
                        className="mt-6 inline-flex items-center gap-2 font-semibold"
                    >
                        <FiRefreshCw aria-hidden="true" className="size-4" />
                        Try again
                    </Button>
                )}

                <p className="mt-6 text-xs text-text-muted">
                    {isError ? "Still stuck?" : "Not redirected after a few seconds?"}{" "}
                    <Link to="/my-listings" className="font-semibold text-primary hover:underline">
                        Go to my listings
                    </Link>
                </p>
            </Card>
        </main>
    );
}

export default OnboardRetryPage;