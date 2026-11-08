import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../../components/primitives/Card";
import { Input } from "../../../components/primitives/Input";
import Button from "../../../components/primitives/Button";
import { cn } from "../../../lib/utils";
import { ProgressTracker } from "./progressTracker";
import type { drivewayFormData } from "../hooks/useBecomeHost";

const WALK_OPTIONS = ["Under 5 min", "5–10 min", "10–15 min", "15+ min"];

interface Step2Props {
    formData: drivewayFormData;
    onChange: (
        field: keyof drivewayFormData,
        value: string | string[] | File | File[] | null
    ) => void;
    onBack: () => void;
    onContinue: () => void;
}

export function Step2({ formData, onChange, onBack, onContinue }: Step2Props) {
    return (
        <div className="flex flex-col gap-6">
            <ProgressTracker currentStep={2} />

            <Card className="mx-auto h-auto w-full max-w-2xl">
                <CardHeader>
                    <CardTitle className="text-3xl font-semibold">
                        How close are you, and what&rsquo;s your price?
                    </CardTitle>
                </CardHeader>

                <CardContent className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <span className="text-sm font-medium text-text-main">
                            Walk to the stadium
                        </span>
                        <div className="flex flex-wrap gap-3">
                            {WALK_OPTIONS.map((option) => (
                                <button
                                    key={option}
                                    type="button"
                                    onClick={() => onChange("walk", option)}
                                    className={cn(
                                        "rounded-full border px-5 py-2.5 text-sm transition-colors",
                                        formData.walk === option
                                            ? "border-primary bg-primary/10 font-medium text-primary"
                                            : "border-border-subtle bg-surface-base text-text-main hover:border-primary"
                                    )}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>

                    <Input
                        label="Price per game"
                        type="number"
                        min={0}
                        leftIcon={<span className="text-sm">$</span>}
                        placeholder="30"
                        helperText="Nearby driveways usually go for $22–$35 a game."
                        value={formData.price}
                        onChange={(e) => onChange("price", e.target.value)}
                        containerClassName="max-w-xs"
                    />
                </CardContent>

                <CardFooter className="justify-between border-t border-border-subtle p-6">
                    <Button
                        onClick={onBack}
                        className="flex items-center gap-2 bg-transparent text-text-main shadow-none hover:bg-surface-subtle"
                    >
                        <IoArrowBack aria-hidden="true" />
                        Back
                    </Button>
                    <Button onClick={onContinue} className="flex items-center gap-2">
                        Continue
                        <IoArrowForward aria-hidden="true" />
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}