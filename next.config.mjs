const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // Suppress all warnings in production builds
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

    // Suppress ESLint plugin warnings
    if (config.plugins) {
      config.plugins = config.plugins.filter(
        (plugin) => plugin.constructor.name !== 'ESLintWebpackPlugin'
      );
    }

    return config;
  },
};

module.exports = nextConfig;
