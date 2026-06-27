"use client";

import Link from "next/link";

export default function CartSigninPage() {
  return (
    <div className="min-h-screen flex items-center justify-center
    bg-gradient-to-br from-gray-50 via-white to-green-50
    dark:from-gray-950 dark:via-black dark:to-gray-900 px-4">

      <div className="bg-white dark:bg-gray-900 p-10 rounded-3xl shadow-xl text-center max-w-md w-full">

        <div className="text-6xl mb-4">
          🛒
        </div>

        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Please Sign In
        </h1>

        <p className="mt-3 text-gray-500 dark:text-gray-400">
          Please sign in to continue checkout.
        </p>

        <Link
          href="/login?callbackUrl=/cart"
          className="inline-block mt-6 bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-semibold"
        >
          Sign In
        </Link>

      </div>

    </div>
  );
}