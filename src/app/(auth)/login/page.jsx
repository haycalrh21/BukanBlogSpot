"use client";

import { signIn, useSession } from "next-auth/react";

import { notFound, useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
	const { data: session, status } = useSession();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const router = useRouter();
	// console.log(session);
	if (status === "authenticated") {
		router.replace("/"); // Ganti URL tanpa menambahkannya ke history
		return null; // Jangan render apapun jika sudah terautentikasi
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");

		// Panggil NextAuth signIn function
		const result = await signIn("credentials", {
			email,
			password,
			redirect: false, // Jangan redirect otomatis
		});

		if (result.error) {
			setError(result.error); // Tampilkan pesan error jika ada
		} else {
			// Redirect ke halaman setelah login sukses (misalnya home page)
			window.location.href = "/";
		}
	};

	return (
		<div className='min-h-screen flex flex-col items-center justify-center bg-gray-50'>
			<div className='w-full max-w-md bg-white p-8 rounded-lg shadow-md'>
				<h1 className='font-head text-4xl'>Login</h1>
				<form onSubmit={handleSubmit} className='space-y-6'>
					<div>
						<label htmlFor='email' className='block text-gray-700'>
							Email
						</label>
						<input
							type='email'
							id='email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder='Email'
							className='w-full border border-gray-300 p-3 rounded-md'
							required
						/>
					</div>
					<div>
						<label htmlFor='password' className='block text-gray-700'>
							Password
						</label>
						<input
							type='password'
							id='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder='Password'
							className='w-full border border-gray-300 p-3 rounded-md'
							required
						/>
					</div>
					<button
						type='submit'
						className='w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700'
					>
						Login
					</button>
				</form>
				{error && <p className='text-red-500 mt-4 text-center'>{error}</p>}
			</div>
		</div>
	);
}
