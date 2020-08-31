import { main, park } from '@/api/index'
//确认订单订单详情
export function getconfirmorderApi(params) {
  return park({
    url: `/appsaleorder/getconfirmorder`,
    method: 'POST',
    data: params
  })
}

//确认订单提交订单
export function batchmakeorderApi(params) {
  return park({
    url: `/appsaleorder/batchmakeorder`,
    method: 'POST',
    data: params
  })
}

//付款方式列表
export function listPayOptionsApi(params) {
  return park({
    url: `/appWallet/ListPayOptions`,
    method: 'POST',
    data: params
  })
}

//返现短信
export function onlineorderrewardmsgApi(params) {
  return park({
    url: `/appsaleorder/onlineorderrewardmsg`,
    method: 'POST',
    data: params
  })
}

//买家领取优惠券
export function couponDrawApi(params) {
  return park({
    url: `/coupon/coupondraw`,
    method: 'POST',
    data: params
  })
}
//买家删除已使用或已过有效期的优惠券
export function couponRemoveApi(params) {
  return park({
    url: `/coupon/couponremove`,
    method: 'POST',
    data: params
  })
}
