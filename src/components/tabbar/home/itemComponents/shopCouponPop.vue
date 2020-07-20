<template>
  <!-- 商品详情，购物车,优惠券弹框 -->
  <div class="shopCouponPop" v-show="shop">
    <div class="shop-selection">
      <div class="shop-title">
        <div class="shop-txt">Coupons</div>
        <van-icon name="cross" class="cross" @click="close" />
      </div>
      <div class="selection-conten">
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
              <p class="youhuiquan-left-m">{{i.valid}}</p>
              <div v-if="i.btn=='Received'?false:true">
                <progress-bar :progressBar="iSpeed"></progress-bar>
              </div>
            </div>

            <div class="youhuiquan-right">
              <div class="youhuiquan-right-header">
                <span class="youhuiquan-right-title">{{i.title}}</span>
              </div>
              <div class="youhuiquan-right-main">
                <div>For {{i.qianBiao}}{{jn}} {{i.moneys}} consumption</div>
                <van-button
                  style="background: none;border: 0;color:#FEA072 "
                  round disabled
                  v-if="i.btn=='Received'?true:false"
                  type="info"
                  class="youhuiquan-right-btn"
                >{{i.btn}}</van-button>
                <van-button
                  v-else
                  round
                  type="info"
                  @click="ProBar"
                  class="youhuiquan-right-btn"
                >{{i.btn}}</van-button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 判断是否有优惠券 -->
      <!-- <div v-else>
        <no-coupon :imgSrc="imgSrc1" describe="There is no coupons"></no-coupon>
      </div> -->
    </div>
  </div>
</template>

<script>
import progressBar from "@/multiplexing/progress";
// // 无优惠券
// import noCoupon from "@/multiplexing/noCoupon";
// import imgSrc1 from "@/assets/img/coupon/noyouhui@2x.png";
export default {
  name: "shopCouponPop",
  components: {
    progressBar,
    // noCoupon
  },
  props: ["shop"],
  data() {
    return {
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
          btn: "Get it now"
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
          btn: "Received"
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
          btn: "Get more"
        }
      ],
    //   imgSrc1: imgSrc1
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
    // 关闭
    close() {
      this.$emit("shopPop");
    }
  }
};
</script>
<style scoped lang="less">
.shopCouponPop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 50;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: hidden;
  .shop-selection {
    width: 100%;
    background: #fff;
    max-height: 90%;
    position: absolute;
    bottom: 0;
    overflow: auto;

    .shop-title {
      width: 100%;
      height: 89px;
      border-bottom: 2px solid #dcdcdc;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .shop-txt {
        font-size: 36px;
        text-align: center;
        width: 94%;
      }
      .cross {
        flex: 1;
        font-size: 29px;
        color: #666666;
      }
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
          .youhuiquan-right-title {
            font-size: 20px;
            color: #fa5300;
            padding: 10px 30px;
            background: rgba(253, 193, 154, 1);
          }
          .youhuiquan-right-main {
            padding-top: 46px;
            font-size: 24px;
            color: rgba(255, 255, 255, 1);
            .youhuiquan-right-btn {
              margin-top: 15px;
            }
            /deep/ .van-button--info {
              color: #fa5300;
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
}
</style>