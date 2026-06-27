"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Eye, EyeOff } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, phone, password }),
    });

    const data = await res.json();

    if (res.ok) {
      // auto login after signup
      const login = await signIn("user-login", {
        email,
        password,
        redirect: false,
      });

      if (login?.ok) {
        router.push("/"); // redirect to home
      }
    } else {
      alert(data.error);
    }
  };

  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-black">
      <form
        onSubmit={handleSignup}
        autoComplete="off"
        className="bg-white dark:bg-gray-900 p-8 rounded shadow w-80 flex flex-col gap-4 border border-gray-200 dark:border-gray-700"
      >
        <h2 className="text-xl font-semibold text-center dark:text-white text-gray-900">
          Sign Up
        </h2>

        <div className="flex flex-col">
          <label className="dark:text-gray-300 text-gray-700">Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white dark:border-gray-600 border-gray-300"
          />
        </div>

        <div className="flex flex-col">
          <label className="dark:text-gray-300 text-gray-700">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white dark:border-gray-600 border-gray-300"
          />
        </div>

        <div className="flex flex-col">
          <label className="dark:text-gray-300 text-gray-700">Phone Number</label>
          <input
            type="tel"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border p-2 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white dark:border-gray-600 border-gray-300"
          />
        </div>



        <div className="flex flex-col">
        <label className="dark:text-gray-300 text-gray-700">Password</label>
        <div className="relative">
        <input
          type={ showPassword ? "text" : "password" }
          placeholder="Enter your password"
          value={password}
          onChange={(e) =>
          setPassword(e.target.value)
      }
      className="border p-2 rounded w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white dark:border-gray-600 border-gray-300"
    />
        <button
        type="button"
        onClick={() =>
        setShowPassword(
          !showPassword
        )
      }
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-300"
    >
      {showPassword ? ( <EyeOff size={18} /> ) : ( <Eye size={18} /> )}
    </button>

  </div>

</div>



        <div className="flex flex-col">
  <label className="dark:text-gray-300 text-gray-700">Confirm Password</label>

  <div className="relative">

    <input
      type={
        showConfirmPassword
          ? "text"
          : "password"
      }
      placeholder="Confirm your password"
      value={confirmPassword}
      onChange={(e) =>
        setConfirmPassword(
          e.target.value
        )
      }
      className="border p-2 rounded w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white dark:border-gray-600 border-gray-300"
    />

    <button
      type="button"
      onClick={() =>
        setShowConfirmPassword(
          !showConfirmPassword
        )
      }
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-300"
    >
      {showConfirmPassword ? (
        <EyeOff size={18} />
      ) : (
        <Eye size={18} />
      )}
    </button>

  </div>

</div>



        <button className="bg-black dark:bg-red-600 text-white py-2 rounded cursor-pointer hover:opacity-80 transition">
          Sign Up
        </button>
      </form>
    </div>
  );
}