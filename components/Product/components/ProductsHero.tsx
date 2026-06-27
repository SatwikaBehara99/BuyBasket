import Image from "next/image";

export default function ProductsHero() {
  return (
    <section className="w-full">

<div className="relative w-full h-[70vh]">
  <Image
    src="/producthero.png"
    alt="Products Hero"
    width={1920}
    height={1080}
    priority
    className="w-full h-full object-cover"
  />

  <div className="absolute inset-0 bg-black/40" />

  <div className="absolute inset-0 flex items-center justify-center">
    <h1 className="text-white text-5xl font-bold">
      Products
    </h1>
  </div>
</div>
      <div className="h-[30vh] bg-white dark:bg-[#111827] flex items-center justify-center">
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          Explore our collection of premium products.
        </p>
      </div>

    </section>
  );
}