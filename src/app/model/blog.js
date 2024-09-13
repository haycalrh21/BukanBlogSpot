import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	slug: {
		type: String,
		required: true,
	},
	content: {
		type: Array,
		required: true,
	},
	user: {
		type: {
			username: String,
			_id: mongoose.Schema.Types.ObjectId,
		},
		required: true,
	},
	imageThumbnail: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now, // Tanggal akan otomatis diset ke saat ini
		required: true,
	},
});

const Blog = mongoose.models.Blog || mongoose.model("Blog", BlogSchema);

export default Blog;
