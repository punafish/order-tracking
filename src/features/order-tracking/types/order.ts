export type OrderStatus =
  | "in_progress"
  | "delayed"
  | "delivered"
  | "pending_tracking";

export type TimelineStepId =
  | "processing"
  | "shipped"
  | "out_for_delivery"
  | "delivered";

export type TimelineStepState =
  | "completed"
  | "active"
  | "pending"
  | "delayed";

export interface TimelineStep {
  id: TimelineStepId;
  label: string;
  state: TimelineStepState;
  timestamp?: string;
}

export interface OrderProduct {
  name: string;
  variant: string;
  quantity: number;
  imageUrl: string;
}

export interface DeliveredInfo {
  deliveredAtIso: string;
  location?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  orderDateIso: string;
  product: OrderProduct;
  status: OrderStatus;
  etaIso: string;
  timeline: TimelineStep[];
  delivered?: DeliveredInfo;
  canReportNotReceived?: boolean;
  shippingAddress: string;
  carrier: string;
  trackingNumber: string;
  supportPhone: string;
}