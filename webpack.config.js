const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

// 导出函数
module.exports = (env, arg) => {
    // 判断是否是开发模式
    const devMode = arg.mode === 'development';

    let config = {
        entry: './src/index.js',
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'dist')
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        {
                            loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader
                        },
                        'css-loader'
                    ]
                },
                {
                    test: /\.(png|svg|jpg|gif)$/,
                    use: [
                        'file-loader'
                    ]
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    use: [
                        'file-loader'
                    ]
                }
            ]
        },
        plugins: [
            new CleanWebpackPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            new HtmlWebpackPlugin({
                hash: true
            }),
            new MiniCssExtractPlugin({
                filename: devMode ? '[name].css' : '[name].[hash].css',
                chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
            })
        ],
        devServer: {
            contentBase: path.resolve(__dirname, 'src'),
            hot: true,
            inline: true
        }
    }

    return config
};