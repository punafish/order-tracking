"use client";

import {
  AlertCircle,
  ArrowLeft,
  CalendarDays,
  MapPin,
  PackageCheck,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { useOrderTracking } from "../hooks/useOrderTracking";
import { getTrackingVariant } from "../lib/getTrackingVariant";
import { formatDeliveryDate } from "../lib/formatDelivery";
import { OrderSummaryCard } from "./OrderSummaryCard";
import { StatusBanner } from "./StatusBanner";
import { DeliveryTimeline } from "./DeliveryTimeline";
import { OrderActions } from "./OrderActions";
import { OrderTrackingSkeleton } from "./OrderTrackingSkeleton";

type OrderTrackingScreenProps = {
  orderId: string;
};

export function OrderTrackingScreen({
  orderId,
}: OrderTrackingScreenProps) {
  const { data: order, isLoading, isError, refetch, isFetching } =
    useOrderTracking(orderId);

  if (isLoading) {
    return <OrderTrackingSkeleton />;
  }

  if (isError) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f5f7fb] px-5 py-10">
        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl shadow-slate-900/5">
          <AlertCircle
            className="mx-auto size-10 text-rose-600"
            aria-hidden="true"
          />

          <h1 className="mt-4 text-xl font-semibold text-slate-950">
            Unable to load tracking
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Something went wrong while loading your order.
          </p>

          <button
            type="button"
            onClick={() => refetch()}
            disabled={isFetching}
            className="mt-6 min-h-11 w-full rounded-xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-60"
          >
            {isFetching ? "Trying again..." : "Try again"}
          </button>
          <Link href="/" className="mt-4 inline-flex min-h-11 items-center text-sm font-medium text-slate-600 hover:text-slate-950">
            Return to orders
          </Link>
        </div>
      </main>
    );
  }

  if (!order) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f5f7fb] px-5 py-10">
        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl shadow-slate-900/5">
          <AlertCircle
            className="mx-auto size-10 text-slate-400"
            aria-hidden="true"
          />

          <h1 className="mt-4 text-xl font-semibold text-slate-950">
            Order not found
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Check the order number and try again.
          </p>
          <Link href="/" className="mt-6 inline-flex min-h-11 items-center justify-center rounded-xl bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
            Back to all orders
          </Link>
        </div>
      </main>
    );
  }

  const variant = getTrackingVariant(order);

  const statusContent =
    variant.kind === "delayed"
      ? {
          type: "delayed" as const,
          title: "Your delivery is delayed",
          description: `We now expect your order by ${formatDeliveryDate(
            order.etaIso
          )}.`,
        }
      : variant.kind === "delivered_not_received"
        ? {
            type: "delivered" as const,
            title: "Delivered",
            description: order.delivered
              ? `Delivered ${formatDeliveryDate(
                  order.delivered.deliveredAtIso
                )}${
                  order.delivered.location
                    ? ` · ${order.delivered.location}`
                    : ""
                }.`
              : "Your order has been delivered.",
          }
        : variant.kind === "tracking_unavailable"
          ? {
              type: "pending" as const,
              title: "Tracking will be available soon",
              description:
                "Your order is being prepared. Tracking details will appear once it ships.",
            }
          : {
              type: "progress" as const,
              title: "Your order is on the way",
              description: `Estimated delivery ${formatDeliveryDate(
                order.etaIso
              )}.`,
            };

  return (
    <main className="min-h-screen bg-[#f5f7fb]">
      <div className="mx-auto w-full max-w-6xl px-5 pb-16 pt-6 sm:px-8 lg:px-10">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <Link href="/" className="inline-flex min-h-11 items-center gap-2 rounded-full pr-3 text-sm font-semibold text-slate-700 transition hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
            <span className="flex size-9 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-slate-200">
              <ArrowLeft className="size-4" aria-hidden="true" />
            </span>
            All orders
          </Link>
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600">
            <ShieldCheck className="size-4 text-emerald-600" aria-hidden="true" /> Secure order details
          </span>
        </header>

        <div className="mb-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-blue-700">Order tracking</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Your delivery, step by step</h1>
          </div>
          <p className="text-sm text-slate-500">Order <span className="font-semibold text-slate-700">{order.orderNumber}</span></p>
        </div>

        <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-5">
            <OrderSummaryCard order={order} />
            <StatusBanner {...statusContent} />
            <DeliveryTimeline steps={variant.kind === "tracking_unavailable" ? order.timeline : variant.timeline} />
          </div>

          <aside className="space-y-5">
            <section className="overflow-hidden rounded-3xl bg-slate-950 p-6 text-white shadow-xl shadow-slate-900/10">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-300">
                <CalendarDays className="size-4 text-blue-300" aria-hidden="true" />
                {variant.kind === "delivered_not_received" ? "Delivered on" : "Estimated delivery"}
              </div>
              <p className="mt-3 text-3xl font-semibold tracking-tight">
                {formatDeliveryDate(
                  variant.kind === "delivered_not_received" && order.delivered
                    ? order.delivered.deliveredAtIso
                    : order.etaIso,
                )}
              </p>
              <div className="mt-5 flex items-start gap-2 border-t border-white/10 pt-4 text-sm leading-5 text-slate-300">
                <MapPin className="mt-0.5 size-4 shrink-0 text-blue-300" aria-hidden="true" />
                <span>{order.shippingAddress}</span>
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-900/[0.025]">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                  <PackageCheck className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <h2 className="font-semibold text-slate-950">Delivery details</h2>
                  <p className="text-xs text-slate-500">Handled with care</p>
                </div>
              </div>
              <dl className="mt-5 space-y-4">
                <div className="flex justify-between gap-4 text-sm">
                  <dt className="text-slate-500">Carrier</dt>
                  <dd className="text-right font-medium text-slate-800">{order.carrier}</dd>
                </div>
                <div className="flex justify-between gap-4 text-sm">
                  <dt className="shrink-0 text-slate-500">Tracking number</dt>
                  <dd className="break-all text-right font-medium text-slate-800">{order.trackingNumber}</dd>
                </div>
              </dl>
            </section>

            <OrderActions
              supportPhone={order.supportPhone}
              canReportNotReceived={
                variant.kind === "delivered_not_received" &&
                order.canReportNotReceived
              }
            />
          </aside>
        </div>
        <footer className="mt-10 border-t border-slate-200 pt-5 text-center text-xs text-slate-500">
          Need a hand? Our delivery support team is here for you.
        </footer>
      </div>
    </main>
  );
}