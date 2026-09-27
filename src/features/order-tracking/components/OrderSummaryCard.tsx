import Image from "next/image";
import type { Order } from "../types";
import { formatOrderDate } from "../lib/formatDelivery";

type OrderSummaryCardProps = {
  order: Order;
};

export function OrderSummaryCard({ order }: OrderSummaryCardProps) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-900/[0.025] sm:p-6">
      <div className="flex gap-4 sm:gap-5">
        <div className="relative size-24 shrink-0 overflow-hidden rounded-2xl bg-slate-100 sm:size-28">
          <Image
            src={order.product.imageUrl}
            alt={order.product.name}
            fill
            sizes="(min-width: 640px) 112px, 96px"
            className="object-cover"
          />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-blue-700">Order #{order.orderNumber}</p>

          <h2 className="mt-2 truncate text-lg font-semibold tracking-tight text-slate-950">
            {order.product.name}
          </h2>

          <p className="mt-1 text-sm text-slate-600">
            {order.product.variant} · Qty {order.product.quantity}
          </p>

          <p className="mt-3 text-xs text-slate-500">
            Ordered {formatOrderDate(order.orderDateIso)}
          </p>
        </div>
      </div>
    </section>
  );
}