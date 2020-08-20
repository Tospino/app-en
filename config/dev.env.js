/*
 * @Author: 曹建勇
 * @Date: 2020-07-09 10:00:20
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-08-20 11:39:44
 * @Description:
 * @FilePath: \xin\config\dev.env.js
 */
'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  SHOP_API: '"http://47.115.5.76:8082"' //测试环境
  // SHOP_API:'"https://serviceapp.tospino.com"',   //正式环境
  // SHOP_API: '"http://192.168.3.8:83"' //宏恩环境
  // SHOP_API: '"http://192.168.3.32:83"' //彬哥环境
})
