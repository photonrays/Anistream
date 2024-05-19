/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        ANISTREAM_API_URL: process.env.ANISTREAM_API_URL,
    }
};

export default nextConfig;
