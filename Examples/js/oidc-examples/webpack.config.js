var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var dirJs = path.resolve(__dirname, 'js');
var dirBuild = path.resolve(__dirname, 'build');
var dirHtml = path.resolve(__dirname, 'html');

module.exports = {
  entry: path.resolve(dirJs, 'main.js'),
  output: {
    path: dirBuild,
    filename: 'bundle.js'
  }
  ,module: {    
    loaders: [
      {
        loader: 'babel-loader',
        test: dirJs,
      }
    ]
  }  
  ,plugins: [      
      new CopyWebpackPlugin([
        { from: dirHtml }
      ])      
  ]
  ,devServer: {
    port: 5000,
    outputPath: dirBuild,
    contentBase: dirBuild,
  },
}