/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  optimizeFonts: false,
  experimental: {
    optimizeCss: {
      skip: ['https://use.typekit.net/aoz8yor.css']
    },
    esmExternals: 'loose',
    cpus: 1 // Limit CPU usage to avoid file locks
  },
  // Use this to avoid path length issues on Windows
  webpack: (config) => {
    config.optimization.nodeEnv = false; // Reduces symlink usage
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    }
    return config
  },
  // Add any other necessary configuration options
};

module.exports = nextConfig; 