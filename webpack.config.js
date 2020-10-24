const HtmlWebPackPlugin = require("html-webpack-plugin");

var path = require('path');

module.exports = {
  entry: "./src/js/main.js",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
  optimization: {
    minimize: false
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        options: {
          // Disables attributes processing
          attributes: false,
        }
      },
      {
         test:/\.(s*)css$/,
         use:['style-loader', 'css-loader', 'postcss-loader',  'sass-loader']
      },
      {
        test: /\.worker\.js$/,
        use: { loader: 'worker-loader' },
      },
      // {
      //   loader: 'workerize-loader',
      //   options: { inline: true }
      // }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "src/index.html"
      // filename: "./dist/index.html"
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    publicPath: '/'
  }
};