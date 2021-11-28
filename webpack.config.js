const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

function getOptimization(){
    const config = {
        splitChunks: {
            chunks: 'all'
        }
    };

    if(isProd) config.minimizer = [
        new CssMinimizerWebpackPlugin(),
        new TerserWebpackPlugin()
    ];

    return config;
}

function babelOptions(...presets){
    const options = {
        presets: [
            '@babel/preset-env',
            ...presets
        ],
        plugins: []
    };

    return options;
}

const fileName = ext => isDev ? `[name].${ext}` : `[name][hash].${ext}`;

const cssLoader = (...add) => {
    return [{
        loader: MiniCssExtractPlugin.loader
    }, 'css-loader', ...add];
};

const jsLoaders = () => {
    const loaders = [
        {
            loader: 'babel-loader',
            options: babelOptions()
        }
    ];

    if(isDev) loaders.push('eslint-loader');

    return loaders;
};

const plugins = () => {
    const base = [
        new HtmlWebpackPlugin({
            template: './index.html',
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/favicon.ico'),
                    to: path.resolve(__dirname, 'dist')
                }
            ]
        }),
        new MiniCssExtractPlugin({
            filename: fileName('css')
        })
    ];

    if(isProd) {
        base.push(new BundleAnalyzerPlugin());
    }

    return base;
}


module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        main: ['@babel/polyfill', './index.tsx'],
        analytics: './analytics.js',
        typed: './typed.ts'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: fileName('js')
    },
    devtool: isDev ? 'source-map' : false,
    plugins: plugins(),
    resolve: {
        extensions: ['.js', '.json', '.png'],
        alias: {
            '@models': path.resolve(__dirname, 'src/models'),
            '@': path.resolve(__dirname, 'src')
        }
    },
    optimization: getOptimization(),
    devServer: {
        port: 3650,
        hot: isDev
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: cssLoader()
            },
            {
                test: /\.s[ac]ss$/,
                use: cssLoader('sass-loader')
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|bmp)$/,
                type: 'asset/resource',
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                type: 'asset/resource',
            },
            {
                test: /\.xml$/,
                use: ['xml-loader']
            },
            {
                test: /\.csv$/,
                use: ['csv-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: jsLoaders()
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: babelOptions('@babel/preset-typescript')
                }]
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: babelOptions('@babel/preset-react')
                }]
            },
            {
                test: /\.tsx$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: babelOptions('@babel/preset-typescript', '@babel/preset-react')
                }]
            }
        ]
    }
};