import { useState } from "react";
import { IoArrowForward } from "react-icons/io5";
import { SearchBox } from "@mapbox/search-js-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../../components/primitives/Card";
import { Input } from "../../../components/primitives/Input";
import Button from "../../../components/primitives/Button";
import { ProgressTracker } from "./progressTracker";
import type { drivewayFormData } from "../hooks/useBecomeHost";
import { parseMapboxAddress, WRIGLEY_FIELD_PROXIMITY, type ParsedAddress } from "../utils/mapboxAddress";

const MAPBOX_ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN as string | undefined;

if (!MAPBOX_ACCESS_TOKEN) {
    console.error("VITE_MAPBOX_ACCESS_TOKEN is missing — address suggestions are disabled. Restart the dev server after editing .env.");
}

// Module-level so the SearchBox effects don't re-run on every render.
const SEARCH_OPTIONS = {
    language: "en",
    country: "US",
    types: "address",
    proximity: WRIGLEY_FIELD_PROXIMITY,
};

const SEARCH_THEME = {
    variables: {
        fontFamily: "var(--font-sans)",
        colorPrimary: "var(--color-primary)",
        colorText: "var(--color-text-main)",
        colorBackground: "var(--color-surface-base)",
        border: "1px solid var(--color-border-subtle)",
        borderRadius: "6px",
        boxShadow: "none",
    },
};

interface Step1Props {
    formData: drivewayFormData;
    onChange: (
        field: keyof drivewayFormData,
        value: string | string[] | File | File[] | null
    ) => void;
    onAddressInput: (text: string) => void;
    onAddressSelect: (address: ParsedAddress) => void;
    onContinue: () => void;
}

export function Step1({ formData, onChange, onAddressInput, onAddressSelect, onContinue }: Step1Props) {
    const [addressError, setAddressError] = useState<string | null>(null);
    const hasSelectedAddress = Boolean(
        formData.address && formData.city && formData.state && formData.zipcode
    );

    return (
        <div className="flex flex-col gap-6">
            <ProgressTracker currentStep={1} />

            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    if (!hasSelectedAddress) {
                        setAddressError("Please choose your address from the suggestions.");
                        return;
                    }
                    onContinue();
                }}
            >
                <Card className="mx-auto h-auto w-full max-w-2xl">
                    <CardHeader>
                        <CardTitle className="text-3xl font-semibold">
                            Let&rsquo;s start with the basics.
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="flex flex-col gap-6">
                        <Input
                            label="Driveway nickname"
                            placeholder="e.g. Sunny brick driveway on Waveland"
                            value={formData.name}
                            onChange={(e) => onChange("name", e.target.value)}
                            autoComplete="off"
                            maxLength={100}
                            required
                        />

                        <div className="flex w-full flex-col gap-1.5">
                            <span className="text-sm font-medium text-text-main">Your address</span>
                            <SearchBox
                                accessToken={MAPBOX_ACCESS_TOKEN ?? ""}
                                options={SEARCH_OPTIONS}
                                theme={SEARCH_THEME}
                                placeholder="Start typing your address near Wrigley Field"
                                value={formData.fullAddress}
                                onChange={(text) => {
                                    setAddressError(null);
                                    onAddressInput(text);
                                }}
                                onClear={() => onAddressInput("")}
                                onSuggestError={(error) => console.error("Mapbox address suggestions failed:", error)}
                                onRetrieve={(res) => {
                                    const feature = res.features[0];
                                    if (!feature) return;
                                    setAddressError(null);
                                    onAddressSelect(parseMapboxAddress(feature));
                                }}
                            />
                            {addressError ? (
                                <p className="text-xs font-medium text-red-600">{addressError}</p>
                            ) : (
                                <p className="text-xs text-text-muted">
                                    Your full address is only shared with a guest after they book.
                                </p>
                            )}
                        </div>
                    </CardContent>

                    <CardFooter className="justify-end border-t border-border-subtle p-6">
                        <Button type="submit" className="flex items-center gap-2">
                            Continue
                            <IoArrowForward aria-hidden="true" />
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </div>
    );
}