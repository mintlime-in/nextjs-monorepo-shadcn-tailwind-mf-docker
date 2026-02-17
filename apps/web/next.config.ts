/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    //transpilePackages: ["@repo/ui"], // DONT DELETE THIS 
    async rewrites() {
        return [
            {
                source: '/docs/:path*',
                destination: 'http://localhost:3001/docs/:path*'
            }
        ];
    }
};

export default nextConfig;
