"use client";

import Image from "next/image";
import { useState, useEffect, } from "react";
import { Heart, Star, ShieldCheck, Truck, BadgeCheck, } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function ProductClient({ product, }: any) {
  const { addToCart } = useCart();
  const [selected, setSelected] = useState(product.variants[0]);
  const [liked, setLiked] = useState(false);
  const [message, setMessage] = useState("");

  //  RATING
  const rating = 4.4;
  const reviews = 128;

  //  PRICE
  const mrp = (selected?.price || 0) + 20;
  const discount = Math.round(((mrp - selected?.price) / mrp) * 100);

  //  STOCK
  const stock = selected?.stock || 0;

  //  CHECK WISHLIST

useEffect(() => { const checkWishlist = async () => {
    try {
      const res = await fetch("/api/wishlist");
      if (!res.ok) return;
      const data = await res.json();

      setLiked(
        data.some(
          (item: any) =>
            item.variant.id === selected.id
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  if (selected?.id) {
    checkWishlist();
  }
}, [selected?.id]);



  //  ADD TO CART
  const handleCart = () => {
    if (!selected) return;
    addToCart({
      variantId: selected.id,
      name: product.name,
      variant: selected.name,
      price: selected.price,
      mrp,
      rating,
      image:
        selected.image ||
        "/spices.png",
    });

    setMessage(
      "Added to cart ✅"
    );

    setTimeout(() => {

      setMessage("");

    }, 2000);
  };

  // WISHLIST

    const handleWishlist = async () => {
  try {
    if (!liked) {
      const res = await fetch("/api/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          variantId: selected.id,
        }),
      });

      if (res.status === 401) {
        setMessage("Please login first");
        return;
      }

      setLiked(true);
      setMessage("Added to wishlist ❤️");
    } else {
      const res = await fetch("/api/wishlist", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          variantId: selected.id,
        }),
      });

      if (res.status === 401) {
        setMessage("Please login first");
        return;
      }

      setLiked(false);
      setMessage("Removed from wishlist");
    }

    setTimeout(() => {
      setMessage("");
    }, 2000);
  } catch (error) {
    console.log(error);
    setMessage("Something went wrong");
  }
};



  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-950 dark:to-black py-10 px-4">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-start">

        {/* LEFT */}
        <div className="sticky top-24">
          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">

            {/* IMAGE */}
            <div className="p-8 flex justify-center items-center bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
              <div className="overflow-hidden rounded-2xl">

                <Image
                  src={
                    selected?.image ||
                    "/spices.png"
                  }
                  alt={product.name}
                  width={500}
                  height={500}
                  className="object-contain w-full max-w-[420px] hover:scale-110 transition duration-500"
                />

              </div>
            </div>

            {/* BADGES */}
            <div className="border-t p-5 flex flex-wrap gap-3">
              <div className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
                <ShieldCheck size={16} />
                Premium Quality
              </div>

              <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                <Truck size={16} />
                Fast Delivery
              </div>

              <div className="flex items-center gap-2 bg-yellow-50 text-yellow-700 px-4 py-2 rounded-full text-sm font-medium">
                <BadgeCheck size={16} />
                Trusted Brand
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div>
          {/* BRAND */}
          <p className="text-red-600 dark:text-red-400 font-semibold tracking-wide uppercase text-sm"> Spicery Premium </p>

          {/* TITLE */}
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mt-2 leading-tight"> {product.name} </h1>

          {/* RATINGS */}
          <div className="flex items-center gap-3 mt-4 flex-wrap">
            <div className="flex items-center gap-1 bg-green-600 text-white px-3 py-1 rounded-lg text-sm font-semibold">
              <Star size={15} fill="white" />
              {rating}
            </div>

            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {reviews}+ ratings & reviews
            </p>

          </div>

          {/* DESCRIPTION */}
          <p className="text-gray-600 dark:text-gray-300 leading-7 mt-6 text-lg">
            {product.description}
          </p>

          {/* PRICE */}
          <div className="mt-8">
            <div className="flex items-center gap-4 flex-wrap">
              <span className="text-4xl font-bold text-gray-900 dark:text-white"> ₹ {selected?.price} </span>
              <span className="line-through text-gray-400 dark:text-gray-500 text-xl"> ₹{mrp} </span>
              <span className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-100 px-4 py-2 rounded-full font-semibold text-sm"> {discount}% OFF </span>
            </div>
            <p className="text-green-700 dark:text-green-400 font-medium mt-3"> Inclusive of all taxes </p>
          </div>

          {/* STOCK */}
          <div className="mt-6">
            {stock <= 3 ? (
              <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200 px-4 py-2 rounded-full font-semibold">
                🔥 Only {stock} left in stock
              </div>
            ) : (

              <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200 px-4 py-2 rounded-full font-semibold">
                ✅ In Stock
              </div>
            )}

          </div>

          {/* VARIANTS */}
          <div className="mt-10">
            <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-4"> Select Variant </h3>
            <div className="flex flex-wrap gap-4">
              {product.variants.map(
                (v: any) => {

                  const active = selected?.id === v.id;
                  return (
                    <button
                      key={v.id}
                      onClick={() =>
                        setSelected(v)
                      }
                      className={`px-6 py-4 rounded-2xl border-2 transition-all cursor-pointer text-left min-w-[120px]

                      ${
                        active
                          ? "border-red-500 bg-red-50 text-black dark:text-white shadow-lg dark:bg-gray-800 "
                          : "border-gray-200 hover:border-red-300 hover:bg-red-50 dark:border-gray-600 dark:hover:border-red-300 dark:hover:bg-gray-800"
                      }
                    `}
                    >


                      <p className={`font-bold ${
                        active ? "text-black dark:text-white" : "text-gray-900 dark:text-white" }`} >
                          {v.name}
                      </p>

                      <p
                        className={`text-sm mt-1 ${
                          active ? "text-gray-700 dark:text-gray-300" : "text-gray-500 dark:text-gray-400" }`} >
                         ₹{v.price}
                      </p>
                    </button>
                  );
                }
              )}

            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex gap-4 mt-10 flex-wrap">

            {/* CART */}
            <button onClick={handleCart}
              className="bg-red-600 hover:bg-red-700 text-white px-10 py-4 rounded-2xl text-lg font-bold shadow-lg hover:shadow-red-200 dark:hover:shadow-red-900 transition"
            >
              Add to Cart
            </button>

            {/* WISHLIST */}
            <button onClick={ handleWishlist }
              className={`p-4 rounded-2xl border transition duration-300
              ${
                liked
                  ? "bg-red-600 border-red-600 text-white shadow-lg shadow-red-200"
                  : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:border-red-300"
              }
              `}
            >

              <Heart size={22} fill={ liked ? "white" : "none" }
              />
            </button>
          </div>

          {/* EXTRA INFO */}
          <div className="mt-10 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-md p-6 space-y-4">
            <div className="flex items-start gap-3">
              <Truck className="text-green-600 mt-1" size={20} />

              <div>
                <p className="font-semibold text-gray-800 dark:text-white">  Fast Delivery </p>
                <p className="text-sm text-gray-500 dark:text-gray-400"> Delivered within 3-5 business days </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <ShieldCheck className="text-blue-600 mt-1" size={20} />
              <div>
                <p className="font-semibold text-gray-800 dark:text-white"> Secure Packaging </p>
                <p className="text-sm text-gray-500 dark:text-gray-400"> Carefully packed to maintain freshness </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TOAST */}
      {message && (
        <div className="fixed bottom-5 right-5 bg-black dark:bg-gray-800 text-white px-5 py-3 rounded-2xl shadow-2xl z-50 animate-[slideIn_.4s_ease]"> {message} </div>
      )}

    </div>
  );
}