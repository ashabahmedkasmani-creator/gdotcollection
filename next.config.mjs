/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "gdotcollection.com", pathname: "/wp-content/uploads/**" },
    ],
  },
};
export default nextConfig;
