<template>
  <!-- 我的-优惠券中心 -->
  <div class="my-coupons">
    <balance-header title="My Coupons"></balance-header>
    <div class="order-tab" v-if="true">
      <van-tabs
        v-model="active"
        class="tab-list"
        title-active-color="#FA5300"
        @click="userDrawCoupon(active)"
      >
        <van-tab title="Available"></van-tab>
        <van-tab title="Used"></van-tab>
        <van-tab title="Expired"></van-tab>
      </van-tabs>
    </div>
    <div class="selection-conten" v-if="active==0">
      <div class="youhuiquan-main" v-for="shops in shopCoupon" :key="shops.couponId">
        <div v-if="shops.drawStatus==0||shops.drawStatus==null">
          <img :src="srcUse" />
        </div>
        <div v-else-if="shops.drawStatus==1">
          <img :src="srcMore" />
        </div>
        <div v-else-if="shops.drawStatus==2">
          <img :src="srcDel" />
        </div>
        <div class="youhuiquan-box">
          <div class="youhuiquan-left">
            <span class="youhuiquan-left-biao">GH{{jn}}</span>
            <p class="youhuiquan-left-money">
              {{ shops.reduceAmount}}
              <i>OFF</i>
            </p>
            <p
              class="youhuiquan-left-m"
            >Type:{{shops.couponType==1?"Tospino’s Price-off":shops.couponType==2?"Newer Exclusives":shops.couponType==3?"Shop’s Price-off":shops.couponType==4?"Item Price-off":"Item Price-off"}}</p>
            <!-- <p class="youhuiquan-left-m">{{}}</p> -->
            <p class="youhuiquan-left-m">Valid:{{shops.useEndWebsite}}</p>
            <div v-if="shops.couponType==2?false:true">
              <progress-bar :progressBar="shops.userMaxDrawNumed"></progress-bar>
            </div>
          </div>

          <div class="youhuiquan-right">
            <div class="youhuiquan-right-header">
              <span
                class="youhuiquan-right-title right-title-a"
                v-show="shops.drawStatus==1?false:true"
              >{{shops.couponName}}</span>
            </div>
            <div class="youhuiquan-right-main">
              <div>For GH{{jn}} {{shops.upToAmount}} consumption</div>
              <van-button
                round
                type="info"
                @click="ProBar(shops.couponId,shops.couponDetailId,shops.couponType,shops.businessId,shops.expIds,shops.skuId)"
                class="youhuiquan-right-btn right-btn-a"
              >{{shops.drawStatus==null?"Get it now":shops.drawStatus==0?"Use it now":shops.drawStatus==1?"Get more":shops.drawStatus==2?"Delete":"Delete"}}</van-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="selection-conten" v-else-if="active==1">
      <div class="youhuiquan-main" v-for="shopone in shopCouponUsed" :key="shopone.couponId">
        <img :src="srcDel" />
        <div class="youhuiquan-box">
          <div class="youhuiquan-left">
            <span class="youhuiquan-left-biao">GH{{jn}}</span>
            <p class="youhuiquan-left-money">
              {{shopone.reduceAmount}}
              <i>OFF</i>
            </p>
            <p
              class="youhuiquan-left-m"
            >Type:{{shopone.couponType==1?"Tospino’s Price-off":shopone.couponType==2?"Newer Exclusives":shopone.couponType==3?"Shop’s Price-off":shopone.couponType==4?"Item Price-off":"Item Price-off"}}</p>
            <p class="youhuiquan-left-m">Valid:{{shopone.useEndWebsite}}</p>
          </div>

          <div class="youhuiquan-right">
            <div class="youhuiquan-right-header">
              <span
                class="youhuiquan-right-title right-title-a"
                v-show="shopone.drawStatus==1?false:true"
              >{{shopone.couponName}}</span>
            </div>
            <div class="youhuiquan-right-main">
              <div>For GH{{jn}} {{shopone.upToAmount}} consumption</div>
              <van-button
                round
                type="info"
                @click="usedDel(shopone.drawId)"
                class="youhuiquan-right-btn right-btn-b"
              >{{shopone.drawStatus==null?"Get it now":shopone.drawStatus==0?"Use it now":shopone.drawStatus==1?"Get more":shopone.drawStatus==2?"Delete":"Delete"}}</van-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="selection-conten" v-else-if="active==2">
      <div class="youhuiquan-main" v-for="shopDel in shopCouponEx" :key="shopDel.couponId">
        <img :src="srcDel" />
        <div class="youhuiquan-box">
          <div class="youhuiquan-left">
            <span class="youhuiquan-left-biao">GH{{jn}}</span>
            <p class="youhuiquan-left-money">
              {{ shopDel.reduceAmount}}
              <i>OFF</i>
            </p>
            <p
              class="youhuiquan-left-m"
            >Type:{{shopDel.couponType==1?"Tospino’s Price-off":shopDel.couponType==2?"Newer Exclusives":shopDel.couponType==3?"Shop’s Price-off":shopDel.couponType==4?"Item Price-off":"Item Price-off"}}</p>
            <p class="youhuiquan-left-m">Valid:{{shopDel.useEndWebsite}}</p>
          </div>

          <div class="youhuiquan-right">
            <div class="youhuiquan-right-header">
              <span
                class="youhuiquan-right-title right-title-b"
                v-show="shopDel.drawStatus==1?false:true"
              >{{shopDel.couponName}}</span>
            </div>
            <div class="youhuiquan-right-main">
              <div>For GH{{jn}} {{shopDel.upToAmount}} consumption</div>
              <van-button
                round
                type="info"
                @click="expiredDel(shopDel.drawId)"
                class="youhuiquan-right-btn right-btn-b"
              >{{shopDel.drawStatus==null?"Get it now":shopDel.drawStatus==0?"Use it now":shopDel.drawStatus==1?"Get more":shopDel.drawStatus==2?"Delete":"Delete"}}</van-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 判断是否有优惠券 -->
    <div
      v-if="active==0?shopCoupon.length==0: active==1?shopCouponUsed.length==0: active==2?shopCouponEx.length==0:shopCouponEx.length==0"
    >
      <no-coupon :imgSrc="imgSrc1" describe="There is no coupons"></no-coupon>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import balanceHeader from "./itemComponents/balanceHeader";
