"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Smartphone,
  Shirt,
  Tv,
  Sofa,
  ShoppingBasket,
  HeartPulse,
  ArrowRight,
  Gamepad2,
} from "lucide-react";

const categories = [
  {
    name: "Groceries",
    slug: "Groceries",
    icon: ShoppingBasket,
    color: "bg-green-100 dark:bg-green-900/30",
    iconColor: "text-green-600",
  },
  {
    name: "Fashion",
    slug: "Fashion",
    icon: Shirt,
    color: "bg-pink-100 dark:bg-pink-900/30",
    iconColor: "text-pink-600",
  },
  {
    name: "Mobiles",
    slug: "Mobiles",
    icon: Smartphone,
    color: "bg-blue-100 dark:bg-blue-900/30",
    iconColor: "text-blue-600",
  },
  {
    name: "Electronics",
    slug: "Electronics",
    icon: Tv,
    color: "bg-yellow-100 dark:bg-yellow-900/30",
    iconColor: "text-yellow-600",
  },
  {
    name: "Furniture",
    slug: "Furniture",
    icon: Sofa,
    color: "bg-orange-100 dark:bg-orange-900/30",
    iconColor: "text-orange-600",
  },
  {
    name: "Healthcare",
    slug: "Healthcare",
    icon: HeartPulse,
    color: "bg-red-100 dark:bg-red-900/30",
    iconColor: "text-red-600",
  },
  {
    name: "Gaming",
    slug: "Gaming",
    icon: Gamepad2,
    color: "bg-purple-100 dark:bg-purple-900/30",
    iconColor: "text-purple-600",
  },
  {
    name: "View All",
    slug: "",
    icon: ArrowRight,
    color: "bg-gray-100 dark:bg-gray-800",
    iconColor: "text-gray-700 dark:text-white",
  },
];

export default function Categories() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-12">
          <span className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-600 px-4 py-1 rounded-full text-sm font-semibold mb-4">
            Browse Categories
          </span>

          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
            Shop By Category
          </h2>

          <p className="mt-3 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover thousands of quality products across different categories
            at the best prices.
          </p>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">

          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <motion.div
                key={category.name}
                whileHover={{
                  y: -8,
                  scale: 1.05,
                }}
                transition={{
                  duration: 0.25,
                }}
              >
                <Link
                  href={
                    category.slug
                      ? `/products?category=${encodeURIComponent(
                          category.slug
                        )}`
                      : "/products"
                  }
                >
                  <div className="group bg-white dark:bg-gray-900 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-800 hover:border-blue-500">

                    <div
                      className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center ${category.color} transition group-hover:scale-110`}
                    >
                      <Icon
                        size={30}
                        className={category.iconColor}
                      />
                    </div>

                    <h3 className="mt-5 text-center font-semibold text-gray-800 dark:text-white group-hover:text-blue-600 transition">
                      {category.name}
                    </h3>

                  </div>
                </Link>
              </motion.div>
            );
          })}

        </div>
      </div>
    </section>
  );
}