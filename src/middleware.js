import { NextResponse } from "next/server";
import { parse } from "cookie"; // Untuk parsing cookies

// Middleware function
export async function middleware(request) {
	// Parse cookies from request headers
	const cookies = parse(request.headers.get("cookie") || "");
	const token =
		cookies["next-auth.session-token"] || cookies["next-auth.session-token"];

	// Define paths to protect
	const protectedPaths = ["/login", "/register"];

	// Redirect if authenticated and trying to access protected paths
	if (token && protectedPaths.includes(request.nextUrl.pathname)) {
		return NextResponse.redirect(new URL("/", request.url)); // Redirect to home if authenticated
	}

	// Allow request to proceed
	return NextResponse.next();
}

// Configuration for matching paths
export const config = {
	matcher: ["/login", "/register"],
};
