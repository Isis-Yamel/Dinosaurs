const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: ['./app.js'],

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                { loader: MiniCssExtractPlugin.loader },
                'css-loader',
                ],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                'file-loader',
                ],
            },
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({template: "index.html", excludeChunks: ['dev-helper']}),
        new MiniCssExtractPlugin({excludeChunks: ['dev-helper']})
    ],

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },

    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
};
