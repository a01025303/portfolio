const isProd = process.env.NODE_ENV === "production";
/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: isProd ? "/portfolio":"",
    dev: "next dev",
    build: "next build",
    export: "next export",
    start: "next start",
    output: "export", 
    reactStrictMode: true,
    images: {
        unoptimized: true,
    }
};

export default nextConfig;
