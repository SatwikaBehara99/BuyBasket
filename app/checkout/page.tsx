"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const router = useRouter();
  const { getTotal } = useCart();

  const [addresses, setAddresses] = useState<any[]>([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/addresses")
      .then((res) => res.json())
      .then((data) => {
        setAddresses(data);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-950 dark:via-black dark:to-gray-900 text-gray-700 dark:text-gray-300">
        Loading your saved addresses...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-950 dark:via-black dark:to-gray-900 py-8 px-3 md:px-6 text-black dark:text-white">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
            Secure Checkout
          </h1>

          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Select your delivery address to continue.
          </p>
        </div>

        <div className="inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 text-sm font-medium mb-6">
          📍 Delivery Address
        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* LEFT SIDE */}
          <div className="lg:col-span-2 space-y-4">

            {addresses.length === 0 && (
              <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-10 text-center border border-gray-200 dark:border-gray-700">

                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  No saved addresses
                </h2>

                <p className="text-gray-500 dark:text-gray-400 mt-3">
                  Please add a delivery address before continuing.
                </p>

                <button
                  onClick={() => router.push("/account/addresses")}
                  className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-semibold transition"
                >
                  + Add Address
                </button>

              </div>
            )}

            {addresses.map((address) => (
              <div
                key={address.id}
                onClick={() => setSelectedAddress(address.id)}
                className={`cursor-pointer rounded-3xl border-2 p-5 shadow-sm transition-all duration-300 bg-white dark:bg-gray-900
                ${
                  selectedAddress === address.id
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-950/30"
                    : "border-gray-200 dark:border-gray-700 hover:border-blue-300"
                }`}
              >
                <div className="flex gap-4">

                  <input
                    type="radio"
                    checked={selectedAddress === address.id}
                    readOnly
                    className="mt-1"
                  />

                  <div>
                    <h2 className="font-bold text-lg">
                      {address.name}
                    </h2>

                    <p className="text-gray-600 dark:text-gray-300 mt-1">
                      {address.area}, {address.locality}
                    </p>

                    <p className="text-gray-600 dark:text-gray-300">
                      {address.city}, {address.state} - {address.pincode}
                    </p>

                    <p className="text-gray-600 dark:text-gray-300 mt-1">
                      {address.phone}
                    </p>

                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT SIDE */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">

              <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
                Order Summary
              </h2>

              <div className="space-y-4">

                <div className="flex justify-between text-gray-700 dark:text-gray-300">
                  <span>Subtotal</span>
                  <span>₹{getTotal()}</span>
                </div>

                <div className="flex justify-between text-green-600 dark:text-green-400 font-medium">
                  <span>Delivery</span>
                  <span>FREE</span>
                </div>

                <hr className="border-gray-200 dark:border-gray-700" />

                <div className="flex justify-between text-2xl font-bold text-gray-900 dark:text-white">
                  <span>Total</span>
                  <span>₹{getTotal()}</span>
                </div>

              </div>

              <button
                disabled={!selectedAddress}
                onClick={() =>
                  router.push(`/payment?addressId=${selectedAddress}`)
                }
                className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold transition disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Proceed to Payment →
              </button>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}