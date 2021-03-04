import {main, park} from '@/api/index'
//上传图片
export function uploadImgApi(params,type) {
    return main({
        url:`/h5login/uploadImg?type=${type}`,
        method: 'POST',
        data:params
    })
}

//主营业务列表
export function membertypelitApi(params) {
    return park({
        url:`/h5login/getmembertypelevellit`,
        method: 'POST',
        data:params
    })
}

//注册用户
export function userregisterApi(params) {
    return park({
        url:`/h5login/h5/userregister`,
        method: 'POST',
        data:params
    })
}

//邮箱验证码
export function getEmailCodeApi(params) {
    return park({
        url:`/tpmailmsginfo/getEmailCode`,
        method: 'POST',
        data:params
    })
}

//校验邮箱验证码
export function checkEmailCodeApi(params) {
	return park({
		url: '/tpmailmsginfo/checkEmailCode',
		method: 'POST',
		data: params
	})
}