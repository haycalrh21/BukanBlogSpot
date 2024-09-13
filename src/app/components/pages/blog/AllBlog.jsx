"use client"; // Menandakan bahwa ini adalah Client Component

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import { formatDistanceToNow, parseISO } from "date-fns";
import { id } from "date-fns/locale"; // Gunakan locale Indonesia

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

// Fungsi untuk mengonversi waktu ke format relatif (misal "1 jam yang lalu")
const formatRelativeDate = (dateString) => {
	const date = parseISO(dateString); // Parsing date ke format ISO
	return formatDistanceToNow(date, { addSuffix: true, locale: id }); // Menampilkan selisih waktu dalam bahasa Indonesia
};

export default function BlogComponents({ blogs }) {
	const [currentPage, setCurrentPage] = useState(1);
	const blogsPerPage = 8;

	// Sorting blogs berdasarkan tanggal terbaru, utamakan yang memiliki tanggal
	const sortedBlogs = blogs.sort((a, b) => {
		const dateA = new Date(a.date || 0); // Jika tidak ada date, gunakan 0 sebagai default
		const dateB = new Date(b.date || 0);
		return dateB - dateA; // Urutkan dari yang paling baru
	});

	// Hitung jumlah halaman
	const totalPages = Math.ceil(sortedBlogs.length / blogsPerPage);

	// Slice blogs sesuai dengan halaman aktif
	const currentBlogs = sortedBlogs.slice(
		(currentPage - 1) * blogsPerPage,
		currentPage * blogsPerPage
	);

	// Skeleton untuk loading state
	const numberOfSkeletons = Math.max(0, blogsPerPage - currentBlogs.length);

	// Fungsi untuk pindah halaman
	const handlePageChange = (page) => {
		if (page < 1 || page > totalPages) return;
		setCurrentPage(page);
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
					{currentBlogs.length === 0
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
						: currentBlogs.map((blog) => (
								<motion.div
									key={blog._id}
									className='border p-6 bg-white rounded-lg border-2 border-black shadow-md hover:shadow-xs transition-all h-[400px] flex flex-col justify-between'
									variants={itemVariants}
								>
									<Link href={`/blog/${blog.slug}`} passHref>
										<div className='cursor-pointer'>
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
											<div className='flex justify-between items-center text-md text-gray-600'>
												<span className='font-semibold truncate w-[150px]'>
													{blog.user?.email}
												</span>
											</div>
											<div>
												{/* Tampilkan tanggal dengan format relatif */}
												<span>{formatRelativeDate(blog.date)}</span>
											</div>
										</div>
									</Link>
								</motion.div>
						  ))}
				</motion.div>

				{/* Pagination */}
				<Pagination className={" pt-4"}>
					<PaginationContent>
						<PaginationItem>
							<PaginationPrevious
								className={"cursor-pointer"}
								disabled={currentPage === 1} // Disable jika di halaman pertama
								onClick={() => handlePageChange(currentPage - 1)}
							/>
						</PaginationItem>
						{Array.from({ length: totalPages }).map((_, index) => (
							<PaginationItem key={index}>
								<PaginationLink
									className={"cursor-pointer"}
									active={index + 1 === currentPage} // Menandai halaman aktif
									onClick={() => handlePageChange(index + 1)}
								>
									{index + 1}
								</PaginationLink>
							</PaginationItem>
						))}
						<PaginationItem>
							<PaginationNext
								className={"cursor-pointer"}
								onClick={() => handlePageChange(currentPage + 1)}
							/>
						</PaginationItem>
					</PaginationContent>
				</Pagination>
			</div>
		</section>
	);
}
