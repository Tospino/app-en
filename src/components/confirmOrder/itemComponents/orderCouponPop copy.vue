<template>
  <!-- 订单优惠券弹框 -->
  <div class="orderCouponPop" v-show="order">
    <div class="order-selection">
      <div class="order-title">
        <div class="order-txt">Coupons</div>
        <van-icon name="cross" class="cross" @click="close" />
      </div>
      <div class="order-tab" v-if="true">
        <van-tabs v-model="active" class="tab-list" title-active-color="#FA5300">
          <van-tab title="Available(5)"></van-tab>
          <van-tab title="Not Applicable(5)"></van-tab>
        </van-tabs>
      </div>
      <div class="selection-conten">
        <!-- 可领取优惠券 -->
        <div v-if="active==0">
          <div class="youhuiquan-item item-one" v-for="i in coupon" :key="i.drawId">
            <div class="youhuiquan-left left-one">
              <span class="youhuiquan-left-biao biao-one">GH{{jn}}</span>
              <p class="youhuiquan-left-money money-one">
                {{i.reduceAmountWebsite}}
                <i>OFF</i>
              </p>
              <div class="youhuiquan-left-ms">
                <p class="youhuiquan-left-m m-one">Type:{{i.couponTypeNameEng}}</p>
                <p class="youhuiquan-left-m m-one">valid:{{i.useEndWebsite}}</p>
              </div>
              <progress-bar :progressBar="i.drawPercent"></progress-bar>
              <!-- 根据后台判断是否是新用户 -->
              <!-- <div v-show="btnBox">
                <progress-bar :progressBar="iSpeed"></progress-bar>
              </div>-->
            </div>
            <div class="youhuiquan-right">
              <div class="youhuiquan-right-header">
                <span class="youhuiquan-right-title right-title-one">{{i.couponName}}</span>
              </div>
              <div class="youhuiquan-right-main right-main-one">
                <p
                  class="youhuiquan-left-mc mc-one"
                  v-if="i.upToAmountWebsite==null?false:true"
                >For GH {{jn}} {{i.upToAmountWebsite}} consumption</p>
                <van-button
                  v-if="i.canDraw==0?0:1"
                  round
                  type="info"
                  @click="ProBar(i.couponId,i.couponDetailId)"
                  class="youhuiquan-right-btn"
                >Get it now</van-button>
                <div v-else class="checkedBox">
                  <van-checkbox
                    v-model="i.isSelected"
                    :disabled="i.canSelect==0?true:false"
                    checked-color="#FA5300"
                    @click="changeCheckbox(i.drawId,i.isSelected)"
                  ></van-checkbox>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 不可领取 -->
        <!-- <div
          v-else-if="active==1"
          class="youhuiquan-two"
          v-for="(i,index) in orderCoupon"
          :key="index"
        >
          <div class="youhuiquan-item item-two">
            <div class="youhuiquan-left left-two">
              <span class="youhuiquan-left-biao">{{i.qianBiao}}{{jn}}</span>
              <p class="youhuiquan-left-money">
                {{i.money}}
                <i>{{i.off}}</i>
              </p>
              <div class="youhuiquan-left-ms">
                <p class="youhuiquan-left-m">{{i.type}}</p>
                <p class="youhuiquan-left-m">{{i.valid}}</p>
              </div>
            </div>
            <div class="youhuiquan-right">
              <div class="youhuiquan-right-header">
                <span class="youhuiquan-right-title right-title-two">{{i.title}}</span>
              </div>
              <div class="youhuiquan-right-main">
                <p class="youhuiquan-left-mc">For {{i.qianBiao}}{{jn}} {{i.moneys}} consumption</p>
              </div>
            </div>
          </div>
          <div class="youhuiquan-reason">
            <span class="reason-title">Reason for unavailability:</span>
            <p
              class="reason-content"
            >Reason why goods are not available Reason why goods are not available Reason why goods are not available.</p>
          </div>
        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
