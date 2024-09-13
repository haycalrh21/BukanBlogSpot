"use client";

import { useSession } from "next-auth/react";
import { Hero } from "./components/Hero";
import BlogView from "./components/BlogView"; // Pastikan ini adalah default import
import Button from "./components/ui/Button";

export default function Home() {
	const { data: session, status } = useSession();

	return (
		<div className='min-h-screen flex flex-col items-center justify-center'>
			<Hero />

			<BlogView />
		</div>
	);
}
