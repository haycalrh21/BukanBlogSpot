import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import hljs from "highlight.js";
import "highlight.js/styles/github.css"; // Import highlight.js styles

const RichTextEditor = ({ value, onChange }) => {
	const modules = {
		toolbar: {
			container: [
				[{ font: [] }],
				[{ header: "1" }, { header: "2" }],
				[{ list: "ordered" }, { list: "bullet" }],
				["bold", "italic", "underline"],
				["link", "image"],
				[{ align: [] }],
				[{ "code-block": true }], // Add code block button
				["clean"],
			],
		},
	};

	const formats = [
		"header",
		"font",
		"align",
		"bold",
		"italic",
		"underline",
		"list",
		"bullet",
		"link",
		"image",
		"code-block", // Add code block format
	];

	const handleChange = (value) => {
		// Add syntax highlighting for code blocks
		const parser = new DOMParser();
		const doc = parser.parseFromString(value, "text/html");
		doc.querySelectorAll("pre code").forEach((block) => {
			hljs.highlightBlock(block);
		});
		const highlightedHtml = doc.body.innerHTML;
		onChange(highlightedHtml);
	};

	return (
		<div>
			<ReactQuill
				value={value}
				onChange={handleChange}
				modules={modules}
				formats={formats}
			/>
		</div>
	);
};

export default RichTextEditor;