import progressBar from "@/multiplexing/progress";
import { mapState } from "vuex";
import {
  getconfirmorderApi,
  couponDrawApi,
  couponRemoveApi,
} from "@/api/confirmOrder/index";
export default {
  name: "orderCouponPop",
  components: {
    progressBar,
  },
  props: ["order"],
  data() {
    return {
      active: 0,
      orderCouponDraw: "",
      drawPercent: "",
      canDraw: "",
      couponList: [],
    };
  },
  computed: {
    // 语法糖
    ...mapState({
      coupon: (state) => state.coupons,
      // orderDetail: state => state.orderDetails
    }),
  },
  watch: {},
  created() {
    // this.orderCoupon(this.orderDetail);
  },
  mounted() {},
  methods: {
    // orderCoupon(order) {
    //   getconfirmorderApi(order).then(res => {
    //     if (res.code == 0) {
    //       this.$store.state.coupons = res.Data.couponList;
    //     }
    //   });
    // },

    // 新增-优惠券 只能领取一次
    ProBar(data, detail) {
      let couponsData = {
        couponId: data,
        couponDetailId: detail,
      };

      couponDrawApi(couponsData).then((res) => {
        // if (res.code == 0) {
        //   // this.orderCoupon.forEach(i => {
        //   //   if (data == i.couponId) {
        //   //     this.drawPercent = i.drawPercent = i.drawPercent + 0.01;
        //   //     this.canDraw = i.canDraw = 0;
        //   //     this.checked = i.isSelected == 0 ? 0 : 1;
        //   //   }
        //   // });
        // }
      });
    },
    // 选择优惠券
    changeCheckbox(item, val) {
      val != val;
      this.couponremove(item);
    },

    // 选择已经选用和删除
    couponremove(move) {
      let couponsMove = {
        drawId: move,
      };
      // couponRemoveApi(couponsMove).then(res => {
      //   console.log(res, "jjaa");
      // });
    },

    // 关闭
    close() {
      this.$emit("orderPop");
    },
  },
};
</script>
<style scoped lang="less">
.orderCouponPop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 50;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: hidden;
  .order-selection {
    width: 100%;
    background: #fff;
    max-height: 90%;
    position: absolute;
    bottom: 0;
    overflow: auto;

    .order-title {
      width: 100%;
      height: 89px;
      border-bottom: 2px solid #dcdcdc;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .order-txt {
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
  .order-tab {
    /deep/ .van-tabs__wrap {
      padding: 28px 0;
    }
    /deep/ .van-tab {
      font-size: 26px;
    }
    /deep/ .van-tabs__line {
      background-color: #fff;
    }
  }
  .selection-conten {
    overflow: hidden;
    padding: 0 20px 100px 20px;
    .item-one {
      background: #fff3eb;
      .biao-one {
        color: #fa5300;
      }
      .left-one {
        padding: 20px 0 16px 20px;
      }
      .money-one {
        color: #fa5300;
      }
      .m-one {
        color: #fa5300;
      }
    }
    .item-two {
      color: #fff;
      background: #e9e9e9;
      border-radius: 10px;
      .left-two {
        padding: 20px 0 50px 20px;
      }
    }
    .youhuiquan-two {
      background: rgba(244, 244, 244, 1);
      border-radius: 10px;
      .youhuiquan-reason {
        padding: 17px 20px;
        font-size: 20px;
        .reason-title {
          color: #626262;
        }
        .reason-content {
          padding-top: 10px;
          color: #8e8e8e;
        }
      }
    }
    .youhuiquan-item {
      display: flex;
      margin-top: 15px;
      .youhuiquan-left {
        width: 46%;
        .youhuiquan-left-biao {
          font-size: 25px;
        }
        .youhuiquan-left-money {
          font-size: 60px;
          font-weight: bold;
          i {
            font-size: 25px;
            font-weight: normal;
          }
        }
        .youhuiquan-left-m {
          font-size: 20px;
          padding-top: 6px;
        }
      }
    }
    .youhuiquan-right {
      width: 54%;
      text-align: center;

      .right-title-one {
        color: #fa5300;
        background: rgba(253, 193, 154, 1);
      }
      .right-main-one {
        color: rgba(255, 255, 255, 1);
        .mc-one {
          color: #fa5300;
        }
      }

      .right-title-two {
        background: rgba(206, 206, 206, 1);
      }

      .youhuiquan-right-header {
        margin-top: 11px;
      }
      .youhuiquan-right-title {
        font-size: 20px;
        padding: 10px 30px;
      }
      .youhuiquan-right-main {
        padding-top: 30px;
        font-size: 24px;

        .youhuiquan-left-mc {
          font-size: 24px;
          padding-top: 6px;
        }
        .youhuiquan-right-btn {
          margin-top: 30px;
        }
        /deep/ .van-button--info {
          color: #fff;
          background: #fa5300;
          border: 1px solid #fff;
          font-size: 30px;
          padding: 30px 42px;
        }
        /deep/ .van-button {
          line-height: 0;
        }
        .checkedBox {
          padding-top: 20px;
          padding-left: 80%;
        }
        /deep/ .van-checkbox__icon {
          font-size: 40px;
        }
      }
    }
  }
}
</style>