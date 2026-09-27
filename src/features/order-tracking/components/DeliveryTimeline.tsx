import { Check, Clock3 } from "lucide-react";
import type { TimelineStep } from "../types";
import { formatDeliveryDateTime } from "../lib/formatDelivery";

type DeliveryTimelineProps = {
  steps: TimelineStep[];
};

export function DeliveryTimeline({ steps }: DeliveryTimelineProps) {
  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-5">
      <h2 className="text-base font-semibold text-neutral-950">
        Delivery progress
      </h2>

      <ol className="mt-5">
        {steps.map((step, index) => {
          const isCompleted = step.state === "completed";
          const isActive = step.state === "active";
          const isDelayed = step.state === "delayed";
          const isLast = index === steps.length - 1;

          return (
            <li key={step.id} className="relative flex gap-4 pb-6 last:pb-0">
              {!isLast && (
                <span
                  className="absolute left-[15px] top-8 h-[calc(100%-24px)] w-px bg-neutral-200"
                  aria-hidden="true"
                />
              )}

              <span
                className={`relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border ${
                  isCompleted
                    ? "border-neutral-900 bg-neutral-900 text-white"
                    : isActive
                      ? "border-blue-600 bg-blue-50 text-blue-700"
                      : isDelayed
                        ? "border-amber-500 bg-amber-50 text-amber-700"
                        : "border-neutral-300 bg-white text-neutral-400"
                }`}
              >
                {isCompleted ? (
                  <Check className="size-4" aria-hidden="true" />
                ) : (
                  <Clock3 className="size-4" aria-hidden="true" />
                )}
              </span>

              <div className="min-w-0 pt-1">
                <p className="text-sm font-medium text-neutral-900">
                  {step.label}
                </p>

                {step.timestamp && (
                  <p className="mt-1 text-xs text-neutral-500">
                    {formatDeliveryDateTime(step.timestamp)}
                  </p>
                )}

                {isDelayed && (
                  <p className="mt-1 text-xs font-medium text-amber-700">
                    Delivery is taking longer than expected
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}