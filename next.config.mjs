/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: "akamai",
    path: "/",
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};
export default nextConfig;
