/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: process.env.NODE_ENV === 'development' ? false : true,
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
    
    // Improve cross-platform compatibility
    config.resolve.symlinks = false;
    
    return config
  },
  // Add any other necessary configuration options
};

module.exports = nextConfig; 