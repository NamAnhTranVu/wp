const merge = require('webpack-merge');
const common = require('./webpack.common.js');

// TODO: Transpile the modules for production before release

module.exports = merge(common, {
    mode: 'production',
});