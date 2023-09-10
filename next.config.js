/** @type {import('next').NextConfig} */
const nextConfig = {};

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
});

module.exports = withPWA({
  reactStrictMode: true,
});

module.exports = nextConfig;

module.exports = nextConfig;
