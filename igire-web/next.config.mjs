/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "shecancode-website-dev.vercel.app",
      "res.cloudinary.com",
      "media.licdn.com",
      "firebasestorage.googleapis.com",
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://iro-employee-bn.onrender.com/api/:path*",
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, PATCH, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Origin, Content-Type, Accept",
          },
        ],
      },
    ];
  },
};
export default nextConfig;
