var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var bourbon           = require('bourbon');
var path = require('path');

function getDevTool() {
  if (process.env.NODE_ENV !== 'PRODUCTION') {
    return 'source-map'; //enables source map
  }
  return false;
}

function isPoduction() {
  return process.env.PRODUCTION;
}

module.exports = {
    entry: [
      './client/src/js/app.jsx',
      './client/src/sass/style.scss'
    ],
    output: {
      path: path.resolve(__dirname, 'client/dist/js'),
      filename: 'bundle.js'
    },
    devServer: {
      colors: true,
      open: true,
      host: '0.0.0.0',
      contentBase: 'client/dist'
    },
    devtool: getDevTool(),
    module: {
      loaders: [
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel',
          query: {
            presets: ['es2015', 'react']
          }
        },
        {
          test: /\.jade$/,
          loader: 'pug-loader',
          query: { pretty: !isPoduction() }
        },
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract('css!sass')
        }
      ]
    },
    sassLoader: {
      includePaths: [bourbon.includePaths]
    },
    plugins: [
      new CopyWebpackPlugin([{
        from: './client/data/recognized-sponsors-data.json',
        to: '../data'
      }]),
      new HtmlWebpackPlugin({
        template: './client/src/index.jade',
        filename: '../index.html',
        pretty: true
      }),
      new ExtractTextPlugin('../css/style.css', {
        allChunks: true
      })
    ]
  };
