/*
 * @Author: your name
 * @Date: 2020-07-10 10:26:27
 * @LastEditTime: 2020-08-17 17:12:43
 * @LastEditors: 曹建勇
 * @Description: In User Settings Edit
 * @FilePath: \app-en\src\router\index.js
 */
import Vue from 'vue'
import Router from 'vue-router'
// 客服页面
import customerService from '@/components/tabbar/account/customerService'
Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: '引导页',
            component: () => import(`@/components/guidePage/index.vue`)
        },
        {
            path: '/login',
            name: '登录',
            component: () => import(`@/components/login/index.vue`)
        },
        {
            path: '/otp',
            name: '验证码',
            component: () => import(`@/components/login/forgetPassword/otp.vue`)
        },
        {
            path: '/forgetPassword',
            name: '忘记密码',
            component: () => import(`@/components/login/forgetPassword/index.vue`)
        },
        {
            path: '/forgeSuccess',
            name: '修改密码成功',
            component: () =>
                import(`@/components/login/forgetPassword/forgeSuccess.vue`)
        },
        {
            path: '/revisePassword',
            name: '修改密码',
            component: () =>
                import(`@/components/login/forgetPassword/revisePassword.vue`)
        },
        {
            path: '/register',
            name: '注册',
            component: () => import(`@/components/login/register/index.vue`)
        },

        {
            path: '/parenPay',
            name: '设置支付密码母页',
            component: () => import(`@/components/login/register/parenPay`),
            children: [
                {
                    path: 'payPassword',
                    name: '设置支付密码',
                    component: () => import(`@/components/login/register/payPassword.vue`)
                },
                {
                    path: 'payPasswordTwo',
                    name: '确定支付密码',
                    component: () =>
                        import(`@/components/login/register/payPasswordTwo.vue`)
                }
            ]
        },

        {
            path: '/commodityDetails',
            name: '商品详情',
            component: () => import(`@/components/tabbar/home/commodityDetails.vue`)
        },
        {
            path: '/commodityDetails/evaluaDetails',
            name: '商品详情评价',
            component: () => import(`@/components/tabbar/home/evaluaDetails.vue`)
        },

        {
            path: '/footprint',
            name: '我的足迹',
            component: () => import(`@/components/tabbar/account/footprint/index.vue`)
        },

        // myOrderParent
        {
            path: '/myOrder',
            name: '我的订单母页',
            component: () =>
                import(`@/components/tabbar/account/myOrder/myOrderParent`),
            children: [
                {
                    path: 'myOrderList',
                    name: '我的订单',
                    component: () => import(`@/components/tabbar/account/myOrder/index`)
                },
                {
                    path: 'editAddress',
                    name: '我的订单修改地址',
                    component: () =>
                        import(`@/components/tabbar/account/myOrder/editAddress`)
                },
                {
                    path: 'editAddress/addressList',
                    name: '地址列表',
                    component: () =>
                        import(`@/components/tabbar/account/myOrder/addressList`)
                },
                {
                    path: 'orderDetail',
                    name: '订单详情', //我的订单,订单详情
                    component: () =>
                        import(`@/components/tabbar/account/myOrder/orderDetail`)
                },
                {
                    path: 'orderDetail/returnRefund',
                    name: '退货退款页面',
                    component: () =>
                        import(`@/components/tabbar/account/myOrder/returnRefund`)
                },
                {
                    path: 'orderDetail/refund',
                    name: '退款页面',
                    component: () => import(`@/components/tabbar/account/myOrder/refund`)
                },
                {
                    path: 'orderDetail/batchRefund',
                    name: '批量退货退款',
                    component: () =>
                        import(`@/components/tabbar/account/myOrder/batchRefund`)
                },
                {
                    path: 'orderDetail/logistrefund',
                    name: '包裹仅退款',
                    component: () =>
                        import(`@/components/tabbar/account/myOrder/logistrefund`)
                },
                {
                    path: 'orderDetail/logistics',
                    name: '物流信息',
                    component: () =>
                        import(`@/components/tabbar/account/myOrder/logistics`)
                }
            ]
        },

        {
            path: '/evaluate',
            name: '评价',
            component: () => import(`@/components/tabbar/account/evaluate/index`),
            children: [
                {
                    path: 'noShopping',
                    name: '评价没有购物',
                    component: () =>
                        import(`@/components/tabbar/account/evaluate/noShopping`)
                },
                {
                    path: 'evaluateList',
                    name: '评价列表',
                    component: () =>
                        import(`@/components/tabbar/account/evaluate/evaluateList`)
                },
                {
                    path: 'evaluateSuccess',
                    name: '评价成功',
                    component: () =>
                        import(`@/components/tabbar/account/evaluate/evaluateSuccess`)
                },
                {
                    path: 'evaluateDetail',
                    name: '评价详情',
                    component: () =>
                        import(`@/components/tabbar/account/evaluate/evaluateDetail`)
                }
            ]
        },
        {
            path: '/evaluate/evaluateList/expressedEvaluate',
            name: '发表评价',
            component: () =>
                import(`@/components/tabbar/account/evaluate/expressedEvaluate`)
        },
        {
            path: '/evaluate/evaluateList/appendEvaluate',
            name: '追加评价',
            component: () =>
                import(`@/components/tabbar/account/evaluate/appendEvaluate`)
        },

        {
            path: '/accountSettings',
            name: '账户设置',
            component: () =>
                import(`@/components/tabbar/account/accountSettings/index`)
        },
        {
            path: '/accountSettings/settingsItem',
            name: '账户设置子页面',
            component: () =>
                import(`@/components/tabbar/account/accountSettings/settingsItem`),
            children: [
                {
                    path: 'accountAddress',
                    name: '收货地址',
                    component: () =>
                        import(`@/components/tabbar/account/accountSettings/accountAddress`)
                },
                {
                    path: 'accountAddress/addAddress',
                    name: '新增地址',
                    component: () =>
                        import(`@/components/tabbar/account/accountSettings/addAddress`)
                },
                {
                    path: 'accountAddress/addAddress/choiceList',
                    name: '选择列表',
                    component: () => import(`@/multiplexing/choiceList`)
                },
                {
                    path: 'accountSecurity',
                    name: '账户安全',
                    component: () =>
                        import(
                            `@/components/tabbar/account/accountSettings/accountSecurity`
                        )
                },
                {
                    path: 'accountSecurity/editName',
                    name: '修改昵称',
                    component: () =>
                        import(`@/components/tabbar/account/accountSettings/editName`)
                },
                {
                    path: 'accountSecurity/editPhone',
                    name: '修改手机号码',
                    component: () =>
                        import(`@/components/tabbar/account/accountSettings/editPhone`)
                },
                {
                    path: 'accountSecurity/editPhone/acceptOtp',
                    name: '接受验证码',
                    component: () =>
                        import(`@/components/tabbar/account/accountSettings/acceptOtp`)
                },
                {
                    path: 'accountSecurity/editEmail',
                    name: '修改邮箱',
                    component: () =>
                        import(`@/components/tabbar/account/accountSettings/editEmail`)
                },
                {
                    path: 'accountSecurity/editLogpawo',
                    name: '修改登录密码',
                    component: () =>
                        import(`@/components/tabbar/account/accountSettings/editLogpawo`)
                },
                {
                    path: 'accountSecurity/editPaypawo',
                    name: '修改支付密码',
                    component: () =>
                        import(`@/components/tabbar/account/accountSettings/editPaypawo`)
                },
                {
                    path: 'accountSecurity/companyInformation',
                    name: '公司信息',
                    component: () =>
                        import(
                            `@/components/tabbar/account/accountSettings/companyInformation`
                        )
                },
                {
                    path: 'aboutTospino',
                    name: '关于TOSPINO',
                    component: () =>
                        import(`@/components/tabbar/account/accountSettings/aboutTospino`),
                    children: [
                        {
                            path: 'helpCenter',
                            name: '帮助中心',
                            component: () =>
                                import(
                                    `@/components/tabbar/account/accountSettings/aboutItem/helpCenter`
                                )
                        },
                        {
                            path: 'introduce',
                            name: '平台介绍',
                            component: () =>
                                import(
                                    `@/components/tabbar/account/accountSettings/aboutItem/introduce`
                                )
                        },
                        {
                            path: 'privacyPolicy',
                            name: '隐私政策',
                            component: () =>
                                import(
                                    `@/components/tabbar/account/accountSettings/aboutItem/privacyPolicy`
                                )
                        },
                        {
                            path: 'userAgreement',
                            name: '用户协议',
                            component: () =>
                                import(
                                    `@/components/tabbar/account/accountSettings/aboutItem/userAgreement`
                                )
                        }
                    ]
                }
            ]
        },

        {
            path: '/accountBalance',
            name: '账户余额',
            component: () =>
                import(`@/components/tabbar/account/accountBalance/index`)
        },
        {
            path: '/accountBalance/commentDetail',
            name: '评论详情',
            component: () =>
                import(`@/components/tabbar/account/accountBalance/commentDetail`)
        },
        {
            path: '/accountBalance/commentDetail/comment',
            name: '我的评论',
            component: () =>
                import(`@/components/tabbar/account/accountBalance/comment`)
        },
        {
            path: '/accountBalance/accountDetails',
            name: '账户明细',
            component: () =>
                import(`@/components/tabbar/account/accountBalance/accountDetails`)
        },
        //话费充值
        {
            path: '/rechargeIndex',
            name: '话费充值母页',
            component: () => import(`@/multiplexing/router.vue`),
            children: [
                {
                    path: 'recharge',
                    name: '话费充值',
                    component: () =>
                        import(`@/components/tabbar/account/prepaidRefill/recharge`)
                },
                {
                    path: 'recharge/rechargeDetails',
                    name: '话费充值详情',
                    component: () =>
                        import(`@/components/tabbar/account/prepaidRefill/rechargeDetails`)
                },
                {
                    path: 'recharge/rechargeFlow',
                    name: '话费充值记录',
                    component: () =>
                        import(`@/components/tabbar/account/prepaidRefill/rechargeFlow`)
                }
            ]
        },

        {
            path: '/afterSales',
            name: '售后',
            component: () => import(`@/components/tabbar/account/afterSales/index`),
            children: [
                {
                    path: 'afterSalesContent',
                    name: '售后内容',
                    component: () =>
                        import(`@/components/tabbar/account/afterSales/afterSalesContent`)
                },
                {
                    path: 'afterSalesContent/afterSalesDetail',
                    name: '售后详情',
                    component: () =>
                        import(`@/components/tabbar/account/afterSales/afterSalesDetail`)
                },
                {
                    path: 'afterSalesContent/afterSalesDetail/afterSalesSteps',
                    name: '售后流程',
                    component: () =>
                        import(`@/components/tabbar/account/afterSales/afterSalesSteps`)
                }
            ]
        },

        {
            path: '/resembleGood',
            name: '找相似商品',
            component: () =>
                import(`@/components/tabbar/account/favorites/resembleGood`)
        },

        {
            path: '/search',
            name: '搜索',
            component: () => import(`@/components/search/index.vue`),
            children: [
                {
                    path: 'searchRecord',
                    name: '历史记录',
                    component: () => import(`@/components/search/searchRecord.vue`)
                },
                {
                    path: 'noSearch',
                    name: '无搜索商品',
                    component: () => import(`@/components/search/noSearch.vue`)
                },
                {
                    path: 'favorites/goodsList',
                    name: '收藏夹搜索商品',
                    component: () =>
                        import(
                            `@/components/tabbar/account/favorites/itemComponents/searGoodList`
                        )
                },
                {
                    path: 'searchGoodsOne',
                    name: '搜索商品1',
                    component: () => import(`@/components/search/searchGoodsOne.vue`),
                    meta: {
                        keepAlive: true,
                        isBack: true
                    }
                },
                {
                    path: 'favorites/favoriteRecord',
                    name: '收藏夹历史记录',
                    component: () =>
                        import(`@/components/tabbar/account/favorites/favoriteRecord`)
                },
                {
                    path: 'myOrder/searchMyOrder',
                    name: '我的订单历史记录',
                    component: () =>
                        import(`@/components/tabbar/account/myOrder/searchMyOrder`)
                },
                {
                    path: 'myOrder/myOrderGood',
                    name: '我的订单搜索商品',
                    component: () =>
                        import(`@/components/tabbar/account/myOrder/myOrderGood`)
                }
            ]
        },
        {
            path: '/confirmOrder',
            name: '确认订单',
            component: () => import(`@/components/confirmOrder/index.vue`),
            children: [
                {
                    path: 'orderContent',
                    name: '确认订单详情',
                    component: () => import(`@/components/confirmOrder/orderContent.vue`)
                },
                {
                    path: 'confirmSuccess',
                    name: '确认订单提交成功',
                    component: () =>
                        import(`@/components/confirmOrder/confirmSuccess.vue`)
                },
                {
                    path: 'addBankcar',
                    name: '添加银行卡',
                    component: () => import(`@/components/confirmOrder/addBankcar.vue`)
                },
                {
                    path: 'resetPassword',
                    name: '重置支付密码',
                    component: () => import(`@/components/confirmOrder/resetPassword.vue`)
                },
                {
                    path: 'passwordSuccess',
                    name: '支付密码设置成功',
                    component: () =>
                        import(`@/components/confirmOrder/passwordSuccess.vue`)
                },
                {
                    path: 'parrwordOtp',
                    name: '支付密码输入验证码',
                    component: () => import(`@/components/confirmOrder/parrwordOtp.vue`)
                },
                {
                    path: 'orderAddress',
                    name: '确认订单收货地址',
                    component: () => import(`@/components/confirmOrder/orderAddress.vue`)
                }
            ]
        },

        {
            path: '/control/home/homeItem',
            name: '主页子页面',
            component: () => import(`@/components/tabbar/home/homeItem/index.vue`),
            children: [
                {
                    path: 'flashSale',
                    name: '限时抢购',
                    component: () =>
                        import(`@/components/tabbar/home/homeItem/flashSale.vue`)
                }
            ]
        },

        {
            path: '/control',
            name: '控制',
            component: () => import(`@/components/tabbar/person.vue`),
            children: [
                {
                    path: 'home',
                    name: '首页',
                    component: () => import(`@/components/tabbar/home/index.vue`),
                    meta: {
                        keepAlive: true
                    }
                },
                {
                    path: 'classify',
                    name: '分类',
                    component: () => import(`@/components/tabbar/classify/index.vue`),
                    meta: {
                        keepAlive: true
                    }
                },
                {
                    path: 'customerService',
                    name: '客服',
                    component: customerService,
                    meta: {
                        keepAlive: true
                    }
                },
                {
                    path: 'shoppingCart',
                    name: '购物车',
                    component: () => import(`@/components/tabbar/shoppingCart/index.vue`)
                },
                {
                    path: 'account',
                    name: '我的',
                    component: () => import(`@/components/tabbar/account/index.vue`)
                }
            ]
        },
        {
            path: '/favorites',
            name: '收藏夹',
            component: () => import(`@/components/tabbar/account/favorites/index.vue`)
        },

        {
            path: '/language',
            name: '语言',
            component: () => import(`@/components/tabbar/account/language/index`)
        },
        {
            path: '/language/languSubPage',
            name: '语言选择页',
            component: () => import(`@/components/tabbar/account/language/subPage`)
        },

        {
            path: '/information',
            name: '消息',
            component: () => import(`@/components/tabbar/account/information/index`)
        },
        {
            path: '/information/inforDetails',
            name: '消息详情',
            component: () => import(`@/components/tabbar/account/information/details`)
        },

        {
            path: '/sweepCode',
            name: '扫码',
            component: () => import(`@/multiplexing/sweepCode`)
        },
        {
            path: '/thirdSuccess',
            name: '第三方支付页成功',
            component: () => import(`@/components/confirmOrder/thirdSuccess`)
        },
        {
            path: '/thirdLose',
            name: '第三方支付页失败',
            component: () =>
                import(`@/components/confirmOrder/itemComponents/thirdLose.vue`) // @/components/confirmOrder/thirdLose
        },
        // 新增-优惠券
        // {
        //   path: '/afterSalesProgress',
        //   name: '售后进度',
        //   component: () =>
        //     import(`@/components/tabbar/account/afterSales/afterSalesProgress.vue`)
        // },
        {
            path: '/myCoupons',
            name: '优惠券中心',
            component: () =>
                import(`@/components/tabbar/account/coupons/myCoupons.vue`)
        }
        // {
        //   path: '/thirdPartyPayment',
        //   name: '第三方支付页',
        //   component: thirdPartyPayment
        // },
    ]
})
// 解决重复点击导航路由报错
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
