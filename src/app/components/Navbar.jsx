"use client";
import { signOut, useSession } from "next-auth/react";
import React, { useState } from "react";
import { motion, useAnimation } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [menuOne, setMenuOne] = useState(false);
	const { data: session, status } = useSession();
	const user = session?.user;
	const controls = useAnimation();

	const toggleMenu = () => {
		setIsOpen(!isOpen);
		controls.start({ opacity: isOpen ? 0 : 1, y: isOpen ? -20 : 0 });
	};

	const toggleSubMenu = () => {
		setMenuOne(!menuOne);
	};

	return (
		<section>
			<nav className='bg-gray-100 mx-auto h-auto w-full max-w-screen-2xl lg:relative lg:top-0'>
				<div className='flex flex-col px-6 py-6 lg:flex-row lg:items-center lg:justify-between lg:px-10 lg:py-4 xl:px-20'>
					<Link href='/' className='flex items-center'>
						<Image src='/images/logo.png' alt='Logo' width={100} height={100} />
						<motion.p
							className='text-md font-bold'
							initial={{ scale: 1 }}
							whileHover={{
								scale: 1.1,
								rotate: 5,
								transition: {
									duration: 0.5,
									repeat: Infinity,
									repeatType: "reverse",
								},
							}}
						>
							Bukan BlogSpot!
						</motion.p>
					</Link>
					<div
						className={`mt-14 flex flex-col space-y-8 lg:mt-0 lg:flex lg:flex-row lg:space-x-1 lg:space-y-0 ${
							isOpen ? "" : "hidden"
						}`}
					>
						{/* tempat taro yg ke komen */}
						<Link
							href='/blog'
							className='font-inter rounded-lg lg:px-6 lg:py-4 lg:hover:text-gray-800'
						>
							Blog
						</Link>
						<Link
							href='/about'
							className='font-inter rounded-lg lg:px-6 lg:py-4 lg:hover:text-gray-800'
						>
							Tentang
						</Link>
						<Link
							href='#'
							className='font-inter rounded-lg lg:px-6 lg:py-4 lg:hover:text-gray-800'
						>
							FAQ
						</Link>
					</div>
					<div
						className={`flex flex-col space-y-8 lg:flex lg:flex-row lg:space-x-3 lg:space-y-0 ${
							isOpen ? "" : "hidden"
						}`}
					>
						{session ? (
							<>
								<p className='font-inter rounded-lg px-6 py-4 text-center hover:text-gray-800 transition-colors'>
									{user?.email}
								</p>
								<button
									onClick={() => signOut()}
									style={{ backgroundColor: "#FDFA99" }}
									className='px-8 py-3 -2 border-black shadow-md hover:shadow-xs transition-all'
								>
									Keluar
								</button>
							</>
						) : (
							<>
								<Link
									href='/register'
									className='px-8 py-3 bg-black border-2 border-slate-700 text-white shadow-md hover:shadow-xs transition-all'
								>
									Daftar
								</Link>
								<Link
									href='/login'
									style={{ backgroundColor: "#FDFA99" }}
									className='px-8 py-3 -2 border-black shadow-md hover:shadow-xs transition-all'
								>
									Masuk
								</Link>
							</>
						)}
					</div>

					<button className='absolute right-5 lg:hidden' onClick={toggleMenu}>
						<svg
							width='24'
							height='24'
							viewBox='0 0 24 24'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M3.75 12H20.25'
								stroke='#160042'
								strokeWidth='2'
								strokeLinecap='round'
							/>
							<path
								d='M3.75 6H20.25'
								stroke='#160042'
								strokeWidth='2'
								strokeLinecap='round'
							/>
							<path
								d='M3.75 18H20.25'
								stroke='#160042'
								strokeWidth='2'
								strokeLinecap='round'
							/>
						</svg>
					</button>
				</div>
			</nav>
		</section>
	);
};

