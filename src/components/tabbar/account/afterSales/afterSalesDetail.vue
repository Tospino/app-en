<template>
<!-- 售后详情 -->
    <div class="after-sales-detail">
        <div class="after-sales-status">{{orderStatus(detailData.orderStatusApp,'statusList')}}</div>
        <div class="cell">
            <!-- <div class="cell" @click="jumpRouter('售后流程')"> -->
            <span>Process Record</span>
            <van-icon name="arrow" class="arrow c-999"/>
        </div>
        <div class="good-detail" >
            <div class="good-detail-header">
                <span>Products</span>
            </div>
            <div class="good-detail-content" v-for="(detail,index) in detailData.detailList" :key="index">
                <div class="good-detail-img">
                    <img :src="$webUrl+detail.skuImg">
                </div>
                <div class="good-detail-title">
                    <span class="name">{{detail.skuName}}</span>
                    <div class="guige">{{detail.skuValuesTitleEng}}</div>
                </div>
                <div class="price">
                    <div class="p3">{{detail.currencySignWebsite}}{{detail.priceWebsite}}</div>
                    <div class="p4 fl-right">x{{detail.detailNum}}</div>
                </div>
                <div class="tkje">
                    <span>Refund</span>
                    <span class="fl-right">{{detail.currencySignWebsite}}{{detail.totalPriceWebsite}}</span>
                </div>
            </div>
        </div>
        <div class="address-p4">
            <div class="p4-middle">
                <div class="middle-p1">
                    <span class="c-999 t-left">Reason for refunding:</span>
                    <span class="t-right c-333">{{detailData.reason}}</span>
                </div>
                <div class="middle-p2">
                    <span class="c-999 t-left">Refund No:</span>
                    <span class="t-right c-333">{{detailData.orderSn}}</span>
                </div>
                <div class="middle-p1">
                    <span class="c-999 t-left">Order No:</span>
                    <span class="t-right c-333" id="orderSn">{{detailData.saleOrderSn}}</span>
                    <span class="fl-right c-orange" ref="copy" data-clipboard-action="copy" data-clipboard-target="#orderSn" @click="copyLink">Copy</span>
                </div>
                <div class="middle-p1">
                    <span class="c-999 t-left">Starts from:</span>
                    <span class="t-right c-333">{{detailData.orderAddtimeWebsite}}</span>
                </div>
                <div class="middle-p1">
                    <span class="c-999 t-left">Freight:</span>
                    <span class="t-right c-orange">{{detailData.currencySignWebsite}}{{detailData.orderFareWebsite}}</span>
                </div>
                <div class="middle-p1">
                    <span class="c-999 t-left">Total refund:</span>
                    <span class="t-right c-orange">{{detailData.currencySignWebsite}}{{detailData.orderAmountWebsite}}</span>
                </div>
            </div>
        </div>
        <div class="address-p5">
            <div class="phone-icon">
                <img src="@/assets/img/confirmOrder/phone@2x.png">
            </div>
            <span @click="show2 = true">Dialing</span>
        </div>
        <div class="kongbai"></div>
        <div class="footer" v-if="detailData.orderStatusApp == 0">
            <div class="btn-cxsq" @click="cxsq">Cancel</div>
        </div>

        <van-overlay :show="show2" @click="show2 = false" class="overlay">
            <!-- 客服电话 -->
            <kefu></kefu>
        </van-overlay>

    </div>
</template>

<script>
import kefu from '@/multiplexing/kefu.vue'
import {backorderinfoApi,revokebackorderApi} from '@/api/afterSales/index'
import {Toast} from 'vant'
export default {
    props: {

    },
    data() {
        return {
            arrowDown:true,
            show2:false,
            detailData:{},
            statusList:[
                {type:0,name:'Unapproved'},
                {type:1,name:'Pending Pickup'},
                {type:2,name:'Pending Refund'},
                {type:3,name:'Refunded'},
                {type:4,name:'Refused'},
                {type:5,name:'Canceled'},
            ],
            backTypeList:[
                {type:1,name:'仅退款'},
                {type:2,name:'退货退款'},
            ],
            copyBtn: null, //存储初始化复制按钮事件
        };
    },
    computed: {

    },
    created() {

    },
    mounted() {
        this.backorderinfo(this.$route.query.id)
        this.copyBtn = new this.clipboard(this.$refs.copy)  
    },
    watch: {

    },
    methods: {
        jumpRouter(name){
            this.$router.push({name})
        },
        //售后详情
        backorderinfo(id){
            backorderinfoApi({order_id:id}).then(res => {
                if(res.code == 0){
                    this.detailData = res.Data
                }
            })
        },
        //编译状态
        orderStatus(type,list){
            let name = ''
            this[list].forEach(statu => {
                if(statu.type == type){
                    name = statu.name
                }
            })
            return name
        },
        //撤销申请
        cxsq(){
            this.revokebackorder(this.detailData.orderId)
        },
        revokebackorder(id){
            revokebackorderApi({orderId:id}).then(res => {
                if(res.code == 0){
                    this.backorderinfo(id)
                }else if(res.code == 1){
                    Toast('Parameter “requestModel” cannot be empty.')
                }else if(res.code == 2){
                    Toast('The after-sale order ID must be larger than 0.')
                }else if(res.code == 21){
                    Toast('The after-sale order is nonexistent.')
                }else if(res.code == 22){
                    Toast('The after-sale order isn’t belong to the current user and cannot be operated.')
                }else if(res.code == 23){
                    Toast('The after-sale order is approved and cannot be canceled.')
                }else if(res.code == 24){
                    Toast('The after-sale order is refused and cannot be canceled.')
                }else if(res.code == 25){
                    Toast('The after-sale order is canceled. Do not cancel again.')
                }
            })
        },
        //复制
        copyLink(){
            let _this = this;
            let clipboard = _this.copyBtn;
            clipboard.on('success', function() {
                Toast('Successful copy!')
            });
            clipboard.on('error', function() {
                Toast('Failed! Please choose manual copy!')
            });
        }
    },
    components: {
        kefu
    },
};
</script>

