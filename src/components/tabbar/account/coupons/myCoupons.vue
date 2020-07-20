<template>
  <!-- 我的-优惠券中心 -->
  <div class="my-coupons">
    <balance-header title="My Coupons"></balance-header>
    <div class="order-tab" v-if="true">
      <van-tabs v-model="active" class="tab-list" title-active-color="#FA5300">
        <van-tab title="Available"></van-tab>
        <van-tab title="Used"></van-tab>
        <van-tab title="Expired"></van-tab>
      </van-tabs>
    </div>
    <div class="selection-conten" v-if="active==0">
      <div class="youhuiquan-main" v-for="(i,index) in shopCoupon" :key="index">
        <img :src="i.src" />
        <div class="youhuiquan-box">
          <div class="youhuiquan-left">
            <span class="youhuiquan-left-biao">{{i.qianBiao}}{{jn}}</span>
            <p class="youhuiquan-left-money">
              {{ i.money}}
              <i>{{i.off}}</i>
            </p>
            <p class="youhuiquan-left-m">{{i.type}}</p>
            <p class="youhuiquan-left-m">{{i.brand}}</p>
            <p class="youhuiquan-left-m">{{i.valid}}</p>
            <div v-if="i.btn=='Use it now'?i.bol:i.btn">
              <progress-bar :progressBar="iSpeed"></progress-bar>
            </div>
          </div>

          <div class="youhuiquan-right">
            <div class="youhuiquan-right-header">
              <span
                class="youhuiquan-right-title right-title-a"
                v-show="i.btn=='Use it now'?i.bol:i.btn"
              >{{i.title}}</span>
            </div>
            <div class="youhuiquan-right-main">
              <div>For {{i.qianBiao}}{{jn}} {{i.moneys}} consumption</div>
              <van-button
                round
                type="info"
                @click="ProBar"
                class="youhuiquan-right-btn right-btn-a"
              >{{i.btn}}</van-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="selection-conten" v-else-if="active==1">
      <div class="youhuiquan-main" v-for="(i,index) in shopCouponUsed" :key="index">
        <img :src="i.src" />
        <div class="youhuiquan-box">
          <div class="youhuiquan-left">
            <span class="youhuiquan-left-biao">{{i.qianBiao}}{{jn}}</span>
            <p class="youhuiquan-left-money">
              {{ i.money}}
              <i>{{i.off}}</i>
            </p>
            <p class="youhuiquan-left-m">{{i.type}}</p>
            <p class="youhuiquan-left-m">{{i.brand}}</p>
            <p class="youhuiquan-left-m">{{i.valid}}</p>
          </div>

          <div class="youhuiquan-right">
            <div class="youhuiquan-right-header">
              <span class="youhuiquan-right-title right-title-b">{{i.title}}</span>
            </div>
            <div class="youhuiquan-right-main">
              <div>For {{i.qianBiao}}{{jn}} {{i.moneys}} consumption</div>
              <van-button
                round
                type="info"
                @click="usedDel"
                class="youhuiquan-right-btn right-btn-b"
              >{{i.btn}}</van-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="selection-conten" v-else-if="active==2">
      <div class="youhuiquan-main" v-for="(i,index) in shopCouponEx" :key="index">
        <img :src="i.src" />
        <div class="youhuiquan-box">
          <div class="youhuiquan-left">
            <span class="youhuiquan-left-biao">{{i.qianBiao}}{{jn}}</span>
            <p class="youhuiquan-left-money">
              {{ i.money}}
              <i>{{i.off}}</i>
            </p>
            <p class="youhuiquan-left-m">{{i.type}}</p>
            <p class="youhuiquan-left-m">{{i.brand}}</p>
            <p class="youhuiquan-left-m">{{i.valid}}</p>
          </div>

          <div class="youhuiquan-right">
            <div class="youhuiquan-right-header">
              <span class="youhuiquan-right-title right-title-b">{{i.title}}</span>
            </div>
            <div class="youhuiquan-right-main">
              <div>For {{i.qianBiao}}{{jn}} {{i.moneys}} consumption</div>
              <van-button
                round
                type="info"
                @click="expiredDel"
                class="youhuiquan-right-btn right-btn-b"
              >{{i.btn}}</van-button>
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
import balanceHeader from "./itemComponents/balanceHeader";
import progressBar from "@/multiplexing/progress";
// // 无优惠券
import noCoupon from "@/multiplexing/noCoupon";
import imgSrc1 from "@/assets/img/coupon/noyouhui@2x.png";
export default {
  components: { balanceHeader, progressBar, noCoupon },
  props: {},
  data() {
    return {
      active: 0,
      iSpeed: 0,
      shopCoupon: [
        {
          src: require("@/assets/img/tabbar/home/commodityDetails/youhuiquan@2x.png"),
          qianBiao: "GH",
          money: "10.00",
          off: "OFF",
          type: "Type:Shop Coupons",
          valid: "Valid:06/30/2020 23:59",
          title: "Black Friday Black Black",
          moneys: "1000.00",
          btn: "Get it now",
          bol: false
        },
        {
          src: require("@/assets/img/tabbar/home/commodityDetails/youhuiquan@2x.png"),
          qianBiao: "GH",
          money: "10.00",
          off: "OFF",
          type: "Type:Shop Coupons",
          brand: "Tospino member",
          valid: "Valid:06/30/2020 23:59",
          title: "Black Friday Black Black",
          moneys: "1000.00",
          btn: "Use it now",
          bol: false
        },
        {
          src: require("@/assets/img/tabbar/home/commodityDetails/youhuiquan-1@2x.png"),
          qianBiao: "GH",
          money: "10.00",
          off: "OFF",
          type: "Type:Shop Coupons",
          valid: "Valid:06/30/2020 23:59",
          title: "Black Friday Black Black",
          moneys: "1000.00",
          btn: "Get more",
          bol: false
        }
      ],
      shopCouponUsed: [
        {
          src: require("@/assets/img/tabbar/home/commodityDetails/youhuiquan-del@2x.png"),
          qianBiao: "GH",
          money: "10.00",
          off: "OFF",
          type: "Type:Shop Coupons",
          valid: "Valid:06/30/2020 23:59",
          title: "Black Friday Black Black",
          moneys: "1000.00",
          btn: "Delete"
        }
      ],
      shopCouponEx: [
        {
          src: require("@/assets/img/tabbar/home/commodityDetails/youhuiquan-del@2x.png"),
          qianBiao: "GH",
          money: "10.00",
          off: "OFF",
          type: "Type:Shop Coupons",
          valid: "Valid:06/30/2020 23:59",
          title: "Black Friday Black Black",
          moneys: "1000.00",
          btn: "Delete"
        }
      ],
      imgSrc1: imgSrc1
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 新增-优惠券 进度条
    ProBar() {
      if (this.iSpeed != 100) {
        this.iSpeed++;
      }
    },
    // 删除使用优惠券
    usedDel() {
      this.shopCouponUsed.splice(0, 1);
    },
    expiredDel() {
      this.shopCouponEx.splice(0, 1);
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
          font-size: 25px;
          color: #fa5300;
        }
        .youhuiquan-left-money {
          font-size: 60px;
          font-weight: bold;
          color: #fa5300;
          i {
            font-size: 25px;
            font-weight: normal;
          }
        }
        .youhuiquan-left-m {
          font-size: 25px;
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