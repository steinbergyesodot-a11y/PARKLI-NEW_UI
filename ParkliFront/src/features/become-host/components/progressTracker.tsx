import { cn } from "../../../lib/utils";

const STEPS = ["Basics", "Walk & price", "Notes", "Photos", "Review"];

interface ProgressTrackerProps {
  /** 1-based index of the current step (1 = Basics, 5 = Review) */
  currentStep: number;
}

export function ProgressTracker({ currentStep }: ProgressTrackerProps) {
  const progressPercent = (Math.min(Math.max(currentStep, 1), STEPS.length) / STEPS.length) * 100;

  return (
    <nav aria-label="Listing progress" className="mx-auto w-full max-w-2xl">
      <ol className="flex items-center justify-between gap-4">
        {STEPS.map((label, index) => {
          const step = index + 1;
          const isActive = step === currentStep;
          const isCompleted = step < currentStep;

          return (
            <li key={label} className="flex items-center gap-2">
              <span
                aria-current={isActive ? "step" : undefined}
                className={cn(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-semibold",
                  isActive || isCompleted
                    ? "bg-brand-600 text-white"
                    : "border border-gray-300 bg-white text-brand-600"
                )}
              >
                {step}
              </span>
              <span
                className={cn(
                  "whitespace-nowrap text-sm",
                  isActive ? "font-semibold text-brand-900" : "text-gray-500"
                )}
              >
                {label}
              </span>
            </li>
          );
        })}
      </ol>

      <div className="mt-3 h-1 w-full rounded-full bg-gray-200">
        <div
          className="h-full rounded-full bg-brand-600 transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </nav>
  );
}
