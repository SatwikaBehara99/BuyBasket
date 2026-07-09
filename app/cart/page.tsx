"use client";

import { useCart } from "@/context/CartContext";
import { Trash2, Bookmark, ShieldCheck, Truck } from "lucide-react";
import {useSession} from "next-auth/react";
import {useRouter } from "next/navigation";
import Link from "next/link";


export default function CartPage() {  
  const {cart,loading, removeFromCart,increaseQty,decreaseQty,getTotal,}= useCart();
  const router = useRouter();
  const {data: session}= useSession();
  const getDeliveryDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 3);
    return date.toLocaleDateString("en-IN", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };
  if(loading) {
  return (
    <div className="min-h-screen flex items-center justify-center
    bg-gradient-to-br from-gray-50 via-white to-green-50
    dark:from-gray-950 dark:via-black dark:to-gray-900
    text-gray-700 dark:text-gray-300">
      Loading cart...
    </div>
  );
}



if (!cart || cart.length === 0) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-950 dark:to-black text-black dark:text-white flex items-center justify-center px-4">
      <div className="bg-white dark:bg-gray-900 shadow-xl rounded-3xl p-10 text-center max-w-md w-full">

        <div className="text-6xl mb-4">
          🛒
        </div>

        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-3">
          Your cart is empty
        </h1>

        <p className="text-gray-500 dark:text-gray-400 mb-6">
          Looks like your cart is empty. Explore our products and add your favorite spices.
        </p>

        <Link
          href="/products"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition"
        >
          Explore Products
        </Link>

      </div>
    </div>
  );
}

  const total = getTotal();
  const discount = Math.floor(total * 0.1);
  const savedAmount = discount;
  const deliveryFee = total > 0 ? 7 : 0;
  const finalAmount = total - discount + deliveryFee;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50 dark:from-gray-950 dark:via-black dark:to-gray-900 py-8 px-3 md:px-6 text-black dark:text-white">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white"> 🛒 My Cart </h1>
          <p className="text-gray-500 dark:text-white mt-2"> Review your selected products before checkout </p>
        </div>
        <div className="grid lg:grid-cols-3 gap-8">

          {/* LEFT SIDE */}
          <div className="lg:col-span-2 space-y-5">
            {cart.map((item) => (
              <div key={item.id} className="bg-white dark:bg-gray-900 rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden" >
                <div className="p-5 flex flex-col md:flex-row gap-5">

                  {/* IMAGE */}
                  <div className="bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-4 flex items-center justify-center min-w-[140px] h-[140px]">
                    <img src={item.image || "/spices.png"} alt={item.name} width={120} height={120} className="w-32 h-32 object-contain hover:scale-105 transition" />
                  </div>

                  {/* DETAILS */}
                  <div className="flex-1">
                    <div className="flex justify-between gap-4">
                      <div>
                        <h2 className="text-xl font-bold text-gray-800 dark:text-white"> {item.name} </h2>
                        <p className="text-gray-500 dark:text-gray-400 mt-1"> {item.variant} </p>
                      </div>

                      <button onClick={() => removeFromCart(item.id)}
                       className="text-red-500 hover:bg-red-50 p-2 rounded-full h-fit" > <Trash2 size={20} />
                      </button>
                    </div>

                    {/* PRICE */}
                    <div className="flex items-center gap-3 mt-4 flex-wrap">
                      <span className="text-2xl font-bold text-gray-900 dark:text-white"> ₹{item.price} </span>
                      <span className="line-through text-gray-400 dark:text-white-200 text-lg"> ₹{item.mrp} </span>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                        {Math.round( ((item.mrp - item.price) / item.mrp) * 100 )} % OFF </span>
                    </div>

                    {/* DELIVERY */}
                    <div className="flex items-center gap-2 mt-4 text-sm text-gray-600 dark:text-white"> <Truck size={16} /> Delivered by{" "}
                      <span className="font-semibold text-gray-800 dark:text-white"> {getDeliveryDate()} </span>
                    </div>

                    {/* QUANTITY */}
                    <div className="mt-5 flex items-center justify-between flex-wrap gap-4">
                      <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden">
                        <button onClick={() => decreaseQty(item.id)} className="px-4 py-2 text-lg font-bold hover:bg-gray-200" >
                          -
                        </button>
                        <span className="px-5 font-semibold dark:text-white"> {item.quantity}</span>

                        <button onClick={() => increaseQty(item.id)} className="px-4 py-2 text-lg font-bold hover:bg-gray-200" >
                          +
                        </button>
                      </div>

                      {/* SAVE */}
                      <button className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 dark:hover:text-white">
                        <Bookmark size={16} /> Save for later
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT SIDE */}
          <div>
            <div className="sticky top-24">
              <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">

                {/* TOP */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-5 text-white">
                  <h2 className="text-2xl font-bold">Price Details </h2>
                  <p className="text-blue-100 mt-1 text-sm"> Secure checkout with fast delivery </p>
                </div>

                {/* CONTENT */}
                <div className="p-6 bg-white dark:bg-gray-900">
                  <div className="space-y-4">
                    <div className="flex justify-between text-gray-700 dark:text-gray-400">
                      <span>Subtotal</span>
                      <span>₹{total}</span>
                    </div>

                    <div className="flex justify-between text-green-600 dark:text-green-200 font-medium">
                      <span>Discount</span>
                      <span>-₹{discount}</span>
                    </div>

                    <div className="flex justify-between text-gray-700 dark:text-gray-400">
                      <span>Delivery Fee</span>
                      <span>₹{deliveryFee}</span>
                    </div>

                    <div className="bg-green-50 dark:bg-green-800 border border-green-100 dark:border-green-700 rounded-2xl p-4">
                      <p className="text-green-700 dark:text-green-200 font-semibold"> 🎉 You saved ₹{savedAmount} on this order</p>
                    </div>

                    <hr className="border-gray-200 dark:border-gray-700"/>

                    <div className="flex justify-between text-2xl font-bold text-gray-900 dark:text-white">
                      <span>Total</span>
                      <span>₹{finalAmount}</span>
                    </div>
                  </div>

                  {/* SECURITY */}
                  <div className="mt-6 bg-gray-50 dark:bg-gray-800 rounded-2xl p-4 flex items-start gap-3">
                    <ShieldCheck size={22} className="text-green-600 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-white"> Safe & Secure Payments </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1"> 100% protected checkout experience </p>
                    </div>
                  </div>

                  {/* BUTTON */}
                  <button onClick={() => {
                  if (!session) {
                    router.push("/cart-signin");
                    return;
                  }
                  router.push("/checkout");

}}
                  className="w-full mt-7 py-4 rounded-2xl font-bold text-lg bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-blue-300 transition-all duration-300" >
                  Place Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}