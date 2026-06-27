"use client";

import { useEffect, useState } from "react";

type Blog = {
  id: string;
  title: string;
  description: string | null;
  image: string | null;
};

export default function ManageBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  async function fetchBlogs() {
    const res = await fetch("/api/blogs");
    const data = await res.json();
    setBlogs(data);
  }

  async function handleDelete(id: string) {
    console.log("Deleting ID:", id);

    if (!id) {
      alert("Invalid ID ❌");
      return;
    }

    const confirmDelete = confirm("Delete this blog?");
    if (!confirmDelete) return;

    const res = await fetch(`/api/admin/blogs/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (res.ok) {
      alert("Deleted ✅");
      fetchBlogs();
    } else {
      console.error(data);
      alert(data.error || "Delete failed ❌");
    }
  }

  return (
    <div className="p-10 max-w-5xl mx-auto text-black dark:text-white">
      <h1 className="text-2xl font-bold mb-8">Manage Blogs</h1>

      {blogs.length === 0 && (
        <p className="text-gray-500 dark:text-gray-400">No blogs available</p>
      )}

      {blogs.map((blog) => (
        <div
          key={blog.id}
          className="border border-gray-200 dark:border-gray-700 rounded-xl p-5 mb-6 shadow-sm bg-white dark:bg-gray-900"
        >
          {/*  FIXED IMAGE (NO CUT + CENTERED) */}
          <div className="w-full flex justify-center items-center bg-gray-100 dark:bg-gray-800 rounded mb-4 p-4">
            <img
              src={blog.image || "/spices.png"}
              alt={blog.title}
              className="max-h-64 w-auto object-contain rounded"
            />
          </div>

          <h2 className="text-lg font-semibold">{blog.title}</h2>

          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {blog.description ?? "No description"}
          </p>

          <button
            onClick={() => handleDelete(blog.id)}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}