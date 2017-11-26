const webpack = require('webpack');

module.exports = {
  entry:{
      app: './src/app.jsx',
      vendor: ['react', 'react-dom', 'react-router-dom', 'react-bootstrap', 'react-router-bootstrap', 'whatwg-fetch'],
  },

  output: {
    path: __dirname + '/public/js/',
    filename: 'app.bundle.js'
  },

  plugins: [
      new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'vendor.bundle.js'}),
  ],

  module: {
    loaders: [
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        query: {
          presets: ['react','es2015']  
        }
      },
    ]
  }
};