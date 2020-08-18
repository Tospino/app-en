/*
 * @Author: your name
 * @Date: 2020-07-20 17:26:48
 * @LastEditTime: 2020-08-11 15:59:57
 * @LastEditors: Please set LastEditors
 * @Description: 可领取优惠券列表和不可领取优惠券列表数据存储
 * @FilePath: \app-en\src\store\index.js
 */

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  serchName: '', //搜索框输入的内容
  addreData: {
    lev1: {
      id: null, //国家城市1级ID
      name: null,
      areaCode: null
    },
    lev2: {
      id: null, //国家城市2级ID
      name: null,
      areaCode: null
    },
    lev3: {
      id: null, //国家城市3级ID
      name: null,
      areaCode: null
    },
    lev4: {
      id: null, //国家城市4级ID
      name: null,
      areaCode: null
    },
    name: '',
    phone: ''
  },
  posseObj: {}, //编辑收货地址
  selectionShopCar: [], //购物车商品
  searchOrderFormData: {}, //搜索订单需要的条件
  adressItem: {}, //更换选择收货地址时存储

  orderTitleName: '我的订单', //orderTitle组件头部的标题

  payPassword: '', //设置支付密码

  orderdetailList: [], //订单多个商品退货退款

  classifyKeep: false, //分类是否缓存

  homecoupons: [], //首页优惠券

  coupons: [], //可领取优惠券列表

  couponListUse: [] //不可领取优惠券列表

  // couponShop: [] //用户中心的优惠券
}
const getters = {}

const mutations = {
  SETSTOPCARLIST(state, arr = []) {
    return (state.selectionShopCar = arr)
  },
  SETORDERFORMDATA(state, obj = {}) {
    return (state.searchOrderFormData = obj)
  },
  SETADRESSITEM(state, obj = {}) {
    return (state.adressItem = obj)
  },
  ORDERTITLENAME(state, string) {
    return (state.orderTitleName = string)
  },
  SETPAYPASSWORD(state, string) {
    return (state.payPassword = string)
  },
  SETORDERDETAILLIST(state, arr = []) {
    return (state.orderdetailList = arr)
  },
  CLASSIFYKEEP(state, flag) {
    return (state.classifyKeep = flag)
  },

  GETHOMECOUPONS(state, arr = []) {
    return (state.homecoupons = arr)
  },
  GETCOUPONSLIST(state, arr = []) {
    return (state.coupons = arr)
  },
  GETCOUPONSLISTUSE(state, arr = []) {
    return (state.couponListUse = arr)
  }
  // GETCOUPONSHOP (state, arr = []) {
  //   return (state.couponShop = arr)
  // }
}

const actions = {
  setstopcarlist(context, arr = []) {
    return context.commit('SETSTOPCARLIST', arr)
  },
  setorderformdata(context, obj = {}) {
    return context.commit('SETORDERFORMDATA', obj)
  },
  setadressitem(context, obj = {}) {
    return context.commit('SETADRESSITEM', obj)
  },
  deladressitem(context, obj = {}) {
    return context.commit('SETADRESSITEM', obj)
  },
  ordertitlename(context, string) {
    return context.commit('ORDERTITLENAME', string)
  },
  //存支付密码
  setpaypassword(context, string) {
    return context.commit('SETPAYPASSWORD', string)
  },
  //清除支付密码
  clearpaypassword(context) {
    return context.commit('SETPAYPASSWORD', '')
  },
  //订单多个商品退货退款数据存储
  setorderdetaillist(context, arr = []) {
    return context.commit('SETORDERDETAILLIST', arr)
  },
  //更改分类缓存状态
  classifykeep(context, flag) {
    return context.commit('CLASSIFYKEEP', flag)
  },
  //首页新用户优惠数据缓存
  gethomecoupons(context, arr = []) {
    return context.commit('GETHOMECOUPONS', arr)
  },
  //   领取优惠券
  getcouponslist(context, arr = []) {
    return context.commit('GETCOUPONSLIST', arr)
  },
  //   不可领取优惠券
  getcouponslistuse(context, arr = []) {
    return context.commit('GETCOUPONSLISTUSE', arr)
  }
  // //   用户优惠券中心
  // getcouponshop (context, arr = []) {
  //   return context.commit('GETCOUPONSHOP', arr)
  // }
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters
})
