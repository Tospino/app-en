/*
 * @Author: your name
 * @Date: 2020-07-09 10:00:20
 * @LastEditTime: 2020-07-10 10:34:10
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \app-en\config\dev.env.js
 */
'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    // SHOP_API: '"http://47.115.5.76:8082"',   //测试环境
    // SHOP_API:'"http://serviceapp.tospino.com"',   //正式环境
    SHOP_API:'"http://192.168.3.8:83"',   //宏恩环境
    // SHOP_API:'"http://192.168.3.108:93"',   //彬哥环境
})
