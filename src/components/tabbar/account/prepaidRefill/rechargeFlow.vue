<template>
    <div class="recharge-flow">
        <balance-header title="Records"></balance-header>
        <div v-if="billList.length > 0">
            <div class="tips">
                <div class="fl-left"> Yearly records</div>
                <div class="fl-right">Total GHS {{allMoney}}</div>
            </div>
            <div class="flow-con">
                <div class="flow-bill" v-for="(billItem,index) in billList" :key="index" @click="toDetail(billItem.prepaidId)">
                    <img src="@/assets/img/confirmOrder/huafei.png">
                    <div class="bill-p1">
                        <div class="fl-left">Phone No.:{{billItem.referalNumber}}</div>
                        <div class="fl-right">GHS {{billItem.prepaidActuallyMoney}}</div>
                    </div>
                    <div class="bill-p1">
                        <div class="fl-left">Actual transfer:GHS {{billItem.prepaidMoney}}</div>
                        <div class="fl-right">{{orderStatus(billItem.paymentStatus,'paymentStatusList')}}</div>
                    </div>
                    <div class="bill-p2">{{billItem.createTime}}</div>
                    <div class="del-btn fl-right" @click.stop="deleteItem(billItem.prepaidId)">Delete</div>
                </div>
            </div>
            <div class="place"></div>
        </div>
        <div class="no-list" v-else>No record</div>
        
        
        <zhezhao v-if="zhezhaoStatus">
            <div class="tankuang">
                <div class="tankuang-title">
                    <span>Tips</span>
                    <div class="fl-right">
                        <van-icon name="cross" @click="zhezhaoStatus = false"/>
                    </div>
                </div>
                <div class="tankuang-con">
                    <p>Delete it?(record cannot be recovered after deletion)</p>
                    <div class="btn-list">
                        <div class="fl-left qx" @click="zhezhaoStatus = false">Cancel</div>
                        <div class="fl-right qd" @click="confirm">Confirm</div>
                    </div>
                </div>
            </div>
        </zhezhao>
    </div>
</template>

<script>
import balanceHeader from './itemComponents/balanceHeader'
import {phoneOrderListApi,deleteRecordApi} from '@/api/prepaidRefill/index.js'
import {Toast} from 'vant'
export default {
    props: {

    },
    data() {
        return {
            zhezhaoStatus:false,
            userinfoShop:{},
            billList:[],
            allMoney:null,
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
            ],
            currentId:null
        };
    },
    computed: {

    },
    created() {

    },
    mounted() {
        
        if(localStorage.userinfoShop){
            this.userinfoShop =  JSON.parse(localStorage.userinfoShop)
        }
        this.phoneOrderList(this.userinfoShop.userId)
    },
    watch: {

    },
    methods: {
        //删除按钮
        deleteItem(id){
            this.zhezhaoStatus = true
            this.currentId = id
        },
        //确地按钮
        confirm(){
            this.zhezhaoStatus = false
            this.deleteRecord(this.currentId)
            // this.billList.splice(this.currentIndex,1)
        },
        //到详情页
        toDetail(id){
            this.$router.push({name:'话费充值详情',query:{id}})
        },
        //话费充值订单列表
        phoneOrderList(id){
            phoneOrderListApi({userId:id}).then(res => {
                if(res.status_code == 200){
                    this.allMoney = res.data.allMoney
                    this.billList = res.data.list
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
        //删除话费充值订单
        deleteRecord(prepaidId){
            deleteRecordApi({prepaidId}).then(res => {
                if(res.status_code == 200){
                    this.phoneOrderList(this.userinfoShop.userId)
                    Toast.clear()
                }else{
                    Toast('error')
                }
            })
        }
    },
    components: {
        balanceHeader
    },
};
</script>

<style scoped lang="less">
.recharge-flow{
    .tips{
        font-size:24px;
        font-weight:800;
        color: #333;
        padding: 0 30px;
        margin:23px 0 34px;
        overflow: hidden;
    }
    .flow-con{
        .flow-bill{
            padding: 30px;
            background-color: #fff;
            line-height:27px;
            overflow: hidden;
            img{
                width: 44px;
                height: 44px;
                float: left;
            }
            .bill-p1{
                overflow: hidden;
                font-size:24px;
                margin-bottom: 11px;
                color: #333;
            }
            .bill-p2{
                font-size: 20px;
                color: #666;
                margin-left:44px;
            }
            .del-btn{
                padding: 10px 30px;
                border:1px solid rgba(102,102,102,1);
                border-radius:20px;
            }
        }
    }
    .tankuang{
        width: 560px;
        height: 360px;
        background-color: #fff;
        position: absolute;
        top:50%;
        left:50%;
        transform: translate(-50%,-50%);
        .tankuang-title{
            height: 100px;
            border-bottom: 1px solid #D4D5D7;
            line-height: 100px;
            font-size: 36px;
            font-weight:bold;
            color: #333;
            padding: 0 34px 0 40px;
        }
        .tankuang-con{
            padding-top: 60px;
            font-size: 28px;
            .btn-list{
                padding: 0px 80px;
                .qx{
                    padding: 15px 40px;
                    color: #999;
                    text-align: center;
                    border:1px solid rgba(153,153,153,1);
                }
                .qd{
                    padding: 15px 40px;
                    color: #fff;
                    text-align: center;
                    background:rgba(250,83,0,1);
                }
            }
            p{
                color: #333;
                margin-bottom: 40px;
                text-align: center;
            }
            
        }
    }
    .no-list{
        text-align: center;
        margin-top:50%;
        font-size:24px;
        color: #666;
    }
}
</style>
