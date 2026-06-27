"use client";

import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { User, Package, MapPin, Mail, Phone, TicketPercent, Star, Heart, LogOut, Settings, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import AccountSidebar from "@/components/AccountSidebar";

export default function AccountPage() {

  const { data: session } = useSession();
  const [editingName, setEditingName] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);
  const [editingPhone, setEditingPhone] = useState(false);
  const [editingAddress, setEditingAddress] = useState(false);
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [success, setSuccess] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [editingPassword, setEditingPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

useEffect(() => {
  const fetchUser = async () => {
    const res = await fetch( "/api/account/update" );
    const data = await res.json();
    setName(data.name || "");
    setGender(data.gender || "");
    setEmail(data.email || "");
    setPhone(data.phone || "");
    setAddress(data.address || "");
  };
  fetchUser();
}, []);

    
const handleSave = async () => {
  if (
    editingPassword &&  newPassword !== confirmPassword
  ) {
    setSuccess(
      "New Password and Confirm Password do not match"
    );
    setTimeout(() => {
      setSuccess("");
    }, 3000);

    return;
  }
  try {
    const res = await fetch(
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
          email,
          phone,
          address,
          currentPassword,
          newPassword,
          confirmPassword,
        }),
      }
    );
    if (!res.ok) {
      const data = await res.json();
      setSuccess(
        data.error ||
        "Failed to update account"
      );
      return;
    }
    setSuccess(
      "Account updated successfully!"
    );
    setEditingName(false);
    setEditingEmail(false);
    setEditingPhone(false);
    setEditingAddress(false);
    setEditingPassword(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setTimeout(() => {
      setSuccess("");
    }, 3000);

  } catch (error) {
    console.log(error);
    setSuccess(
      "Failed to update account"
    );
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-100 dark:from-gray-900 dark:via-gray-950 dark:to-black px-6 md:px-10 py-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">

        <AccountSidebar />
        

        {/* RIGHT SIDE */}
        <div className="flex-1 bg-white dark:bg-gray-900 rounded-sm shadow-sm p-8">


          {/* SUCCESS MESSAGE */}
          {success && (
            <div className="fixed bottom-0 left-0 w-full flex justify-center pb-6 z-50">
              <div className="bg-green-600 text-white px-6 py-4 rounded-t-xl shadow-2xl animate-pulse font-medium text-center"> {success} </div>
            </div>
          )}

          {/* PERSONAL INFO */}
          <div className="border-b pb-10 mb-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-5">
                <h2 className="text-2xl font-bold text-black dark:text-white"> Personal Information </h2>
                {!editingName ? (

                  <button onClick={() => setEditingName(true) }
                    className="text-red-600 font-medium" > Edit
                  </button> ) : (
                  <button onClick={() => setEditingName(false) }
                    className="text-red-600 font-medium" > Cancel
                  </button>
                )}
              </div>
              {editingName && (

                <button onClick={handleSave}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded" > SAVE CHANGES
                </button>
              )}
            </div>
            <input
              value={name}
              onChange={(e) => setName(e.target.value) }
              disabled={!editingName}
              className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white p-4 rounded"
            />
            <div className="mt-8">
            <p className="font-medium mb-4 text-black dark:text-white"> Your Gender </p>
            <div className="flex gap-10">

            <label className="flex items-center gap-2 cursor-pointer text-black dark:text-white">
            <input
            type="radio"
            value="Male"
            checked={gender === "Male"}
            disabled={!editingName}
            onChange={(e) => setGender(e.target.value) } /> Male
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-black dark:text-white">
            <input
            type="radio"
            value="Female"
            checked={gender === "Female"}
            disabled={!editingName}
            onChange={(e) => setGender(e.target.value) } /> Female
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-black dark:text-white">
            <input
            type="radio"
            value="Prefer not to say"
            checked={ gender === "Prefer not to say" }
            disabled={!editingName} onChange={(e) => setGender(e.target.value) } /> Prefer not to say
            </label>

  </div>
</div>
</div>

          {/* EMAIL */}
          <div className="border-b pb-10 mb-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-5">
                <label className="flex items-center gap-2 text-2xl font-bold">
                  <Mail size={22} /> Email Address
                </label>
                {!editingEmail ? (

                  <button onClick={() => setEditingEmail(true) }
                  className="text-red-600 font-medium" > Edit
                  </button> ) : (
                  <button onClick={() => setEditingEmail(false) }
                    className="text-red-600 font-medium" > Cancel
                  </button>

                )}
              </div>
              {editingEmail && (

                <button onClick={handleSave}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded" > SAVE CHANGES
                </button>

              )}
            </div>
            <input
              value={email}
              onChange={ (e) => setEmail(e.target.value) }
              disabled={!editingEmail}
              className="w-full border p-4 rounded"
            />
          </div>

          {/* PHONE */}
          <div className="border-b pb-10 mb-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-5">
                <label className="flex items-center gap-2 text-2xl font-bold">
                  <Phone size={22} /> Mobile Number
                </label>
                {!editingPhone ? (

                  <button onClick={ () => setEditingPhone(true) }
                    className="text-red-600 font-medium" > Edit
                  </button> ) : (
                  <button onClick={ () => setEditingPhone(false) }
                    className="text-red-600 font-medium" > Cancel
                  </button>
                )}

              </div>
              {editingPhone && (

                <button
                  onClick={handleSave}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded" > SAVE CHANGES
                </button>
              )}

            </div>

            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value) }
              disabled={!editingPhone}
              placeholder="Enter mobile number"
              className="w-full border p-4 rounded"
            />

          </div>

          
          {/* PASSWORD */}
          <div className="border-t mt-10 pt-10">
            <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-black dark:text-white">Change Password</h2>
            {!editingPassword ? (

            <button onClick={() => setEditingPassword(true) }
            className="text-red-600 font-medium" > Edit
            </button> ) : (
            <button onClick={() => setEditingPassword(false) }
            className="text-red-600 font-medium" > Cancel
            </button>
    )}
  </div>
  <div className="space-y-4">

    {/* Current Password */}
    <div className="relative">
      <input type={ showCurrentPassword ? "text" : "password" }
        placeholder="Current Password"
        value={currentPassword}
        onChange={(e) => setCurrentPassword( e.target.value ) }
        disabled={!editingPassword}
        className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white p-4 rounded"
      />
      <button
        type="button"
        onClick={() => setShowCurrentPassword( !showCurrentPassword ) }
        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-500"
      >
        {showCurrentPassword ? ( <EyeOff size={20} /> ) : ( <Eye size={20} /> ) }
      </button>
    </div>

    {/* New Password */}
    <div className="relative">
      <input type={ showNewPassword ? "text" : "password" }
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword( e.target.value ) }
        disabled={!editingPassword}
        className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white p-4 rounded"
      />
      <button
        type="button"
        onClick={() => setShowNewPassword( !showNewPassword ) }
        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-500"
      >
        {showNewPassword ? ( <EyeOff size={20} /> ) : ( <Eye size={20} /> ) }
      </button>
    </div>

    {/* Confirm Password */}
    <div className="relative">
      <input type={
          showConfirmPassword ? "text" : "password"
        }
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword (e.target.value)}
        disabled={!editingPassword}
        className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white p-4 rounded"
      />
      {
        confirmPassword &&  newPassword !== confirmPassword && (
        <p className="text-red-600 text-sm">Passwords do not match</p>
  )
}
      <button
        type="button"
        onClick={() => setShowConfirmPassword(!showConfirmPassword) }
        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-500"
      >
      { showConfirmPassword ? (<EyeOff size={20} />) : (<Eye size={20} />) }
      </button>
    </div>
    {editingPassword && (
      <button
        onClick={handleSave}
        className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded"
      >
        SAVE PASSWORD
      </button>
    )}
  </div>
</div>         
</div>
</div>
</div>
  );
}