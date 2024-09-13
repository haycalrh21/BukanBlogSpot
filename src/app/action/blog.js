"use server";

import Blog from "../model/blog";
import cloudinary from "cloudinary";
import connectMongo from "../libs/mongodb";

// Konfigurasi Cloudinary
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Koneksi ke MongoDB
await connectMongo();

const base64ToBuffer = (base64Image) => {
	const matches = base64Image.match(/^data:.+\/(.+);base64,(.+)$/);
	const data = matches[2];
	return Buffer.from(data, "base64");
};

const uploadImage = async (base64Image) => {
	try {
		const result = await cloudinary.v2.uploader.upload(base64Image, {
			folder: process.env.CLOUDINARY_FOLDER,
		});
		return result.secure_url;
	} catch (error) {
		console.error("Error uploading image:", error);
		throw new Error("Image upload failed");
	}
};

export const saveBlog = async (items, user, title, slug, base64Thumbnail) => {
	// Upload thumbnail image jika ada
	let thumbnailUrl = "";
	if (base64Thumbnail) {
		try {
			thumbnailUrl = await uploadImage(
				`data:image/png;base64,${base64Thumbnail}`
			);
		} catch (error) {
			console.error("Error uploading thumbnail image:", error);
			throw new Error("Thumbnail upload failed");
		}
	}

	// Update konten blog dengan URL gambar
	const updatedItems = await Promise.all(
		items.map(async (item) => {
			if (item.content.includes("data:image")) {
				const base64Image = item.content.match(
					/data:image\/[a-zA-Z]+;base64,[^\"]+/
				)[0];
				const imageUrl = await uploadImage(base64Image);
				item.content = item.content.replace(base64Image, imageUrl);
			}
			return item;
		})
	);

	const blog = new Blog({
		title,
		slug, // Set slug di sini
		content: updatedItems,
		user: {
			email: user.username,
			_id: user._id,
		},
		imageThumbnail: thumbnailUrl, // Tambahkan thumbnail URL di sini
	});

	try {
		await blog.save();
		return { success: true };
	} catch (error) {
		console.error("Error saving blog:", error);
		throw new Error("Failed to save blog");
	}
};

// action/blog.js
export async function fetchBlogs(slug) {
	await connectMongo(); // Pastikan menggunakan fungsi yang benar untuk koneksi
	const query = slug ? { slug } : {};
	const blogs = await Blog.find(query);
	return JSON.stringify(blogs); // Return blogs as JSON string
}
