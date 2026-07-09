"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  User,
  Heart,
  Search,
  Menu,
  X,
  ChevronDown,
  LogOut,
  Package,
  MapPin,
  TicketPercent,
  Bell,
} from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";

const navItems = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Products",
    href: "/products",
  },
  {
    name: "Today's Deals",
    href: "#",
  },
  {
    name: "Categories",
    href: "#",
  },
];

export default function Header() {

  const { data: session} = useSession();


  const router = useRouter();

  const pathname = usePathname();

  const { cart } = useCart();

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const [showMenu, setShowMenu] = useState(false);

  const [mobileMenu, setMobileMenu] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setShowMenu(false);
    setMobileMenu(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

    
  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-sm border-b">

      <div className="max-w-7xl mx-auto px-4 md:px-8">

        <div className="flex items-center justify-between h-20">

          {/* Logo */}

          <Link
            href="/"
            className="flex flex-col"
          >
            <span className="text-3xl font-bold text-blue-600">
              BuyBasket
            </span>

            <span className="text-xs text-gray-500">
              Everything You Need in One Basket
            </span>
          </Link>

          {/* Search */}

          <div className="hidden lg:flex flex-1 max-w-xl mx-10">

            <div className="flex items-center w-full bg-gray-100 dark:bg-gray-800 rounded-lg px-4">

              <Search
                size={20}
                className="text-gray-500"
              />

              <input
                type="text"
                placeholder="Search products..."
                className="w-full bg-transparent outline-none px-3 py-3"
              />

            </div>

          </div>

          {/* Desktop Navigation */}

          <nav className="hidden lg:flex items-center gap-7">

            {navItems.map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ scale: 1.05 }}
              >
                <Link
                  href={item.href}
                  className="font-medium hover:text-blue-600 transition"
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}

            {/* Wishlist */}

            <button
              onClick={() => router.push("/wishlist")}
              className="flex items-center gap-2 hover:text-blue-600 transition"
            >
              <Heart size={22} />
            </button>

            {/* Cart */}

            <button
              onClick={() => router.push("/cart")}
              className="relative flex items-center hover:text-blue-600 transition"
            >
              <ShoppingCart size={22} />

              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Login / Account */}

            {!session ? (
              <button
                onClick={() => router.push("/login")}
                className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Login
              </button>
            ) : (
              <div
                className="relative"
                ref={menuRef}
              >
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="flex items-center gap-2 hover:text-blue-600"
                >
                  <User size={22} />
                  <ChevronDown size={18} />
                </button>

                {showMenu && (
                  <div className="absolute right-0 top-14 w-64 bg-white rounded-xl shadow-xl border overflow-hidden">

                    <div className="p-4 border-b">
                      <p className="font-semibold">
                        {session.user?.name || "User"}
                      </p>

                      <p className="text-sm text-gray-500 truncate">
                        {session.user?.email}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setShowMenu(false);
                        router.push("/account");
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
                    >
                      <User size={18} />
                      My Profile
                    </button>

                    <button
                      onClick={() => {
                        setShowMenu(false);
                        router.push("/orders");
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
                    >
                      <Package size={18} />
                      My Orders
                    </button>

                    <button
                      onClick={() => {
                        setShowMenu(false);
                        router.push("/wishlist");
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
                    >
                      <Heart size={18} />
                      Wishlist
                    </button>

                    <button
                      onClick={() => {
                        setShowMenu(false);
                        router.push("/account/addresses");
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
                    >
                      <MapPin size={18} />
                      Saved Addresses
                    </button>

                    <button
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
                    >
                      <TicketPercent size={18} />
                      Coupons
                    </button>

                    <button
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
                    >
                      <Bell size={18} />
                      Notifications
                    </button>

                    <button
                      onClick={() =>
                        signOut({
                          callbackUrl: "/",
                        })
                      }
                      className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50"
                    >
                      <LogOut size={18} />
                      Logout
                    </button>

                  </div>
                )}
              </div>
            )}

            {/* Mobile Menu Button */}

            <button
              className="lg:hidden"
              onClick={() => setMobileMenu(!mobileMenu)}
            >
              {mobileMenu ? (
                <X size={28} />
              ) : (
                <Menu size={28} />
              )}
            </button>

          </nav>

          </div>

        {/* Mobile Menu */}

        {mobileMenu && (
          <div className="lg:hidden border-t bg-white py-4">

            <div className="flex flex-col gap-4">

              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenu(false)}
                  className="px-2 py-2 text-gray-700 hover:text-blue-600 font-medium"
                >
                  {item.name}
                </Link>
              ))}

              <button
                onClick={() => {
                  router.push("/wishlist");
                  setMobileMenu(false);
                }}
                className="flex items-center gap-2 px-2 py-2 text-gray-700 hover:text-blue-600"
              >
                <Heart size={20} />
                Wishlist
              </button>

              <button
                onClick={() => {
                  router.push("/cart");
                  setMobileMenu(false);
                }}
                className="flex items-center gap-2 px-2 py-2 text-gray-700 hover:text-blue-600"
              >
                <ShoppingCart size={20} />
                Cart
              </button>

              {!session ? (
                <button
                  onClick={() => {
                    router.push("/login");
                    setMobileMenu(false);
                  }}
                  className="bg-blue-600 text-white py-2 rounded-lg mt-2"
                >
                  Login
                </button>
              ) : (
                <button
                  onClick={() =>
                    signOut({
                      callbackUrl: "/",
                    })
                  }
                  className="flex items-center gap-2 px-2 py-2 text-red-500"
                >
                  <LogOut size={20} />
                  Logout
                </button>
              )}

            </div>

          </div>
        )}

      </div>

    </header>
  );
}