"use client";

import {
  signIn,
  useSession,
} from "next-auth/react";

import {
  useState,
  useEffect,
} from "react";

import {
  useRouter,
} from "next/navigation";

export default function
AdminLoginPage() {

  const router = useRouter();

  const { data: session } =
    useSession();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  // USER SHOULD NOT OPEN ADMIN LOGIN
  useEffect(() => {

    if (
      session?.user &&
      (session.user as any).role
      !== "admin"
    ) {

      router.replace("/");
    }

    if (
      (session?.user as any)?.role
      === "admin"
    ) {

      router.replace("/admin");
    }

  }, [session, router]);

  const handleLogin = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    const res = await signIn(
      "admin-login",
      {
        email,
        password,
        redirect: false,
      }
    );

    if (res?.ok) {

      router.replace("/admin");

    } else {

      alert(
        "Invalid admin credentials"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-black">

      <form
        onSubmit={handleLogin}
        autoComplete="off"
        className="bg-white dark:bg-gray-900 p-8 rounded shadow w-80 flex flex-col gap-4"
      >

        <h2 className="text-xl font-semibold text-center dark:text-white">
          Admin Login
        </h2>

        <input
          type="email"
          placeholder="Admin Email"
          required
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="border border-gray-300 dark:border-gray-700 p-2 rounded bg-white dark:bg-gray-800 text-black dark:text-white"
        />

        <input
          type="password"
          placeholder="Admin Password"
          required
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="border border-gray-300 dark:border-gray-700 p-2 rounded bg-white dark:bg-gray-800 text-black dark:text-white"
        />

        <button className="bg-black dark:bg-white dark:text-black text-white py-2 rounded">
          Login
        </button>

      </form>
    </div>
  );
}