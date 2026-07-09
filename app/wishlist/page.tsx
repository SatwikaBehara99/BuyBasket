"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  User,
  Package,
  Settings,
  Star,
  TicketPercent,
  Heart,
  LogOut,
  Trash2,
} from "lucide-react";

import {
  useSession,
  signOut,
} from "next-auth/react";

export default function WishlistPage() {

  const { data: session,status } =
    useSession();

  const [items, setItems] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [removingId, setRemovingId] =
    useState<string | null>(null);

  const [success, setSuccess] =
    useState("");

  useEffect(() => {

    const fetchWishlist =
      async () => {

        try {

          const res = await fetch(
            "/api/wishlist"
          );

          const data =
            await res.json();

          setItems(data);

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);
        }
      };

    fetchWishlist();

  }, []);

  const removeItem = async (
    itemId: string,
    variantId: string
  ) => {

    await fetch("/api/wishlist", {
      method: "DELETE",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify({
        variantId,
      }),
    });

    setItems((prev) =>
      prev.filter(
        (item) => item.id !== itemId
      )
    );

    setRemovingId(null);

    setSuccess(
      "Removed from your wishlist"
    );

    setTimeout(() => {

      setSuccess("");

    }, 3000);
  };

  if (status === "loading") {
  return (
    <div className="min-h-screen flex items-center justify-center
    bg-[#f1f3f6] dark:bg-gray-950 text-gray-700 dark:text-gray-300">
      Loading...
    </div>
  );
}

if (!session) {
  return (
    <div className="min-h-screen flex items-center justify-center
    bg-[#f1f3f6] dark:bg-gray-950 px-4">

      <div className="bg-white dark:bg-gray-900 p-10 rounded-3xl shadow-xl text-center">

        <div className="text-6xl mb-4">
          ❤️
        </div>

        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Please Sign In
        </h1>

        <p className="mt-3 text-gray-500 dark:text-gray-400">
          Please sign in to view your wishlist.
        </p>

        <Link
          href="/login?callbackUrl=/wishlist"
          className="inline-block mt-6 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-2xl font-semibold"
        >
          Sign In
        </Link>

      </div>

    </div>
  );
}

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100
dark:from-gray-950 dark:via-gray-900 dark:to-black px-4 md:px-8 py-8">

      {/* SUCCESS MESSAGE */}
      {success && (

        <div className="fixed bottom-6 right-6 bg-green-600 text-white px-5 py-3 rounded-lg shadow-xl z-50">

          {success}

        </div>
      )}

      <div className="max-w-7xl mx-auto">


        {/* RIGHT SIDE */}
        <div className=" bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-xl rounded-3xl overflow-hidden">

          {/* HEADER */}
          <div className="border-b px-8 py-6 bg-white dark:bg-gray-900 dark:border-gray-700">

            <h1 className="text-[24px] font-semibold text-gray-800 dark:text-white">

              My Wishlist (
              {items.length}
              )

            </h1>

          </div>

          {/* LOADING */}
          {loading ? (

            <div className="p-16 text-center text-gray-500 text-lg dark:text-gray-400">

              Loading wishlist...

            </div>

          ) : items.length === 0 ? (

            <div className="p-16 text-center dark:text-gray-300 ">

              <h2 className="text-3xl font-bold text-gray-700 dark:text-white py-12 ">

                Your wishlist is empty ❤️

              </h2>

              <p className="text-gray-500 dark:text-gray-400 mb-8">

                Add products to see them here.

              </p>

              <Link
                href="/products"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition "
              >
                Explore Products
              </Link>

            </div>

          ) : (

            <div>

              {items.map((item) => {

                const product =
                  item.variant.product;

                return (

                  <div
                    key={item.id}
                    className="border-b px-6 py-6 dark:border-gray-700 rounded-2xl
                    hover:bg-blue-50
                    dark:hover:bg-blue-900/10
                    transition-all
                    duration-300
                    hover:shadow-lg"
                  >

                    <div className="flex flex-col md:flex-row gap-6">

                      {/* IMAGE */}
                      <Link
                        href={`/products/${product.id}`}
                        className="flex-shrink-0"
                      >

                        <div className="relative w-[170px] h-[170px] bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden border dark:border-gray-700">

                          <Image
                            src={
                              item.variant
                                .image ||
                              "/spices.png"
                            }
                            alt={
                              product.name
                            }
                            fill
                            className="object-contain p-3"
                          />

                        </div>

                      </Link>

                      {/* DETAILS */}
                      <div className="flex-1 flex flex-col justify-center">

                        <Link
                          href={`/products/${product.id}`}
                        >

                          <h2 className="text-[22px] font-semibold text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer">

                            {product.name}

                          </h2>

                        </Link>

                        <p className="text-gray-500 dark:text-gray-400 mt-2 text-[17px]">

                          {
                            item.variant.name
                          }

                        </p>

                        <div className="flex items-center gap-3 mt-4 flex-wrap">

                          <p className="text-[30px] font-bold text-black dark:text-white">

                            ₹
                            {
                              item.variant
                                .price
                            }

                          </p>

                          <span className="text-gray-400  line-through text-lg dark:text-gray-500">

                            ₹
                            {Math.floor(
                              item.variant
                                .price * 1.5
                            )}

                          </span>

                          <span className="bg-green-100
dark:bg-green-900/30
text-green-700
dark:text-green-300
px-3
py-1
rounded-full
text-sm
font-semibold">

                            35% off

                          </span>

                        </div>

                      </div>

                      {/* DELETE */}
                      <div className="relative">

                        <button
                          onClick={() =>
                            setRemovingId(
                              item.id
                            )
                          }
                          className="text-gray-400 dark:text-gray-500 hover:text-red-600 transition mt-1"
                        >

                          <Trash2 size={24} />

                        </button>

                        {/* POPUP */}
                        {removingId ===
                          item.id && (

                          <div className="absolute right-0 top-10 bg-white dark:bg-gray-900 border dark:border-gray-700 shadow-2xl rounded-2xl w-[290px] p-5 z-50">

                            <p className="text-center text-gray-700 dark:text-gray-300 text-[15px] leading-6 mb-6">

                              Are you sure you want
                              to remove this product
                              from your wishlist?

                            </p>

                            <div className="flex justify-center gap-8">

                              <button
                                onClick={() =>
                                  setRemovingId(
                                    null
                                  )
                                }
                                className="text-gray-500  dark:text-gray-400 font-semibold hover:text-black dark:hover:text-white transition"
                              >
                                CANCEL
                              </button>

                              <button
                                onClick={() =>
                                  removeItem(
                                    item.id,
                                    item.variant
                                      .id
                                  )
                                }
                                className="text-red-600 font-bold hover:text-red-700 transition"
                              >
                                REMOVE
                              </button>

                            </div>

                          </div>
                        )}

                      </div>

                    </div>

                  </div>
                );
              })}
            </div>
          )}

        </div>

      </div>

    </div>
  );
}