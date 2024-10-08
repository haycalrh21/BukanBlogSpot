"use client";
import React, { useState, useEffect } from "react";
import { fetchBlogs } from "../action/blog";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import { useRouter } from "next/navigation";
import { formatDistanceToNow, parseISO } from "date-fns";
import { id } from "date-fns/locale"; // Gunakan locale Indonesia

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

  const formatRelativeDate = (dateString) => {
    const date = parseISO(dateString); // Parsing date ke format ISO
    return formatDistanceToNow(date, { addSuffix: true, locale: id }); // Menampilkan selisih waktu dalam bahasa Indonesia
  };

  return (
    <div className="mx-auto w-full max-w-screen-xl px-4 py-12 sm:px-5 sm:py-14 md:px-10 md:py-20">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">
        Latest Post
      </h1>
      <motion.div
        className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4"
        initial="hidden"
        animate="show"
        variants={containerVariants}
      >
        {loading
          ? Array.from({ length: numberOfSkeletons }).map((_, index) => (
              <motion.div
                key={index}
                className="border p-4 sm:p-5 bg-white rounded-lg border-2 border-black shadow-md hover:shadow-xs transition-all h-[320px] sm:h-[350px] flex flex-col justify-between"
                variants={itemVariants}
              >
                <div className="mb-4">
                  <Skeleton className="h-[30px] sm:h-[40px] w-[150px] sm:w-[200px] rounded-xl" />
                </div>
                <Skeleton className="h-[120px] sm:h-[150px] w-full rounded-xl mb-4" />
                <div className="flex justify-between items-center">
                  <Skeleton className="h-[20px] sm:h-[25px] w-[100px] sm:w-[120px] rounded-xl" />
                </div>
              </motion.div>
            ))
          : blogs.map((blog) => (
              <motion.div
                key={blog._id}
                className="border p-4 sm:p-5 bg-white rounded-lg border-2 border-black shadow-md hover:shadow-xs transition-all h-[320px] sm:h-[350px] flex flex-col justify-between"
                variants={itemVariants}
                onClick={() => router.push(`/blog/${blog.slug}`)}
              >
                <Link href={`/blog/${blog.slug}`} passHref>
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold mb-2 h-[40px] sm:h-[50px] overflow-hidden">
                      {blog.title}
                    </h2>

                    {blog.imageThumbnail ? (
                      <img
                        src={blog.imageThumbnail}
                        alt={blog.title}
                        className="w-full h-[120px] sm:h-[150px] object-cover rounded-xl mb-4"
                      />
                    ) : (
                      <Skeleton className="w-full h-[120px] sm:h-[150px] rounded-xl mb-4" />
                    )}
                  </div>
                  <div className="flex justify-between items-center text-sm sm:text-md text-gray-600">
                    <span className="font-semibold truncate w-[100px] sm:w-[120px]">
                      {blog.user?.username}
                    </span>
                  </div>
                  <div>
                    {/* Tampilkan tanggal dengan format relatif */}
                    <span className="text-xs sm:text-sm">
                      {formatRelativeDate(blog.date)}
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
      </motion.div>
    </div>
  );
};

export default BlogView;
