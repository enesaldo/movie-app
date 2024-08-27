/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["image.tmdb.org"],
  },

  env: {
    TMDB_BEARER_TOKEN: process.env.TMDB_BEARER_TOKEN,
  },
};

export default nextConfig;