// <div className='relative flex flex-col'>
// 							<button
// 								onClick={toggleSubMenu}
// 								className={`flex flex-row rounded-lg lg:px-6 lg:py-4 lg:hover:text-gray-800 ${
// 									menuOne
// 										? "text-gray-800 lg:border lg:border-gray-600 lg:bg-gray-50"
// 										: "text-black lg:border lg:border-white"
// 								}`}
// 							>
// 								Komponen
// 								<svg
// 									className={`w-6 h-6 fill-current transition-transform duration-300 ${
// 										menuOne ? "rotate-180" : "rotate-0"
// 									}`}
// 									viewBox='0 0 24 24'
// 								>
// 									<path d='M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z'></path>
// 								</svg>
// 							</button>
// 							{menuOne && (
// 								<motion.div
// 									className='z-50 flex w-full flex-col rounded-lg px-5 lg:absolute lg:top-20 lg:w-96 bg-gray-100'
// 									animate={controls}
// 								>
// 									{/* ITEM */}
// 									<a
// 										className='flex items-center gap-5 grow rounded-lg px-5 py-5 xl:px-8'
// 										href='#'
// 									>
// 										{/* ICON */}
// 										<div className='relative'>
// 											<svg
// 												width='40'
// 												height='40'
// 												viewBox='0 0 40 40'
// 												fill='none'
// 												xmlns='http://www.w3.org/2000/svg'
// 											>
// 												<rect width='40' height='40' fill='#C4C4C4' />
// 												<path
// 													d='M18.4688 18.6875C18.8312 18.6875 19.125 18.3937 19.125 18.0312C19.125 17.6688 18.8312 17.375 18.4688 17.375C18.1063 17.375 17.8125 17.6688 17.8125 18.0312C17.8125 18.3937 18.1063 18.6875 18.4688 18.6875Z'
// 													fill='black'
// 												/>
// 											</svg>
// 										</div>
// 										{/* TEXT */}
// 										<div>
// 											<h2 className='font-inter mb-1 mt-5 text-lg font-medium text-black'>
// 												Analitik
// 											</h2>
// 											<p className='font-inter max-w-64 text-sm text-gray-500 lg:max-w-sm'>
// 												Memahami dari mana lalu lintas Anda berasal
// 											</p>
// 										</div>
// 									</a>
// 									{/* ITEM */}
// 									<a
// 										className='flex grow rounded-lg px-5 items-center gap-5 py-5 xl:px-8'
// 										href='#'
// 									>
// 										{/* ICON */}
// 										<div className='relative'>
// 											<svg
// 												width='40'
// 												height='40'
// 												viewBox='0 0 40 40'
// 												fill='none'
// 												xmlns='http://www.w3.org/2000/svg'
// 											>
// 												<rect width='40' height='40' fill='#C4C4C4' />
// 											</svg>
// 										</div>
// 										{/* TEXT */}
// 										<div>
// 											<h2 className='font-inter mb-1 mt-5 text-lg font-medium text-black'>
// 												Engagement
// 											</h2>
// 											<p className='font-inter max-w-64 text-sm text-gray-500 lg:max-w-sm'>
// 												Bicara langsung kepada pelanggan Anda dengan cara yang
// 												lebih berarti
// 											</p>
// 										</div>
// 									</a>
// 									{/* ITEM */}
// 									<a
// 										className='flex grow rounded-lg px-5 py-5 items-center gap-5 xl:px-8'
// 										href='#'
// 									>
// 										{/* ICON */}
// 										<div className='relative'>
// 											<svg
// 												width='40'
// 												height='40'
// 												viewBox='0 0 40 40'
// 												fill='none'
// 												xmlns='http://www.w3.org/2000/svg'
// 											>
// 												<rect width='40' height='40' fill='#C4C4C4' />
// 											</svg>
// 										</div>
// 										{/* TEXT */}
// 										<div>
// 											<h2 className='font-inter text-lg mb-1 mt-5 text-lg font-medium text-black'>
// 												Automasi
// 											</h2>
// 											<p className='font-inter max-w-64 text-sm text-gray-500 lg:max-w-sm'>
// 												Membangun funnel strategis yang akan mengarahkan
// 												pelanggan Anda untuk melakukan konversi
// 											</p>
// 										</div>
// 									</a>
// 								</motion.div>
// 							)}
// 						</div>
