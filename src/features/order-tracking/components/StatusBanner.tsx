import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  PackageCheck,
} from "lucide-react";

type StatusBannerProps = {
  type: "progress" | "delayed" | "delivered" | "pending";
  title: string;
  description: string;
};

const statusConfig = {
  progress: {
    icon: PackageCheck,
    className: "border-blue-200 bg-blue-50 text-blue-950",
  },
  delayed: {
    icon: AlertTriangle,
    className: "border-amber-200 bg-amber-50 text-amber-950",
  },
  delivered: {
    icon: CheckCircle2,
    className: "border-emerald-200 bg-emerald-50 text-emerald-950",
  },
  pending: {
    icon: Clock3,
    className: "border-neutral-200 bg-neutral-50 text-neutral-900",
  },
} as const;

export function StatusBanner({
  type,
  title,
  description,
}: StatusBannerProps) {
  const config = statusConfig[type];
  const Icon = config.icon;

  return (
    <section
      className={`rounded-2xl border p-4 ${config.className}`}
      aria-live="polite"
    >
      <div className="flex items-start gap-3">
        <Icon className="mt-0.5 size-5 shrink-0" aria-hidden="true" />

        <div>
          <h2 className="text-sm font-semibold">{title}</h2>
          <p className="mt-1 text-sm leading-5 opacity-80">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}