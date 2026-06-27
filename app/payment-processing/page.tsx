"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useSearchParams } from "next/navigation";


export default function PaymentProcessingPage() {

  const router = useRouter();
  const { cart, clearCart, } = useCart();
  const searchParams = useSearchParams();
  const addressId = searchParams.get("addressId");
  

  useEffect(() => {
    async function placeOrder() {
      try {
        const res = await fetch("/api/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            addressId,
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
        clearCart();
        setTimeout(() => { router.push(`/orders/success?orderId=${data.order.id}`); }, 3000);

      } catch (error) {
        console.log(error);
        alert("Order failed");
        router.push("/cart");
      }
    }

    placeOrder();

  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-100 dark:from-gray-900 dark:via-gray-950 dark:to-black">
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-10 text-center border border-gray-100 dark:border-gray-700">
        <div className="animate-spin text-6xl mb-6"> 💳 </div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white"> Processing Payment... </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-3"> Please wait while we place your order </p>
      </div>
    </div>
  );
}