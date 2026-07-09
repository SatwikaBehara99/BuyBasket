"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, ArrowLeft, ShieldCheck } from "lucide-react";

export default function ForgotPasswordPage() {

  const router = useRouter();

  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  const [error, setError] = useState("");

  const emailRegex =
    /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  const isEmailValid =
    emailRegex.test(email);

  async function handleSubmit(
    e: React.FormEvent
  ) {

    e.preventDefault();

    setMessage("");

    setError("");

    if (!isEmailValid) {

      setError("Please enter a valid email address.");

      return;
    }

    setLoading(true);

    try {

      const res = await fetch(
        "/api/auth/forgot-password",
        {

          method: "POST",

          headers: {

            "Content-Type":
              "application/json",

          },

          body: JSON.stringify({

            email,

          }),

        }
      );

      const data = await res.json();

      if (!res.ok) {

        setError(
          data.error || "Something went wrong."
        );

        setLoading(false);

        return;
      }

      setMessage(data.message);

      sessionStorage.setItem(
        "reset-email",
        email
      );

      router.push("/reset-password");

    } catch {

      setError(
        "Unable to process request."
      );

    } finally {

      setLoading(false);

    }

  }

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-950 dark:via-gray-900 dark:to-black px-4">

      <form

        onSubmit={handleSubmit}

        className="bg-white dark:bg-[#071225] w-full max-w-md rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 p-10"

      >

        <div className="flex justify-center mb-5">

          <div className="w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">

            <ShieldCheck
              size={42}
              className="text-blue-600 dark:text-blue-400"
            />

          </div>

        </div>

        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white">

          Forgot Password

        </h1>

        <p className="text-center text-gray-500 dark:text-gray-400 mt-3">

          Enter your registered email address.

          <br />

          We'll generate a verification OTP.

        </p>

        <div className="mt-8">

          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">

            Email Address

          </label>

          <div className="relative">

            <Mail
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="email"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => {

                setEmail(e.target.value);

                setError("");

              }}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none transition"
              required
            />

          </div>

          {error && (
            <div className="mt-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-3 text-sm text-red-600 dark:text-red-300">
              {error}
            </div>
          )}

          {message && (
            <div className="mt-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-3 text-sm text-green-600 dark:text-green-300">
              {message}
            </div>
          )}

        </div>

        <button
          type="submit"
          disabled={loading || !isEmailValid}
          className="mt-8 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-blue-400/30"
        >
          {loading
            ? "Sending OTP..."
            : "Send OTP"}
        </button>

        <button
          type="button"
          onClick={() => router.push("/login")}
          className="mt-5 w-full flex items-center justify-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
        >
          <ArrowLeft size={18} />
          Back to Login
        </button>

      </form>

    </div>

  );
}