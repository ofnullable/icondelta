const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const withSass = require('@zeit/next-sass');

const config = withBundleAnalyzer({
  webpack: config => {
    const isProd = process.env.NODE_ENV === 'production';
    const plugins = [
      ...config.plugins,
      new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /^\.\/ko$/),
    ];

    if (isProd) {
      plugins.push(new CompressionPlugin()); // main.js.gz
    }

    config.node = {
      fs: 'empty',
    };

    return {
      ...config,
      mode: isProd ? 'production' : 'development',
      devtool: isProd ? 'hidden-source-map' : 'eval',
      plugins,
    };
  },
});

module.exports = withSass({
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: '[local]___[hash:base64:5]',
  },
  config,
});
