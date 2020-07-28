/*
 * @Author: zlj
 * @Date: 2020-07-20 17:26:48
 * @LastEditTime: 2020-07-28 15:48:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \app-en\src\api\accountBalance\index.js
 */

import { main, park } from '@/api/index'
//获取用户钱包信息
export function walletInfoApi () {
  return park({
    url: `/appWallet/walletInfo`,
    method: 'get'
  })
}
//获取用户充值/消费记录1充值/2消费
export function walletListInfoApi (params, accountType) {
  return park({
    url: `/appWallet/walletListInfo/${accountType}`,
    method: 'POST',
    data: params
  })
}
//用户中心优惠券-全部
export function APPgetuserallCouponListApi (params) {
  return park({
    url: `/appusercenter/APPgetuserallcouponlist`,
    method: 'POST',
    data: params
  })
}
//用户中心优惠券-删除
export function APPgetuserallcouponlistexpireApi (params) {
  return park({
    url: `/appusercenter/APPgetuserallcouponlistexpire`,
    method: 'POST',
    data: params
  })
}
