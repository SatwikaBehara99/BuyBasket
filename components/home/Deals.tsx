"use client";

import Link from "next/link";
import { ArrowRight, Tag, Truck, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function Deals() {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 via-indigo-700 to-sky-600 text-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-10 items-center">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-sm mb-5">
              <Tag size={16} />
              Limited Time Offers
            </span>

            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Save Big on
              <br />
              Your Next Purchase
            </h2>

            <p className="mt-6 text-blue-100 text-lg leading-8 max-w-xl">
              Grab exciting discounts across Electronics, Fashion,
              Groceries and much more. New deals are added regularly.
            </p>

            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold px-7 py-4 rounded-xl mt-8 hover:bg-gray-100 transition"
            >
              Shop Now
              <ArrowRight size={18} />
            </Link>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid grid-cols-2 gap-5">

              {/* Free Delivery */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
                <Truck size={34} />
                <h3 className="mt-4 text-xl font-semibold">
                  Free Delivery
                </h3>
                <p className="mt-2 text-blue-100 text-sm">
                  On eligible orders across India.
                </p>
              </div>

              {/* Secure Payment */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
                <ShieldCheck size={34} />
                <h3 className="mt-4 text-xl font-semibold">
                  Secure Payment
                </h3>
                <p className="mt-2 text-blue-100 text-sm">
                  100% safe & trusted checkout.
                </p>
              </div>

              {/* Launch Offers */}
              <div className="col-span-2 bg-white text-blue-700 rounded-2xl p-8">
                <h3 className="text-3xl font-bold">
                  🎉 Launch Offers
                </h3>

                <p className="mt-3 text-gray-600 leading-7">
                  Celebrate our launch with exciting offers on selected
                  products. Shop now and enjoy amazing savings while the
                  offers last.
                </p>

                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-7 py-4 rounded-xl mt-8 transition"
                >
                  Shop Deals
                  <ArrowRight size={18} />
                </Link>
              </div>

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}