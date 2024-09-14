"use client"; // Menandakan bahwa ini adalah komponen sisi klien

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const ClientComponent = ({ initialBlogs }) => {
  const { status } = useSession();
  const [blogs, setBlogs] = useState(initialBlogs);

  useEffect(() => {
    if (status === "authenticated") {
      // Data sudah didapatkan dari Server Component, tidak perlu fetch lagi
    }
  }, [status]);

  if (status === "loading") {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (!blogs || !Array.isArray(blogs)) {
    return (
      <div className="text-center text-red-500">
        Please log in to see your blogs.
      </div>
    );
  }

  return (
    <div className="p-4">
      {blogs.length === 0 ? (
        <p className="text-center text-gray-500">No blogs found</p>
      ) : (
        <ul className="list-disc list-inside space-y-2">
          {blogs.map((blog) => (
            <li
              key={blog._id}
              className="border p-2 rounded shadow-sm hover:bg-gray-100"
            >
              <h2 className="text-xl font-semibold">{blog.title}</h2>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ClientComponent;
