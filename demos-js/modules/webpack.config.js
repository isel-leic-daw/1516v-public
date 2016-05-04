var path = require('path');
var jsDir = path.resolve(__dirname, 'js');
var buildDir = path.resolve(__dirname, 'build');

module.exports = {
  entry: path.resolve(jsDir, 'main.js'),
  output: {
    path: buildDir,
    filename: 'bundle.js'
  },
  module:{
    loaders:[
      {
        loader: 'babel-loader',
        test: jsDir,
      }
    ]
  },
  devServer:{
    port: 8000,
    outputPath: buildDir,
    contentBase: buildDir
  }
}
