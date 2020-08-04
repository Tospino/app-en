/*
 * @Author: your name
 * @Date: 2020-07-20 17:26:48
 * @LastEditTime: 2020-08-03 19:43:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \app-en\src\api\home\commodityDetails.js
 */

import { main, park } from '@/api/index'
//商品详情
export function productdetailApi (params) {
  return park({
    url: `/appproduct/getproductdetail`,
    method: 'POST',
    data: params
  })
}

//商品评论
export function productevaluationlistApi (params) {
  return park({
    url: `/appproduct/getproductevaluationlist`,
    method: 'POST',
    data: params
  })
}

//获取用户购物车的商品总数据
export function logousercartNumApi (params) {
  return park({
    url: `/appusercenter/logousercartNum`,
    method: 'POST',
    data: params
  })
}

//商品详情页加载优惠券列表
export function AppqureyuserCouponProApi (params) {
  return park({
    url: `/appusercenter/AppqureyuserCouponPro`,
    method: 'POST',
    data: params
  })
}
//商品详情页加载加载最大金额优惠券
export function AppqureyuserCouponProModelApi (params) {
  return park({
    url: `/appusercenter/AppqureyuserCouponProModel`,
    method: 'POST',
    data: params
  })
}
