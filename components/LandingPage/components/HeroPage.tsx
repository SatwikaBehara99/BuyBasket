import HeroBackground from "@/components/LandingPage/ui/HeroBackground";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full min-h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden">
      <HeroBackground />

      {/* 2. MASTER ANCHOR CONTAINER */}
      <div className="absolute z-20 top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 md:w-155 md:h-155 ">
        {/* SPICERY TEXT - Absolute to Jar */}
        <h1 className="absolute -top-2 md:-top-[-30%] left-1/2 -translate-x-1/2 z-30 text-4xl md:text-[8.5rem] font-serif font-black tracking-[0.40em] text-black dark:text-white leading-none drop-shadow-sm whitespace-nowrap">
          SPICERY
        </h1>

        {/* JAR IMAGE */}
        <Image
          src="/jar.png"
          alt="Spice Jar"
          fill
          priority
          className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
        />

        {/* Gourmet Label */}
        <div className="absolute top-[72%] -left-1 md:-left-30 -translate-y-1/2 flex flex-col items-center w-36 md:w-64">
          <div className="w-full h-0.5 bg-black/60 dark:bg-white/40" />
          <span className="py-3 text-lg md:text-3xl text-white font-medium tracking-[0.25em] uppercase">
            Gourmet
          </span>
          <div className="w-full h-0.5 bg-black/60 dark:bg-white/40" />
        </div>

        {/* All Spices Label */}
        <div className="absolute top-[72%] -right-1 md:-right-30 -translate-y-1/2 flex flex-col items-center w-36 md:w-64">
          <div className="w-full h-0.5 bg-black/60 dark:bg-white/40" />
          <span className="py-3 text-lg md:text-3xl text-white font-medium tracking-[0.25em] uppercase relative">
            All Spices
          </span>
          <div className="w-full h-0.5 bg-black/60 dark:bg-white/40" />
        </div>
      </div>
    </section>
  );
}
