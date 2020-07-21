import {main, park} from '@/api/index'
//确认订单订单详情
export function getconfirmorderApi(params) {
    return park({
        url:`/appsaleorder/getconfirmorder`,
        method: 'POST',
        data:params
    })
}

//确认订单提交订单
export function batchmakeorderApi(params) {
    return park({
        url:`/appsaleorder/batchmakeorder`,
        method: 'POST',
        data:params
    })
}

//付款方式列表
export function listPayOptionsApi(params) {
    return park({
        url:`/appWallet/ListPayOptions`,
        method: 'POST',
        data:params
    })
}