"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Eye,
  EyeOff,
  Lock,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Token comes from URL
  const token = searchParams.get("token") || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  useEffect(() => {
    if (!token) {
      setError(
        "Invalid or expired reset link."
      );
    }
  }, [token]);

  // Password validation
  const passwordChecks = useMemo(
    () => ({
      length: password.length >= 8,
      upper: /[A-Z]/.test(password),
      lower: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[@$!%*?&#]/.test(password),
    }),
    [password]
  );

  const passwordValid =
    Object.values(passwordChecks).every(Boolean);

  const passwordStrength =
    Object.values(passwordChecks).filter(Boolean)
      .length;

  const strengthColor =
    passwordStrength <= 2
      ? "bg-red-500"
      : passwordStrength <= 4
      ? "bg-yellow-500"
      : "bg-green-500";

  const strengthWidth =
    passwordStrength <= 2
      ? "w-1/3"
      : passwordStrength <= 4
      ? "w-2/3"
      : "w-full";

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!token) {
      setError("Invalid reset link.");
      return;
    }

    if (!passwordValid) {
      setError(
        "Please create a stronger password."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError(
        "Passwords do not match."
      );
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        "/api/auth/reset-password",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            token,
            password,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(
          data.error ||
            "Unable to reset password."
        );
        setLoading(false);
        return;
      }

      setSuccess(
        "Password changed successfully."
      );

      setTimeout(() => {
        router.replace("/login");
      }, 2000);
    } catch {
      setError(
        "Something went wrong."
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

        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">

            <ShieldCheck
              size={42}
              className="text-blue-600 dark:text-blue-400"
            />

          </div>
        </div>

        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
          Reset Password
        </h1>

        <p className="text-center text-gray-500 dark:text-gray-400 mt-3">
          Create a new secure password for your
          BuyBasket account.
        </p>

        {error && (
          <div className="mt-6 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-3 text-sm text-red-600 dark:text-red-300">
            {error}
          </div>
        )}

        {success && (
          <div className="mt-6 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-3 text-sm text-green-600 dark:text-green-300">
            {success}
          </div>
        )}

        <div className="mt-8">
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            New Password
          </label>

          <div className="relative">

            <Lock
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="Enter new password"
              className="w-full pl-12 pr-12 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none transition"
              required
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
              className="absolute right-4 top-1/2 -translate-y-1/2"
            >
              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>

          </div>

          {password.length > 0 && (
            <>
              <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full mt-4 overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${strengthColor} ${strengthWidth}`}
                />
              </div>

              <div className="mt-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-3 text-sm space-y-2">

                <div className={passwordChecks.length ? "text-green-600" : "text-gray-500"}>
                  {passwordChecks.length ? "✅" : "⭕"} Minimum 8 characters
                </div>

                <div className={passwordChecks.upper ? "text-green-600" : "text-gray-500"}>
                  {passwordChecks.upper ? "✅" : "⭕"} One uppercase letter
                </div>

                <div className={passwordChecks.lower ? "text-green-600" : "text-gray-500"}>
                  {passwordChecks.lower ? "✅" : "⭕"} One lowercase letter
                </div>

                <div className={passwordChecks.number ? "text-green-600" : "text-gray-500"}>
                  {passwordChecks.number ? "✅" : "⭕"} One number
                </div>

                <div className={passwordChecks.special ? "text-green-600" : "text-gray-500"}>
                  {passwordChecks.special ? "✅" : "⭕"} One special character
                </div>

              </div>
            </>
          )}

        </div>

        <div className="mt-6">

          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Confirm Password
          </label>

          <div className="relative">

            <Lock
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              placeholder="Confirm new password"
              className="w-full pl-12 pr-12 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none transition"
              required
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(
                  !showConfirmPassword
                )
              }
              className="absolute right-4 top-1/2 -translate-y-1/2"
            >
              {showConfirmPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>

          </div>

          {confirmPassword.length > 0 &&
            password !== confirmPassword && (
              <p className="text-red-500 text-sm mt-2">
                Passwords do not match.
              </p>
          )}

          {confirmPassword.length > 0 &&
            password === confirmPassword && (
              <p className="text-green-600 text-sm mt-2 flex items-center gap-2">
                <CheckCircle2 size={16} />
                Passwords match
              </p>
          )}

        </div>

        <button
          type="submit"
          disabled={
            loading ||
            !passwordValid ||
            password !== confirmPassword ||
            !token
          }
          className="mt-8 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-blue-400/30"
        >
          {loading
            ? "Resetting Password..."
            : "Reset Password"}
        </button>

      </form>

    </div>
  );
}