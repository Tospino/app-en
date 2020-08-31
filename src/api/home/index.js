/*
 * @Author: 曹建勇
 * @Date: 2020-08-17 16:23:29
 * @LastEditors: 曹建勇
 * @LastEditTime: 2020-08-25 11:13:24
 * @Description: 
 * @FilePath: \app-en\src\api\home\index.js
 */
import { main, park } from '@/api/index'
//首页
export function homePageApi(params) {
    return park({
        url: `/apphomepage/HomePage`,
        method: 'POST',
        data: params
    })
}

//首页分类
export function HomePagebottomApi(params) {
    return park({
        url: `/apphomepage/HomePagebottom`,
        method: 'POST',
        data: params,
        loading: 'shouyedibu'
    })
}

//首页广告
export function homeAdvertPictureApi(params) {
    return park({
        url: `/apphomepage/HomeAdvertPicture`,
        method: 'POST',
        data: params,
    })
}


// 首页新用户优惠券
export function APPgetuserIsfullApi() {
    return park({
        url: `/appusercenter/APPgetuserIsfull`,
        method: 'POST'
    })
}



// 特价清仓
export function gethomeClearanceList(params) {
    return park({
        url: `/apphomepage/gethomeClearanceList`,
        method: 'POST',
        data: params,
    })
}