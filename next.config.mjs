/** @type {import('next').NextConfig} */





const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
    
  images: {
    domains: ['i.pinimg.com'],
  },
    
  webpack5: true,
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.optimization.minimizer = config.optimization.minimizer.map((plugin) => {
        if (plugin.constructor.name === 'TerserPlugin') {
          plugin.options.terserOptions.compress.warnings = false;
          plugin.options.terserOptions.output = {
            ...plugin.options.terserOptions.output,
            comments: false,
          };
        }
        return plugin;
      });
    }
    if (config.plugins) {
      config.plugins = config.plugins.filter(
        (plugin) => plugin.constructor.name !== 'ESLintWebpackPlugin'
      );
    }
    return config;
  },
};

export default nextConfig;
