import type { Order } from "../../types";

export const ORDER_IDS = {
  happyPath: "ORD-1001",
  delayed: "ORD-1002",
  deliveredNotReceived: "ORD-1003",
  trackingUnavailable: "ORD-1004",
} as const;

export const MOCK_ORDERS: Record<string, Order> = {
  [ORDER_IDS.happyPath]: {
    id: ORDER_IDS.happyPath,
    orderNumber: ORDER_IDS.happyPath,
    orderDateIso: "2026-09-25T10:30:00.000Z",
    product: {
      name: "Everyday Runner",
      variant: "Black / UK 7",
      quantity: 1,
      imageUrl:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80",
    },
    status: "in_progress",
    etaIso: "2026-10-02T18:00:00.000Z",
    timeline: [
      {
        id: "processing",
        label: "Processing",
        state: "completed",
        timestamp: "2026-09-25T12:00:00.000Z",
      },
      {
        id: "shipped",
        label: "Shipped",
        state: "active",
        timestamp: "2026-09-27T09:30:00.000Z",
      },
      {
        id: "out_for_delivery",
        label: "Out for Delivery",
        state: "pending",
      },
      {
        id: "delivered",
        label: "Delivered",
        state: "pending",
      },
    ],
    shippingAddress: "24 Market Street, London, E1 6AN",
    carrier: "Parcel Express",
    trackingNumber: "PX83920174GB",
    supportPhone: "+44 20 7946 0958",
  },

  [ORDER_IDS.delayed]: {
    id: ORDER_IDS.delayed,
    orderNumber: ORDER_IDS.delayed,
    orderDateIso: "2026-09-22T14:15:00.000Z",
    product: {
      name: "Classic Backpack",
      variant: "Stone / 22L",
      quantity: 1,
      imageUrl:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=400&q=80",
    },
    status: "delayed",
    etaIso: "2026-10-04T18:00:00.000Z",
    timeline: [
      {
        id: "processing",
        label: "Processing",
        state: "completed",
        timestamp: "2026-09-22T16:00:00.000Z",
      },
      {
        id: "shipped",
        label: "Shipped",
        state: "completed",
        timestamp: "2026-09-24T08:45:00.000Z",
      },
      {
        id: "out_for_delivery",
        label: "Out for Delivery",
        state: "delayed",
      },
      {
        id: "delivered",
        label: "Delivered",
        state: "pending",
      },
    ],
    shippingAddress: "18 King Street, London, W1B 5PW",
    carrier: "Parcel Express",
    trackingNumber: "PX48291035GB",
    supportPhone: "+44 20 7946 0958",
  },

  [ORDER_IDS.deliveredNotReceived]: {
    id: ORDER_IDS.deliveredNotReceived,
    orderNumber: ORDER_IDS.deliveredNotReceived,
    orderDateIso: "2026-09-19T11:00:00.000Z",
    product: {
      name: "Wireless Headphones",
      variant: "Graphite",
      quantity: 1,
      imageUrl:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80",
    },
    status: "delivered",
    etaIso: "2026-09-26T16:00:00.000Z",
    timeline: [
      {
        id: "processing",
        label: "Processing",
        state: "completed",
        timestamp: "2026-09-19T13:20:00.000Z",
      },
      {
        id: "shipped",
        label: "Shipped",
        state: "completed",
        timestamp: "2026-09-21T09:00:00.000Z",
      },
      {
        id: "out_for_delivery",
        label: "Out for Delivery",
        state: "completed",
        timestamp: "2026-09-26T07:40:00.000Z",
      },
      {
        id: "delivered",
        label: "Delivered",
        state: "completed",
        timestamp: "2026-09-26T14:32:00.000Z",
      },
    ],
    delivered: {
      deliveredAtIso: "2026-09-26T14:32:00.000Z",
      location: "Front door",
    },
    canReportNotReceived: true,
    shippingAddress: "52 Queen's Road, London, SE15 2QW",
    carrier: "Parcel Express",
    trackingNumber: "PX72518460GB",
    supportPhone: "+44 20 7946 0958",
  },

  [ORDER_IDS.trackingUnavailable]: {
    id: ORDER_IDS.trackingUnavailable,
    orderNumber: ORDER_IDS.trackingUnavailable,
    orderDateIso: "2026-09-28T08:10:00.000Z",
    product: {
      name: "Essential Hoodie",
      variant: "Navy / Medium",
      quantity: 1,
      imageUrl:
        "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=400&q=80",
    },
    status: "pending_tracking",
    etaIso: "2026-10-06T18:00:00.000Z",
    timeline: [
      {
        id: "processing",
        label: "Processing",
        state: "active",
        timestamp: "2026-09-28T08:30:00.000Z",
      },
      {
        id: "shipped",
        label: "Shipped",
        state: "pending",
      },
      {
        id: "out_for_delivery",
        label: "Out for Delivery",
        state: "pending",
      },
      {
        id: "delivered",
        label: "Delivered",
        state: "pending",
      },
    ],
    shippingAddress: "7 Station Road, London, N1 9AL",
    carrier: "Pending assignment",
    trackingNumber: "Not available yet",
    supportPhone: "+44 20 7946 0958",
  },
};