import { OrderTrackingScreen } from "@/features/order-tracking/components/OrderTrackingScreen";

type OrderPageProps = {
  params: Promise<{
    orderId: string;
  }>;
};

export default async function OrderPage({ params }: OrderPageProps) {
  const { orderId } = await params;

  return <OrderTrackingScreen orderId={orderId} />;
}