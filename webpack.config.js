const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

var path = require('path');

module.exports = {
    entry: "./src/js/main.js",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
    },
    optimization: {
        // minimize: false
    },
    module: {
        rules: [{
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
                test: /\.(s*)css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ]
            },
            {
                test: /\.worker\.js$/,
                use: { loader: 'worker-loader' },
            },
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "src/index.html"
            // filename: "./dist/index.html"
        }),
        new MiniCssExtractPlugin({
            filename: 'style.css',
            ignoreOrder: false, // Enable to remove warnings about conflicting order
        }),

    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: false,
        port: 9000,
        publicPath: '/'
    }
};