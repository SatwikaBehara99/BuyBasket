"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function OrderSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) return;

    fetch(`/api/orders/${orderId}`)
      .then((res) => res.json())
      .then((data) => setOrder(data))
      .finally(() => setLoading(false));
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-950 dark:via-black dark:to-gray-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Loading your order...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-950 dark:via-black dark:to-gray-900 flex items-center justify-center px-4 py-10 overflow-hidden">

      {/* GLOW EFFECTS */}
      <div className="absolute w-96 h-96 bg-blue-300 opacity-20 blur-3xl rounded-full top-10 left-10 animate-pulse"></div>
      <div className="absolute w-96 h-96 bg-blue-400 opacity-20 blur-3xl rounded-full bottom-10 right-10 animate-pulse"></div>

      <div className="relative bg-white dark:bg-gray-900 shadow-2xl rounded-[40px] p-10 max-w-2xl w-full">

        {/* SUCCESS ICON */}
        <div className="flex justify-center mb-8">
          <div className="w-28 h-28 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shadow-xl">
            <span className="text-6xl">✅</span>
          </div>
        </div>

        {/* TITLE */}
        <h1 className="text-4xl font-extrabold text-blue-600 text-center mb-3">
          Order Placed Successfully
        </h1>

        <p className="text-center text-gray-500 dark:text-gray-400 mb-8">
          Thank you for shopping with <span className="font-semibold">BuyBasket</span>.
          <br />
          Your order has been confirmed and is being prepared for dispatch.
        </p>

        {/* ORDER ID */}
        <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-3xl p-5 mb-5">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            ORDER ID
          </p>

          <p className="font-bold text-blue-700 dark:text-blue-300 break-all">
            {orderId}
          </p>
        </div>

        {/* PAYMENT STATUS */}
        <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-3xl p-5 mb-5">

          <h2 className="font-bold text-green-700 dark:text-green-400 mb-2">
            ✅ Payment Successful
          </h2>

          <div className="space-y-2 text-gray-700 dark:text-gray-300">

            <p>
              Payment Method:
              <span className="font-semibold">
                {" "}
                {order?.paymentMethod || "N/A"}
              </span>
            </p>

            <p>
              Amount Paid:
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                {" "}
                ₹{order?.amount}
              </span>
            </p>

            <p>
              You will receive order updates as your package moves through each delivery stage.
            </p>

          </div>
        </div>

        {/* ORDER SUMMARY */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-3xl p-5 mb-5">

          <h2 className="font-bold text-xl mb-4 dark:text-white">
            Order Summary
          </h2>

          <div className="space-y-3 text-gray-700 dark:text-gray-300">

            <div className="flex justify-between">
              <span>Total Amount</span>
              <span className="font-bold text-blue-600 dark:text-blue-400">
                ₹{order?.amount}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Total Items</span>
              <span>{order?.items?.length}</span>
            </div>

            <div className="flex justify-between">
              <span>Order Date</span>
              <span>
                {new Date(order.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Estimated Delivery</span>
              <span>
                {new Date(
                  Date.now() + 3 * 24 * 60 * 60 * 1000
                ).toLocaleDateString("en-IN")}
              </span>
            </div>

          </div>
        </div>

        {/* DELIVERY ADDRESS */}
        <div className="bg-blue-50 dark:bg-blue-950/20 rounded-3xl p-5 mb-5 border border-blue-200 dark:border-blue-800">
          <h2 className="font-bold text-xl mb-4 text-blue-700 dark:text-blue-300">
            📍 Delivery Address
          </h2>

          <div className="space-y-1 text-gray-700 dark:text-gray-300">
            <p className="font-semibold">{order?.deliveryName}</p>

            <p>
              {order?.deliveryArea}, {order?.deliveryLocality}
            </p>

            <p>
              {order?.deliveryCity}, {order?.deliveryState} -{" "}
              {order?.deliveryPincode}
            </p>

            <p>📞 {order?.deliveryPhone}</p>

            {order?.deliveryLandmark && (
              <p>Landmark: {order.deliveryLandmark}</p>
            )}
          </div>
        </div>

        {/* ORDERED ITEMS */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-3xl p-5 mb-6">
          <h2 className="font-bold text-xl mb-4 dark:text-white">
            🛒 Ordered Items
          </h2>

          <div className="space-y-3">
            {order?.items?.map((item: any) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-3"
              >
                <div>
                  <p className="font-medium dark:text-white">
                    {item.name}
                  </p>

                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {item.variantName}
                  </p>
                </div>

                <div className="font-semibold dark:text-white">
                  × {item.quantity}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ORDER STATUS */}
        <div className="mb-8">
          <h2 className="font-bold text-xl mb-6 dark:text-white">
            Order Status
          </h2>

          <div className="flex justify-between items-center">

            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center">
                ✓
              </div>
              <span className="text-xs mt-2 dark:text-gray-300">
                Confirmed
              </span>
            </div>

            <div className="flex-1 h-1 bg-blue-500 mx-2"></div>

            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center animate-pulse">
                📦
              </div>
              <span className="text-xs mt-2 dark:text-gray-300">
                Preparing
              </span>
            </div>

            <div className="flex-1 h-1 bg-gray-300 dark:bg-gray-700 mx-2"></div>

            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700 text-white flex items-center justify-center">
                🚚
              </div>
              <span className="text-xs mt-2 dark:text-gray-300">
                Shipped
              </span>
            </div>

            <div className="flex-1 h-1 bg-gray-300 dark:bg-gray-700 mx-2"></div>

            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700 text-white flex items-center justify-center">
                🏠
              </div>
              <span className="text-xs mt-2 dark:text-gray-300">
                Delivered
              </span>
            </div>

          </div>
        </div>

        {/* BUTTONS */}
        <div className="space-y-4">

          <Link
            href="/orders"
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-4 rounded-2xl font-bold transition duration-300 shadow-lg"
          >
            View My Orders →
          </Link>

          <Link
            href="/products"
            className="block w-full border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-center py-4 rounded-2xl font-medium dark:text-white transition"
          >
            Continue Shopping
          </Link>

        </div>

      </div>
    </div>
  );
}