import progressBar from "@/multiplexing/progress";
// // 无优惠券
import noCoupon from "@/multiplexing/noCoupon";
import imgSrc1 from "@/assets/img/coupon/noyouhui@2x.png";
import {
  APPgetuserallCouponListApi,
  APPgetuserallcouponlistexpireApi
} from "@/api/accountBalance/index.js";
import { couponDrawApi, couponRemoveApi } from "@/api/confirmOrder/index";
export default {
  components: { balanceHeader, progressBar, noCoupon },
  props: {},
  data() {
    return {
      active: 0,
      // 未领取和已领取背景
      srcUse: require("@/assets/img/tabbar/home/commodityDetails/youhuiquan@2x.png"),
      // 可领取更多优惠券背景
      srcMore: require("@/assets/img/tabbar/home/commodityDetails/youhuiquan-1@2x.png"),
      shopCoupon: [], //全部优惠券
      // 删除背景图
      srcDel: require("@/assets/img/tabbar/home/commodityDetails/youhuiquan-del@2x.png"),
      shopCouponUsed: [], //已使用优惠券
      shopCouponEx: [], //已过期优惠券
      imgSrc1: imgSrc1, //没有券背景图
      userDraw: "", //已过期和已使用
      drawItem: ""
    };
  },
  computed: {},
  watch: {},
  created() {
    this.userallCoupon();
  },
  mounted() {},
  methods: {
    // 全部优惠券
    userallCoupon() {
      let userall = {
        page: 1,
        limit: 100,
        usetype: 1
      };
      APPgetuserallCouponListApi(userall).then(res => {
        if (res.code == 0) {
          let drawItem = res.Data.list.forEach(item => {
            return item.drawStatus != 2;
          });
          if (drawItem) {
            this.shopCoupon = res.Data.list;
          }
        }
      });
    },
    // 已过期和已使用
    userDrawCoupon(move) {
      if (move == 1) {
        this.userDraw = {
          page: 1,
          limit: 10,
          usetype: 2
        };
        APPgetuserallcouponlistexpireApi(this.userDraw).then(res => {
          if (res.code == 0) {
            this.shopCouponUsed = res.Data.list;
          }
        });
      } else if (move == 2) {
        this.userDraw = {
          page: 1,
          limit: 10,
          usetype: 3
        };
        APPgetuserallcouponlistexpireApi(this.userDraw).then(res => {
          if (res.code == 0) {
            this.shopCouponEx = res.Data.list;
          }
        });
      }
    },
    // 新增-优惠券 进度条
    ProBar(id, couponDetail, couponType, businessId, expIds, skuId) {
      console.log(skuId, "youhuiquan-box");
      // 判断优惠券平台跳转
      if (couponType == 1 || couponType == 2) {
        this.$router.push({ name: "搜索商品1" });
      } else if (couponType == 3) {
        // 商家满减券 传businessId，expIds
        this.$router.push({
          name: "搜索商品1",
          query: { businessId: businessId, expIds: expIds }
        });
      } else {
        // 等于4则传 skuId
        this.$router.push({ name: "商品详情", query: { skuId: skuId } });
      }
      let couponsId = {
        couponId: id,
        couponDetailId: couponDetail
      };
      // 点击领取优惠券
      couponDrawApi(couponsId).then(res => {
        if (res.code != 0) {
          Toast(res.msg);
        }
      });
    },

    // 删除使用优惠券
    usedDel(delId) {
      // this.shopCouponUsed.splice(0, 1);
      let delIds = {
        drawId: delId
      };
      couponRemoveApi(delIds).then(res => {
        console.log(res, "aaa7");
      });
    },
    expiredDel(delId) {
      let delIds = {
        drawId: delId
      };
      couponRemoveApi(delIds).then(res => {
        console.log(res, "aaa7");
      });
      // this.shopCouponEx.splice(0, 1);
    }
  }
};
</script>
<style scoped lang="less">
.order-tab {
  /deep/ .van-tabs__wrap {
    height: 80px;
  }
  /deep/ .van-tab {
    font-size: 26px;
    line-height: 80px;
  }
  /deep/ .van-tabs__line {
    background-color: #fff;
    display: none;
  }
}
.selection-conten {
  overflow: hidden;
  padding: 20px 40px 100px;
  .youhuiquan-main {
    max-width: 100%;
    height: 210px;
    margin-top: 15px;
    overflow: hidden;
    .youhuiquan-box {
      display: flex;
      position: relative;
      top: -209px;
      left: 20px;

      .youhuiquan-left {
        width: 40%;
        padding-top: 16px;
        .youhuiquan-left-biao {
          font-size: 12px;
          color: #fa5300;
        }
        .youhuiquan-left-money {
          font-size: 50px;
          font-weight: bold;
          color: #fa5300;
          i {
            font-size: 14px;
            font-weight: normal;
          }
        }
        .youhuiquan-left-m {
          font-size: 12px;
          color: #333;
          line-height: 34px;
        }
      }

      .youhuiquan-right {
        width: 57%;
        text-align: center;
        .youhuiquan-right-header {
          margin-top: 11px;
        }
        .right-title-a {
          color: #fa5300;
          background: rgba(253, 193, 154, 1);
        }
        .right-title-b {
          color: #fff;
          background: #cecece;
        }
        .youhuiquan-right-title {
          font-size: 20px;
          padding: 10px 30px;
        }
        .youhuiquan-right-main {
          padding-top: 46px;
          font-size: 24px;
          color: rgba(255, 255, 255, 1);
          .right-btn-a {
            color: #fa5300;
          }
          .right-btn-b {
            color: #999999;
          }
          .youhuiquan-right-btn {
            margin-top: 15px;
          }
          /deep/ .van-button--info {
            background: #fff;
            border: 1px solid #fff;
            font-size: 30px;
            font-weight: bold;
            padding: 30px 42px;
          }
          /deep/ .van-button {
            // height: 0;
            line-height: 0;
          }
        }
      }
    }
  }
}
</style>