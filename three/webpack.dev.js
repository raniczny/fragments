const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const path = require('path');
const scene = process.env.npm_config_scene

module.exports = merge(common, {
    mode: 'development',
    devtool: 'eval-source-map',
    devServer: {
        https: false,
        static: {
            directory: path.join(__dirname, `scenes/${scene}/dist`),
        },
        hot: true,
    },
})
