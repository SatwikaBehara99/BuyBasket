"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUploadThing } from "@/utils/uploadthing";
import { UploadCloud } from "lucide-react";

type Variant = {
  size: string;
  packaging: string;
  price: number | "";
  stock: number | "";
};

export default function AddProductPage() {
  const router = useRouter();
  const { startUpload } = useUploadThing("variantImage");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [productImage, setProductImage] = useState("");
  const [variants, setVariants] = useState<Variant[]>([
    { size: "", packaging: "", price: "", stock: "" },
  ]);

  async function handleUpload(file: File) {
    const res = await startUpload([file]);
    if (res?.length) setProductImage(res[0].url);
  }


  function updateVariant(i: number, field: keyof Variant, value: string) {
  const updated = [...variants];

  if (field === "price" || field === "stock") {
    updated[i] = {
      ...updated[i],
      [field]: value === "" ? "" : Number(value),
    };
  } else {
    updated[i] = {
      ...updated[i],
      [field]: value,
    };
  }

  setVariants(updated);
}

  function addVariant() {
    setVariants([
      ...variants,
      { size: "", packaging: "", price: "", stock: "" },
    ]);
  }

  async function createProduct() {
    const res = await fetch("/api/admin/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        description,
        variants: variants.map((v) => ({
          name: `${v.size} - ${v.packaging}`,
          price: Number(v.price),
          stock: Number(v.stock),
          image: productImage,
        })),
      }),
    });

    if (res.ok) router.push("/admin/products");
    else alert("Failed to create product");
  }

  return (
    <div className="p-10 max-w-3xl mx-auto text-black dark:text-white">
      <h1 className="text-2xl font-bold mb-6">Add Product</h1>

      <input
        placeholder="Product Name"
        className="border border-gray-300 dark:border-gray-700 p-2 w-full mb-4 bg-white dark:bg-gray-900 text-black dark:text-white"
        onChange={(e) => setName(e.target.value)}
      />

      <textarea
        placeholder="Description"
        className="border border-gray-300 dark:border-gray-700 p-2 w-full mb-6 bg-white dark:bg-gray-900 text-black dark:text-white"
        onChange={(e) => setDescription(e.target.value)}
      />

      {/* IMAGE */}
      <label className="border border-gray-300 dark:border-gray-700 rounded-lg p-10 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 mb-6">
        <UploadCloud size={40} className="mb-2 text-gray-500 dark:text-gray-400" />
        <p className="text-gray-500 dark:text-gray-400">Upload product image</p>

        <input
          type="file" className="hidden"
          onChange={(e) => e.target.files && handleUpload(e.target.files[0]) }
        />
      </label>

      {productImage && <img src={productImage} className="w-32 mb-4" />}
      <h3 className="font-semibold mb-4">Variants</h3>
      {variants.map((v, i) => (
        <div key={i} className="border border-gray-300 dark:border-gray-700 p-4 mb-4 grid grid-cols-4 gap-2 bg-white dark:bg-gray-900 text-black dark:text-white">

          <input
            placeholder="Size (100g / 250g)" className="border border-gray-300 dark:border-gray-700 p-2 bg-white dark:bg-gray-800 text-black dark:text-white"
            onChange={(e) => updateVariant(i, "size", e.target.value)}
          />

          <select
            className="border border-gray-300 dark:border-gray-700 p-2 bg-white dark:bg-gray-800 text-black dark:text-white"
            onChange={(e) => updateVariant(i, "packaging", e.target.value) }
          >
            <option value="">Select Packaging</option>
            <option value="Bottle">Glass Bottle</option>
            <option value="Refill">Refill Pack</option>
          </select>

          <input
            placeholder="Price in ₹" type="number" value = {v.price}
            className="border border-gray-300 dark:border-gray-700 p-2 bg-white dark:bg-gray-800 text-black dark:text-white"  onChange={(e) => updateVariant(i, "price", e.target.value)}
          />

          <input
            placeholder="Stock" type="number" value = {v.stock}
            className="border border-gray-300 dark:border-gray-700 p-2 bg-white dark:bg-gray-800 text-black dark:text-white" onChange={(e) => updateVariant(i, "stock", e.target.value)}
          />

        </div>
      ))}

      <button onClick={addVariant} className="bg-gray-200 dark:bg-gray-700 dark:text-white px-4 py-2 mr-4 rounded"> Add Variant </button>
      <button onClick={createProduct} className="bg-black text-white dark:bg-white dark:text-black px-6 py-2 rounded" > Create Product </button>
    </div>
  );
}