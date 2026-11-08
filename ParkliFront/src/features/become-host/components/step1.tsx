import { IoArrowForward } from "react-icons/io5";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../../components/primitives/Card";
import { Input } from "../../../components/primitives/Input";
import Button from "../../../components/primitives/Button";
import { ProgressTracker } from "./progressTracker";
import type { drivewayFormData } from "../hooks/useBecomeHost";

interface Step1Props {
    formData: drivewayFormData;
    onChange: (
        field: keyof drivewayFormData,
        value: string | string[] | File | File[] | null
    ) => void;
    onContinue: () => void;
}

export function Step1({ formData, onChange, onContinue }: Step1Props) {
    return (
        <div className="flex flex-col gap-6">
            <ProgressTracker currentStep={1} />

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
                    />

                    <Input
                        label="Address"
                        placeholder="Street address near Wrigley Field"
                        helperText="Your full address is only shared with a guest after they book."
                        value={formData.address}
                        onChange={(e) => onChange("address", e.target.value)}
                    />
                </CardContent>

                <CardFooter className="justify-end border-t border-border-subtle p-6">
                    <Button onClick={onContinue} className="flex items-center gap-2">
                        Continue
                        <IoArrowForward aria-hidden="true" />
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}