import Image from "next/image";

export default function AudienceSection() {
  return (
    <section className="w-full bg-[#f5f5f5] dark:bg-[#111827] py-20 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Top Label */}
        <p className="text-center text-xs tracking-[0.4em] text-gray-500 dark:text-gray-400 uppercase mb-4">
          Made For You
        </p>

        {/* Heading */}
        <h2 className="text-center text-3xl md:text-5xl font-serif leading-tight mb-16 text-black dark:text-white">
          Whoever you are <br />
          <span className="text-[#4F7462] dark:text-[#7bb899]">in the kitchen.</span>
        </h2>

        {/* Cards */}
        <div className="grid md:grid-cols-3 border border-white">
          {/* Card 1 */}
          <div className="bg-[#4F7462] dark:bg-[#1f2937] text-white p-10 border-b md:border-b-0 md:border-r border-white">
            <div className="mb-6">
              <Image
                src="/icon-traditional.png" // replace with your icon
                alt="Traditionalist"
                width={50}
                height={50}
              />
            </div>

            <p className="text-xs tracking-[0.3em] uppercase text-white/70 mb-4">
              The Traditionalist
            </p>

            <h3 className="text-xl font-serif mb-4">The Keeper of Recipes</h3>

            <p className="text-sm text-white/80 leading-relaxed">
              You know exactly how food should taste. You have standards.
              Spicery honours that — a blend built with the same reverence for
              authenticity as your own cooking.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-[#4F7462] dark:bg-[#1f2937] text-white p-10 border-b md:border-b-0 md:border-r border-white">
            <div className="mb-6">
              <Image
                src="/icon-busy.png" // replace with your icon
                alt="Professional"
                width={50}
                height={50}
              />
            </div>

            <p className="text-xs tracking-[0.3em] uppercase text-white/70 mb-4">
              The Professional
            </p>

            <h3 className="text-xl font-serif mb-4">The Busy Cook</h3>
            <p className="text-sm text-white/80 leading-relaxed">
              You want real food, not compromises. On evenings when time is
              short and hunger is real, Spicery means you cook well without the
              ritual taking hours.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-[#4F7462] dark:bg-[#1f2937] text-white p-10">
            <div className="mb-6">
              <Image
                src="/icon-discover.png" // replace with your icon
                alt="Discoverer"
                width={50}
                height={50}
              />
            </div>

            <p className="text-xs tracking-[0.3em] uppercase text-white/70 mb-4">
              The Discoverer
            </p>

            <h3 className="text-xl font-serif mb-4">The New Kitchen Voice</h3>

            <p className="text-sm text-white/80 leading-relaxed">
              You’re learning, experimenting, building confidence. Spicery gives
              you the flavour foundation that makes everything taste like you
              already know what you’re doing.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
