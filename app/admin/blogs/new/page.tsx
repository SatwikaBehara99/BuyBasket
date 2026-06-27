"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewBlogPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await fetch("/api/blogs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description, image }),
    });

    if (res.ok) {
      router.push("/admin/blogs");
    } else {
      alert("Error creating blog");
    }
  };

  //  FIXED IMAGE UPLOAD (UploadThing)
  const handleImageUpload = async (file: File) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("files", file);

    const res = await fetch("/api/uploadthing?slug=variantImage", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data?.[0]?.url) {
      setImage(data[0].url);
    } else {
      alert("Image upload failed");
    }

    setLoading(false);
  };

  return (
    <div className="p-10 max-w-2xl mx-auto text-black dark:text-white">
      <h1 className="text-2xl font-bold mb-6">Add Blog</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          placeholder="Title"
          className="border border-gray-300 dark:border-gray-700 p-2 w-full rounded bg-white dark:bg-gray-900 text-black dark:text-white"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Description"
          className="border border-gray-300 dark:border-gray-700 p-2 w-full rounded bg-white dark:bg-gray-900 text-black dark:text-white"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="border border-gray-300 dark:border-gray-700 p-4 rounded bg-white dark:bg-gray-900">
          <input
            type="file"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                handleImageUpload(e.target.files[0]);
              }
            }}
          />
        </div>

        {loading && <p className="text-gray-600 dark:text-gray-300">Uploading...</p>}

        {image && (
          <img
            src={image}
            className="w-full h-48 object-cover rounded"
          />
        )}

        <button className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-2 rounded-lg shadow hover:shadow-lg transition text-center">
          Create Blog
        </button>

      </form>
    </div>
  );
}