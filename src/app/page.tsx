import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, PackageCheck, PackageOpen, Truck } from "lucide-react";
import { MOCK_ORDERS, ORDER_IDS } from "@/features/order-tracking/api/mockData/orders";
import { formatDeliveryDate } from "@/features/order-tracking/lib/formatDelivery";
import type { Order } from "@/features/order-tracking/types";

const orderIds = Object.values(ORDER_IDS);
const statusLabels: Record<Order["status"], string> = {
  in_progress: "On the way",
  delayed: "Delivery delayed",
  delivered: "Delivered",
  pending_tracking: "Preparing order",
};

const statusStyles: Record<Order["status"], string> = {
  in_progress: "bg-sky-50 text-sky-700 ring-sky-200",
  delayed: "bg-amber-50 text-amber-800 ring-amber-200",
  delivered: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  pending_tracking: "bg-violet-50 text-violet-700 ring-violet-200",
};

export default function Home() {
  const orders = orderIds
    .map((id) => MOCK_ORDERS[id])
    .filter((order): order is Order => Boolean(order));
  const deliveredCount = orders.filter((order) => order.status === "delivered").length;
  const inTransitCount = orders.filter(
    (order) => order.status === "in_progress" || order.status === "delayed",
  ).length;

  return (
    <main className="min-h-screen bg-[#f5f7fb]">
      <div className="mx-auto w-full max-w-6xl px-5 pb-16 pt-6 sm:px-8 lg:px-10">
        <header className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3" aria-label="Parcel home">
            <span className="flex size-10 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg shadow-slate-900/15">
              <PackageCheck className="size-5" aria-hidden="true" />
            </span>
            <span className="text-lg font-bold tracking-tight text-slate-950">parcel<span className="text-blue-600">.</span></span>
          </Link>
          <span className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 sm:flex">
            <span className="size-2 rounded-full bg-emerald-500" /> Live tracking demo
          </span>
        </header>

        <section className="relative mt-10 overflow-hidden rounded-[2rem] bg-slate-950 px-6 py-8 text-white shadow-xl shadow-slate-900/10 sm:px-10 sm:py-11">
          <div className="absolute -right-16 -top-24 size-72 rounded-full bg-blue-500/20 blur-3xl" aria-hidden="true" />
          <div className="absolute -bottom-28 right-1/4 size-64 rounded-full bg-violet-500/15 blur-3xl" aria-hidden="true" />
          <div className="relative max-w-2xl">
            <p className="flex items-center gap-2 text-sm font-semibold text-blue-300">
              <Truck className="size-4" aria-hidden="true" /> YOUR DELIVERY, IN ONE PLACE
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Every order.<br className="sm:hidden" /> Every update.</h1>
            <p className="mt-4 max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
              See what is on its way, follow each delivery milestone, and get help whenever you need it.
            </p>
          </div>
          <div className="relative mt-8 grid max-w-lg grid-cols-2 gap-3 sm:absolute sm:bottom-10 sm:right-10 sm:mt-0 sm:w-72">
            <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-sm">
              <p className="text-2xl font-semibold">{inTransitCount}</p>
              <p className="mt-1 text-xs text-slate-300">In transit</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-sm">
              <p className="text-2xl font-semibold">{deliveredCount}</p>
              <p className="mt-1 text-xs text-slate-300">Delivered</p>
            </div>
          </div>
        </section>

        <section className="mt-10" aria-labelledby="orders-heading">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-blue-700">YOUR DASHBOARD</p>
              <h2 id="orders-heading" className="mt-1 text-2xl font-semibold tracking-tight text-slate-950">Recent orders</h2>
            </div>
            <span className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-slate-500 ring-1 ring-slate-200">{orders.length} sample orders</span>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {orders.map((order) => (
              <Link
                key={order.id}
                href={`/orders/${order.id}`}
                className="group rounded-3xl border border-slate-200/80 bg-white p-4 shadow-sm shadow-slate-900/[0.025] transition duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-950/[0.06] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:p-5"
              >
                <div className="flex items-start gap-4">
                  <div className="relative size-[4.5rem] shrink-0 overflow-hidden rounded-2xl bg-slate-100">
                    <Image src={order.product.imageUrl} alt={order.product.name} fill sizes="72px" className="object-cover transition duration-300 group-hover:scale-105" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-xs font-medium text-slate-500">ORDER {order.orderNumber}</p>
                      <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ring-inset ${statusStyles[order.status]}`}>
                        {statusLabels[order.status]}
                      </span>
                    </div>
                    <h3 className="mt-2 truncate text-base font-semibold text-slate-950">{order.product.name}</h3>
                    <p className="mt-1 truncate text-sm text-slate-500">{order.product.variant} <span aria-hidden="true">·</span> Qty {order.product.quantity}</p>
                  </div>
                </div>
                <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                  <div className="flex items-center gap-2 text-sm">
                    {order.status === "delivered" ? (
                      <PackageCheck className="size-4 text-emerald-600" aria-hidden="true" />
                    ) : (
                      <PackageOpen className="size-4 text-blue-600" aria-hidden="true" />
                    )}
                    <span className="text-slate-500">{order.status === "delivered" ? "Delivered" : "Estimated delivery"}</span>
                    <span className="font-semibold text-slate-800">{formatDeliveryDate(order.status === "delivered" && order.delivered ? order.delivered.deliveredAtIso : order.etaIso)}</span>
                  </div>
                  <span className="flex size-8 items-center justify-center rounded-full bg-slate-50 text-slate-500 transition group-hover:bg-blue-600 group-hover:text-white">
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <footer className="mt-10 flex flex-col justify-between gap-2 border-t border-slate-200 pt-5 text-xs text-slate-500 sm:flex-row">
          <span>© 2026 Parcel. Order updates made simple.</span>
          <span>Demo experience · Sample order data</span>
        </footer>
      </div>
    </main>
  );
}