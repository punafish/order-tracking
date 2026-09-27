import type { Order, TimelineStep } from "../types";

export type TrackingVariant =
  | {
      kind: "happy_path";
      order: Order;
      timeline: TimelineStep[];
    }
  | {
      kind: "delayed";
      order: Order;
      timeline: TimelineStep[];
      inferredFromPassedEta: boolean;
    }
  | {
      kind: "delivered_not_received";
      order: Order;
      timeline: TimelineStep[];
    }
  | {
      kind: "tracking_unavailable";
      order: Order;
    };

export function getTrackingVariant(order: Order): TrackingVariant {
  if (order.status === "pending_tracking") {
    return { kind: "tracking_unavailable", order };
  }

  if (order.status === "delivered") {
    return {
      kind: "delivered_not_received",
      order,
      timeline: order.timeline,
    };
  }

  const etaHasPassed = new Date(order.etaIso).getTime() < Date.now();

  if (
    order.status === "delayed" ||
    (order.status === "in_progress" && etaHasPassed)
  ) {
    return {
      kind: "delayed",
      order,
      timeline: order.timeline,
      inferredFromPassedEta:
        order.status === "in_progress" && etaHasPassed,
    };
  }

  return {
    kind: "happy_path",
    order,
    timeline: order.timeline,
  };
}