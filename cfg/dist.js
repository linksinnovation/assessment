var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack');
var _ = require('lodash');

var baseConfig = require('./base');

var config = _.merge(
    {
        entry: path.join(__dirname, '../src/js/app'),
        cache: false,
        devtool: 'hidden-source-map',
        plugins: [
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            }),
            new webpack.optimize.OccurenceOrderPlugin(),
            new webpack.optimize.AggressiveMergingPlugin(),
            new webpack.NoErrorsPlugin(),
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                flowplayer: 'flowplayer'
            }),
            new ExtractTextPlugin('style.css', {allChunks: true})
        ]
    },
    baseConfig
);

config.module.loaders.push(
    {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
    },
    {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap!sass?sourceMap')
    },
    {
        test: /\.(js|jsx)$/,
        loader: 'babel',
        include: path.join(__dirname, '../src/js')
    },
    {
        test: /\.(png|jpg|gif|eot|woff|woff2|ttf|svg|eot|eot\?v=4.5.0|woff\?v=4.5.0|woff2\?v=4.5.0|ttf\?v=4.5.0|svg\?v=4.5.0|eot\?yg5dv7|eot\?#iefixyg5dv7|woff\?yg5dv7|ttf\?yg5dv7|svg\?yg5dv7|svg\?yg5dv7#fpicons)$/,
        loader: 'url-loader?limit=1'
    }
);

module.exports = config;