"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import {
  Mail,
  Phone,
  Eye,
  EyeOff,
} from "lucide-react";
import AccountSidebar from "@/components/AccountSidebar";

export default function AccountPage() {
  const { data: session } = useSession();

  // --------------------------
  // Profile
  // --------------------------

  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // --------------------------
  // Edit States
  // --------------------------

  const [editingName, setEditingName] =
    useState(false);

  const [editingPhone, setEditingPhone] =
    useState(false);

  const [editingPassword, setEditingPassword] =
    useState(false);

  // --------------------------
  // Password States
  // --------------------------

  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showCurrentPassword, setShowCurrentPassword] =
    useState(false);

  const [showNewPassword, setShowNewPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  // --------------------------
  // UI States
  // --------------------------

  const [success, setSuccess] =
    useState("");

  const [error, setError] =
    useState("");

  // --------------------------
  // Validation Regex
  // --------------------------

  const nameRegex =
    /^[A-Za-z ]{3,40}$/;

  const phoneRegex =
    /^[6-9]\d{9}$/;

  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

  // --------------------------
  // Password Strength
  // --------------------------

  const passwordChecks = {
    length: newPassword.length >= 8,
    upper: /[A-Z]/.test(newPassword),
    lower: /[a-z]/.test(newPassword),
    number: /\d/.test(newPassword),
    special: /[@$!%*?&#]/.test(newPassword),
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

  // --------------------------
  // Fetch User
  // --------------------------

  useEffect(() => {
    async function fetchUser() {
      const res =
        await fetch("/api/account/update");

      const data =
        await res.json();

      setName(data.name || "");
      setGender(data.gender || "");
      setEmail(data.email || "");
      setPhone(data.phone || "");
    }

    fetchUser();
  }, []);

  // --------------------------
  // Save
  // --------------------------

  async function handleSave() {

    setSuccess("");
    setError("");

    if (!nameRegex.test(name)) {
      setError(
        "Name should contain only letters (3-40 characters)."
      );

      return;
    }

    if (!phoneRegex.test(phone)) {
      setError(
        "Enter a valid 10-digit mobile number."
      );

      return;
    }

    if (
      editingPassword &&
      !passwordRegex.test(newPassword)
    ) {
      setError(
        "Password is too weak."
      );

      return;
    }

    if (
      editingPassword &&
      newPassword !== confirmPassword
    ) {
      setError(
        "Passwords do not match."
      );

      return;
    }

    try {

      const res =
        await fetch(
          "/api/account/update",
          {
            method: "PUT",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              name,
              gender,
              phone,
              currentPassword,
              newPassword,
            }),
          }
        );

      const data =
        await res.json();

      if (!res.ok) {

        setError(
          data.error ||
            "Failed to update profile."
        );

        return;
      }

      setSuccess(
        "Profile updated successfully."
      );

      setEditingName(false);
      setEditingPhone(false);
      setEditingPassword(false);

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        setSuccess("");
      }, 3000);

    } catch {

      setError(
        "Something went wrong."
      );
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-950 dark:via-gray-900 dark:to-black px-6 py-8">

  {/* Success Toast */}

  {success && (
    <div className="fixed top-6 right-6 z-50 bg-green-600 text-white px-6 py-3 rounded-xl shadow-xl">
      ✅ {success}
    </div>
  )}

  {error && (
    <div className="fixed top-6 right-6 z-50 bg-red-600 text-white px-6 py-3 rounded-xl shadow-xl">
      {error}
    </div>
  )}

  <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">

    <AccountSidebar />

    <div className="flex-1 bg-white dark:bg-[#071225] rounded-3xl shadow-2xl p-8">

      {/* Heading */}

      <div className="mb-10">

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          My Profile
        </h1>

        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Manage your personal information and account settings.
        </p>

      </div>

      {/* PERSONAL INFORMATION */}

      <div className="border-b border-gray-200 dark:border-gray-700 pb-10 mb-10">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold dark:text-white">
            Personal Information
          </h2>

          {!editingName ? (

            <button
              onClick={() => setEditingName(true)}
              className="text-blue-600 font-semibold hover:underline"
            >
              Edit
            </button>

          ) : (

            <button
              onClick={() => setEditingName(false)}
              className="text-red-500 font-semibold hover:underline"
            >
              Cancel
            </button>

          )}

        </div>

        <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
          Full Name
        </label>

        <input
          type="text"
          value={name}
          placeholder="Enter your full name"
          disabled={!editingName}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-4 text-black dark:text-white disabled:opacity-80"
        />

        {/* Gender */}

        <div className="mt-8">

          <label className="block mb-4 font-medium text-gray-700 dark:text-gray-300">
            Gender
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

            <button
              type="button"
              disabled={!editingName}
              onClick={() => setGender("Male")}
              className={`rounded-xl border p-5 transition
              ${
                gender === "Male"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
              }`}
            >
              👨 Male
            </button>

            <button
              type="button"
              disabled={!editingName}
              onClick={() => setGender("Female")}
              className={`rounded-xl border p-5 transition
              ${
                gender === "Female"
                  ? "bg-pink-600 text-white border-pink-600"
                  : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
              }`}
            >
              👩 Female
            </button>

            <button
              type="button"
              disabled={!editingName}
              onClick={() => setGender("Prefer not to say")}
              className={`rounded-xl border p-5 transition
              ${
                gender === "Prefer not to say"
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
              }`}
            >
              🙈 Prefer not to say
            </button>

          </div>

        </div>

        {editingName && (

          <button
            onClick={handleSave}
            className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg"
          >
            💾 Save Changes
          </button>

        )}

      </div>

      {/* EMAIL */}

      <div className="border-b border-gray-200 dark:border-gray-700 pb-10 mb-10">

        <h2 className="text-2xl font-bold mb-6 dark:text-white">
          Email Address
        </h2>

        <div className="relative">

          <Mail
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="email"
            value={email}
            readOnly
            className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-black dark:text-white cursor-not-allowed"
          />

        </div>

        <p className="text-green-600 mt-3 font-medium">
          ✓ Verified Email Address
        </p>

      </div>

      {/* PHONE */}

      <div className="border-b border-gray-200 dark:border-gray-700 pb-10 mb-10">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold dark:text-white">
            Mobile Number
          </h2>

          {!editingPhone ? (

            <button
              onClick={() => setEditingPhone(true)}
              className="text-blue-600 font-semibold hover:underline"
            >
              Edit
            </button>

          ) : (

            <button
              onClick={() => setEditingPhone(false)}
              className="text-red-500 font-semibold hover:underline"
            >
              Cancel
            </button>

          )}

        </div>

        <div className="relative">

          <Phone
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="tel"
            value={phone}
            placeholder="Enter mobile number"
            disabled={!editingPhone}
            maxLength={10}
            onChange={(e) =>
              setPhone(
                e.target.value.replace(/\D/g, "")
              )
            }
            className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-black dark:text-white"
          />

        </div>

        {editingPhone && (

          <button
            onClick={handleSave}
            className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg"
          >
            💾 Save Changes
          </button>

        )}

      </div>

      {/* CHANGE PASSWORD */}

      <div>

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold dark:text-white">
            Change Password
          </h2>

          {!editingPassword ? (

            <button
              onClick={() => setEditingPassword(true)}
              className="text-blue-600 font-semibold hover:underline"
            >
              Edit
            </button>

          ) : (

            <button
              onClick={() => {
                setEditingPassword(false);
                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");
                setError("");
              }}
              className="text-red-500 font-semibold hover:underline"
            >
              Cancel
            </button>

          )}

        </div>

        {/* Current Password */}

        <div className="relative mb-5">

          <input
            type={showCurrentPassword ? "text" : "password"}
            placeholder="Current Password"
            value={currentPassword}
            disabled={!editingPassword}
            onChange={(e) =>
              setCurrentPassword(e.target.value)
            }
            className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-4 pr-12 text-black dark:text-white"
          />

          <button
            type="button"
            onClick={() =>
              setShowCurrentPassword(
                !showCurrentPassword
              )
            }
            className="absolute right-4 top-1/2 -translate-y-1/2"
          >
            {showCurrentPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>

        </div>

        {/* New Password */}

        <div className="relative mb-4">

          <input
            type={showNewPassword ? "text" : "password"}
            placeholder="New Password"
            value={newPassword}
            disabled={!editingPassword}
            onChange={(e) =>
              setNewPassword(e.target.value)
            }
            className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-4 pr-12 text-black dark:text-white"
          />

          <button
            type="button"
            onClick={() =>
              setShowNewPassword(
                !showNewPassword
              )
            }
            className="absolute right-4 top-1/2 -translate-y-1/2"
          >
            {showNewPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>

        </div>

        {/* Password Strength */}

        {editingPassword &&
          newPassword.length > 0 && (

            <>

              <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">

                <div
                  className={`h-2 rounded-full transition-all duration-300 ${strengthColor} ${strengthWidth}`}
                />

              </div>

              <p
                className={`mt-2 text-sm font-medium ${
                  strength <= 2
                    ? "text-red-500"
                    : strength <= 4
                    ? "text-yellow-500"
                    : "text-green-500"
                }`}
              >
                {strengthText}
              </p>

              <div className="mt-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-4 space-y-2 text-sm">

                <p className={passwordChecks.length ? "text-green-600" : "text-gray-500"}>
                  {passwordChecks.length ? "✅" : "⭕"} Minimum 8 characters
                </p>

                <p className={passwordChecks.upper ? "text-green-600" : "text-gray-500"}>
                  {passwordChecks.upper ? "✅" : "⭕"} One uppercase letter
                </p>

                <p className={passwordChecks.lower ? "text-green-600" : "text-gray-500"}>
                  {passwordChecks.lower ? "✅" : "⭕"} One lowercase letter
                </p>

                <p className={passwordChecks.number ? "text-green-600" : "text-gray-500"}>
                  {passwordChecks.number ? "✅" : "⭕"} One number
                </p>

                <p className={passwordChecks.special ? "text-green-600" : "text-gray-500"}>
                  {passwordChecks.special ? "✅" : "⭕"} One special character
                </p>

              </div>

            </>

        )}

        {/* Confirm Password */}

        <div className="relative mt-5">

          <input
            type={
              showConfirmPassword
                ? "text"
                : "password"
            }
            placeholder="Confirm Password"
            value={confirmPassword}
            disabled={!editingPassword}
            onChange={(e) =>
              setConfirmPassword(
                e.target.value
              )
            }
            className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-4 pr-12 text-black dark:text-white"
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
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>

        </div>

        {editingPassword &&
          confirmPassword.length > 0 && (

            <p
              className={`mt-2 text-sm ${
                newPassword === confirmPassword
                  ? "text-green-600"
                  : "text-red-500"
              }`}
            >
              {newPassword === confirmPassword
                ? "✓ Passwords match"
                : "Passwords do not match"}
            </p>

        )}

        {editingPassword && (

          <button
            onClick={handleSave}
            className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300"
          >
            🔒 Save Password
          </button>

        )}

      </div>

    </div>

  </div>

</div>

);
}