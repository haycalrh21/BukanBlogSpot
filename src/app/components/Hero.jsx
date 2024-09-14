"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import Button from "./ui/Button";
import { useRouter } from "next/navigation";

export const Hero = () => {
  const router = useRouter();

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
  };
  const blogButton = () => {
    router.push("/blog");
  };

  const bikinBlog = () => {
    router.push("/blog/create");
  };
  return (
    <header>
      {/* Hero Container */}
      <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-20">
        {/* Component */}
        <div className="grid items-center justify-items-start gap-8 sm:gap-20 lg:grid-cols-2">
          {/* Hero Content */}
          <motion.div
            className="flex flex-col"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {/* Hero Title */}
            <h1 className="mb-4 text-4xl font-bold md:text-6xl">
              Temukan Blog Terbaik Tanpa Repot.
            </h1>
            <p className="mb-6 max-w-lg text-sm text-gray-500 sm:text-xl md:mb-10 lg:mb-12">
              Temukan konten terbaru dan terpopuler di blog kami. Bacalah
              artikel yang akan menginspirasi dan memberikan wawasan baru untuk
              Anda.
            </p>
            {/* Hero Button */}
            <motion.div
              className="flex items-center"
              variants={containerVariants}
              initial="hidden"
              animate="show"
              transition={{ delay: 0.5 }}
            >
              <Button label="Jelajahi Blog" onClick={blogButton} />
              <div className="ml-4">
                <butoon
                  label="Posting"
                  onClick={bikinBlog}
                  className="font-head px-8 py-3 bg-orange-400 border-2 border-black shadow-md hover:shadow-xs transition-all  cursor-pointer"
                >
                  Posting
                </butoon>
              </div>
            </motion.div>
          </motion.div>
          {/* Hero Image */}
          <motion.div
            className="inline-block h-full w-full max-w-2xl"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            <div className="flex justify-center items-center">
              <img
                src="https://images.unsplash.com/reserve/LJIZlzHgQ7WPSh5KVTCB_Typewriter.jpg?q=80&w=1896&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Gambar Hero"
                className="w-1/2 rounded-lg object-contain"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  );
};
