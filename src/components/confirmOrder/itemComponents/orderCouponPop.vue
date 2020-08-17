<!--
 * @Author: your name
 * @Date: 2020-07-20 17:26:48
 * @LastEditTime: 2020-08-14 16:27:18
 * @LastEditors: Please set LastEditors
 * @Description: 订单详情中的优惠券接口联调
 * @FilePath: \app-en\src\components\confirmOrder\itemComponents\orderCouponPop.vue
--> 

<template>
  <!-- 订单优惠券弹框 -->
  <div class="orderCouponPop" v-show="order">
    <div class="order-selection">
      <div class="order-heard">
        <div class="order-title">
          <div class="order-txt">
            Coupons
            <i class="cross" @click="close">×</i>
          </div>
          <!-- <van-icon name="cross" class="cross" @click="close" /> -->
        </div>
        <div class="order-tab" v-if="true">
          <van-tabs v-model="active" class="tab-list" title-active-color="#FA5300">
            <van-tab>
              <template slot="title">Available({{this.coupon.length}})</template>
            </van-tab>
            <van-tab>
              <template slot="title">Not Applicable({{this.couponListCannotUse.length}})</template>
            </van-tab>
          </van-tabs>
        </div>
      </div>
      <div class="selection-conten">
        <!-- 可领取优惠券 -->
        <div v-if="active==0">
          <div v-for="(couponItem,index) in coupon" :key="index" class="item-one">
            <div class="youhuiquan-item">
              <div class="youhuiquan-left left-one">
                <!-- <span class="youhuiquan-left-biao biao-one">GH{{jn}}</span> -->
                <p class="youhuiquan-left-money money-one">
                  <span class="youhuiquan-left-biao biao-one">GH{{jn}}</span>
                  {{couponItem.reduceAmountWebsite}}
                  <i>OFF</i>
                </p>
                <div class="youhuiquan-left-ms">
                  <!-- v-if="couponItem.upToAmountWebsite==null?false:true" -->
                  <p
                    class="youhuiquan-left-mc mc-one"
                  >Mini Spend GH {{jn}} {{couponItem.upToAmountWebsite!=null?couponItem.upToAmountWebsite:couponItem.reduceAmountWebsite}}</p>
                  <p class="youhuiquan-left-m m-one">Type:{{couponItem.couponTypeNameEng}}</p>
                  <p
                    class="youhuiquan-left-m m-one"
                  >valid:{{couponItem.useBeginWebsite.slice(0,10).split("-").reverse().join('/')}}~{{couponItem.useEndWebsite.slice(0,10).split("-").reverse().join('/')}}</p>
                </div>
                <!-- <progress-bar :progressBar="couponItem.drawPercent" ></progress-bar> -->
                <!-- 根据后台判断是否是新用户 -->
                <div v-if="couponItem.canDraw==0?0:1">
                  <progress-bar :progressBar="couponItem.drawPercent?couponItem.drawPercent:0"></progress-bar>
                </div>
              </div>
              <div class="youhuiquan-right">
                <div class="youhuiquan-right-header">
                  <!-- 此标题到时候注释 -->
                  <span class="youhuiquan-right-title right-title-one">{{couponItem.couponName}}</span>
                </div>
                <div class="youhuiquan-right-main right-main-one">
                  <!-- <p
                    class="youhuiquan-left-mc mc-one"
                    v-if="couponItem.upToAmountWebsite==null?false:true"
                  >For GH {{jn}} {{couponItem.upToAmountWebsite}} consumption</p>-->
                  <van-button
                    v-if="couponItem.canDraw==0?0:1"
                    round
                    type="info"
                    @click="ProBar(couponItem.couponId,couponItem.couponDetailId,couponItem.canDraw)"
                    class="youhuiquan-right-btn"
                  >Get it now</van-button>
                  <div v-else class="checkedBox">
                    <div v-if="couponItem.canSelect==1?true:false">
                      <van-checkbox
                        v-model="couponItem.isSelected"
                        checked-color="#FA5300"
                        @change="changeCheckbox(couponItem)"
                      ></van-checkbox>
                    </div>
                  </div>
                  <!-- <div v-else class="checkedBox">
                  <van-checkbox
                    v-model="couponItem.isSelected"
                    :disabled="couponItem.canSelect==0?true:false"
                    checked-color="#FA5300"
                    @click="changeCheckbox(couponItem.drawId,couponItem.isSelected)"
                  ></van-checkbox>
                  </div>-->
                </div>
              </div>
            </div>
            <!-- 原因 -->
            <div
              class="cause-text"
              v-if="couponItem.cannotSelectReasonEng==null?false:true"
            >{{couponItem.cannotSelectReasonEng}}</div>
          </div>
        </div>
        <!-- 不可领取 -->
        <div
          v-else-if="active==1"
          class="youhuiquan-two"
          v-for="(couponUse,index) in couponListCannotUse"
          :key="index"
        >
          <div class="youhuiquan-item item-two">
            <div class="youhuiquan-left left-two">
              <span class="youhuiquan-left-biao">GH{{jn}}</span>
              <p class="youhuiquan-left-money">
                {{couponUse.reduceAmountWebsite}}
                <i>OFF</i>
              </p>
              <div class="youhuiquan-left-ms">
                <p class="youhuiquan-left-m">Type:{{couponUse.couponTypeNameEng}}</p>
                <p
                  class="youhuiquan-left-m"
                >valid:{{couponUse.useBeginWebsite.slice(0,10).split("-").reverse().join('/')}}~{{couponUse.useEndWebsite.slice(0,10).split("-").reverse().join('/')}}</p>
              </div>
            </div>
            <div class="youhuiquan-right">
              <div class="youhuiquan-right-header">
                <span class="youhuiquan-right-title right-title-two">{{couponUse.couponName}}</span>
              </div>
              <div class="youhuiquan-right-main">
                <!-- v-if="couponUse.upToAmountWebsite==null?false:true" -->
                <p
                  class="youhuiquan-left-mc"
                >Mini Spend GH {{jn}} {{couponUse.upToAmountWebsite!=null?couponUse.upToAmountWebsite:couponUse.reduceAmountWebsite}}</p>
              </div>
            </div>
          </div>
          <div class="youhuiquan-reason">
            <span class="reason-title">Reason for unavailability:</span>
            <p class="reason-content">{{couponUse.cannotSelectReasonEng}}</p>
          </div>
        </div>
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
      // canDraw: "",
      couponList: [],
      couponDraw: [],
      checkbox: true,
      flag: true,
    };
  },
  computed: {
    // 语法糖
    ...mapState({
      coupon: (state) => state.coupons,
      couponListCannotUse: (state) => state.couponListUse,
    }),
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 新增-优惠券 只能领取一次
    async ProBar(data, detail, drawPercent) {
      let couponsData = {
        couponId: data,
        couponDetailId: detail,
      };
      this.couponDraw = await couponDrawApi(couponsData);
      let voucher = [
        {
          drawId: this.couponDraw.drawId,
        },
      ];
      this.$emit("couponDrawId", voucher);
    },

    // 选择优惠券
    changeCheckbox(item) {
      let arr = [];
      this.coupon.forEach((e) => {
        if (e.isSelected) {
          arr.push({ drawId: e.drawId });
        }
      });
      if (this.flag) {
        this.$emit("changeCheckbox", arr);
        this.flag = false;
      }
      setTimeout(() => {
        this.flag = true;
      }, 300);
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
    height: 70%;
    position: absolute;
    bottom: 0;
    .order-heard {
      position: fixed;
      width: 100%;
      z-index: 1;
      background: #fff;
    }
    .order-title {
      width: 100%;
      height: 89px;
      border-bottom: 2px solid #dcdcdc;
      display: flex;
      align-items: center;
      justify-content: center;
      .order-txt {
        font-size: 36px;
        text-align: center;
        width: 94%;
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
    overflow: auto;
    position: relative;
    top: 200px;
    height: 80%;
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
    .youhuiquan-left-mc {
      font-size: 24px;
      font-weight: bold;
      padding: 10px 0;
    }
    .mc-one {
      color: #fa5300;
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
          font-size: 26px;
          font-weight: bold;
        }
        .youhuiquan-left-money {
          font-size: 60px;
          font-weight: bold;
          i {
            font-size: 26px;
            font-weight: bold;
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

        // .youhuiquan-left-mc {
        //   font-size: 24px;
        //   padding-top: 6px;
        // }
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
    .cause-text {
      color: #a1a1a1;
      padding: 5px 0 16px 20px;
      line-height: 24px;
    }
  }
}
</style>