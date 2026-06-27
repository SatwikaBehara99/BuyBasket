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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow p-8 border border-gray-200 dark:border-gray-700">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white"> Payment Method </h1>
        <div className="space-y-4">

          <div className={`border-2 rounded-2xl p-5 cursor-pointer transition-all duration-300 ${method === "UPI" ? "border-red-500 bg-red-50 dark:bg-red-950/30" : "border-gray-200 dark:border-gray-700 hover:border-red-300 dark:hover:border-red-500"}`}
            onClick={() => setMethod("UPI")} >
            <div className="flex items-center gap-4">
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${method === "UPI"
            ? "border-red-500" : "border-gray-400"} `}>
            {method === "UPI" &&
            <div className="w-3 h-3 rounded-full bg-red-500"></div>}
            </div>
            <span className="font-medium text-lg text-gray-800 dark:text-white"> UPI Payment</span>
            </div>
            </div>

            <div className={`border-2 rounded-2xl p-5 cursor-pointer transition-all duration-300 ${method === "CARD" ? "border-red-500 bg-red-50 dark:bg-red-950/30" : "border-gray-200 dark:border-gray-700 hover:border-red-300 dark:hover:border-red-500"}`}
            onClick={() => setMethod("CARD")} >
            <div className="flex items-center gap-4">
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${method === "CARD"
            ? "border-red-500" : "border-gray-400"} `}>
            {method === "CARD" &&
            <div className="w-3 h-3 rounded-full bg-red-500"></div>}
            </div>
            <span className="font-medium text-lg text-gray-800 dark:text-white"> DEBIT/CREDIT CARD</span>
            </div>
            </div>

            <div className={`border-2 rounded-2xl p-5 cursor-pointer transition-all duration-300 ${method === "COD" ? "border-red-500 bg-red-50 dark:bg-red-950/30" : "border-gray-200 dark:border-gray-700 hover:border-red-300 dark:hover:border-red-500"}`}
            onClick={() => setMethod("COD")} >
            <div className="flex items-center gap-4">
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${method === "COD"
            ? "border-red-500" : "border-gray-400"} `}>
            {method === "COD" &&
            <div className="w-3 h-3 rounded-full bg-red-500"></div>}
            </div>
            <span className="font-medium text-lg text-gray-800 dark:text-white"> Cash On Delivery</span>
            </div>
            </div>

        </div>

        <button
          onClick={() => router.push( `/payment-processing?addressId=${addressId}` ) }
           className="w-full bg-red-600 text-white hover:bg-red-700 cursor-pointer py-4 rounded-xl font-bold mt-8">
             Pay Now
        </button>
        

      </div>
    </div>
  );
}