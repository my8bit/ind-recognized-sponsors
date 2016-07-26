var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

function getDevTool() {
  if (process.env.NODE_ENV !== 'production') {
    return 'source-map'; //enables source map
  }

  return false;
}

module.exports = {
    entry: [
      './client/src/js/app.js',
      './client/src/sass/style.scss'
    ],
    output: {
      path: path.resolve(__dirname, 'client/dist/js'),
      publicPath: path.resolve(__dirname, 'client/dist/js'),
      filename: 'bundle.js'
    },
    devServer: {
      //hot: true,
      //progress: true,
      colors: true,
      open: true,
      contentBase: 'client'
    },
    devtool: getDevTool(),
    module: {
      loaders: [
        {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel',
            query: {
              presets: ['es2015']
            }
          },
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract('css!sass')
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin('../css/style.css', {
        allChunks: true
      })
    ]
  };
