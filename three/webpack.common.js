const path = require('path')
const CopyPlugin = require("copy-webpack-plugin");
const scene = process.env.npm_config_scene

module.exports = {
    entry: `./scenes/${scene}/src/app.ts`,
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, `scenes/${scene}/dist`),
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: `scenes/${scene}/files`,
                    to: `../dist`,
                    globOptions: {
                        gitignore: true,
                    },
                    force: true
                },
            ],
        }),
    ],
}
