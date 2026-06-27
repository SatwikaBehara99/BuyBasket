"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchOrders() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (!query.trim()) {
      router.push("/admin/orders");
      return;
    }

    router.push(
      `/admin/orders?search=${query}`
    );
  };

  return (
    <div className="flex gap-3 mb-8">
      <input
        type="text"
        placeholder="Search by email or order id"
        value={query}
        onChange={(e) =>
          setQuery(e.target.value)
        }
        className="border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 flex-1 bg-white dark:bg-gray-900 text-black dark:text-white"
      />

      <button
        onClick={handleSearch}
        className="bg-black dark:bg-white text-white dark:text-black px-6 py-2 rounded-lg"
      >
        Search
      </button>
    </div>
  );
}