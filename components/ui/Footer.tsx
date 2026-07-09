import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-6 py-14">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          <div>
            <h2 className="text-3xl font-bold text-blue-400">
              BuyBasket
            </h2>

            <p className="text-gray-400 mt-3">
              Everything You Need in One Basket.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">
              Quick Links
            </h3>

            <div className="flex flex-col gap-2 text-gray-400">

              <Link href="/">Home</Link>

              <Link href="/products">Products</Link>

              <Link href="/wishlist">Wishlist</Link>

              <Link href="/cart">Cart</Link>

            </div>
          </div>

          <div>

            <h3 className="font-semibold mb-4">
              Customer Support
            </h3>

            <div className="flex flex-col gap-3 text-gray-400">

              <p>Help Center</p>

              <p>Returns</p>

              <p>Privacy Policy</p>

              <p>Terms & Conditions</p>

            </div>

          </div>

          <div>

            <h3 className="font-semibold mb-4">
              Contact
            </h3>

            <div className="space-y-3 text-gray-400">

              <div className="flex items-center gap-2">
                <Mail size={18}/>
                support@buybasket.com
              </div>

              <div className="flex items-center gap-2">
                <Phone size={18}/>
                +91 9876543210
              </div>

              <div className="flex gap-4 mt-5">

                <Facebook className="cursor-pointer"/>

                <Instagram className="cursor-pointer"/>

                <Twitter className="cursor-pointer"/>

              </div>

            </div>

          </div>

        </div>

        <div className="border-t border-slate-700 mt-10 pt-6 text-center text-gray-400">

          © 2026 BuyBasket. All Rights Reserved.

        </div>

      </div>
    </footer>
  );
}