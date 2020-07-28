/*
 * @Author: your name
 * @Date: 2020-07-20 17:26:48
 * @LastEditTime: 2020-07-23 20:37:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \app-en\src\api\home\index.js
 */

import { main, park } from '@/api/index'
//首页
export function homePageApi (params) {
  return park({
    url: `/apphomepage/HomePage`,
    method: 'POST',
    data: params
  })
}

//首页分类
export function HomePagebottomApi (params) {
  return park({
    url: `/apphomepage/HomePagebottom`,
    method: 'POST',
    data: params,
    loading: 'shouyedibu'
  })
}

//首页广告
export function homeAdvertPictureApi (params) {
  return park({
    url: `/apphomepage/HomeAdvertPicture`,
    method: 'POST',
    data: params
  })
}

// 首页新用户优惠券
export function APPgetuserIsfullApi () {
  return park({
    url: `/appusercenter/APPgetuserIsfull`,
    method: 'POST'
  })
}
