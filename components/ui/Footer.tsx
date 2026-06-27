import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#4F7462] text-white px-6 md:px-16 pt-16 pb-8">
      <div className="max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand Column */}
          <div>
            <h2 className="text-3xl font-serif tracking-widest mb-4">
              SPICERY
            </h2>

            <p className="text-[#FFC96E] text-sm">
              Warning : May cause happiness!
            </p>
          </div>

          {/* Explore Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4 relative inline-block">
              Explore
              <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-[#FFC96E]" />
            </h3>

            <ul className="space-y-3 text-white/80 text-sm">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/our-story">Our story</Link>
              </li>
              <li>
                <Link href="/products">Products</Link>
              </li>
              <li>
                <Link href="/blogs">Blogs</Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4 relative inline-block">
              Contact us
              <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-[#FFC96E]" />
            </h3>

            <div className="space-y-4 text-white/80 text-sm">
              <div className="flex gap-3 items-start">
                <MapPin size={16} className="mt-1 text-[#FFC96E]" />
                <p>
                  Lorem ipsum is placeholder text commonly used in the graphic,
                  print, and publishing industries.
                </p>
              </div>

              <div className="flex gap-3 items-center">
                <Phone size={16} className="text-[#FFC96E]" />
                <p>+91 88888 11111, +91 99999 22222</p>
              </div>

              <div className="flex gap-3 items-center">
                <Mail size={16} className="text-[#FFC96E]" />
                <p>info@spicery.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 my-10" />

        {/* Bottom Section */}
        <p className="text-white/70 text-sm text-center md:text-left">
          Copyright © - 2026. Spicery. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
