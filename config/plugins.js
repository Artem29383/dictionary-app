const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const plugins = (isDev, isProd) => {
  const base = [
    new HTMLWebpackPlugin({
      template:  path.resolve(__dirname, "../src", "index.html"),
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([{
      from:  path.resolve(__dirname, "../src", "favicon.ico"),
      to: path.resolve(__dirname, 'build'),
    }]),
  ];
  
  if (isDev) base.push(new ErrorOverlayPlugin());
  if (isProd) base.push(new BundleAnalyzerPlugin());
  
  return base;
};

module.exports = plugins;