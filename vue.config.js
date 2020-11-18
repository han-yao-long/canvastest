module.exports = {


    devServer: {
        historyApiFallback: {
            // rewrites: pagesInfo.devServerPath,
        },
        proxy: {
            "/mapapi": {
                target: "http://localhost:3000",
                changeOrigin: true,
                secure: false,
                pathRewrite: {
                    "^/mapapi": ''
                }
            },
            // 图片服务器
            '/image-service': {
                target: 'http://adm.sagacloud.cn',
                changeOrigin: true,
                secure: false,
            },
            //图片服务器
            '/meiku': {
                target: 'http://39.102.40.239:8080',
                changeOrigin: true,
                secure: false,
            },
        },
        // 关闭esline
        overlay: {
            warnings: false,
            errors: false
        },
        // lintOnSave: false
    },
};