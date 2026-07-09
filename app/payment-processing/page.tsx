"use client";

import { useEffect,useRef } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useSearchParams } from "next/navigation";


export default function PaymentProcessingPage() {

  const router = useRouter();
  const { cart, clearCart, } = useCart();
  const searchParams = useSearchParams();
  const addressId = searchParams.get("addressId");
  const method = searchParams.get("method");
  const hasOrdered = useRef(false);

  useEffect(() => {
    async function placeOrder() {
      if(hasOrdered.current) return;
      hasOrdered.current = true;
      try {
        const res = await fetch("/api/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            addressId,
            paymentMethod: method,
            items: cart.map((item) => ({
              variantId: item.variantId,
              name: item.name,
              variant: item.variant,
              price: item.price,
              quantity: item.quantity,
            })),
          }),
        });

        const data = await res.json();
        if (!res.ok || !data?.order?.id) {
          alert(data?.error || "Order failed");
          router.push("/cart");
          return;
        }

        router.replace(`/orders/success?orderId=${data.order.id}`);
        clearCart();

      } catch (error) {
        console.log(error);
        alert("Order failed");
        router.push("/cart");
      }
    }

    placeOrder();

  }, [addressId, method]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-950 dark:via-black dark:to-gray-900">
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-10 text-center border border-gray-100 dark:border-gray-700">
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-6" ></div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white"> Processing Your Order... </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-3"> Please wait while we securely confirm your order </p>

        <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
Do not refresh or close this page.
</div>


      </div>
    </div>
  );
}