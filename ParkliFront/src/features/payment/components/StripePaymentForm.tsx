import { useState, type FormEvent } from "react";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Button from "../../../components/primitives/Button";

const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
const stripePromise = publishableKey ? loadStripe(publishableKey) : null;

interface StripePaymentFormProps {
    clientSecret: string;
    returnUrl?: string;
    onPaymentComplete?: (paymentIntentId: string) => void;
}

interface PaymentFormContentsProps {
    returnUrl?: string;
    onPaymentComplete?: (paymentIntentId: string) => void;
}

function PaymentFormContents({ returnUrl, onPaymentComplete }: PaymentFormContentsProps) {
    const stripe = useStripe();
    const elements = useElements();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [statusMessage, setStatusMessage] = useState<string | null>(null);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!stripe || !elements) return;

        setIsSubmitting(true);
        setErrorMessage(null);
        setStatusMessage(null);

        try {
            const { error, paymentIntent } = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: returnUrl ?? window.location.href,
                },
                redirect: "if_required",
            });

            if (error) {
                setErrorMessage(error.message ?? "Payment could not be completed. Please try again.");
                return;
            }

            if (paymentIntent?.status === "succeeded") {
                setStatusMessage("Payment successful.");
                onPaymentComplete?.(paymentIntent.id);
            } else if (paymentIntent?.status === "processing") {
                setStatusMessage("Your payment is processing. We’ll update you when it completes.");
            }
        } catch {
            setErrorMessage("Payment could not be completed. Please try again.");
        } finally {
            setIsSubmitting(false);
        }

    }

    return (
        <form onSubmit={handleSubmit} className="w-full">
            <PaymentElement />
            {errorMessage && (
                <p role="alert" className="mt-4 text-sm text-red-600">
                    {errorMessage}
                </p>
            )}
            {statusMessage && (
                <p role="status" className="mt-4 text-sm text-text-muted">
                    {statusMessage}
                </p>
            )}
            <Button
                type="submit"
                disabled={!stripe || !elements || isSubmitting}
                className="mt-6 min-h-12 w-full font-semibold disabled:cursor-not-allowed disabled:opacity-60"
            >
                {isSubmitting ? "Processing payment..." : "Confirm payment"}
            </Button>
        </form>
    );
}

export function StripePaymentForm({ clientSecret, returnUrl, onPaymentComplete }: StripePaymentFormProps) {
    if (!stripePromise) {
        return (
            <p role="alert" className="text-sm text-red-600">
                Stripe is not configured. Set the VITE_STRIPE_PUBLISHABLE_KEY environment variable.
            </p>
        );
    }

    return (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
            <PaymentFormContents returnUrl={returnUrl} onPaymentComplete={onPaymentComplete} />
        </Elements>
    );
}
