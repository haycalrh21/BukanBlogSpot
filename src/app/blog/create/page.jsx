"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import slugify from "slugify";
import DraggableList from "@/app/components/DraggableList";
import { useSession } from "next-auth/react";
import { saveBlog } from "@/app/action/blog";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const RichTextEditor = dynamic(
  () => import("@/app/components/RichTextEditor"),
  {
    ssr: false,
  }
);

const FormPage = () => {
  const { data: session } = useSession();
  const [editorValue, setEditorValue] = useState("");
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState("");
  const [imageThumbnail, setImageThumbnail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { toast } = useToast();

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!session) {
      router.push("/login");
      return;
    }

    const newItem = {
      id: `item-${items.length + 1}`,
      content: editorValue,
    };
    setItems([...items, newItem]);
    setEditorValue(""); // Clear editor after submit
  };

  const handleSaveData = async () => {
    if (!session?.user?.username) {
      toast({
        title: "Error :(",
        description: "Login dulu ya",
      });
      router.push("/login");
      return;
    }

    if (items.length === 0 || !title || !imageThumbnail) {
      toast({
        title: "Fieldnya ada yang masih kosong",
        description: "Coba diisi lagi ya",
      });
      return; // Prevent saving if fields are empty
    }

    setLoading(true);
    setError("");

    const generatedSlug = slugify(title, { lower: true });
    const base64Thumbnail = imageThumbnail.includes("data:image")
      ? imageThumbnail.split(",")[1]
      : imageThumbnail;

    try {
      const result = await saveBlog(
        items,
        session.user,
        title,
        generatedSlug,
        base64Thumbnail
      );

      if (result.success) {
        console.log("Blog saved successfully:", result.data);
        toast({
          title: "Berhasil :)",
          description: "Hore beres :D",
        });
        router.push("/");
      } else {
        toast({
          title: "Error",
          description: "Coba dibenerin lagi ya :)",
        });
      }
    } catch (error) {
      console.error("Error saving blog:", error);
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat menyimpan blog",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-5xl">
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleFormSubmit} className="space-y-6">
        <RichTextEditor value={editorValue} onChange={setEditorValue} />
        <button
          type="submit"
          className="w-full font-head px-8 py-3 bg-blue-400 border-2 border-black shadow-md hover:shadow-xs transition-all"
        >
          Add Item
        </button>
      </form>
      <div className="bg-white shadow-lg rounded-lg p-6 mt-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">
          Draggable List
        </h2>
        <DraggableList
          items={items}
          setItems={setItems}
          title={title}
          setTitle={setTitle}
          setImageThumbnail={setImageThumbnail}
        />
      </div>
      <div className="text-center mt-6">
        <motion.button
          onClick={handleSaveData}
          className="w-full font-head px-8 py-3 bg-primary-400 border-2 border-black shadow-md hover:shadow-xs transition-all flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center">
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 12a8 8 0 01.707-3.293l1.416 1.415A6 6 0 0012 6v6l6 6h-6V9a6 6 0 01-2.707-1.707L5.707 6.707A8 8 0 014 12z"
                />
              </svg>
              <span className="ml-2">Saving...</span>
            </div>
          ) : (
            "Save Data"
          )}
        </motion.button>
      </div>
    </div>
  );
};

export default FormPage;
