const isProd = process.env.NODE_ENV === "production";
/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: isProd ? "/portfolio":"",
    output: "export", 
    reactStrictMode: true,
    images: {
        unoptimized: true,
    },
    env: {
        NEXT_PUBLIC_BASE_PATH: isProd ? "/portfolio" : "",
    },
};

export default nextConfig;
