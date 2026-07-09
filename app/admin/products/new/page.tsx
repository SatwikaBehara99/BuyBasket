"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UploadCloud } from "lucide-react";
import { useUploadThing } from "@/utils/uploadthing";
import { categories } from "@/lib/categories";

type Variant = {
  variantName: string;
  sku: string;
  color: string;
  size: string;
  price: string;
  stock: string;
  image: string;
};

export default function AddProductPage() {
  const router = useRouter();

  const { startUpload } =
    useUploadThing("variantImage");

  const [name, setName] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [brand, setBrand] =
    useState("");

  const [featured, setFeatured] =
    useState(false);

  const [status, setStatus] =
    useState("ACTIVE");

  const [productImage, setProductImage] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [subCategory, setSubCategory] =
    useState("");

  const [subSubCategory, setSubSubCategory] =
    useState("");

  const [variants, setVariants] =
    useState<Variant[]>([
      {
        variantName: "",
        sku: "",
        color: "",
        size: "",
        price: "",
        stock: "",
        image: "",
      },
    ]);

  async function handleUpload(file: File) {
    const res = await startUpload([file]);

    if (res?.length) {
      setProductImage(res[0].url);
    }
  }


  function updateVariant(
  index: number,
  field: keyof Variant,
  value: string
) {
  const updated = [...variants];

  updated[index] = {
    ...updated[index],
    [field]: value,
  };

  setVariants(updated);
}

  function addVariant() {
    setVariants([
      ...variants,
      {
        variantName: "",
        sku: "",
        color: "",
        size: "",
        price: "",
        stock: "",
        image: "",
      },
    ]);
  }

  async function createProduct() {
    const res = await fetch(
      "/api/admin/products",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          name,
          description,
          brand,

          featured,
          status,

          category,
          subcategory: subCategory,
          subSubCategory,

          variants: variants.map(
            (v) => ({
              name: v.variantName,
              sku: v.sku,
              color: v.color,
              size: v.size,
              price: Number(v.price),
              stock: Number(v.stock),
              image: productImage,
            })
          ),
        }),
      }
    );

    if (res.ok) {
      router.push("/admin/products");
    } else {
      alert("Failed to create product");
    }
  }

  const selectedCategory =
    categories.find(
      (c) => c.name === category
    );

  const selectedSubcategory =
    selectedCategory?.sub.find(
      (s) => s.name === subCategory
    );

  return (

    <div className="p-8 max-w-5xl mx-auto text-black dark:text-white">

  <h1 className="text-3xl font-bold mb-8">
    Add Product
  </h1>

  {/* Product Details */}
  <div className="bg-white dark:bg-gray-900 rounded-xl border dark:border-gray-700 p-6 mb-8">

    <h2 className="text-xl font-semibold mb-6">
      Product Details
    </h2>

    <div className="space-y-5">

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Product Name"
        className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-3 bg-white dark:bg-gray-800"
      />

      <textarea
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-3 bg-white dark:bg-gray-800"
      />

      <input
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
        placeholder="Brand (Apple, Nike, Samsung...)"
        className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-3 bg-white dark:bg-gray-800"
      />

    </div>

  </div>

  {/* Categories */}

  <div className="bg-white dark:bg-gray-900 rounded-xl border dark:border-gray-700 p-6 mb-8">

    <h2 className="text-xl font-semibold mb-6">
      Categories
    </h2>

    <div className="grid md:grid-cols-3 gap-4">

      <select
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
          setSubCategory("");
          setSubSubCategory("");
        }}
        className="border border-gray-300 dark:border-gray-700 rounded-lg p-3 bg-white dark:bg-gray-800"
      >

        <option value="">
          Select Category
        </option>

        {categories.map((cat) => (

          <option
            key={cat.id}
            value={cat.name}
          >
            {cat.name}
          </option>

        ))}

      </select>

      <select
        value={subCategory}
        onChange={(e) => {
          setSubCategory(e.target.value);
          setSubSubCategory("");
        }}
        className="border border-gray-300 dark:border-gray-700 rounded-lg p-3 bg-white dark:bg-gray-800"
      >

        <option value="">
          Select Subcategory
        </option>

        {selectedCategory?.sub.map((sub) => (

          <option
            key={sub.id}
            value={sub.name}
          >
            {sub.name}
          </option>

        ))}

      </select>

      <select
        value={subSubCategory}
        onChange={(e) =>
          setSubSubCategory(e.target.value)
        }
        className="border border-gray-300 dark:border-gray-700 rounded-lg p-3 bg-white dark:bg-gray-800"
      >

        <option value="">
          Select Child Category
        </option>

        {selectedSubcategory?.sub.map((item) => (

          <option
            key={item}
            value={item}
          >
            {item}
          </option>

        ))}

      </select>

    </div>

  </div>

  {/* Product Options */}

  <div className="bg-white dark:bg-gray-900 rounded-xl border dark:border-gray-700 p-6 mb-8">

    <h2 className="text-xl font-semibold mb-6">
      Product Options
    </h2>

    <div className="grid md:grid-cols-2 gap-6">

      <div>

        <label className="block mb-2 font-medium">
          Status
        </label>

        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
          className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-3 bg-white dark:bg-gray-800"
        >

          <option value="ACTIVE">
            ACTIVE
          </option>

          <option value="INACTIVE">
            INACTIVE
          </option>

        </select>

      </div>

      <div className="flex items-center gap-3 mt-8">

        <input
          id="featured"
          type="checkbox"
          checked={featured}
          onChange={(e) =>
            setFeatured(e.target.checked)
          }
        />

        <label
          htmlFor="featured"
          className="font-medium"
        >
          Featured Product
        </label>

      </div>

    </div>

  </div>

  {/* Product Image */}

  <div className="bg-white dark:bg-gray-900 rounded-xl border dark:border-gray-700 p-6 mb-8">

    <h2 className="text-xl font-semibold mb-6">
      Product Image
    </h2>

    <label className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-10 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">

      <UploadCloud
        size={42}
        className="text-gray-500 mb-3"
      />

      <p className="text-gray-500">
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

    {productImage && (

      <img
        src={productImage}
        className="mt-6 w-40 h-40 object-cover rounded-xl border"
      />

    )}

  </div>

  {/* Variants */}

  <h2 className="text-2xl font-bold mb-5">
    Product Variants
  </h2>

  <div className="space-y-6">

  {variants.map((v, i) => (

    <div
      key={i}
      className="bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-xl p-6"
    >

      <h3 className="font-semibold text-lg mb-5">
        Variant {i + 1}
      </h3>

      <div className="grid md:grid-cols-2 gap-4">

        <input
          value={v.variantName}
          onChange={(e) =>
            updateVariant(i, "variantName", e.target.value)
          }
          placeholder="Variant Name (iPhone 16 Pro 256GB)"
          className="border border-gray-300 dark:border-gray-700 rounded-lg p-3 bg-white dark:bg-gray-800"
        />

        <input
          value={v.sku}
          onChange={(e) =>
            updateVariant(i, "sku", e.target.value)
          }
          placeholder="SKU"
          className="border border-gray-300 dark:border-gray-700 rounded-lg p-3 bg-white dark:bg-gray-800"
        />

        <input
          value={v.color}
          onChange={(e) =>
            updateVariant(i, "color", e.target.value)
          }
          placeholder="Color"
          className="border border-gray-300 dark:border-gray-700 rounded-lg p-3 bg-white dark:bg-gray-800"
        />

        <input
          value={v.size}
          onChange={(e) =>
            updateVariant(i, "size", e.target.value)
          }
          placeholder="Size / Storage"
          className="border border-gray-300 dark:border-gray-700 rounded-lg p-3 bg-white dark:bg-gray-800"
        />

        <input
          type="number"
          value={v.price}
          autoComplete="off"
          inputMode="numeric"
          onChange={(e) =>
            updateVariant(i, "price", e.target.value)
          }
          placeholder="Price"
          className="border border-gray-300 dark:border-gray-700 rounded-lg p-3 bg-white dark:bg-gray-800"
        />

        <input
          type="number"
          value={v.stock}
          autoComplete="off"
          inputMode="numeric"
          onChange={(e) =>
            updateVariant(i, "stock", e.target.value)
          }
          placeholder="Stock"
          className="border border-gray-300 dark:border-gray-700 rounded-lg p-3 bg-white dark:bg-gray-800"
        />

      </div>

    </div>

  ))}

  <div className="flex gap-4 mt-8">

    <button
      onClick={addVariant}
      className="bg-gray-200 dark:bg-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
    >
      + Add Variant
    </button>

    <button
      onClick={createProduct}
      className="bg-black dark:bg-white text-white dark:text-black px-8 py-3 rounded-lg hover:opacity-90 transition"
    >
      Create Product
    </button>

  </div>

</div>

</div>
);
}