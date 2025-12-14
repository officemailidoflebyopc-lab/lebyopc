/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				hostname: "https://static.wixstatic.com",
			},
		],
	},
	typedRoutes: false,
	output: "standalone", // <--- FORCE THIS (Removed the process.env check)
};

export default nextConfig;
