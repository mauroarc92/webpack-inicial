const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MinifyPlugin = require("babel-minify-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
module.exports = {
    mode: 'development',

    optimization: {
        minimizer: [new OptimizeCssAssetsPlugin()]
    },
    output: {
        filename: 'main.[contentHash].js'
    },

    module: {
        rules: [

            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"

            },
            {
                test: /\.css$/,
                exclude: /style\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /style\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },

            {
                test: /\.html$/,
                loader: 'html-loader',

                options: {
                    attributes: false,
                }

            },

            {
                test: /\.(png|jpe?g|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        esModule: false,
                    },
                }]
            }


        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({

            filename: '[name].[contentHash].css',
            ignoreOrder: false
        }),

        new CopyPlugin({
            patterns: [
                { from: 'src/assets', to: 'assets' },

            ],

        }),

        new MinifyPlugin(),
        new CleanWebpackPlugin(),
    ]

}