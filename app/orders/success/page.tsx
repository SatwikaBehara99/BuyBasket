"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function OrderSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    if (!orderId) return;

    fetch(`/api/orders/${orderId}`)
      .then((res) => res.json())
      .then((data) => setOrder(data));
  }, [orderId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-100 dark:from-gray-950 dark:via-gray-900 dark:to-black flex items-center justify-center px-4 py-10 overflow-hidden">

      {/* GLOW EFFECTS */}
      <div className="absolute w-96 h-96 bg-red-300 opacity-20 blur-3xl rounded-full top-10 left-10 animate-pulse"></div>
      <div className="absolute w-96 h-96 bg-red-400 opacity-20 blur-3xl rounded-full bottom-10 right-10 animate-pulse"></div>
      <div className="relative bg-white shadow-2xl rounded-[40px] p-10 max-w-2xl w-full dark:bg-gray-900">

        {/* ICON */}
        <div className="flex justify-center mb-8">
          <div className="w-28 h-28 rounded-full bg-red-100 flex items-center justify-center animate-bounce shadow-xl">
            <span className="text-6xl"> 🎉 </span>
          </div>
        </div>

        {/* TITLE */}
        <h1 className="text-4xl font-extrabold text-red-600 text-center mb-3"> Order Placed Successfully </h1>
        <p className="text-gray-500 dark:text-gray-400 text-center mb-8"> Thank you for shopping with us ❤️ <br /> Your spices are being prepared. </p>

        {/* ORDER ID */}
        <div className="bg-red-50 dark:bg-gray-800 border border-red-200 rounded-3xl p-5 mb-5">
          <p className="text-sm text-gray-500 dark:text-gray-400"> ORDER ID </p>
          <p className="font-bold text-red-700 dark:text-red-300 break-all"> {orderId} </p>
        </div>

        {/* PAYMENT STATUS */}
        <div className="bg-green-50 border border-green-200 rounded-3xl p-5 mb-5">
          <p className="font-bold text-green-700"> ✔ Payment Successful </p>
        </div>

        {/* ORDER SUMMARY */}
        {order && (
          <div className="bg-gray-50 rounded-3xl p-5 mb-5 dark:bg-gray-800">
            <h2 className="font-bold mb-4 dark:text-white"> Order Summary </h2>
            <div className="space-y-2 text-gray-700 dark:text-gray-400">
              <div className="flex justify-between">
                <span>Total Amount</span>
                <span className="font-bold text-red-600 dark:text-red-300"> ₹{order.amount} </span>
              </div>

              <div className="flex justify-between dark:text-white">
                <span>Total Items</span>
                <span> {order.items.length} </span>
              </div>

              <div className="flex justify-between dark:text-white">
                <span>Date</span>
                <span>
                  {new Date(order.createdAt).toLocaleDateString(
                    "en-IN",
                    {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }
                  )}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* DELIVERY ADDRESS */}
        {order && (
          <div className="bg-red-50 rounded-3xl dark:bg-gray-800 p-5 mb-5">
            <h2 className="font-bold mb-4 dark:text-white"> 📍 Delivered To </h2>
            <div className="space-y-1 text-gray-700 dark:text-gray-400">
              <p className="font-bold"> {order.deliveryName} </p>
              <p>
                {order.deliveryArea}, {order.deliveryLocality} </p>
              <p>
                {order.deliveryCity}, {order.deliveryState}
                {" - "}
                {order.deliveryPincode}
              </p>
              <p> Phone : {order.deliveryPhone} </p>
              {order.deliveryLandmark && (
                <p> Landmark : {order.deliveryLandmark} </p>
              )}
            </div>
          </div>
        )}

        {/* ORDERED ITEMS */}
        {order && (

          <div className="bg-gray-50 rounded-3xl p-5 mb-6 dark:bg-gray-800">
            <h2 className="font-bold mb-4 dark:text-white"> Ordered Items </h2>
            {order.items.map((item: any) => (
              <div key={item.id} className="flex justify-between mb-3" >
                <div> {item.name}
                   <span className="text-gray-500 dark:text-gray-400">
                    {" "}
                    ({item.variantName})
                  </span>
                </div>
                <div> × {item.quantity} </div>
              </div>
            ))}
          </div>
        )}

        {/* ORDER PROGRESS */}
        <div className="mb-8">

          <div className="flex justify-between items-center">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center dark:text-gray-400"> ✓ </div>
              <span className="text-xs mt-2"> Confirmed </span>
            </div>

            <div className="flex-1 h-1 bg-red-300 mx-2"></div>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center animate-pulse dark:text-gray-400"> 📦 </div>
              <span className="text-xs mt-2"> Preparing </span>
            </div>

            <div className="flex-1 h-1 bg-gray-200 mx-2"></div>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-gray-300 text-white flex items-center justify-center dark:text-gray-400"> 🚚 </div>
              <span className="text-xs mt-2"> Shipped </span>
            </div>

            <div className="flex-1 h-1 bg-gray-200 mx-2"></div>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-gray-300 text-white flex items-center justify-center dark:text-gray-400"> 🏠 </div>
              <span className="text-xs mt-2"> Delivered </span>
            </div>

          </div>
        </div>

        {/* BUTTONS */}
        <div className="space-y-3">
          <Link href="/orders" className="block bg-gradient-to-r from-red-600 to-red-500 text-white dark:text-white py-4 rounded-2xl font-bold shadow-xl text-center hover:scale-[1.02] transition" >
            View My Orders → </Link>
          <Link href="/products" className="block border border-gray-300 dark:border-gray-700 py-4 rounded-2xl text-center font-medium dark:text-white" >
            Continue Shopping </Link>
        </div>
      </div>
    </div>
  );
}