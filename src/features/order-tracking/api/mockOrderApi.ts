import type { Order } from "../types";
import { MOCK_ORDERS } from "./mockData/orders";

export const SIMULATED_ERROR_ORDER_ID = "ORD-9999";

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function randomLatency(): number {
  return Math.floor(Math.random() * 501) + 400;
}

export async function getOrder(orderId: string): Promise<Order | null> {
  await wait(randomLatency());

  if (orderId === SIMULATED_ERROR_ORDER_ID) {
    throw new Error("Unable to load tracking information.");
  }

  return MOCK_ORDERS[orderId] ?? null;
}

export async function contactSupport(): Promise<{ success: true }> {
  await wait(500);

  return {
    success: true,
  };
}

export async function reportOrderNotReceived(): Promise<{ success: true }> {
  await wait(500);

  return {
    success: true,
  };
}