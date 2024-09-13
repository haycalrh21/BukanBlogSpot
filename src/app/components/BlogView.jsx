"use client";
import React, { useState, useEffect } from "react";
import { fetchBlogs } from "../action/blog";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import { useRouter } from "next/navigation";

const BlogView = () => {
	const [blogs, setBlogs] = useState([]);
	const [loading, setLoading] = useState(true);
	const [totalBlogs, setTotalBlogs] = useState(0); // Untuk menyimpan total data blog
	const router = useRouter();
	const controls = useAnimation();

	useEffect(() => {
		async function fetchBlog() {
			try {
				// Ambil data dari API
				const response = await fetchBlogs();
				const data = JSON.parse(response);

				// Hitung total blog
				const total = data.length;
				setTotalBlogs(total);

				// Urutkan blog berdasarkan tanggal terbaru dan batasi hingga 8 blog
				const sortedBlogs = data
					.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
					.slice(0, 8);

				setBlogs(sortedBlogs);
			} catch (error) {
				console.error("Error fetching blogs:", error);
			} finally {
				setLoading(false);
				controls.start({ opacity: 1 }); // Menampilkan animasi saat data selesai dimuat
			}
		}
		fetchBlog();
	}, []);

	// Jumlah skeleton card yang ditampilkan
	const numberOfSkeletons = Math.max(0, 8 - blogs.length);

	// Variants untuk animasi skeleton dan blog
	const containerVariants = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: 0.3,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, scale: 0.8 },
		show: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
	};

	return (
		<section className='relative'>
			<div className='mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-20'>
				<h1 className='text-3xl font-bold mb-8 text-center'>Latest Post</h1>
				<motion.div
					className='grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
					initial='hidden'
					animate='show'
					variants={containerVariants}
				>
					{loading
						? Array.from({ length: numberOfSkeletons }).map((_, index) => (
								<motion.div
									key={index}
									className='border p-6 bg-white rounded-lg border-2 border-black shadow-md hover:shadow-xs transition-all h-[400px] flex flex-col justify-between'
									variants={itemVariants}
								>
									<div className='mb-4'>
										<Skeleton className='h-[50px] w-[250px] rounded-xl' />
									</div>
									<Skeleton className='h-[200px] w-full rounded-xl mb-4' />
									<div className='flex justify-between items-center'>
										<Skeleton className='h-[30px] w-[150px] rounded-xl' />
									</div>
								</motion.div>
						  ))
						: blogs.map((blog) => (
								<motion.div
									key={blog._id}
									className='border p-6 bg-white rounded-lg border-2 border-black shadow-md hover:shadow-xs transition-all h-[400px] flex flex-col justify-between'
									variants={itemVariants}
									onClick={() => router.push(`/blog/${blog.slug}`)}
								>
									<Link href={`/blog/${blog.slug}`} passHref>
										<div>
											<h2 className='text-xl font-bold mb-2 h-[50px] overflow-hidden'>
												{blog.title}
											</h2>

											{blog.imageThumbnail ? (
												<img
													src={blog.imageThumbnail}
													alt={blog.title}
													className='w-full h-[200px] object-cover rounded-xl mb-4'
												/>
											) : (
												<Skeleton className='w-full h-[200px] rounded-xl mb-4' />
											)}
										</div>
										<div className='flex justify-between items-center text-md text-gray-600'>
											<span className='font-semibold truncate w-[150px]'>
												{blog.user?.email}
											</span>
										</div>
									</Link>
								</motion.div>
						  ))}
				</motion.div>
			</div>
		</section>
	);
};

export default BlogView;
