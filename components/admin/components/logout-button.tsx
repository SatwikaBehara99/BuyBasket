"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/admin/login" })}
      className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded cursor-pointer"
    >
      Logout
    </button>
  );
}