import Link from "next/link";

export default function ProductsHero() {
  return (
    <section className="w-full">
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white">

        <div className="max-w-7xl mx-auto px-6 py-24 md:py-32 text-center">

          <p className="uppercase tracking-[0.3em] text-sm text-blue-100 mb-4">
            BuyBasket Collection
          </p>

          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Everything You Need,
            <br />
            All in One Basket.
          </h1>

          <p className="max-w-2xl mx-auto text-lg text-blue-100 mb-8">
            Explore groceries, kitchen essentials, personal care,
            household products and much more at great prices.
          </p>

          <Link
            href="#products"
            className="inline-block bg-white text-blue-700 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
          >
            Shop Now
          </Link>

        </div>

      </div>

      <div className="bg-gray-50 dark:bg-[#111827] py-10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Discover quality products with fast delivery and amazing deals.
          </p>
        </div>
      </div>
    </section>
  );
}