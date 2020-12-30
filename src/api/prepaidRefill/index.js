import { main, park } from '@/api/index'
//话费充值产品列表
export function topupFlexiProductListApi(params) {
    return park({
        url: `/appWallet/TopupFlexiProductList`,
        method: 'POST',
        data: params
    })
}

//生成话费充值订单
export function addPhoneRechargeOrderApi(data) {
    return park({
        url: `/appWallet/addPhoneRechargeOrder`,
        method: 'GET',
        data
    })
}

//创建一个发票并发回slydepay支付令牌
export function createInvoiceApi(data) {
    return park({
        url: `/appWallet/CreateInvoice`,
        method: 'GET',
        data
    })
}

//支付回调接口
export function callbackApi(data) {
    return park({
        url: `/appWallet/callback`,
        method: 'GET',
        data
    })
}

//话费充值订单详情
export function phoneOrderDetailApi(data) {
    return park({
        url: `/appWallet/PhoneOrderDetail`,
        method: 'GET',
        data
    })
}

//话费充值订单列表
export function phoneOrderListApi(data) {
    return park({
        url: `/appWallet/PhoneOrderList`,
        method: 'GET',
        data
    })
}

//删除话费充值订单
export function deleteRecordApi(data) {
    return park({
        url: `/appWallet/deleteRecord`,
        method: 'GET',
        data
    })
}

//余额话费充值
export function balancePrepaidRechargeApi(params) {
    return park({
        url: `/appWallet/balancePrepaidRecharge`,
        method: 'POST',
        data: params
    })
}

//余额充值模板
export function getTodayPayTemplateApi(params) {
    return park({
        url: `/appWallet/getTodayPayTemplate`,
        method: 'POST',
        data: params
    })
}

//钱包模块-余额充值接口
export function TopupBalanceApi(data) {
    return park({
        url: `/appWallet/TopupBalance`,
        method: 'get',
        data
    })
}
