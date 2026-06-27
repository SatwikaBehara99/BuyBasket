"use client";

import Link from "next/link";
import { useState, useEffect, useRef, } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, User, LogOut, Package, Heart, Bell, TicketPercent, MapPin, Search, X, ChevronDown } from "lucide-react";
import { useSession, signOut, } from "next-auth/react";
import { useRouter, usePathname, } from "next/navigation";
import { useCart } from "@/context/CartContext";

const navItems = [
{ name: "Home", href: "/" },
{ name: "Our Story", href: "/our-story" },
{ name: "Products", href: "/products" },
{ name: "Blogs", href: "/blogs" },
];

export default function Navbar() {

const { data: session } = useSession();
const router = useRouter();
const pathname = usePathname();
const [showMenu, setShowMenu] = useState(false);
const menuRef = useRef<HTMLDivElement>(null);
const { cart } = useCart();
const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

// CLOSE MENU ON ROUTE CHANGE
useEffect(() => { setShowMenu(false); }, [pathname]);

// CLOSE MENU ON OUTSIDE CLICK
useEffect(() => { const handleClickOutside = ( event: MouseEvent ) => {
if (
menuRef.current && !menuRef.current.contains( event.target as Node )
) {
setShowMenu(false);
}
};

document.addEventListener( "mousedown", handleClickOutside );  
return () => { document.removeEventListener( "mousedown", handleClickOutside );  
};

}, []);

return (

<nav className="sticky top-0 w-full bg-white dark:bg-[#111827] border-b border-gray-200 dark:border-gray-700 shadow-sm px-6 md:px-16 py-4 flex items-center justify-between z-50 text-black dark:text-white">

{/* LOGO */}

  <Link href="/" className="text-3xl font-serif tracking-wide">  
    SPICERY  
  </Link>  {/* NAVIGATION */}

  <div className="hidden md:flex items-center gap-10">  
    {navItems.map((item) => (  
      <motion.div key={item.name} whileHover={{ scale: 1.05 }}>  
        <Link  
          href={item.href}  
          className="hover:text-gray-700 dark:hover:text-gray-300 transition"  
        >  
          {item.name}  
        </Link>  
      </motion.div>  
    ))}  {/* WISHLIST */}  
<button  
  onClick={() => router.push("/wishlist")}  
  className="flex items-center gap-2 hover:text-gray-700 dark:hover:text-gray-300 transition"  
>  
  <Heart size={22} />  
  <span>Wishlist</span>  
</button>  

{/* CART */}  
<button  
  onClick={() => router.push("/cart")}  
  className="relative flex items-center gap-2 hover:text-gray-700 dark:hover:text-gray-300 transition"  
>  
  <div className="relative">  
    <ShoppingCart size={22} />  
    {cartCount > 0 && (  
      <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-1.5 rounded-full">  
        {cartCount}  
      </span>  
    )}  
  </div>  

  <span>Cart</span>  
</button>  

{/* AUTH */}  
{!session ? (  
  <button  
    onClick={() => router.push("/login")}  
    className="flex items-center gap-2 hover:text-gray-700 dark:hover:text-gray-300 transition"  
  >  
    <User size={22} />  
    <span>Sign In</span>  
  </button>  
) : (  
  <div className="relative" ref={menuRef}>  
    {/* ACCOUNT BUTTON */}  
    <button  
      onClick={() => setShowMenu(!showMenu)}  
      className="flex items-center gap-2 hover:text-gray-700 dark:hover:text-gray-300 transition"  
    >  
      <User size={22} />  
      <span>Account</span>  
    </button>  

    {/* DROPDOWN */}  
    {showMenu && (  
      <div className="absolute right-0 top-12 w-80 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl overflow-hidden z-50 text-black dark:text-white">  

        {/* HEADER */}  
        <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">  
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">  
            Your Account  
          </h2>  

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 truncate">  
            {session?.user?.email}  
          </p>  
        </div>  

        {/* MENU ITEMS */}  
        <div className="py-2">  

          {/* PROFILE */}  
          <button  
            onClick={() => {  
              setShowMenu(false);  
              router.push("/account");  
            }}  
            className="w-full flex items-center gap-4 px-5 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition"  
          >  
            <User size={20} className="text-gray-600 dark:text-gray-300" />  
            <span className="text-[15px] font-medium">  
              My Profile  
            </span>  
          </button>  

          {/* ORDERS */}  
          <button  
            onClick={() => {  
              setShowMenu(false);  
              router.push("/orders");  
            }}  
            className="w-full flex items-center gap-4 px-5 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition"  
          >  
            <Package size={20} className="text-gray-600 dark:text-gray-300" />  
            <span className="text-[15px] font-medium">  
              Orders  
            </span>  
          </button>  

          {/* COUPONS */}  
          <button className="w-full flex items-center gap-4 px-5 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition">  
            <TicketPercent size={20} className="text-gray-600 dark:text-gray-300" />  
            <span className="text-[15px] font-medium">  
              Coupons  
            </span>  
          </button>  

          {/* SAVED ADDRESSES */}  
          <button className="w-full flex items-center gap-4 px-5 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition">  
            <MapPin size={20} className="text-gray-600 dark:text-gray-300" />  
            <span className="text-[15px] font-medium">  
              Saved Addresses  
            </span>  
          </button>  

          {/* WISHLIST */}  
          <button  
            onClick={() => {  
              setShowMenu(false);  
              router.push("/wishlist");  
            }}  
            className="w-full flex items-center gap-4 px-5 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition"  
          >  
            <Heart size={20} className="text-gray-600 dark:text-gray-300" />  
            <span className="text-[15px] font-medium">  
              Wishlist  
            </span>  
          </button>  

          {/* NOTIFICATIONS */}  
          <button className="w-full flex items-center gap-4 px-5 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition">  
            <Bell size={20} className="text-gray-600 dark:text-gray-300" />  
            <span className="text-[15px] font-medium">  
              Notifications  
            </span>  
          </button>  
        </div>  

        {/* LOGOUT */}  
        <div className="border-t border-gray-200 dark:border-gray-700">  
          <button  
            onClick={() => {  
              setShowMenu(false);  
              signOut({ callbackUrl: "/" });  
            }}  
            className="w-full flex items-center gap-4 px-5 py-4 hover:bg-red-50 dark:hover:bg-red-950 transition text-red-500"  
          >  
            <LogOut size={20} />  
            <span className="font-medium">  
              Logout  
            </span>  
          </button>  
        </div>  

      </div>  
    )}  
  </div>  
)}

  </div>  
</nav>  
  );  
}