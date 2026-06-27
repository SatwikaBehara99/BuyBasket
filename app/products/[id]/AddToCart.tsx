"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";

export default function AddToCart({ product }: any) {
  const { addToCart } = useCart();

  const [selected, setSelected] = useState(product.variants[0]);
  const [msg, setMsg] = useState("");

  const handleAdd = () => {
    if (!selected) return;

    addToCart({
      variantId: selected.id, // IMPORTANT FIX

      name: product.name,
      variant: selected.name,

      price: selected.price,
      mrp: selected.price + 20,
      rating: 4.2,

      image: selected.image || "/spices.png",
    });

    setMsg("Added to cart ✅");

    setTimeout(() => setMsg(""), 2000);
  };

  return (
    <div>
      <div className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
        ₹{selected?.price}

        <span className="line-through text-gray-400 dark:text-gray-500 ml-2 text-sm">
          ₹{(selected?.price || 0) + 20}
        </span>
      </div>

      <div className="flex gap-3 mb-4 flex-wrap">
        {product.variants.map((v: any) => (
          <button
            key={v.id}
            onClick={() => setSelected(v)}
            className={`px-4 py-2 border rounded transition ${
              selected?.id === v.id
                ? "bg-green-600 text-white border-green-600"
                : "border-gray-300 dark:border-gray-600 dark:text-white"
            }`}
          >
            {v.name}
          </button>
        ))}
      </div>

      <button
        onClick={handleAdd}
        className="bg-green-600 text-white px-6 py-3 rounded w-full"
      >
        Add to Cart
      </button>

      {msg && (
        <div className="mt-3 text-green-600 dark:text-green-400">
          {msg}
        </div>
      )}
    </div>
  );
}