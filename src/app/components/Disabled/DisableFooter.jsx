"use client";
import { usePathname } from "next/navigation";
import { Footer } from "../Footer";

export default function DisabledFooter() {
  const pathname = usePathname(); // Mendapatkan pathname langsung

  // Daftar halaman yang tidak menampilkan footer
  const disableFooterPaths = ["login", "register"];

  // Mengekstrak slug dari pathname jika ada
  const pathnameParts = pathname.split("/");
  const currentSlug = pathnameParts[2]; // Misalnya, /blog/slug

  // Menentukan apakah harus menampilkan footer
  const shouldDisableFooter =
    disableFooterPaths.some((path) => pathname.startsWith(`/${path}`)) ||
    (pathnameParts[1] === "blog" && currentSlug);

  return <>{!shouldDisableFooter && <Footer />}</>;
}
