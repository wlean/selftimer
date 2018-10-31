'use strict';

const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HTMLPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const NODE = process.env.NODE;

const config = {
  target: 'web',
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    filename: 'main.js',
    publicPath: '/dist/',
    path: path.join(__dirname, 'dist'),
  },
  plugins: [
    // make sure to include the plugin for the magic
    new webpack.DefinePlugin({
      'process.env': {
        NODE: `${NODE}`,
      }
    }),
    new VueLoaderPlugin(),
    new HTMLPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.(gif|jpg|jpeg|png)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024 * 1024,
              name: '[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              limit: 1024 * 1024,
              name: '[name].[ext]',
            },
          },
        ],
      },
    ],
  },
};

if(NODE == 'dev'){
  config.devtool = '#cheap-module-eval-source-map';
  config.devServer = {
    port: 8080,
    host: '0.0.0.0',
    overlay: {
      errors: true,
    },
    hot: true,
    open: true,
  };
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  config.plugins.push(new webpack.NoEmitOnErrorsPlugin());
}

module.exports = config;
