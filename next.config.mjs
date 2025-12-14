/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "static.wixstatic.com",
				port: "",
				pathname: "/media/**",
			},
		],
	},
	typedRoutes: false,
	output: "standalone", // <--- FORCE THIS (Removed the process.env check)
};

export default nextConfig;
