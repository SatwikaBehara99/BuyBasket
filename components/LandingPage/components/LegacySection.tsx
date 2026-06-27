import Link from "next/link";

export default function LegacySection() {
  return (
    <section className="w-full bg-[#f5f5f5] dark:bg-[#111827] py-24 px-6 md:px-16 text-center">
      <div className="max-w-4xl mx-auto">
        {/* Main Heading */}
        <h2 className="text-3xl md:text-5xl font-serif leading-tight mb-4 text-black dark:text-white">
          Not just spice.
        </h2>

        <h3 className="text-3xl md:text-5xl font-serif text-[#b33b52] mb-6">
          A legacy.
        </h3>

        {/* Subtext */}
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-12 italic">
          Sun-dried warmth. Hand-ground richness. Generational love, preserved
          in every grain of every jar.
        </p>

        {/* Icons Row */}
        <div className="flex flex-wrap justify-center gap-10 mb-16 text-sm tracking-widest uppercase text-gray-600 dark:text-gray-300">
          <div className="flex flex-col items-center gap-2">
            <span className="text-xl">☀️</span>
            <span>Sun-Dried</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <span className="text-xl">🪨</span>
            <span>Stone-Ground</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <span className="text-xl">🤲</span>
            <span>Handcrafted</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <span className="text-xl">🏡</span>
            <span>Home-Born</span>
          </div>
        </div>

        {/* Highlight Box */}
        <div className="border border-gray-600 p-8 md:p-10 text-gray-700 dark:text-gray-300 leading-relaxed mb-12">
          Every jar of Spicery is an invitation into a lineage of cooking — into
          kitchens where food was made with full presence, full patience, and
          full love. Now you can bring that ritual home and become part of the
          story.
        </div>

        {/* CTA Button */}
        <Link
          href="/products"
          className="inline-block bg-[#FFC96E] text-black tracking-[0.2em] uppercase text-sm px-10 py-4 hover:opacity-90 transition"
        >
          Become Part of the Story
        </Link>
      </div>
    </section>
  );
}
