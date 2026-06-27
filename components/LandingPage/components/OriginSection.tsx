import Image from "next/image";

export default function OriginSection() {
  return (
    
    <section className="w-full bg-[#f5f5f5] dark:bg-[#111827] py-16 md:py-24 px-5 md:px-16">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        {/* IMAGE */}
        <div className="relative w-full h-65 sm:h-80 md:h-112.5 overflow-hidden rounded-md shadow-md">
          <Image
            src="/origin.jpg" // replace with your image
            alt="Dried Red Chillies"
            fill
            className="object-cover"
          />
        </div>

        {/* CONTENT */}
        <div className="space-y-5 md:space-y-6 text-left">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#b33b52] dark:text-[#f08ba3] tracking-wide leading-snug">
            The Origin Of Spicery.
          </h2>

          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
            <span className="font-semibold text-black dark:text-white">Spicery</span> carries
            forward a chili blend that was once simply part of a grandmother’s
            everyday cooking – a mix crafted by instinct, balanced without
            measuring spoons, and remembered long after the meal was over. It
            was the kind of flavor people asked about, the kind that lingered in
            conversations and returned in requests for “just a little more.”
          </p>

          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
            Over time, that well-loved recipe became the foundation for Spicery
            – thoughtfully recreated to bring the same depth, warmth, and
            unmistakable balance into modern kitchens, now simplified into one
            complete blend that turns ordinary meals into something quietly
            unforgettable.
          </p>
        </div>
      </div>
    </section>
  );
}
