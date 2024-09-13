"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import slugify from "slugify"; // Tambahkan ini
import DraggableList from "@/app/components/DraggableList";
import { useSession } from "next-auth/react";
import { saveBlog } from "@/app/action/blog";

// Load RichTextEditor secara dinamis untuk SSR
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
	const [title, setTitle] = useState(""); // State untuk judul
	const [imageThumbnail, setImageThumbnail] = useState(null); // State untuk thumbnail

	// Form submission untuk tambah item
	const handleFormSubmit = (event) => {
		event.preventDefault();
		const newItem = {
			id: `item-${items.length + 1}`,
			content: editorValue,
		};
		setItems([...items, newItem]);
		setEditorValue(""); // Clear editor setelah submit
	};

	// Simpan blog
	const handleSaveData = async () => {
		if (!session) {
			alert("Please log in to save data.");
			return;
		}

		if (items.length === 0 || !title || !imageThumbnail) {
			alert("Title, content, and imageThumbnail are required.");
			return;
		}

		const generatedSlug = slugify(title, { lower: true });

		try {
			// Remove data URL prefix if present
			const base64Thumbnail = imageThumbnail.includes("data:image")
				? imageThumbnail.split(",")[1]
				: imageThumbnail;

			const result = await saveBlog(
				items,
				session.user,
				title,
				generatedSlug,
				base64Thumbnail
			);
			if (result.success) {
				alert("Data saved successfully.");
			} else {
				alert("Failed to save data: " + result.error);
			}
		} catch (error) {
			alert("Failed to save data: " + error.message);
		}
	};

	return (
		<div className='container mx-auto p-6 max-w-5xl'>
			<form onSubmit={handleFormSubmit} className='space-y-6'>
				{/* RichTextEditor */}
				<RichTextEditor value={editorValue} onChange={setEditorValue} />
				{/* Tombol Submit */}
				<button
					type='submit'
					className='w-full bg-blue-500 text-white py-3 rounded-lg shadow hover:bg-blue-600 transition-all'
				>
					Add Item
				</button>
			</form>

			{/* Draggable List */}
			<div className='bg-white shadow-lg rounded-lg p-6 mt-8'>
				<h2 className='text-2xl font-bold mb-4 text-gray-700'>
					Draggable List
				</h2>
				<DraggableList
					items={items}
					setItems={setItems}
					title={title} // Pass title to DraggableList
					setTitle={setTitle} // Pass setTitle to DraggableList
					setImageThumbnail={setImageThumbnail} // Pass setImageThumbnail to DraggableList
				/>
			</div>

			{/* Tombol Save Data */}
			<div className='text-center mt-6'>
				<button
					onClick={handleSaveData}
					className='w-full bg-green-500 text-white py-3 rounded-lg shadow hover:bg-green-600 transition-all'
				>
					Save Data
				</button>
			</div>
		</div>
	);
};

export default FormPage;
