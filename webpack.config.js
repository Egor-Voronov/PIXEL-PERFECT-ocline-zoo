const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const sass = require('sass');

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'production',
    entry: {
        main: './scripts/script.js',
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './main.html',
            filename: 'main.html',
            inject: 'body',
            chunks: ['main']
        }),
        new HTMLWebpackPlugin({
            template: './donate.html',
            filename: 'donate.html',
            inject: 'body',
            chunks: ['donate']
        }),
        new MiniCssExtractPlugin({
            filename: 'style.css'
        }),
        //закомментить, чтобы css не минифицировать
        // new CssMinimizerWebpackPlugin(),
        // new TerserWebpackPlugin()
        //закомментить, чтобы css не минифицировать
    ],
    module: {
        rules: [
            // {
            //     test: /\.css$/,
            //     use: [MiniCssExtractPlugin.loader, 'css-loader'],
            // },
            {
                test: /\.s[ac]ss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
              }
        ]
    }
}