"use client";

import { Suspense } from "react";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye,EyeOff, UserCircle2 } from "lucide-react";

function LoginForm() {

  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[showPassword, setShowPassword] = useState(false);
  const handleLogin = async ( e: React.FormEvent ) => { e.preventDefault();
    const res = await signIn("user-login",{ email, password, redirect: false });

    if (res?.ok) {
  const session = await fetch( "/api/auth/session" ).then(res => res.json());

  if (session?.user?.role === "admin" ) {
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100
dark:from-gray-950 dark:via-gray-900 dark:to-black">

      <form
        onSubmit={handleLogin} autoComplete="off"
        className="bg-white dark:bg-[#071225] w-full max-w-md p-10 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700 flex flex-col gap-4 text-black dark:text-white hover:shadow-blue-400/20 transition-all duration-300" >

        <div className="flex justify-center mb-2">
            <div className="w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
            <UserCircle2 size={42} className="text-blue-600 dark:text-blue-400" />
            </div>
        </div>

        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white"> Welcome Back </h1>
        <p className="text-center text-gray-500 dark:text-gray-400 mt-2"> Sign in to continue shopping </p>
    
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"> Email </label>
          <input
            type="email" placeholder="Enter your email" required
            value={email} onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" />
        </div>

        <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"> Password </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password" required
              value={password}
              onChange={(e) => setPassword(e.target.value) }
              className="w-full border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />

            <button
              type="button"
              onClick={() => setShowPassword( !showPassword )}
              className="absolute right-3 top-1/2 -translate-y-1/2" >
              {showPassword ? ( <EyeOff size={20} /> ) : ( <Eye size={20} /> )}
            </button>

          </div>
        </div>

        <div className="text-right">
          <button type="button"
          onClick = {()=> router.push("/forgot-password")}
          className="text-sm text-blue-600 hover:underline dark:text-blue-400" > Forgot Password? </button>
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 rounded-xl font-semibold py-3 shadow-lg text-white dark:text-white hover:shadow-blue-400/30"> Login </button>
        <div className="flex items-center gap-3 my-2">
            <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700"></div>
            <span className="text-sm text-gray-400">OR</span>
            <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700"></div>
        </div>

        <div className="text-center text-sm text-gray-500 dark:text-gray-400"> Don't have an account?{" "}
        <span onClick={() => router.push("/signup")} className="text-blue-600 dark:text-blue-400 font-semibold cursor-pointer hover:underline">
    Create Account </span>
</div>

      </form>
    </div>
  );
}

export default function UserLoginPage() {
  return (
    <Suspense fallback={<div></div>}>
      <LoginForm />
    </Suspense>
  );
}