"use client";

import { useEffect, useState } from "react";
import {
  MoreVertical,
  Pencil,
  Trash2,
} from "lucide-react";
import AccountSidebar from "@/components/AccountSidebar";

export default function AddressPage() {
  const emptyForm = {
    name: "",
    phone: "",
    pincode: "",
    locality: "",
    area: "",
    city: "",
    state: "",
    landmark: "",
    alternatePhone: "",
    addressType: "HOME",
  };

  const [addresses, setAddresses] = useState<any[]>([]);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState(emptyForm);

  async function fetchAddresses() {
    const res = await fetch("/api/addresses");
    const data = await res.json();
    setAddresses(data);
  }

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleSave = async () => {
    try {
      const url = editingId
        ? `/api/addresses/${editingId}`
        : "/api/addresses";

      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        alert("Failed to save address");
        return;
      }

      fetchAddresses();

      setShowForm(false);
      setEditingId(null);
      setFormData(emptyForm);

    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (address: any) => {
    setEditingId(address.id);

    setFormData({
      name: address.name,
      phone: address.phone,
      pincode: address.pincode,
      locality: address.locality,
      area: address.area,
      city: address.city,
      state: address.state,
      landmark: address.landmark || "",
      alternatePhone: address.alternatePhone || "",
      addressType: address.addressType,
    });

    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this address?")) return;

    await fetch(`/api/addresses/${id}`, {
      method: "DELETE",
    });

    fetchAddresses();
  };

      return (
  <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-100 dark:from-gray-900 dark:via-gray-950 dark:to-red-900 px-6 md:px-10 py-8">
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">

      {/* LEFT SIDE */}
      <AccountSidebar />

      {/* RIGHT SIDE */}
      <div className="flex-1">

        <button
          onClick={() => {
            setEditingId(null);
            setFormData(emptyForm);
            setShowForm(true);
          }}
          className="w-full bg-white border border-dashed border-red-400 text-red-600 font-semibold py-4 rounded mb-6"
        >
          + ADD A NEW ADDRESS
        </button>


      {showForm && (
        <div className="bg-white dark:bg-gray-900 rounded p-6 shadow mb-6 space-y-4">

          <input
            placeholder="Name"
            className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white p-3 rounded"
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value,
              })
            }
          />

          <input
            placeholder="Phone"
            className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white p-3 rounded"
            value={formData.phone}
            onChange={(e) =>
              setFormData({
                ...formData,
                phone: e.target.value,
              })
            }
          />

          <input
            placeholder="Pincode"
            className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white p-3 rounded"
            value={formData.pincode}
            onChange={(e) =>
              setFormData({
                ...formData,
                pincode: e.target.value,
              })
            }
          />

          <input
            placeholder="Locality"
            className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white p-3 rounded"
            value={formData.locality}
            onChange={(e) =>
              setFormData({
                ...formData,
                locality: e.target.value,
              })
            }
          />

          <textarea
            placeholder="Area"
            className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white p-3 rounded"
            value={formData.area}
            onChange={(e) =>
              setFormData({
                ...formData,
                area: e.target.value,
              })
            }
          />

          <input
            placeholder="City"
            className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white p-3 rounded"
            value={formData.city}
            onChange={(e) =>
              setFormData({
                ...formData,
                city: e.target.value,
              })
            }
          />

          <input
            placeholder="State"
            className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white p-3 rounded"
            value={formData.state}
            onChange={(e) =>
              setFormData({
                ...formData,
                state: e.target.value,
              })
            }
          />

          <input
            placeholder="Landmark"
            className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white p-3 rounded"
            value={formData.landmark}
            onChange={(e) =>
              setFormData({
                ...formData,
                landmark: e.target.value,
              })
            }
          />

          <input
            placeholder="Alternate Phone"
            className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white p-3 rounded"
            value={formData.alternatePhone}
            onChange={(e) =>
              setFormData({
                ...formData,
                alternatePhone: e.target.value,
              })
            }
          />

          <div className="flex gap-4">

            <button
              onClick={handleSave}
              className="bg-orange-500 text-white px-6 py-3 rounded"
            >
              SAVE
            </button>

            <button
              onClick={() => {
                setShowForm(false);
                setEditingId(null);
                setFormData(emptyForm);
              }}
              className="border border-gray-300 dark:border-gray-700 px-6 py-3 rounded text-black dark:text-white"
            >
              CANCEL
            </button>

          </div>
        </div>
      )}

      <div className="space-y-5">

        {addresses.map((address) => (

          <div
            key={address.id}
            className="bg-white rounded p-5 shadow relative dark:bg-gray-900 dark:text-white"
          >

            <div className="flex justify-between">

              <div className="flex gap-3 items-center">

                <span className="bg-gray-100 px-3 py-1 rounded text-xs font-semibold dark:bg-gray-800 text-black dark:text-white">
                  {address.addressType}
                </span>

                <span className="font-bold">
                  {address.name}
                </span>

                <span>
                  {address.phone}
                </span>

              </div>

              <div className="relative">

                <button
                  onClick={() =>
                    setOpenMenu(
                      openMenu === address.id
                        ? null
                        : address.id
                    )
                  }
                >
                  <MoreVertical />
                </button>

                {openMenu === address.id && (
                  <div className="absolute right-0 top-8 bg-white dark:bg-gray-900 border dark:border-gray-700 rounded shadow w-32 z-20">

                    <button
                      onClick={() => {
                        handleEdit(address);
                        setOpenMenu(null);
                      }}
                      className="w-full px-4 py-3 flex gap-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <Pencil size={16} />
                      Edit
                    </button>

                    <button
                      onClick={() => {
                        handleDelete(address.id);
                        setOpenMenu(null);
                      }}
                      className="w-full px-4 py-3 flex gap-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>

                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 text-gray-700 dark:text-gray-300 leading-7">

              <p>
                {address.area}, {address.locality}
              </p>

              <p>
                {address.city}, {address.state} - {address.pincode}
              </p>

              {address.landmark && (
                <p>
                  Landmark: {address.landmark}
                </p>
              )}

              {address.alternatePhone && (
                <p>
                  Alternate Phone: {address.alternatePhone}
                </p>
              )}
            </div>

          </div>

        ))}

</div>
      </div>
      </div>
    </div>
  )
}