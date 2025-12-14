/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				hostname: "**",
			},
		],
	},
	typedRoutes: false,
	output: "standalone", // <--- FORCE THIS (Removed the process.env check)
};

export default nextConfig;
