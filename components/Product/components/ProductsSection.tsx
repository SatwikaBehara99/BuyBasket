"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { useState,useEffect } from "react";
import { Heart } from "lucide-react";
import Link from "next/link";

type Variant = {

  id: string;
  name: string;
  price: number;
  stock: number;
  image?: string | null;
};

type Product = {

  id: string;
  name: string;
  description: string | null;
  variants: Variant[];
};

export default function ProductsSection({
  products,
}: {
  products: Product[];
}) {
  const { addToCart } = useCart();

  const [selectedVariant, setSelectedVariant] = useState<{
    [key: string]: string;
  }>({});

  const [message, setMessage] = useState("");
  const [wishlistItems, setWishlistItems] = useState<string[]>([]);
  useEffect(() => {
  const fetchWishlist = async () => {
    try {
      const res = await fetch("/api/wishlist");

      if (!res.ok) return;

      const data = await res.json();

      setWishlistItems(
        data.map((item: any) => item.variant.id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  fetchWishlist();
}, []);


  const handleAdd = (
    e: React.MouseEvent,
    product: Product,
    variant: Variant
  ) => {
    e.preventDefault();

    
    addToCart({
      variantId: variant.id,
      name: product.name,
      variant: variant.name,
      price: variant.price,
      mrp: variant.price + 20,
      rating: 4.2,
      image:
        product.variants.find((v) => v.image)?.image ||
        "/spices.png",
    });

    setMessage("Item added to cart ✅");

    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 text-black dark:text-white">

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {products.map((product) => {
          const currentVariant =
            product.variants.find(
              (v) => v.id === selectedVariant[product.id]
            ) || product.variants[0];

          const isWishlisted =
  wishlistItems.includes(currentVariant.id);

          const productImage =
            product.variants.find((v) => v.image)?.image ||
            "/spices.png";

          const discount = Math.round(
            ((currentVariant.price + 20 - currentVariant.price) /
              (currentVariant.price + 20)) *
              100
          );

          return (
            <Link
              href={`/products/${product.id}`}
              key={product.id}
            >
              {/* CARD */}
              <div className="h-full flex flex-col justify-between border border-gray-200 dark:border-gray-700 rounded-xl p-4 bg-white dark:bg-[#1f2937] shadow-sm hover:shadow-lg transition cursor-pointer">
                {/* TOP */}
                <div>
                  {/* DISCOUNT */}
                  <div className="text-xs bg-green-600 text-white px-2 py-1 rounded inline-block mb-2">
                    {discount}% OFF
                  </div>

                  {/* IMAGE */}
                  <div className="flex justify-center mb-3 h-36">
                    <Image
                      src={productImage}
                      alt={product.name}
                      width={140}
                      height={140}
                      className="object-contain h-full"
                    />
                  </div>

                  {/* NAME */}
                  <h3 className="font-semibold text-lg line-clamp-2 min-h-[48px]">
                    {product.name}
                  </h3>

                  {/* PRICE */}
                  <div className="mt-1">
                    <span className="font-bold">
                      ₹{currentVariant.price}
                    </span>

                    <span className="line-through text-gray-400 dark:text-gray-500 ml-2 text-sm">
                      ₹{currentVariant.price + 20}
                    </span>
                  </div>

                  {/* VARIANT SELECT */}
                  <select
                    className="w-full mt-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#111827] p-2 rounded text-sm"
                    value={currentVariant.id}
                    onClick={(e) => e.preventDefault()}
                    onChange={(e) =>
                      setSelectedVariant((prev) => ({
                        ...prev,
                        [product.id]: e.target.value,
                      }))
                    }
                  >
                    {product.variants.map((variant) => (
                      <option key={variant.id} value={variant.id}>
                        {variant.name} — ₹{variant.price}
                      </option>
                    ))}
                  </select>
                </div>

                {/* BOTTOM (ALWAYS SAME POSITION) */}
                <div className="flex justify-between items-center mt-4">

                  {/* SAVE */}
                <button
  onClick={async (e) => {
    e.preventDefault();

    try {
      if (!isWishlisted) {
        const res = await fetch("/api/wishlist", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            variantId: currentVariant.id,
          }),
        });

        if (res.status === 401) {
          setMessage("Please login first");
          setTimeout(() => setMessage(""), 2000);
          return;
        }


        setWishlistItems((prev) =>
  prev.includes(currentVariant.id)
    ? prev
    : [...prev, currentVariant.id]
);

        setMessage("Added to wishlist ❤️");
      } 

else {
  await fetch("/api/wishlist", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      variantId: currentVariant.id,
    }),
  });

  setWishlistItems((prev) =>
    prev.filter(
      (id) => id !== currentVariant.id
    )
  );

        setMessage("Removed from wishlist ✓");
      }

      setTimeout(() => setMessage(""), 2000);
    } catch (error) {
      console.log(error);
    }
  }}
                  className={`flex items-center gap-1 text-sm cursor-pointer transition
                   ${
                    isWishlisted
                      ? "text-red-500"
                      : ":text-gray-600 dark:text-gray-300 hover:text-red-500"
                    }`}
>
  <Heart
    size={16}
    fill={isWishlisted ? "currentColor" : "none"}
  />
  {isWishlisted ? "Saved" : "Save"}
</button>
                  {/* ADD */}
                  <button
                    onClick={(e) =>
                      handleAdd(e, product, currentVariant)
                    }
                    className="bg-green-600 text-white px-4 py-2 text-sm rounded hover:bg-green-700"
                  >
                    Add
                  </button>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* TOAST */}
      {message && (
        <div className="fixed bottom-5 right-5 bg-green-600 text-white px-4 py-2 rounded shadow-lg dark:bg-green-700">
          {message}
        </div>
      )}
    </div>
  );
}