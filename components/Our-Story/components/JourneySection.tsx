import Image from "next/image";

export default function JourneySection() {
  return (
    <section className="w-full bg-[#f5f5f5] dark:bg-[#111827] py-20 px-6 md:px-16 text-center">
      <div className="max-w-6xl mx-auto">
        {/* Small Label */}
        <p className="text-xs tracking-[0.4em] uppercase text-gray-500 dark:text-gray-400 mb-4">
          The Journey
        </p>

        {/* Main Heading */}
        <h2 className="text-3xl md:text-5xl font-serif text-[#C43F5F] dark:text-[#f08ba3] leading-tight mb-14">
          from one home to <br className="hidden md:block" />
          every kitchen
        </h2>

        {/* Images */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="relative w-full h-65 md:h-100 overflow-hidden">
            <Image
              src="/journey-1.png" // replace with your first image
              alt="Sun drying chillies"
              fill
              className="object-cover"
            />
          </div>

          <div className="relative w-full h-65 md:h-100 overflow-hidden">
            <Image
              src="/journey-2.png" // replace with your second image
              alt="Stone grinding spices"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
