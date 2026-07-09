"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Eye, EyeOff, UserPlus, CheckCircle2 } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();

  // -----------------------------
  // STATES
  // -----------------------------

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  // -----------------------------
  // BLUR STATES
  // -----------------------------

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    phone: false,
    password: false,
    confirmPassword: false,
  });

  // -----------------------------
  // REGEX
  // -----------------------------

  const nameRegex = /^[A-Za-z ]{3,40}$/;

  const emailRegex =
    /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  const phoneRegex = /^[6-9]\d{9}$/;

  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

  // -----------------------------
  // VALIDATIONS
  // -----------------------------

  const isNameValid = nameRegex.test(name);

  const isEmailValid = emailRegex.test(email);

  const isPhoneValid = phoneRegex.test(phone);

  const isPasswordValid =
    passwordRegex.test(password);

  const passwordsMatch =
    password === confirmPassword &&
    confirmPassword.length > 0;

  // -----------------------------
  // PASSWORD STRENGTH
  // -----------------------------

  const passwordChecks = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[@$!%*?&#]/.test(password),
  };

  const strength =
    Object.values(passwordChecks).filter(Boolean).length;

  const strengthColor =
    strength <= 2
      ? "bg-red-500"

      : strength <= 4
      ? "bg-yellow-500"

      : "bg-green-500";

  const strengthWidth =
    strength <= 2
      ? "w-1/3"

      : strength <= 4
      ? "w-2/3"

      : "w-full";

  const strengthText =
    strength <= 2
      ? "Weak Password"

      : strength <= 4
      ? "Medium Password"

      : "Strong Password";

  // -----------------------------
  // SUBMIT
  // -----------------------------

  const handleSignup = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setTouched({
      name: true,
      email: true,
      phone: true,
      password: true,
      confirmPassword: true,
    });

    if (
      !isNameValid ||
      !isEmailValid ||
      !isPhoneValid ||
      !isPasswordValid ||
      !passwordsMatch
    ) {
      return;
    }

    setLoading(true);

    const res = await fetch(
      "/api/auth/signup",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name,
          email,
          phone,
          password,
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      setLoading(false);
      alert(data.error);
      return;
    }

    const login = await signIn(
      "user-login",
      {
        email,
        password,
        redirect: false,
      }
    );

    if (login?.ok) {
      router.push("/");
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-950 dark:via-gray-900 dark:to-black">

      <form
        onSubmit={handleSignup}
        autoComplete="off"
        className="bg-white dark:bg-[#071225] w-full max-w-md p-10 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700 flex flex-col gap-4"
      >

        <div className="flex justify-center mb-2">

          <div className="w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">

            <UserPlus
              size={42}
              className="text-blue-600"
            />

          </div>

        </div>

        <h2 className="text-3xl font-bold text-center dark:text-white">
          Create Account
        </h2>

        <p className="text-center text-gray-500 dark:text-gray-400">
          Join us and start shopping now!
        </p>

        {/* =========================
            FULL NAME
        ========================== */}

        <div className="flex flex-col gap-1">

          <label className="text-gray-700 dark:text-gray-300">
            Full Name
          </label>

          <div className="relative">

            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() =>
                setTouched((prev) => ({
                  ...prev,
                  name: true,
                }))
              }
              className={`w-full rounded-xl p-3 bg-gray-50 dark:bg-gray-800 border transition
              ${
                touched.name
                  ? isNameValid
                    ? "border-green-500 focus:ring-green-500"
                    : "border-red-500 focus:ring-red-500"
                  : "border-gray-300 dark:border-gray-700 focus:ring-blue-500"
              }`}
            />

            {touched.name && isNameValid && (
              <CheckCircle2
                size={20}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500"
              />
            )}

          </div>

          {touched.name && !isNameValid && (
            <p className="text-sm text-red-500">
              Name must contain only letters and spaces (3-40 characters).
            </p>
          )}

        </div>

        {/* =========================
            EMAIL
        ========================== */}

        <div className="flex flex-col gap-1">

          <label className="text-gray-700 dark:text-gray-300">
            Email
          </label>

          <div className="relative">

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() =>
                setTouched((prev) => ({
                  ...prev,
                  email: true,
                }))
              }
              className={`w-full rounded-xl p-3 bg-gray-50 dark:bg-gray-800 border transition
              ${
                touched.email
                  ? isEmailValid
                    ? "border-green-500 focus:ring-green-500"
                    : "border-red-500 focus:ring-red-500"
                  : "border-gray-300 dark:border-gray-700 focus:ring-blue-500"
              }`}
            />

            {touched.email && isEmailValid && (
              <CheckCircle2
                size={20}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500"
              />
            )}

          </div>

          {touched.email && !isEmailValid && (
            <p className="text-sm text-red-500">
              Please enter a valid email address.
            </p>
          )}

        </div>

        {/* =========================
            PHONE
        ========================== */}

        <div className="flex flex-col gap-1">

          <label className="text-gray-700 dark:text-gray-300">
            Phone Number
          </label>

          <div className="relative">

            <input
              type="tel"
              placeholder="Enter your phone number"
              value={phone}
              maxLength={10}
              onChange={(e) =>
                setPhone(
                  e.target.value.replace(/\D/g, "")
                )
              }
              onBlur={() =>
                setTouched((prev) => ({
                  ...prev,
                  phone: true,
                }))
              }
              className={`w-full rounded-xl p-3 bg-gray-50 dark:bg-gray-800 border transition
              ${
                touched.phone
                  ? isPhoneValid
                    ? "border-green-500 focus:ring-green-500"
                    : "border-red-500 focus:ring-red-500"
                  : "border-gray-300 dark:border-gray-700 focus:ring-blue-500"
              }`}
            />

            {touched.phone && isPhoneValid && (
              <CheckCircle2
                size={20}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500"
              />
            )}

          </div>

          {touched.phone && !isPhoneValid && (
            <p className="text-sm text-red-500">
              Enter a valid 10-digit Indian mobile number.
            </p>
          )}

        </div>
        {/* =========================
            PASSWORD
        ========================== */}

        <div className="flex flex-col gap-1">

          <label className="text-gray-700 dark:text-gray-300">
            Password
          </label>

          <div className="relative">

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Create a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() =>
                setTouched((prev) => ({
                  ...prev,
                  password: true,
                }))
              }
              className={`w-full rounded-xl p-3 pr-12 bg-gray-50 dark:bg-gray-800 border transition
              ${
                touched.password
                  ? isPasswordValid
                    ? "border-green-500 focus:ring-green-500"
                    : "border-red-500 focus:ring-red-500"
                  : "border-gray-300 dark:border-gray-700 focus:ring-blue-500"
              }`}
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>

          </div>

          {/* PASSWORD STRENGTH */}

          {password.length > 0 && (
            <>
              <div className="w-full h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">

                <div
                  className={`h-2 rounded-full transition-all duration-300 ${strengthColor} ${strengthWidth}`}
                />

              </div>

              <p
                className={`text-sm font-medium mt-1
                  ${
                    strength <= 2
                      ? "text-red-500"
                      : strength <= 4
                      ? "text-yellow-500"
                      : "text-green-500"
                  }`}
              >
                {strengthText}
              </p>
            </>
          )}

          {/* PASSWORD RULES */}

          {password.length > 0 && (
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
                {passwordChecks.special ? "✅" : "⭕"} One special character (@$!%*?&#)
              </div>

            </div>
          )}

        </div>

        {/* =========================
            CONFIRM PASSWORD
        ========================== */}

        <div className="flex flex-col gap-1">

          <label className="text-gray-700 dark:text-gray-300">
            Confirm Password
          </label>

          <div className="relative">

            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onBlur={() =>
                setTouched((prev) => ({
                  ...prev,
                  confirmPassword: true,
                }))
              }
              className={`w-full rounded-xl p-3 pr-12 bg-gray-50 dark:bg-gray-800 border transition
              ${
                touched.confirmPassword
                  ? password === confirmPassword && confirmPassword.length > 0
                    ? "border-green-500 focus:ring-green-500"
                    : "border-red-500 focus:ring-red-500"
                  : "border-gray-300 dark:border-gray-700 focus:ring-blue-500"
              }`}
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showConfirmPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>

          </div>

          {touched.confirmPassword &&
            confirmPassword.length > 0 &&
            password !== confirmPassword && (
              <p className="text-sm text-red-500">
                Passwords do not match.
              </p>
          )}

          {touched.confirmPassword &&
            confirmPassword.length > 0 &&
            password === confirmPassword && (
              <p className="text-sm text-green-600">
                ✓ Passwords match
              </p>
          )}

        </div>

        {/* =========================
            SIGN UP BUTTON
        ========================== */}

        <button
          type="submit"
          disabled={
            loading ||
            !isNameValid ||
            !isEmailValid ||
            !isPhoneValid ||
            !isPasswordValid ||
            password !== confirmPassword
          }
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-3 rounded-xl font-semibold shadow-lg transition-all duration-300"
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>

        {/* =========================
            DIVIDER
        ========================== */}

        <div className="flex items-center gap-3 my-2">
          <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700"></div>
          <span className="text-sm text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700"></div>
        </div>

        {/* =========================
            LOGIN LINK
        ========================== */}

        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => router.push("/login")}
            className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Login
          </button>
        </p>

      </form>
    </div>
  );
}