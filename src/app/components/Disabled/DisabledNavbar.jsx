"use client";
import { usePathname } from "next/navigation"; // Menggunakan usePathname dari next/navigation
import { Navbar } from "../Navbar";

const disableNavbar = ["login", "register"];

export default function DisabledNavbar() {
  const pathname = usePathname(); // Mendapatkan pathname langsung

  const shouldDisableNavbar = disableNavbar.some((path) =>
    pathname.startsWith(`/${path}`)
  );

  return <>{!shouldDisableNavbar && <Navbar />}</>;
}
