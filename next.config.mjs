/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**",
			},
			{
				protocol: "https",
				hostname: "pub-0d333e0e8633492abb6d0bbfcfd8a6cd.r2.dev", // Your new R2 domain
			},
		],
	},
	typedRoutes: false,
	output: "standalone", // <--- FORCE THIS (Removed the process.env check)
};

export default nextConfig;
