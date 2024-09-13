import Link from "next/link";

export default function NotFound() {
	return (
		<div className=' flex flex-col items-center justify-center '>
			ini bukan halaman kamu
			<Link
				href='/'
				className='px-8 py-3 bg-primary-400 border-2 border-black shadow-md hover:shadow-xs transition-all'
			>
				Go Home
			</Link>
		</div>
	);
}
