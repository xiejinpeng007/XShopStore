const baseUrl = 'localhost:8080/'
module.exports = {
    //dev 环境代理 解决dev环境跨域问题
    devServer: {
        proxy: {
            '/api_getAllGoods': {
                target: baseUrl,
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api_getAllGoods': '/api_getAllGoods'
                }
            },
            '/api_payManyGoods': {
                target: baseUrl,
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api_payManyGoods': '/api_payManyGoods'
                }
            },
            '/api_login': {
                target: baseUrl,
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api_login': '/api_login'
                }
            },
            '/api_userinfo': {
                target: baseUrl,
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api_userinfo': '/api_userinfo'
                }
            },
            '/api_getPayHistory': {
                target: baseUrl,
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api_getPayHistory': '/api_getPayHistory'
                }
            },
            '/api_getChargeHistory': {
                target: baseUrl,
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api_getChargeHistory': '/api_getChargeHistory'
                }
            }
        }
    }
}