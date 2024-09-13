"use client";
import { useState } from "react";
import { registerUserAction } from "@/app/action/user";

export default function RegisterPage() {
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	async function handleSubmit(e) {
		e.preventDefault();
		const formData = new FormData(e.target);

		try {
			setError(""); // Reset error
			setSuccess(""); // Reset success message
			const result = await registerUserAction(formData); // Call server action
			setSuccess(JSON.parse(result).message); // Show success message
		} catch (err) {
			setError(err.message); // Show error if registration fails
		}
	}

	return (
		<div className='min-h-screen flex flex-col items-center justify-center bg-gray-50'>
			<div className='w-full max-w-md bg-white p-8 rounded-lg shadow-md'>
				<h1 className='font-head text-4xl'>Register</h1>

				{/* Form untuk registrasi */}
				<form onSubmit={handleSubmit} className='space-y-6'>
					<div>
						<label htmlFor='username' className='block text-gray-700'>
							Username
						</label>
						<input
							type='text'
							name='username'
							id='username'
							placeholder='Username'
							className='w-full border border-gray-300 p-3 rounded-md'
							required
						/>
					</div>
					<div>
						<label htmlFor='email' className='block text-gray-700'>
							Email
						</label>
						<input
							type='email'
							name='email'
							id='email'
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
							name='password'
							id='password'
							placeholder='Password'
							className='w-full border border-gray-300 p-3 rounded-md'
							required
						/>
					</div>
					<button
						type='submit'
						className='w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700'
					>
						Register
					</button>
				</form>

				{/* Menampilkan pesan error atau success */}
				{error && <p className='text-red-500 mt-4 text-center'>{error}</p>}
				{success && (
					<p className='text-green-500 mt-4 text-center'>{success}</p>
				)}
			</div>
		</div>
	);
}
