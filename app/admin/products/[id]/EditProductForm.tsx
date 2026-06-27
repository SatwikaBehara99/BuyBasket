"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUploadThing } from "@/utils/uploadthing";
import { Trash2, UploadCloud } from "lucide-react";

type Variant = {
  size: string;
  packaging: string;
  price: string;
  stock: string;
  image?: string;
};

export default function EditProductForm({ product }: { product: any }) {
  const router = useRouter();
  const { startUpload } = useUploadThing("variantImage");

  // SAFE INIT
  const [name, setName] = useState(product?.name || "");
  const [description, setDescription] = useState(
    product?.description || ""
  );

  const [productImage, setProductImage] = useState(
    product?.variants?.[0]?.image || ""
  );

  // SAFE VARIANTS
  const [variants, setVariants] = useState<Variant[]>(
    (product?.variants || []).map((v: any) => {
      const parts = v.name.split(" - ");

      return {
        size: parts[0] || "",
        packaging: parts[1] || "",
        price: String(v.price || ""),
        stock: String(v.stock || ""),
        image: v.image,
      };
    })
  );

  async function handleUpload(file: File) {
    const res = await startUpload([file]);

    if (res?.length) {
      setProductImage(res[0].url);
    }
  }

  function updateVariant(
    i: number,
    field: keyof Variant,
    value: string
  ) {
    const updated = [...variants];

    (updated[i] as any)[field] = value;

    setVariants(updated);
  }

  function addVariant() {
    setVariants([
      ...variants,
      {
        size: "",
        packaging: "",
        price: "",
        stock: "",
      },
    ]);
  }

  function deleteVariant(index: number) {
    setVariants(variants.filter((_, i) => i !== index));
  }

  async function saveChanges() {
    const res = await fetch(`/api/admin/products/${product.id}`, {
      method: "PUT",
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

    if (res.ok) {
      alert("Updated ✅");

      router.push("/admin/products");
      router.refresh();
    } else {
      alert("Update failed ❌");
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6 text-black dark:text-white">
      <h1 className="text-2xl font-bold mb-6">
        Edit Product
      </h1>

      {/* PRODUCT NAME */}
      <input
        value={name}
        placeholder="Product Name"
        onChange={(e) => setName(e.target.value)}
        className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-2 w-full mb-4 rounded text-black dark:text-white"
      />

      {/* DESCRIPTION */}
      <textarea
        value={description}
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
        className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-2 w-full mb-6 rounded text-black dark:text-white"
      />

      {/* IMAGE UPLOAD */}
      <label className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 flex flex-col items-center cursor-pointer mb-4 hover:bg-gray-50 dark:hover:bg-gray-800">

        <UploadCloud className="mb-2" />

        <p className="text-sm text-gray-500 dark:text-gray-400">
          Upload Product Image
        </p>

        <input
          type="file"
          className="hidden"
          onChange={(e) =>
            e.target.files &&
            handleUpload(e.target.files[0])
          }
        />
      </label>

      {/* IMAGE PREVIEW */}
      {productImage && (
        <img
          src={productImage}
          className="w-32 h-32 object-cover rounded mb-6"
        />
      )}

      {/* VARIANTS */}
      <h3 className="font-semibold mb-4">
        Variants
      </h3>

      {variants.map((v, i) => (
        <div
          key={i}
          className="border border-gray-300 dark:border-gray-700 p-4 mb-4 grid grid-cols-5 gap-2 items-center rounded bg-white dark:bg-gray-900"
        >
          {/* SIZE */}
          <input
            value={v.size}
            placeholder="In grams"
            onChange={(e) =>
              updateVariant(i, "size", e.target.value)
            }
            className="border border-gray-300 dark:border-gray-700 p-2 rounded bg-white dark:bg-gray-800 text-black dark:text-white"
          />

          {/* PACKAGING */}
          <select
            value={v.packaging}
            onChange={(e) =>
              updateVariant(
                i,
                "packaging",
                e.target.value
              )
            }
            className="border border-gray-300 dark:border-gray-700 p-2 rounded bg-white dark:bg-gray-800 text-black dark:text-white"
          >
            <option value="">
              Packaging
            </option>

            <option value="Bottle">
              Bottle
            </option>

            <option value="Refill">
              Refill
            </option>
          </select>

          {/* PRICE */}
          <input
            type="text"
            inputMode="numeric"
            value={v.price}
            placeholder="Price in rupees"
            onChange={(e) =>
              updateVariant(
                i,
                "price",
                e.target.value.replace(/\D/g, "")
              )
            }
            className="border border-gray-300 dark:border-gray-700 p-2 rounded bg-white dark:bg-gray-800 text-black dark:text-white"
          />

          {/* STOCK */}
          <input
            type="text"
            inputMode="numeric"
            value={v.stock}
            placeholder="Stock"
            onChange={(e) =>
              updateVariant(
                i,
                "stock",
                e.target.value.replace(/\D/g, "")
              )
            }
            className="border border-gray-300 dark:border-gray-700 p-2 rounded bg-white dark:bg-gray-800 text-black dark:text-white"
          />

          {/* DELETE */}
          <button
            onClick={() => deleteVariant(i)}
            className="text-red-500 flex justify-center"
          >
            <Trash2 />
          </button>
        </div>
      ))}

      {/* BUTTONS */}
      <div className="flex gap-4">
        <button
          onClick={addVariant}
          className="bg-gray-200 dark:bg-gray-700 dark:text-white px-4 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
        >
          Add Variant
        </button>

        <button
          onClick={saveChanges}
          className="bg-black dark:bg-white text-white dark:text-black px-6 py-2 rounded hover:bg-gray-800 dark:hover:bg-gray-200"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}