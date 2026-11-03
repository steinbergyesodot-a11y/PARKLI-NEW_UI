import { FiCreditCard } from "react-icons/fi";
import { Card } from "../../../components/primitives/Card";
import { Input } from "../../../components/primitives/Input";

export function PaymentDetails() {
    return (
        <Card role="region" aria-labelledby="payment-card-heading" className="h-auto w-full max-w-2xl p-4 sm:p-6">
            <h2 id="payment-card-heading" className="flex items-center gap-2 text-base font-semibold text-text-main">
                <FiCreditCard aria-hidden="true" className="size-5 shrink-0" />
                Credit or debit card
            </h2>
            <div className="mt-5 grid grid-cols-1 gap-4">
                <Input
                    label="Name on card"
                    className="border-gray-300"
                    type="text"
                    autoComplete="cc-name"
                    placeholder="Full name on card"
                />
                <Input
                    label="Card number"
                    className="border-gray-300"
                    type="text"
                    inputMode="numeric"
                    autoComplete="cc-number"
                    placeholder="1234 1234 1234 1234"
                    leftIcon={<FiCreditCard aria-hidden="true" />}
                />
                <div className="grid grid-cols-2 gap-4">
                    <Input
                        label="Expiry date"
                        className="border-gray-300"
                        type="text"
                        inputMode="numeric"
                        autoComplete="cc-exp"
                        placeholder="MM / YY"
                        maxLength={7}
                    />
                    <Input
                        label="Security code"
                        className="border-gray-300"
                        type="text"
                        inputMode="numeric"
                        autoComplete="cc-csc"
                        placeholder="CVC"
                        maxLength={4}
                    />
                </div>
            </div>
        </Card>
    );
}