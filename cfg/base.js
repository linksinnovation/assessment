var path = require('path');

var port = 8000;
var srcPath = path.join(__dirname, '../src/js');
var publicPath = '/assets/';

module.exports = {
    port: port,
    debug: true,
    output: {
        path: path.join(__dirname, '../src/main/webapp/assets'),
        filename: 'bundle.js',
        publicPath: publicPath
    },
    devServer: {
        contentBase: './src/js',
        historyApiFallback: true,
        hot: true,
        port: port,
        publicPath: publicPath,
        noInfo: false,
        proxy: {
            '*': {
                target: 'http://localhost:8080',
                secure: false
            }
        }
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.css', '.scss'],
        alias: {
            components: srcPath + '/components/',
            styles: srcPath + '/styles/'
        }
    },
    eslint: {
        configFile: './.eslintrc'
    },
    module: {
        preLoaders: [
            {
                test: /\.(jsx)$/,
                include: srcPath,
                loader: 'eslint-loader'
            }
        ],
        loaders: []
    }
};