<style scoped lang="less">
.after-sales-detail{
    .after-sales-status{
        height: 150px;
        font-size:46px;
        text-align: center;
        line-height: 150px;
        color: #333;
    }
    .cell{
        height: 88px;
        line-height: 88px;
        padding: 0 30px;
        background-color: #fff;
        color: #333;
        position: relative;
        font-size: 26px;
        margin-bottom: 20px;
        .arrow{
            position: absolute;
            right:30px;
            top:50%;
            transform: translateY(-50%);
            
        }
        .text{
            position: absolute;
            right:60px;
        }
        .text-tk{
            position: absolute;
            right:30px;
        }
        .input-xt{
            margin-left:40px;
            height: 40px;
            border: 0;
        }
    }
    .address-p4{
        background-color: #fff;
        .p4-middle{
            padding:30px;
            border-bottom: 1px solid #F2F3F5;
            font-size: 20px;
            color: #666;
            line-height:45px;
            .t-left{
                display: inline-block;
                width: 260px;
                vertical-align: top;
            }
            .t-right{
                display: inline-block;
                max-width: 350px;
            }
        }
    }
    .address-p5{
        height: 90px;
        background-color: #fff;
        line-height: 90px;
        text-align: center;
        font-size: 26px;
        color: #666;
        .phone-icon{
            width: 40px;
            height: 40px;
            display: inline-block;
            vertical-align: sub;
        }
    }
    .kongbai{
        height: 200px;
    }
    .footer{
        height: 100px;
        width: 100vw;
        background-color: #fff;
        padding: 0 30px;
        line-height: 100px;
        text-align: right;
        position: fixed;
        bottom: 0;
        box-sizing: border-box;
        .btn-cxsq{
            padding: 0 20px;
            height:48px;
            border:1px solid #FA5300;
            display: inline-block;
            text-align: center;
            line-height: 48px;
            color: #FA5300;
            
        }
    }
}
.good-detail{
    .good-detail-header{
        width: 100%;
        height: 79px;
        line-height: 79px;
        font-size:26px;
        color: #333;
        background-color: #fff;
        padding-left: 30px;
        box-sizing: border-box;
        border-bottom: 1px solid #F2F3F5;
        .dfk{
            float: right;
            margin-right: 30px;
        }
    }
    .good-detail-content{
        background-color: #fff;
        padding: 30px 30px;
        position: relative;
        border-bottom: 1px solid #F2F3F5;
        .good-detail-img{
            width: 150px;
            height: 150px;
            display: inline-block;
            margin-right:20px;
            vertical-align: top;
        }
        .good-detail-title{
            display: inline-block;
            width: 336px;
            line-height: 39px;
            .name{
                display: inline-block;
                margin-bottom: 24px;
                color: #333;
                font-size: 22px;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
            }
            .guige{
                color: #999;
                font-size: 18px;
                margin-bottom: 28px;
            }
        }
        .price{
            width: 99px;
            float: right;
            text-align: right;
            font-size: 26px;
            line-height: 39px;
            .p3{
                font-size:26px;
                color: #333;
                margin-bottom: 5px;
            }
            .p4{
                color: #999;
                font-size: 20px;
            }
            .selection-right-stepper{
                position: relative;
                width: 100%;
                height: 156px;
                .add-btn{
                    position: absolute;
                    top:20px;
                    right:0;
                    width: 40px;
                    height: 40px;
                    border: 1px solid #999999;
                    text-align: center;
                    line-height: 40px;
                    background-color: #EEEEEE;
                    color: #666;
                }
                .reduce-btn{
                    position: absolute;
                    top:20px;
                    right:128px;
                    width: 40px;
                    height: 40px;
                    border: 1px solid #999999;
                    text-align: center;
                    line-height: 40px;
                    background-color: #EEEEEE;
                    color: #666;
                }
                .num{
                    position: absolute;
                    top:20px;
                    right:40px;
                    width: 88px;
                    height: 40px;
                    border-top: 1px solid #999999;
                    border-bottom: 1px solid #999999;
                    text-align: center;
                    line-height: 40px;
                }
            }
        }
        .tkje{
            font-size:26px;
            height:40px;
            margin-left:170px;
            line-height: 40px;
        }
    }
}
</style>
