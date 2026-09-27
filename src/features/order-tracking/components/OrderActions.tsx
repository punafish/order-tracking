"use client";

import { useState } from "react";
import { Headphones, PackageX } from "lucide-react";
import { reportOrderNotReceived } from "../api/mockOrderApi";

type OrderActionsProps = {
  supportPhone: string;
  canReportNotReceived?: boolean;
};

export function OrderActions({
  supportPhone,
  canReportNotReceived = false,
}: OrderActionsProps) {
  const [reportLoading, setReportLoading] = useState(false);
  const [reportSubmitted, setReportSubmitted] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleReport() {
    setReportLoading(true);
    setMessage(null);

    try {
      await reportOrderNotReceived();
      setReportSubmitted(true);
      setMessage("Your report has been submitted.");
    } catch {
      setMessage("We couldn’t submit your report. Please try again.");
    } finally {
      setReportLoading(false);
    }
  }

  return (
    <section className="space-y-3">
      <a
        href={`tel:${supportPhone.replace(/[^\d+]/g, "")}`}
        className="flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/15 transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >
        <Headphones className="size-4" aria-hidden="true" />
        Call delivery support
      </a>

      {canReportNotReceived && (
        <button
          type="button"
          onClick={handleReport}
          disabled={reportLoading || reportSubmitted}
          className="flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <PackageX className="size-4" aria-hidden="true" />
          {reportLoading
            ? "Submitting report…"
            : reportSubmitted
              ? "Report submitted"
              : "Report order not received"}
        </button>
      )}

      {message && (
        <p
          className="text-center text-sm text-neutral-600"
          role="status"
          aria-live="polite"
        >
          {message}
        </p>
      )}
    </section>
  );
}