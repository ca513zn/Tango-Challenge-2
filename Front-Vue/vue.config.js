
// const IS_PRODUCTION = process.env.NODE_ENV === 'production'

module.exports = {

    outputDir: 'dist',
    assetsDir: 'static',
    // baseUrl: IS_PRODUCTION
    // ? 'http://cdn123.com'
    // : '/',
    // For Production, replace set baseUrl to CDN
    // And set the CDN origin to `yourdomain.com/static`
    // Whitenoise will serve once to CDN which will then cache
    // and distribute
    chainWebpack: (config) => {
        const svgRule = config.module.rule('svg');

        svgRule.uses.clear();

        svgRule
            .use('babel-loader')
            .loader('babel-loader')
            .end()
            .use('vue-svg-loader')
            .loader('vue-svg-loader');
    },
    devServer: {
        proxy: {
            '/api*': {
                // Forward frontend dev server request for /api to django dev server
                target: 'http://localhost:8000/',
            }
        },
        open: process.platform === 'darwin',
        host: '0.0.0.0',
        port:5000, // CHANGE YOUR PORT HERE!
        https: false,
        hotOnly: true,
        disableHostCheck: true
    }
}