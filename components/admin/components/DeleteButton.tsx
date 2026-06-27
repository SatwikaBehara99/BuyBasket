"use client";

import { useRouter } from "next/navigation";

export default function DeleteButton({
  id,
  children,
}: {
  id: string;
  children?: React.ReactNode;
}) {
  const router = useRouter();

  async function deleteProduct() {
    const confirmDelete = confirm("Delete this product?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        alert("Delete failed ❌");
        return;
      }

      alert("Deleted ✅");
      router.refresh();
    } catch {
      alert("Error ❌");
    }
  }

  return (
    <button
      onClick={deleteProduct}
      className="flex items-center gap-1 bg-red-500 text-white dark:bg-red-600 dark:text-white px-3 py-1 rounded text-sm"
    >
      {children}
      Delete
    </button>
  );
}