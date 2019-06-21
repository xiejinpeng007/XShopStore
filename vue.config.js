import api from "@/utils/api.js"
module.exports = {
    //dev 环境代理 解决dev环境跨域问题
    devServer: {
        proxy: {
            '/api_getAllGoods': {
                target: api.baseUrl,
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api_getAllGoods': '/api_getAllGoods'
                }
            },
            '/api_payManyGoods': {
                target: api.baseUrl,
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api_payManyGoods': '/api_payManyGoods'
                }
            },
            '/api_login': {
                target: api.baseUrl,
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api_login': '/api_login'
                }
            },
            '/api_userinfo': {
                target: api.baseUrl,
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api_userinfo': '/api_userinfo'
                }
            },
            '/api_getPayHistory': {
                target: api.baseUrl,
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api_getPayHistory': '/api_getPayHistory'
                }
            },
            '/api_getChargeHistory': {
                target: api.baseUrl,
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api_getChargeHistory': '/api_getChargeHistory'
                }
            }
        }
    }
}