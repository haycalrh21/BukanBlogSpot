/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		serverActions: {
			bodySizeLimit: "2mb",
		},
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "res.cloudinary.com",
			},
			{
				protocol: "https",
				hostname: "images.unsplash.com",
			},
		],
	},
};

export default nextConfig;
