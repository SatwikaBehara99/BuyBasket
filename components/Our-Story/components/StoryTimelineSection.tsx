import Image from "next/image";

export default function StoryTimelineSection() {
  return (
    <section className="w-full bg-[#f5f5f5] py-24 px-6 md:px-16 dark:bg-[#111827]">
      <div className="max-w-6xl mx-auto space-y-28">
        {/* 1 */}
        <div className="grid md:grid-cols-2 items-center gap-12">
          <div>
            <h3 className="font-semibold text-lg mb-4 text-black dark:text-white">
              Born in a courtyard
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base dark:text-gray-300">
              It started where all great things do — quietly. In a sun-filled
              courtyard where whole spices were laid out to dry, turned by hand
              at the right hour, and brought in before dusk.
            </p>
          </div>

          <div className="flex justify-center md:justify-end">
            <div className="relative w-28 h-28 md:w-36 md:h-36">
              <Image
                src="/shape-1.png" // your square image
                alt="Shape"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* 2 */}
        <div className="grid md:grid-cols-2 items-center gap-12">
          <div className="flex justify-center md:justify-start order-1 md:order-0">
            <div className="relative w-28 h-28 md:w-36 md:h-36">
              <Image
                src="/shape-2.png" // your circle image
                alt="Shape"
                fill
                className="object-contain"
              />
            </div>
          </div>
          <div className="order-2 md:order-0">
            <h3 className="font-semibold text-lg mb-4 text-black dark:text-white">
              Passed with love
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base dark:text-gray-300">
              The blend was never written down. It travelled from hands to
              hands, from mother to daughter, from one generation to the next —
              living in muscle memory and instinct.
            </p>
          </div>
        </div>

        {/* 3 */}
        <div className="grid md:grid-cols-2 items-center gap-12">
          <div>
            <h3 className="font-semibold text-lg mb-4 text-black dark:text-white">
              Carried across cities
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base dark:text-gray-300">
              As the family moved — from small towns to sprawling cities — a
              small tin of the blend always came along. Because home is not a
              place. It’s a smell, a taste, a feeling.
            </p>
          </div>

          <div className="flex justify-center md:justify-end">
            <div className="relative w-28 h-28 md:w-36 md:h-36">
              <Image
                src="/shape-3.png" // your triangle image
                alt="Shape"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* 4 */}
        <div className="grid md:grid-cols-2 items-center gap-12">
          <div className="flex justify-center md:justify-start order-1 md:order-0">
            <div className="relative w-28 h-28 md:w-36 md:h-36">
              <Image
                src="/shape-4.png" // your star image
                alt="Shape"
                fill
                className="object-contain"
              />
            </div>
          </div>

          <div className="order-2 md:order-0">
            <h3 className="font-semibold text-lg mb-4 text-black dark:text-white">
              Shared with the world
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base dark:text-gray-300">
              The requests became too many to ignore. Friends, neighbours,
              strangers who had tasted the food — all wanting to bring that
              warmth into their own kitchens. Spicery was born from that
              generosity.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
