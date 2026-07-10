"use client";

import {Suspense} from "react"
import { useRouter, useSearchParams } from "next/navigation";

function FilterOrdersContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const status = searchParams.get("status");

  const handleFilter = (value: string) => {
    if (value === "ALL") {
      router.push("/admin/orders");
    } else {
      router.push(`/admin/orders?status=${value}`);
    }
  };

  return (
    <div className="flex gap-3 flex-wrap mb-8">

      <button
        onClick={() => handleFilter("ALL")}
        className={`px-4 py-2 rounded-lg ${
          !status
            ? "bg-black text-white"
            : "bg-gray-100 dark:bg-gray-800 dark:text-white"
        }`}
      >
        All
      </button>

      <button onClick={() => handleFilter("PENDING")} className="bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-100 px-4 py-2 rounded-lg" > Pending </button>
      <button onClick={() => handleFilter("PROCESSING")} className="bg-orange-100 dark:bg-orange-900 dark:text-orange-100 px-4 py-2 rounded-lg" > Processing  </button>
      <button onClick={() => handleFilter("SHIPPED")} className="bg-blue-100 dark:bg-blue-900 dark:text-blue-100 px-4 py-2 rounded-lg" > Shipped  </button>
      <button onClick={() => handleFilter("DELIVERED")} className="bg-green-100 dark:bg-green-900 dark:text-green-100 px-4 py-2 rounded-lg" > Delivered  </button>
      <button onClick={() => handleFilter("CANCELLED")} className="bg-red-100 dark:bg-red-900 dark:text-red-100 px-4 py-2 rounded-lg" > Cancelled  </button>
    </div>
  );
}

export default function FilterOrders() {
  return (
    <Suspense fallback={<div></div>}>
      <FilterOrdersContent />
    </Suspense>
  );
}
