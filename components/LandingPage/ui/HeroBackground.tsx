"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const rows = 8;
const cols = 9;

export default function HeroBackground() {
  const spices = Array.from({ length: rows * cols });

  return (
    <div className="absolute inset-0 bg-[#A92E4B] dark:bg-[#581828] overflow-hidden">
      <div
        className="grid w-full h-full"
        style={{
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
        }}
      >
        {spices.map((_, i) => {
          // Deterministic pseudo variation (safe for Next)
          const rotate = ((i * 37) % 40) - 20;
          const offsetX = ((i * 23) % 20) - 10;
          const offsetY = ((i * 17) % 20) - 10;

          return (
            <motion.div
              key={i}
              whileHover={{
                y: -14,
                scale: 1.08,
                transition: {
                  type: "spring",
                  stiffness: 550,
                  damping: 22,
                },
              }}
              className="flex items-center justify-center select-none"
            >
              <motion.div
                style={{
                  rotate,
                  x: offsetX,
                  y: offsetY,
                }}
                // whileHover={{
                //   boxShadow: "0px 20px 35px rgba(0,0,0,0.35)",
                // }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 18,
                }}
                className="relative w-15 h-15"
              >
                <Image
                  src="/spices.png"
                  alt="spice"
                  fill
                  draggable={false}
                  className="object-contain select-none"
                />
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
