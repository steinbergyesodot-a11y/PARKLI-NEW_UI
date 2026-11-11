import { useEffect, useMemo, useRef } from "react";
import { IoArrowBack, IoArrowForward, IoClose, IoImageOutline } from "react-icons/io5";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../../components/primitives/Card";
import Button from "../../../components/primitives/Button";
import { ProgressTracker } from "./progressTracker";
import type { drivewayFormData } from "../hooks/useBecomeHost";

const MAX_PHOTOS = 8;

interface Step4Props {
    formData: drivewayFormData;
    onChange: (
        field: keyof drivewayFormData,
        value: string | string[] | File | File[] | null
    ) => void;
    onBack: () => void;
    onContinue: () => void;
}

export function Step4({ formData, onChange, onBack, onContinue }: Step4Props) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const previews = useMemo(
        () => formData.images.map((file) => URL.createObjectURL(file)),
        [formData.images]
    );

    useEffect(() => {
        return () => previews.forEach((url) => URL.revokeObjectURL(url));
    }, [previews]);

    const addPhotos = (files: FileList | null) => {
        if (!files) return;
        const next = [...formData.images, ...Array.from(files)].slice(0, MAX_PHOTOS);
        onChange("images", next);
        // allow re-selecting the same file after removal
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const removePhoto = (index: number) => {
        onChange(
            "images",
            formData.images.filter((_, i) => i !== index)
        );
    };

    return (
        <div className="flex flex-col gap-6">
            <ProgressTracker currentStep={4} />

            <Card className="mx-auto h-auto w-full max-w-2xl">
                <CardHeader>
                    <CardTitle className="text-3xl font-semibold">
                        Show off your spot.
                    </CardTitle>
                </CardHeader>

                <CardContent className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            multiple
                            className="hidden"
                            onChange={(e) => addPhotos(e.target.files)}
                        />

                        <div className="flex flex-wrap gap-4">
                            {previews.map((src, index) => (
                                <div
                                    key={src}
                                    className="relative h-40 w-52 overflow-hidden rounded-xl border border-border-subtle"
                                >
                                    <img
                                        src={src}
                                        alt={`Driveway photo ${index + 1}`}
                                        className="h-full w-full object-cover"
                                    />
                                    {index === 0 && (
                                        <span className="absolute left-2 top-2 rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-white">
                                            Cover
                                        </span>
                                    )}
                                    <button
                                        type="button"
                                        onClick={() => removePhoto(index)}
                                        aria-label={`Remove photo ${index + 1}`}
                                        className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80"
                                    >
                                        <IoClose aria-hidden="true" />
                                    </button>
                                </div>
                            ))}

                            {formData.images.length < MAX_PHOTOS && (
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="flex h-40 w-52 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border-subtle bg-surface-base text-text-main transition-colors hover:border-primary"
                                >
                                    <IoImageOutline
                                        aria-hidden="true"
                                        className="text-2xl text-primary"
                                    />
                                    <span className="text-sm font-medium">Add photos</span>
                                </button>
                            )}
                        </div>

                        <p className="text-sm text-text-muted">
                            Add at least one photo, up to {MAX_PHOTOS}. The first is your cover.
                        </p>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label
                            htmlFor="driveway-description"
                            className="text-base font-medium text-text-main"
                        >
                            Description
                        </label>
                        <span className="text-sm text-text-muted">Optional</span>
                        <textarea
                            id="driveway-description"
                            rows={4}
                            placeholder="Anything else fans should know about your spot or the walk over."
                            value={formData.description}
                            onChange={(e) => onChange("description", e.target.value)}
                            className="w-full resize-y rounded-md border border-border-subtle bg-surface-base px-3 py-2 text-sm text-text-main transition-colors placeholder:text-text-muted focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>
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