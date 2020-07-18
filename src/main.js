/*
 * @Author: 曹建勇
 * @Date: 2020-07-09 10:00:20
 * @LastEditors: 曹建勇
 * @LastEditTime: 2020-07-18 11:15:21
 * @Description: 
 * @FilePath: \app-en\src\main.js
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vant from 'vant';
import 'lib-flexible/flexible'
import '@/assets/css/reset.css'
import 'vant/lib/index.css'
import '@/assets/css/common.less'
import '@/assets/css/animation.less'
import './assets/font/font_501137_8uegssallpv/iconfont.css'
import { isDisabled, formValidate, strTrim, objTrim, priceReg, objDeepCopy, deepnull, MyLocalStorage } from '@/common/utils.js'
import store from './store'
import * as mycomponents from '@/common/mycomponents.js'
import VueScroller from "vue-scroller"
import clipboard from 'clipboard';


import { gethttpimgurlApi } from '@/api/login/index'


Vue.prototype.$webUrl = ''
Vue.prototype.jn = ''
gethttpimgurlApi().then(res => {
    if (res.code == 0) {
        Vue.prototype.jn = res.currency
        Vue.prototype.$webUrl = res.webUrl + 'thumb/'
        Vue.prototype.$bigwebUrl = res.webUrl
    }
})




Vue.use(VueScroller);
Vue.use(Vant);

Vue.prototype.$fn = {
    copy: objDeepCopy,
    isDisabled,
    formValidate,
    strTrim,
    objTrim,
    priceReg,
    deepnull,
    MyLocalStorage
}


Vue.prototype.clipboard = clipboard;


Vue.config.productionTip = false



//注册全局组件
Object.keys(mycomponents).forEach(key => {
    Vue.component(key, mycomponents[key])
})




// router.afterEach((to,from,next) => {
//   window.scroll(200, 200);
//   console.log(window.scrollY);
// });
// 引入图片懒加载
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: '../static/goods_default.jpg', // 加载失败或者无资源时显示的图片
    loading: '../static/goods_default.jpg', // loading图片，未加载时显示的
    attempt: 1
})

/* eslint-disable no-new */
const main = new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
export default main
