const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: {
        'options-box': './scripts/options-box-ts/options-box.ts',
        'dev-tools': './scripts/dev-tools-ts/dev-tools.ts',
        'tools': './scripts/tools-ts/tools.ts',
        'post-settings': './scripts/post-settings-ts/post-settings.ts',
        'site-tester': './scripts/site-tester-ts/site-tester.ts'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: './[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    externals: {
        'jquery': 'jQuery',
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
        })
    ],
    watch: true,
    watchOptions: {
        ignored: /node_modules/
    }
};