const webpack = require('webpack');
const path = require('path');

module.exports = function override(config, env) {
  config.resolve.fallback = {
    "crypto": require.resolve("crypto-browserify"),
    "stream": require.resolve("stream-browserify"),
    "buffer": require.resolve("buffer/"),
    "util": require.resolve("util/"),
    "process": require.resolve("process/browser"),
    "http": require.resolve("stream-http"),
    "url": require.resolve("url/")
  };

  config.plugins = [
    ...config.plugins,
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
      goog: path.resolve(__dirname, 'src/goog-mock.js')
    })
  ];

  // Suppress specific warnings
  config.ignoreWarnings = [
    {
      module: /@mediapipe\/tasks-vision/,
      message: /Failed to parse source map/
    }
  ];

  return config;
}