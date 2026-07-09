"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

export default function PaymentPage() {

  const router = useRouter();
  const [method, setMethod] = useState("UPI");
  const searchParams = useSearchParams();
  const addressId = searchParams.get("addressId");

  return (
    <div className="min-h-screen bg-gradient-to-br
            from-gray-50
            via-white
            to-blue-50
            dark:from-gray-950
            dark:via-black
            dark:to-gray-900 p-6">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow p-8 border border-gray-200 dark:border-gray-700">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white"> Payment Method </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2 mb-8">
          Choose your preferred payment option.
        </p>
        <div className="space-y-4">

          <div className={`border-2 rounded-2xl p-5 cursor-pointer transition-all duration-300 ${method === "UPI" ? "border-blue-500 bg-blue-50 dark:bg-blue-950/30" : "border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500"}`}
            onClick={() => setMethod("UPI")} >
            <div className="flex items-center gap-4">
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${method === "UPI"
                ? "border-blue-500" : "border-gray-400"} `}>
                {method === "UPI" &&
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>}
              </div>
              <span className="font-medium text-lg text-gray-800 dark:text-white"> 📱 UPI Payment</span>
            </div>
          </div>

          <div className={`border-2 rounded-2xl p-5 cursor-pointer transition-all duration-300 ${method === "CARD" ? "border-blue-500 bg-blue-50 dark:bg-blue-950/30" : "border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500"}`}
            onClick={() => setMethod("CARD")} >
            <div className="flex items-center gap-4">
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${method === "CARD"
                ? "border-blue-500" : "border-gray-400"} `}>
                {method === "CARD" &&
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>}
              </div>
              <span className="font-medium text-lg text-gray-800 dark:text-white"> 💳 DEBIT/CREDIT CARD</span>
            </div>
          </div>

          <div className={`border-2 rounded-2xl p-5 cursor-pointer transition-all duration-300 ${method === "COD" ? "border-blue-500 bg-blue-50 dark:bg-blue-950/30" : "border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500"}`}
            onClick={() => setMethod("COD")} >
            <div className="flex items-center gap-4">
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${method === "COD"
                ? "border-blue-500" : "border-gray-400"} `}>
                {method === "COD" &&
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>}
              </div>
              <span className="font-medium text-lg text-gray-800 dark:text-white"> 📦 Cash On Delivery</span>
            </div>
          </div>

        </div>

        <button
          onClick={() => router.push(`/payment-processing?addressId=${addressId}&method=${method}`)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold mt-8 transition">
          Proceed to Payment →
        </button>


      </div>
    </div>
  );
}