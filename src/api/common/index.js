/*
 * @Author: 曹建勇
 * @Date: 2020-07-21 16:03:56
 * @LastEditors: 曹建勇
 * @LastEditTime: 2020-07-21 17:05:15
 * @Description:
 * @FilePath: \app-en\src\api\common\index.js
 */
import { main, park } from '@/api/index'
// app检测是否更新接口 检测版本号
export function getversion(params) {
    return park({
        url: `/h5login/getversion`,
        method: 'POST',
        data: params
    })
}
