import { NextResponse } from "next/server";
import { parse } from "cookie";

// Middleware function
export async function middleware(request) {
  // Parse cookies from request headers
  const cookies = parse(request.headers.get("cookie") || "");
  const token = cookies["next-auth.session-token"];

  // Define paths to protect
  const protectedPaths = ["/dashboard"];

  // Check if user is authenticated
  const isAuthenticated = Boolean(token);

  // Redirect unauthenticated users from protected paths
  if (!isAuthenticated && protectedPaths.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/login", request.url)); // Redirect to login if not authenticated
  }

  // Redirect authenticated users from login and register pages
  if (
    isAuthenticated &&
    ["/login", "/register"].includes(request.nextUrl.pathname)
  ) {
    return NextResponse.redirect(new URL("/", request.url)); // Redirect to home if authenticated
  }

  // Allow request to proceed
  return NextResponse.next();
}

// Configuration for matching paths
export const config = {
  matcher: ["/login", "/register", "/dashboard"],
};
