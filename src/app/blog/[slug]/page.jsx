import React from "react";
import Image from "next/image";
import Head from "next/head";
import { fetchBlogs } from "@/app/action/blog";

const BlogPage = async ({ params }) => {
	const { slug } = params;
	let blog;

	try {
		const response = await fetchBlogs(slug);
		const data = JSON.parse(response);
		blog = data[0];
	} catch (error) {
		return <div>Error loading blog</div>;
	}

	const copyToClipboard = (text) => {
		navigator.clipboard.writeText(text).then(() => {
			alert("Copied to clipboard!");
		});
	};

	const contentHtml = blog.content?.map((item) => {
		const preContent = item.content;

		// Extract code from <pre> tags and add Copy button
		const styledContent = preContent.replace(
			/<pre class="ql-syntax" spellcheck="false">([\s\S]*?)<\/pre>/g,
			`<div style="position: relative; margin-bottom: 24px;">
					<button style="position: absolute; top: 10px; right: 10px; background-color: #333; color: white; border: none; border-radius: 4px; padding: 5px 10px; cursor: pointer; font-size: 14px;" onclick="copyCode(this)">
						Copy
					</button>
					<pre style="background-color: #000000; color: white; border-radius: 8px; padding: 16px; font-family: monospace; font-size: 16px; overflow-x: auto;">$1</pre>
				</div>`
		);

		return (
			<div
				id={item.id}
				key={item.id}
				dangerouslySetInnerHTML={{ __html: styledContent }}
			/>
		);
	});

	return (
		<div style={{ maxWidth: "1200px", margin: "0 auto", padding: "24px" }}>
			<div style={{ marginBottom: "24px" }}>
				<p style={{ fontSize: "14px", color: "#6b7280" }}>
					Posted by: {blog.user.email}
				</p>
			</div>
			<h1 className='text-3xl font-bold mb-4'>{blog.title}</h1>
			<div style={{ marginBottom: "24px" }}>
				<div className='flex justify-center'>
					<Image
						src={blog.imageThumbnail}
						className='rounded-md border-black border-2'
						alt={blog.title}
						width={500}
						height={300}
					/>
				</div>
			</div>
			<div style={{ fontSize: "18px" }}>{contentHtml}</div>
			<script
				dangerouslySetInnerHTML={{
					__html: `
					function copyCode(button) {
						const pre = button.nextElementSibling;
						const text = pre.innerText;
						navigator.clipboard.writeText(text).then(() => {
							alert('Copied to clipboard!');
						});
					}
				`,
				}}
			/>
		</div>
	);
};

export default BlogPage;
