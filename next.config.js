/** @type {import('next').NextConfig} */
const path = require('path');

module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'assets')],
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
  webpack: (config) => {
    config.resolve = {
      ...config.resolve,
      fallback: {
        /* promisify: false,
        url: false,
        fs: false,
        path: false,
        os: false, */
      },
    };

    return config;
  },
};
