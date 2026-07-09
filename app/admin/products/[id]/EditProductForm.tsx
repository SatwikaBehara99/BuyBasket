"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUploadThing } from "@/utils/uploadthing";
import { Trash2, UploadCloud } from "lucide-react";
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

export default function EditProductForm({
  product,
}: {
  product: any;
}) {
  const router = useRouter();
  const { startUpload } = useUploadThing("variantImage");

  const [name, setName] = useState(product?.name || "");

  const [description, setDescription] = useState(
    product?.description || ""
  );

  const [brand, setBrand] = useState(
    product?.brand || ""
  );

  const [featured, setFeatured] = useState(
    product?.featured ?? false
  );

  const [status, setStatus] = useState(
    product?.status || "ACTIVE"
  );

  const [productImage, setProductImage] = useState(
    product?.variants?.[0]?.image || ""
  );

  // CATEGORY

  const [category, setCategory] = useState(
    product?.category || ""
  );

  const [subCategory, setSubCategory] = useState(
    product?.subcategory || ""
  );

  const [subSubCategory, setSubSubCategory] =
    useState(product?.subSubcategory || "");

  const [variants, setVariants] = useState<Variant[]>(
    (product?.variants || []).map((v: any) => ({
      variantName: v.name || "",

      sku: v.sku || "",

      color: v.color || "",

      size: v.size || "",

      price: String(v.price ?? ""),

      stock: String(v.stock ?? ""),

      image: v.image || "",
    }))
  );

  const selectedCategory = categories.find(
    (c) => c.name === category
  );

  const selectedSubcategory = selectedCategory?.sub.find(
    (s) => s.name === subCategory
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

    updated[i] = {
      ...updated[i],
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
        image: productImage,
      },
    ]);
  }

  function deleteVariant(index: number) {
    setVariants(
      variants.filter((_, i) => i !== index)
    );
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

        brand,
        featured,
        status,

        category,
        subcategory: subCategory,
        subSubCategory: subSubCategory,

        variants : variants.map((v: any, i: number) => ({
  name: v.name || v.variantName || `Variant ${i + 1}`,
  sku: v.sku || null,
  color: v.color || null,
  size: v.size || null,
  price: Number(v.price),
  stock: Number(v.stock),
  image: v.image || "/product-placeholder.png",
})),
      }),
    });

    if (res.ok) {
      alert("Updated Successfully ✅");
      router.push("/admin/products");
      router.refresh();
    } else {
      alert("Update Failed ❌");
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 text-black dark:text-white">

      <h1 className="text-3xl font-bold mb-6">
        Edit Product
      </h1>

      {/* Product Name */}

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Product Name"
        className="border border-gray-300 dark:border-gray-700 rounded-lg p-3 w-full mb-4 bg-white dark:bg-gray-900"
      />

      {/* Brand */}

      <input
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
        placeholder="Brand"
        className="border border-gray-300 dark:border-gray-700 rounded-lg p-3 w-full mb-4 bg-white dark:bg-gray-900"
      />

      {/* Description */}

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="border border-gray-300 dark:border-gray-700 rounded-lg p-3 w-full mb-6 bg-white dark:bg-gray-900"
      />

      {/* Featured + Status */}

      <div className="grid md:grid-cols-2 gap-4 mb-6">

        <label className="flex items-center gap-3 border border-gray-300 dark:border-gray-700 rounded-lg p-3">

          <input
            type="checkbox"
            checked={featured}
            onChange={(e) =>
              setFeatured(e.target.checked)
            }
          />

          Featured Product

        </label>

        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
          className="border border-gray-300 dark:border-gray-700 rounded-lg p-3 bg-white dark:bg-gray-900"
        >
          <option value="ACTIVE">
            ACTIVE
          </option>

          <option value="INACTIVE">
            INACTIVE
          </option>

          <option value="OUT_OF_STOCK">
            OUT OF STOCK
          </option>

        </select>

      </div>

      {/* Category */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

        {/* Category */}

        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setSubCategory("");
            setSubSubCategory("");
          }}
          className="border border-gray-300 dark:border-gray-700 rounded-lg p-3 bg-white dark:bg-gray-900"
        >
          <option value="">Select Category</option>

          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* Subcategory */}

        <select
          value={subCategory}
          onChange={(e) => {
            setSubCategory(e.target.value);
            setSubSubCategory("");
          }}
          className="border border-gray-300 dark:border-gray-700 rounded-lg p-3 bg-white dark:bg-gray-900"
        >
          <option value="">Select Subcategory</option>

          {selectedCategory?.sub.map((sub) => (
            <option key={sub.id} value={sub.name}>
              {sub.name}
            </option>
          ))}
        </select>

        {/* Child Category */}

        <select
          value={subSubCategory}
          onChange={(e) =>
            setSubSubCategory(e.target.value)
          }
          className="border border-gray-300 dark:border-gray-700 rounded-lg p-3 bg-white dark:bg-gray-900"
        >
          <option value="">Select Child Category</option>

          {selectedSubcategory?.sub.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

      </div>

      {/* Product Image */}

      <label className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition mb-6">

        <UploadCloud
          size={40}
          className="mb-3 text-gray-500"
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
          alt={name}
          className="w-40 h-40 object-cover rounded-xl border mb-8"
        />
      )}

      {/* Variants */}

      <h2 className="text-xl font-semibold mb-4">
        Product Variants
      </h2>
      {variants.map((v, i) => (
        <div
          key={i}
          className="border border-gray-300 dark:border-gray-700 rounded-xl p-5 mb-5 bg-white dark:bg-gray-900"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <input
              value={v.variantName}
              onChange={(e) =>
                updateVariant(i, "variantName", e.target.value)
              }
              placeholder="Variant Name (Example: Black - 128GB)"
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
              placeholder="Size"
              className="border border-gray-300 dark:border-gray-700 rounded-lg p-3 bg-white dark:bg-gray-800"
            />

            <input
              type="number"
              value={v.price}
              onChange={(e) =>
                updateVariant(i, "price", e.target.value)
              }
              placeholder="Price"
              className="border border-gray-300 dark:border-gray-700 rounded-lg p-3 bg-white dark:bg-gray-800"
            />

            <input
              type="number"
              value={v.stock}
              onChange={(e) =>
                updateVariant(i, "stock", e.target.value)
              }
              placeholder="Stock"
              className="border border-gray-300 dark:border-gray-700 rounded-lg p-3 bg-white dark:bg-gray-800"
            />

          </div>

          <div className="flex justify-end mt-4">
            <button
              onClick={() => deleteVariant(i)}
              className="flex items-center gap-2 text-red-500 hover:text-red-600"
            >
              <Trash2 size={18} />
              Delete Variant
            </button>
          </div>
        </div>
      ))}

      <div className="flex gap-4 mt-6">

        <button
          onClick={addVariant}
          className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 px-5 py-3 rounded-lg"
        >
          + Add Variant
        </button>

        <button
          onClick={saveChanges}
          className="bg-black dark:bg-white text-white dark:text-black hover:opacity-90 px-6 py-3 rounded-lg"
        >
          Save Changes
        </button>

      </div>

    </div>
  );
}