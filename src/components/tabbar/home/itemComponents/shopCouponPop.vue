<template>
  <!-- 商品详情，购物车,优惠券弹框 -->
  <div class="shopCouponPop" v-show="shop">
    <div class="shop-selection">
      <div class="shop-title">
        <div class="shop-txt">
          Coupons
          <i class="cross" @click="close">×</i>
        </div>
        <!-- <van-icon name="cross" class="cross" @click="close" /> -->
      </div>
      <div class="selection-conten">
        <div class="youhuiquan-main" v-for="(couponItem,index) in couponShop" :key="index">
          <div v-if="couponItem.drawStatus==0||couponItem.drawStatus==null">
            <img :src="srcUse" />
          </div>
          <div v-else-if="couponItem.drawStatus==3">
            <img :src="srcMore" />
          </div>
          <div class="youhuiquan-box">
            <div class="youhuiquan-left">
              <!-- <span class="youhuiquan-left-biao">GH{{jn}}</span> -->
              <p class="youhuiquan-left-money">
                <span class="youhuiquan-left-biao">GH{{jn}}</span>
                {{ couponItem.reduceAmount}}
                <i>OFF</i>
              </p>
              <p
                class="youhuiquan-left-m"
              >Type:{{couponItem.couponType==1?"Tospino’s Price-off":couponItem.couponType==2?"Newer Exclusives":couponItem.couponType==3?"Shop’s Price-off":couponItem.couponType==4?"Item Price-off":"Item Price-off"}}</p>
              <p
                class="youhuiquan-left-m"
              >Valid:{{couponItem.useBeginWebsite.slice(0,10).split("-").reverse().join('/')}}~{{couponItem.useEndWebsite.slice(0,10).split("-").reverse().join('/')}}</p>
              <div v-if="couponItem.couponType==2?false:true">
                <progress-bar :progressBar="couponItem.claimRate"></progress-bar>
              </div>
            </div>

            <div class="youhuiquan-right">
              <div class="youhuiquan-right-header">
                <!-- v-show="couponItem.drawStatus==1?false:true" -->
                <span class="youhuiquan-right-title">{{couponItem.couponName}}</span>
              </div>
              <div class="youhuiquan-right-main">
                <div>Mini Spend GH{{jn}} {{couponItem.upToAmount!=null?couponItem.upToAmount:couponItem.reduceAmount}}</div>
                <van-button
                  style="background: none;border: 0;color:#FEA072 "
                  round
                  disabled
                  v-if="couponItem.drawStatus==0?true:false"
                  type="info"
                  class="youhuiquan-right-btn"
                >Received</van-button>
                <van-button
                  v-else
                  round
                  type="info"
                  @click="ProBar(couponItem.couponId,couponItem.couponDetailId)"
                  class="youhuiquan-right-btn"
                >{{couponItem.drawStatus==null?"Get it now":couponItem.drawStatus==3?"Get more":"Delete"}}</van-button>
                <!-- {{couponItem.drawStatus==null?"Get it now":couponItem.drawStatus==0?"Use it now":couponItem.drawStatus==1?"Get more":couponItem.drawStatus==2?"Delete":"Delete"}} -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import progressBar from "@/multiplexing/progress";
import { Toast } from "vant";
export default {
  name: "shopCouponPop",
  components: {
    progressBar,
    // noCoupon
  },
  props: {
    shop: {
      type: Boolean,
      default: false,
    },
    couponShop: Array,
  },
  data() {
    return {
      // 未领取和已领取背景
      srcUse: require("@/assets/img/tabbar/home/commodityDetails/youhuiquan@2x.png"),
      // 可领取更多优惠券背景
      srcMore: require("@/assets/img/tabbar/home/commodityDetails/youhuiquan-1@2x.png"),
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 新增-优惠券 进度条
    ProBar(id, couponDetail) {
      let couponsId = {
        couponId: id,
        couponDetailId: couponDetail,
      };
      this.$emit("couponSucceed", couponsId);
    },
    // 关闭
    close() {
      this.$emit("shopPop");
    },
  },
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
      justify-content: center;
      .shop-txt {
        font-size: 36px;
        // text-align: center;
        // width: 94%;
      }
      .cross {
        width: 120px;
        position: absolute;
        right: 10px;
        text-align: center;
        font-size: 36px;
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

        .youhuiquan-left {
          width: 70%;
          padding-top: 16px;
          padding-left: 20px;
          .youhuiquan-left-biao {
            font-size: 25px;
            color: #fa5300;
          }
          .youhuiquan-left-money {
            font-size: 50px;
            font-weight: bold;
            color: #fa5300;
            i {
              font-size: 25px;
              font-weight: normal;
            }
          }
          .youhuiquan-left-m {
            font-size: 18px;
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