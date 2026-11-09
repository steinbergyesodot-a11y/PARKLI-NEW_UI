import { useEffect, useMemo } from "react";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../../components/primitives/Card";
import Button from "../../../components/primitives/Button";
import { ProgressTracker } from "./progressTracker";
import { WALK_OPTIONS } from "./step2";
import { PARKLI_DRIVEWAY_NOTE_OPTIONS } from "../utils/notes";
import type { drivewayFormData } from "../hooks/useBecomeHost";

interface Step5Props {
    formData: drivewayFormData;
    onEdit: (step: 1 | 2 | 3 | 4) => void;
    onBack: () => void;
    onSubmit: () => void;
    error?: string | null;
    isSubmitting?: boolean;
}

interface ReviewRow {
    label: string;
    value: string;
    editStep: 1 | 2 | 3 | 4;
}

export function Step5({ formData, onEdit, onBack, onSubmit, error, isSubmitting = false }: Step5Props) {
    const coverUrl = useMemo(
        () =>
            formData.images.length > 0
                ? URL.createObjectURL(formData.images[0])
                : null,
        [formData.images]
    );

    useEffect(() => {
        return () => {
            if (coverUrl) URL.revokeObjectURL(coverUrl);
        };
    }, [coverUrl]);

    const walkLabel =
        WALK_OPTIONS.find((option) => option.value === formData.walk)?.label ?? "—";

    const noteLabels = formData.rules
        .map(
            (id) =>
                PARKLI_DRIVEWAY_NOTE_OPTIONS.find((option) => option.id === id)?.label
        )
        .filter(Boolean)
        .join(", ");

    const rows: ReviewRow[] = [
        { label: "Nickname", value: formData.name || "—", editStep: 1 },
        {
            label: "Address",
            value:
                [formData.address, formData.city, formData.state, formData.zipcode]
                    .filter(Boolean)
                    .join(", ") || "—",
            editStep: 1,
        },
        { label: "Walk to stadium", value: walkLabel, editStep: 2 },
        {
            label: "Price per game",
            value: formData.price ? `$${formData.price}` : "—",
            editStep: 2,
        },
        { label: "Notes", value: noteLabels || "None selected", editStep: 3 },
        {
            label: "Photos",
            value:
                formData.images.length === 1
                    ? "1 photo"
                    : `${formData.images.length} photos`,
            editStep: 4,
        },
        { label: "Description", value: formData.description || "—", editStep: 4 },
    ];

    return (
        <div className="flex flex-col gap-6">
            <ProgressTracker currentStep={5} />

            <Card className="mx-auto h-auto w-full max-w-2xl">
                <CardHeader>
                    <CardTitle className="text-3xl leading-tight">Looks good?</CardTitle>
                </CardHeader>

                <CardContent className="flex flex-col gap-6">
                    {coverUrl && (
                        <img
                            src={coverUrl}
                            alt="Driveway cover photo"
                            className="h-72 w-full rounded-xl object-cover"
                        />
                    )}

                    <dl className="flex flex-col">
                        {rows.map((row) => (
                            <div
                                key={row.label}
                                className="flex items-start justify-between gap-4 border-b border-border-subtle py-4 last:border-b-0"
                            >
                                <div className="flex flex-col gap-1">
                                    <dt className="text-sm text-text-muted">{row.label}</dt>
                                    <dd className="font-medium text-text-main">{row.value}</dd>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => onEdit(row.editStep)}
                                    className="text-sm font-medium text-text-main underline-offset-2 hover:underline"
                                >
                                    Edit
                                </button>
                            </div>
                        ))}
                    </dl>

                    <p className="text-sm text-text-muted">
                        Next, you&rsquo;ll set up payouts with Stripe so you can get paid.
                    </p>

                    {error && (
                        <p role="alert" className="text-sm font-medium text-red-600">
                            {error}
                        </p>
                    )}
                </CardContent>

                <CardFooter className="justify-between border-t border-border-subtle p-6">
                    <Button
                        onClick={onBack}
                        disabled={isSubmitting}
                        className="flex items-center gap-2 bg-transparent text-text-main shadow-none hover:bg-surface-subtle"
                    >
                        <IoArrowBack aria-hidden="true" />
                        Back
                    </Button>
                    <Button
                        onClick={onSubmit}
                        disabled={isSubmitting}
                        className="flex items-center gap-2 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isSubmitting ? "Submitting…" : "Continue"}
                        <IoArrowForward aria-hidden="true" />
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}