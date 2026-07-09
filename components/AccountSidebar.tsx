"use client";

import { useSession, signOut } from "next-auth/react";
import { User, Package, TicketPercent, Star, Heart, LogOut, Settings, } from "lucide-react";

export default function AccountSidebar() {
  const { data: session } = useSession();

  return (
    <div className="w-full lg:w-80 space-y-4">

      {/* PROFILE CARD */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border dark:border-gray-700">
        <div className="flex items-center gap-4 p-5">
          <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
            <User size={30} className="text-blue-600 dark:text-blue-400" />
          </div>

          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Hello</p>
            <h2 className="font-semibold text-xl text-gray-900 dark:text-white">
              {session?.user?.name || "User"}
            </h2>
          </div>
        </div>
      </div>

      {/* MENU */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden border dark:border-gray-700">

        {/* MY ORDERS */}
        <a href="/orders" className="flex items-center gap-4 px-5 py-5 border-b dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition" >
          <Package size={20} className="text-blue-600 dark:text-blue-400" />
          <span className="font-bold uppercase tracking-wide"> MY ORDERS </span>
        </a>

        {/* ACCOUNT SETTINGS */}
        <div className="border-b dark:border-gray-700">
          <div className="flex items-center gap-4 px-5 py-5">
            <Settings size={20} className="text-blue-600 dark:text-blue-400" />
            <span className="font-bold uppercase tracking-wide text-gray-900 dark:text-white"> ACCOUNT SETTINGS </span>
          </div>

          <div className="pl-14 pb-5 space-y-4">
            <a href="/account" className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"> Profile Information </a>
            <a href="/account/addresses" className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"> Manage Addresses </a>
          </div>
        </div>

        {/* MY STUFF */}
        <div className="border-b dark:border-gray-700">
          <div className="flex items-center gap-4 px-5 py-5">
            <Star size={20} className="text-blue-600 dark:text-blue-400" />
            <span className="font-bold uppercase tracking-wide text-gray-900 dark:text-white"> MY STUFF </span>
          </div>

          <div className="pl-14 pb-5 space-y-4">
            <a href="#" className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400" >
              <TicketPercent size={16} /> My Coupons </a>
            <a href="#" className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400" >
              <Star size={16} /> My Reviews & Ratings </a>
            <a href="/wishlist" className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400" >
              <Heart size={16} /> My Wishlist </a>
          </div>
        </div>

        {/* LOGOUT */}
        <button onClick={() => signOut({ callbackUrl: "/", }) }
          className="w-full flex items-center gap-4 px-5 py-5 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition" >
          <LogOut size={22} className="text-red-600 dark:text-red-400" />
          <span className="font-bold uppercase tracking-wide text-gray-900 dark:text-white"> LOGOUT </span>
        </button>

      </div>
    </div>
  );
}