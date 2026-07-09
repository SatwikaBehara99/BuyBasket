"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShoppingBag } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">

      {/* Background Blur */}
      <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-blue-300/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-300/20 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-24">

        <div className="grid lg:grid-cols-2 items-center gap-14">

          {/* LEFT */}

          <div
            
            
          >

            <span className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <ShoppingBag size={16} />
              Online Shopping Made Easy
            </span>

            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-gray-900 dark:text-white">
              Everything You Need
              <span className="block text-blue-600 mt-2">
                In One Basket
              </span>
            </h1>

            <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-xl leading-8">
              Discover quality products across multiple categories at
great prices. Enjoy secure payments, fast delivery, and a
smooth shopping experience—all in one place.
            </p>

            <div className="flex flex-wrap gap-4 mt-10">

              <Link
  href="/products"
  className="bg-blue-600 hover:bg-blue-700 text-white px-7 py-4 rounded-xl font-semibold flex items-center gap-2 transition"
>
  Shop Now
  <ArrowRight size={18} />
</Link>

              <Link
  href="/products"
  className="border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-white px-7 py-4 rounded-xl font-semibold transition"
>
  Explore Products
</Link>

            </div>

            {/* Stats */}

            <div className="grid grid-cols-3 gap-6 mt-14">

  <div>
    <h3 className="text-3xl font-bold text-blue-600">
      500+
    </h3>

    <p className="text-gray-600 dark:text-gray-400 mt-2">
      Quality Products
    </p>
  </div>

  <div>
    <h3 className="text-3xl font-bold text-blue-600">
      24×7
    </h3>

    <p className="text-gray-600 dark:text-gray-400 mt-2">
      Customer Support
    </p>
  </div>

  <div>
    <h3 className="text-3xl font-bold text-blue-600">
      Fast
    </h3>

    <p className="text-gray-600 dark:text-gray-400 mt-2">
      Delivery
    </p>
  </div>

</div>


          </div>

          {/* RIGHT */}

          <div
            
            className="relative flex justify-center"
          >

            <div className="relative w-full max-w-lg">

              <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-3xl" />

              <Image
                src="/hero-shopping.jpeg"
                alt="BuyBasket Hero"
                width={600}
                height={600}
                priority
                className="relative z-10 w-full object-contain"
              />

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}