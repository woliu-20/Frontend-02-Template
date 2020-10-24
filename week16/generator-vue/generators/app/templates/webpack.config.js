// const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装
const webpack = require('webpack'); // 用于访问内置插件
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CopyPlugin = require('copy-webpack-plugin');

const config = {
    entry: "./src/main.js",
    module: {
        rules: [
            { test: /\.vue$/, use: 'vue-loader' },
            { test: /\.css$/, use: ['vue-style-loader','css-loader'] }
        ]
    },
    plugins: [
        // new HtmlWebpackPlugin({ template: './src/index.html' })
        new VueLoaderPlugin(),
        new CopyPlugin({
            patterns: [
                {from: 'src/*.html', to: '[name].[ext]'},
            ],
        })
    ]
};

module.exports = config;