export default function PromiseSection() {
  return (
    <section className="w-full bg-[#0f0f0f] dark:bg-[#111827] text-white py-24 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Top Label */}
        <p className="text-xs tracking-[0.4em] uppercase text-white/50 mb-6">
          The Spicery Promise
        </p>

        {/* Main Heading */}
        <h2 className="text-3xl md:text-5xl font-serif leading-tight mb-20">
          No juggling. <br />
          No imbalance.
        </h2>

        {/* Divider Lines */}
        <div className="grid md:grid-cols-3 gap-12">
          {/* Item 01 */}
          <div>
            <div className="h-px bg-white/20 dark:bg-gray-700 mb-8" />

            <p className="text-2xl text-white/80 dark:text-gray-400 mb-2">01</p>

            <h3 className="text-xl text-[#FFC96E] mb-4">Perfect Consistency</h3>

            <p className="text-white/70 leading-relaxed text-sm">
              Every jar carries the exact same balance of spices. Not close —
              exact. The same depth of flavour, every single time you reach for
              the shelf.
            </p>
          </div>

          {/* Item 02 */}
          <div>
            <div className="h-px bg-white/20 dark:bg-gray-700 mb-8" />

            <p className="text-2xl text-white/80 dark:text-gray-400 mb-2">02</p>

            <h3 className="text-xl text-[#FFC96E] mb-4">
              Depth Without Complexity
            </h3>

            <p className="text-white/70 leading-relaxed text-sm">
              Measured layers of heat, warmth, and earthiness that you would
              spend years learning to create on your own — now in a single,
              confident addition.
            </p>
          </div>

          {/* Item 03 */}
          <div>
            <div className="h-px bg-white/20 dark:bg-gray-700 mb-8" />

            <p className="text-2xl text-white/80 dark:text-gray-400 mb-2">03</p>

            <h3 className="text-xl text-[#FFC96E] mb-4">Absolute Purity</h3>

            <p className="text-white/70 leading-relaxed text-sm">
              No fillers. No artificial colour. No shortcuts. Sun-dried whole
              spices, stone-ground in small batches. Nothing but the spice
              itself, exactly as it should be.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
