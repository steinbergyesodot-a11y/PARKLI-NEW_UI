import { useState } from "react";
import { IoArrowBack, IoArrowForward, IoChevronDown } from "react-icons/io5";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../../components/primitives/Card";
import Button from "../../../components/primitives/Button";
import { cn } from "../../../lib/utils";
import { ProgressTracker } from "./progressTracker";
import { PARKLI_DRIVEWAY_NOTE_OPTIONS, type NoteOption } from "../utils/notes";
import type { drivewayFormData } from "../hooks/useBecomeHost";

const CATEGORIES: { key: NoteOption["category"]; title: string }[] = [
    { key: "vehicle_size", title: "Vehicle size & clearance" },
    { key: "access_entry", title: "Access & entry" },
    { key: "parking_rules", title: "Parking rules" },
    { key: "event_logistics", title: "Event & stadium logistics" },
    { key: "amenities", title: "Amenities & extras" },
];

interface Step3Props {
    formData: drivewayFormData;
    onChange: (
        field: keyof drivewayFormData,
        value: string | string[] | File | File[] | null
    ) => void;
    onBack: () => void;
    onContinue: () => void;
}

export function Step3({ formData, onChange, onBack, onContinue }: Step3Props) {
    const [openCategory, setOpenCategory] = useState<NoteOption["category"] | null>(
        CATEGORIES[0].key
    );

    const toggleRule = (id: string) => {
        const next = formData.rules.includes(id)
            ? formData.rules.filter((ruleId) => ruleId !== id)
            : [...formData.rules, id];
        onChange("rules", next);
    };

    return (
        <div className="flex flex-col gap-6">
            <ProgressTracker currentStep={3} />

            <Card className="mx-auto h-auto w-full max-w-2xl">
                <CardHeader>
                    <CardTitle className="text-3xl font-semibold">
                        What should guests know?
                    </CardTitle>
                    <p className="mt-2 text-text-muted">
                        Pick everything that applies to your driveway.
                    </p>
                </CardHeader>

                <CardContent className="flex flex-col gap-4">
                    {CATEGORIES.map(({ key, title }) => {
                        const options = PARKLI_DRIVEWAY_NOTE_OPTIONS.filter(
                            (option) => option.category === key
                        );
                        const isOpen = openCategory === key;
                        const selectedCount = options.filter((option) =>
                            formData.rules.includes(option.id)
                        ).length;

                        return (
                            <div
                                key={key}
                                className="rounded-xl border border-border-subtle bg-surface-base"
                            >
                                <button
                                    type="button"
                                    onClick={() => setOpenCategory(isOpen ? null : key)}
                                    aria-expanded={isOpen}
                                    className="flex w-full items-center justify-between px-5 py-4 text-left"
                                >
                                    <span className="font-semibold text-text-main">
                                        {title}
                                        {selectedCount > 0 && (
                                            <span className="ml-2 text-sm font-normal text-primary">
                                                {selectedCount} selected
                                            </span>
                                        )}
                                    </span>
                                    <IoChevronDown
                                        aria-hidden="true"
                                        className={cn(
                                            "shrink-0 text-text-muted transition-transform",
                                            isOpen && "rotate-180"
                                        )}
                                    />
                                </button>

                                {isOpen && (
                                    <div className="flex flex-wrap gap-3 px-5 pb-5">
                                        {options.map((option) => {
                                            const isSelected = formData.rules.includes(option.id);
                                            return (
                                                <button
                                                    key={option.id}
                                                    type="button"
                                                    onClick={() => toggleRule(option.id)}
                                                    aria-pressed={isSelected}
                                                    title={option.defaultNoteText}
                                                    className={cn(
                                                        "rounded-full border px-5 py-2.5 text-sm transition-colors",
                                                        isSelected
                                                            ? "border-primary bg-primary/10 font-medium text-primary"
                                                            : "border-border-subtle bg-surface-base text-text-main hover:border-primary"
                                                    )}
                                                >
                                                    {option.label}
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    })}
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