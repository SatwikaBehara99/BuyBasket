"use client";

import { signIn } from "next-auth/react";

import { useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { Eye,EyeOff } from "lucide-react";

export default function UserLoginPage() {

  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl =
  searchParams.get("callbackUrl") || "/";

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const[showPassword, setShowPassword] =
    useState(false);

  const handleLogin = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    const res = await signIn(
      "user-login",
      {
        email,
        password,
        redirect: false,
      }
    );

    if (res?.ok) {

  const session =
    await fetch(
      "/api/auth/session"
    ).then(res => res.json());

  if (
    session?.user?.role ===
    "admin"
  ) {

    router.replace("/admin");

  } else {

    router.replace(callbackUrl);
  }
}
    
    else {

      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-black">

      <form
        onSubmit={handleLogin}
        autoComplete="off"
        className="bg-white dark:bg-gray-900 p-8 rounded shadow w-80 flex flex-col gap-4 text-black dark:text-white"
      >

        <h2 className="text-xl font-semibold text-center dark:text-white">
          User Login
        </h2>

        <div className="flex flex-col">

          <label className="text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            Email
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-2 rounded text-black dark:text-white"
          />
        </div>

        <div className="flex flex-col">

  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
    Password
  </label>

  <div className="relative">

    <input
      type={
        showPassword
          ? "text"
          : "password"
      }
      placeholder="Enter your password"
      required
      value={password}
      onChange={(e) =>
        setPassword(e.target.value)
      }
      className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-2 rounded w-full text-black dark:text-white"
    />

    <button
      type="button"
      onClick={() =>
        setShowPassword(
          !showPassword
        )
      }
      className="absolute right-3 top-1/2 -translate-y-1/2"
    >
      {showPassword ? (
        <EyeOff size={20} />
      ) : (
        <Eye size={20} />
      )}
    </button>

  </div>

</div>

        <button className="bg-black dark:bg-white dark:text-black text-white py-2 rounded">
          Login
        </button>

        <p className="text-sm text-center text-gray-600 dark:text-gray-400">
          New user?{" "}

          <span
            className="text-blue-500  dark:text-blue-400 cursor-pointer"
            onClick={() =>
              router.push("/signup")
            }
          >
            Sign Up
          </span>
        </p>

      </form>
    </div>
  );
}