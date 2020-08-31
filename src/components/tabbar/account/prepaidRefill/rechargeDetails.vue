<template>
    <div class="recharge-details">
        <balance-header title="Bill Details"></balance-header>
        <div class="recharge-body">
            <p class="h1">- GHS {{rechargeData.prepaidActuallyMoney}}</p>
            <p class="h2">{{orderStatus(rechargeData.paymentStatus,'paymentStatusList')}}</p>
            <div class="field">
                <div class="field-left fl-left">Order No.</div>
                <div class="field-right fl-right">{{rechargeData.prepaidSn}}</div>
            </div>
            <div class="field">
                <div class="field-left fl-left">Phone No.</div>
                <div class="field-right fl-right">{{rechargeData.referalNumber}}</div>
            </div>
            <div class="field">
                <div class="field-left fl-left">Actual transfer</div>
                <div class="field-right fl-right c-orange">GHS {{rechargeData.prepaidMoney}}</div>
            </div>
            <div class="field">
                <div class="field-left fl-left">Payable:</div>
                <div class="field-right fl-right">{{rechargeData.prepaidMoney}}</div>
            </div>
            <div class="field">
                <div class="field-left fl-left">Actually paid:</div>
                <div class="field-right fl-right">{{rechargeData.prepaidActuallyMoney}}</div>
            </div>
            <div class="field">
                <div class="field-left fl-left">Ordered at:</div>
                <div class="field-right fl-right">{{rechargeData.createTime}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import balanceHeader from './itemComponents/balanceHeader'
import {phoneOrderDetailApi} from '@/api/prepaidRefill/index.js'
import {Toast} from 'vant'
export default {
    props: {

    },
    data() {
        return {
            rechargeData:{},
            paymentStatusList:[
                {
                    type:0,
                    name:'Canceled'
                },
                {
                    type:1,
                    name:'Success'
                },
                {
                    type:2,
                    name:'Failed'
                }
            ]
        };
    },
    computed: {

    },
    created() {

    },
    mounted() {
        this.phoneOrderDetail(this.$route.query.id)
    },
    watch: {

    },
    methods: {
        //话费充值订单详情
        phoneOrderDetail(id){
            phoneOrderDetailApi({prepaidId:id}).then(res => {
                if(res.status_code == 200){
                    this.rechargeData = res.data
                    Toast.clear()
                }else{
                    Toast('error')
                }
            })
        },
        //编译状态
        orderStatus(type, list) {
            let name = "";
            this[list].forEach(statu => {
                if (statu.type == type) {
                    name = statu.name;
                }
            });
            return name;
        },
    },
    components: {
        balanceHeader
    },
};
</script>

<style scoped lang="less">
.recharge-details{
    background-color: #fff;
    height: 100vh;
    .recharge-body{
        padding: 70px 30px 0;
        .h1{
            font-size:46px;
            color: #333;
            font-weight:bold;
            text-align: center;
        }
        .h2{
            margin:22px 0 87px;
            font-size:26px;
            text-align: center;
        }
        .field{
            height: 65px;
            font-size: 28px;
            .field-left{
                color: #999;

            }
        }
    }
}
</style>
