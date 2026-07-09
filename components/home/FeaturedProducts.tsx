import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import { prisma } from "@/lib/prisma";

export default async function FeaturedProducts() {
  const products = await prisma.product.findMany({
    where: {
      status: "ACTIVE",
    },
    include: {
      variants: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 8,
  });

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Featured Products
            </h2>

            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Freshly added products from our collection.
            </p>
          </div>

          <Link
            href="/products"
            className="text-blue-600 font-semibold hover:underline"
          >
            View All
          </Link>
        </div>

        {/* Products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => {
            const variant = product.variants[0];

            if (!variant) return null;

            const mrp = variant.price + 20;

            const discount = Math.round(
              ((mrp - variant.price) / mrp) * 100
            );

            return (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
              >
                <div className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

                  {/* Image */}
                  <div className="relative h-52 flex items-center justify-center bg-gray-50 dark:bg-gray-900 overflow-hidden">

                    {/* Discount */}
                    <div className="absolute top-3 right-3 bg-green-600 text-white text-xs px-2 py-1 rounded-full font-semibold">
                      {discount}% OFF
                    </div>

                    {/* Brand */}
                    {product.brand && (
                      <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                        {product.brand}
                      </div>
                    )}

                    {/* Stock */}
                    {variant.stock === 0 && (
                      <div className="absolute bottom-3 left-3 bg-red-600 text-white text-xs px-3 py-1 rounded-full font-semibold">
                        Out of Stock
                      </div>
                    )}

                    <Image
                      src={
                        variant.image ||
                        "/buybasket.png"
                      }
                      alt={product.name}
                      width={180}
                      height={180}
                      className="object-contain h-40 w-auto group-hover:scale-110 transition duration-300"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 min-h-[52px]">
                      {product.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mt-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={14}
                          className="fill-yellow-400 text-yellow-400"
                        />
                      ))}

                      <span className="text-sm text-gray-500 ml-1">
                        4.5
                      </span>
                    </div>

                    {/* Price */}
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-2xl font-bold text-blue-600">
                        ₹{variant.price}
                      </span>

                      <span className="line-through text-gray-400 text-sm">
                        ₹{mrp}
                      </span>
                    </div>

                    <p className="text-green-600 text-sm mt-1">
                      Free Delivery
                    </p>

                    <button
                      className={`mt-4 w-full py-2 rounded-lg text-white transition ${
                        variant.stock === 0
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-700"
                      }`}
                    >
                      {variant.stock === 0
                        ? "Out of Stock"
                        : "View Product"}
                    </button>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}