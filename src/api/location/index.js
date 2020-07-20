import { main, park } from '@/api/index'
//H5通过IP获取地址国家数据
export function ipgetcountry(params) {
    return park({
        url: '/basearea/ipgetcountry',
        method: 'get',
        data: params
    })
}
// H5通过地址名称匹配到数据库的ID
export function areanamegetid(params) {
    return park({
        url: '/basearea/areanamegetid',
        method: 'get',
        data: params
    })
}
// 添加地址基础数据
export function addbasearea(params) {
    return park({
        url: '/basearea/addbasearea',
        method: 'POST',
        data: params
    })
}