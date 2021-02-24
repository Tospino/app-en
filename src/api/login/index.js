/*
 * @Author: 曹建勇
 * @Date: 2020-07-21 10:03:29
 * @LastEditors: 曹建勇
 * @LastEditTime: 2020-09-03 11:46:42
 * @Description: 
 * @FilePath: \app-en\src\api\login\index.js
 */
import { main, park } from '@/api/index'
//登录
export function loginApi(params) {
    return park({
        url: '/h5login/h5/login',
        method: 'POST',
        data: params
    })
}

//手机验证码
export function msglistApi(params) {
    return park({
        url: '/msginfo/msg/msglist',
        method: 'POST',
        data: params
    })
}
//手机验证码(国际)
export function sendArkeselMsgApi(params) {
    return park({
        url: '/msginfo/sendArkeselMsg',
        method: 'POST',
        data: params
    })
}

//校验验证码是否正确的接口
export function getverificationcodeApi(params) {
    return park({
        url: '/h5login/getverificationcode',
        method: 'POST',
        data: params
    })
}

//找回登录密码支付密码
export function setretrievepasswordApi(params) {
    return park({
        url: '/h5login/setretrievepassword',
        method: 'POST',
        data: params
    })
}

//设置支付密码
export function setuserpaypasswordApi(params) {
    return park({
        url: '/appusercenter/setuserpaypassword',
        method: 'POST',
        data: params
    })
}

//用户修改登录或支付密码
export function updateuserpaypasswordApi(params) {
    return park({
        url: '/appusercenter/updateuserpaypassword',
        method: 'POST',
        data: params
    })
}
//登出
export function logoutApi(params) {
    return park({
        url: '/appusercenter/logout',
        method: 'POST',
        data: params
    })
}


//返回图片服务器的路径
export function gethttpimgurlApi(params) {
    return park({
        url: '/h5login/gethttpimgurl',
        method: 'POST',
        data: params,
        loading: 'jianadizhi'
    })
}

//获取站点的国家语言信息
export function getcountryWebUrlApi(params) {
    return park({
        url: '/h5login/getcountryWebUrl',
        method: 'POST',
        data: params,
    })
}

/**
 * @description: 第三方登录
 * @author: 曹建勇
 */
// 校验facebook登录
export function doLogin(params) {
    return park({
        url: '/appThirdpartylogin/verify',
        method: 'POST',
        data: params,
    })
}
// 第三方登录检验手机号是否已注册
export function checkphonethird(params) {
    return park({
        url: '/appThirdpartylogin/checkphonethird',
        method: 'POST',
        data: params,
    })
}
// 添加第三方的授权登录
export function userAddthird(params) {
    return park({
        url: '/appThirdpartylogin/userAddthird',
        method: 'POST',
        data: params,
    })
}
// 授权之前先添加注册
export function userregister(params) {
    return park({
        url: '/appThirdpartylogin/userregister',
        method: 'POST',
        data: params,
    })
}
// 解除第三方登录的授权
export function cancelthird(params) {
    return park({
        url: '/appThirdpartylogin/cancelthird',
        method: 'POST',
        data: params,
    })
}
// 获取用户信息
export function getuserinfo(params) {
    return park({
        url: '/appusercenter/getuserinfo',
        method: 'POST',
        data: params,
    })
}
