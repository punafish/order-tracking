"use client";

import { useQuery } from "@tanstack/react-query";
import { getOrder } from "../api/mockOrderApi";

export function useOrderTracking(orderId: string) {
  return useQuery({
    queryKey: ["order", orderId],
    queryFn: () => getOrder(orderId),
    staleTime: 60_000,
    retry: false,
  });
}