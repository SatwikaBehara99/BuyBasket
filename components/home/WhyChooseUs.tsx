"use client";

import {
  ShieldCheck,
  Truck,
  Headphones,
  RotateCcw,
  BadgeCheck,
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Truck,
    title: "Fast Delivery",
    description:
      "Get your orders delivered quickly with our reliable shipping network.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    description:
      "Shop with confidence using trusted and secure payment methods.",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description:
      "Not satisfied? Enjoy a simple and hassle-free return process.",
  },
  {
    icon: Headphones,
    title: "24×7 Customer Support",
    description:
      "Our support team is always ready to help whenever you need us.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-14">

          <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 dark:bg-blue-900/30 px-4 py-2 text-sm font-medium text-blue-700 dark:text-blue-300">
            <BadgeCheck size={16} />
            Trusted by Shoppers
          </span>

          <h2 className="mt-5 text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            Why Choose
            <span className="text-blue-600"> BuyBasket?</span>
          </h2>

          <p className="mt-5 max-w-2xl mx-auto text-gray-600 dark:text-gray-400 leading-7">
            We provide a smooth shopping experience with fast delivery,
            secure payments, quality products, and dedicated customer
            support—all in one place.
          </p>

        </div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={index}
                whileHover={{
                  y: -10,
                  scale: 1.03,
                }}
                transition={{
                  duration: 0.25,
                }}
                className="group rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 text-center shadow-sm hover:shadow-2xl transition-all"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 group-hover:bg-blue-600 transition-colors">

                  <Icon
                    size={30}
                    className="text-blue-600 group-hover:text-white transition-colors"
                  />

                </div>

                <h3 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}

        </div>

      </div>
    </section>
  );
}