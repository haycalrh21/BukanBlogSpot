"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { formatDistanceToNow, parseISO } from "date-fns";
import { id } from "date-fns/locale";

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
  const date = parseISO(dateString);
  return formatDistanceToNow(date, { addSuffix: true, locale: id });
};

export default function BlogComponents({ blogs }) {
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 8;

  const sortedBlogs = blogs.sort((a, b) => {
    const dateA = new Date(a.date || 0);
    const dateB = new Date(b.date || 0);
    return dateB - dateA;
  });

  const totalPages = Math.ceil(sortedBlogs.length / blogsPerPage);
  const currentBlogs = sortedBlogs.slice(
    (currentPage - 1) * blogsPerPage,
    currentPage * blogsPerPage
  );

  const numberOfSkeletons = Math.max(0, blogsPerPage - currentBlogs.length);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="mx-auto w-full max-w-screen-xl px-4 py-12 sm:px-5 sm:py-14 md:px-10 md:py-20">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">
        Latest Post
      </h1>
      <motion.div
        className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        initial="hidden"
        animate="show"
        variants={containerVariants}
      >
        {currentBlogs.length === 0
          ? Array.from({ length: numberOfSkeletons }).map((_, index) => (
              <motion.div
                key={index}
                className="border p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all h-[350px] flex flex-col justify-between"
                variants={itemVariants}
              >
                <Skeleton className="h-[30px] w-[150px] rounded-xl mb-4" />
                <Skeleton className="h-[150px] w-full rounded-xl mb-4" />
                <Skeleton className="h-[20px] w-[100px] rounded-xl" />
              </motion.div>
            ))
          : currentBlogs.map((blog) => (
              <motion.div
                key={blog._id}
                className="border p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all h-[350px] flex flex-col justify-between"
                variants={itemVariants}
              >
                <Link href={`/blog/${blog.slug}`} passHref>
                  <div className="cursor-pointer">
                    <h2 className="text-lg sm:text-xl font-bold mb-2 h-[50px] overflow-hidden">
                      {blog.title}
                    </h2>
                    {blog.imageThumbnail ? (
                      <img
                        src={blog.imageThumbnail}
                        alt={blog.title}
                        className="w-full h-[150px] object-cover rounded-xl mb-4"
                      />
                    ) : (
                      <Skeleton className="w-full h-[150px] rounded-xl mb-4" />
                    )}
                    <div className="text-sm text-gray-600">
                      <span className="font-semibold truncate">
                        {blog.user?.username}
                      </span>
                    </div>
                    <div>
                      <span className="text-xs">
                        {formatRelativeDate(blog.date)}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
      </motion.div>

      <Pagination className="pt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className="cursor-pointer"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            />
          </PaginationItem>
          {Array.from({ length: totalPages }).map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                className="cursor-pointer"
                active={index + 1 === currentPage}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              className="cursor-pointer"
              onClick={() => handlePageChange(currentPage + 1)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
