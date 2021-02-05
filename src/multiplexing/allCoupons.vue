<template>
  <!-- 所有优惠券 -->
  <div id="allCoupons">
    <div v-if="isFrame">
      <!-- 优惠券窗口贴边浮窗页面（首页、商品详情页、分类、购物车、我的） -->
      <!-- 须接收价格，跳转类型弹框，弹框是否再次弹起 -->
      <div v-if="isBonus">
        <div v-if="isShow">
          <div class="bonus" @click="hasMistake">
            <div class="bonus-money">₵{{ touristSum }}</div>
          </div>
          <img
            src="@/assets/img/coupon/home-icon-gb.png"
            class="close-icon"
            @click="showMistake"
          />
        </div>
      </div>
      <div v-else>
        <div v-if="isMistake">
          <!-- 游客 -->
          <div v-if="isShowCoupon == 1">
            <userPopup :touristSum="touristSum" @userUp="userUp"></userPopup>
          </div>
          <!-- 会员 -->
          <memberCouponPop
            :newCoupon="newCoupon"
            @memberUp="memberUp"
            @evBus="evBus"
            v-else
          ></memberCouponPop>
        </div>
        <!-- 是否返回 -->
        <div v-else>
          <allCouponsBack
            :touristSum="touristSum"
            @allBack="allBack"
            @waiveBack="waiveBack"
            v-if="isShowCoupon !== 2"
          ></allCouponsBack>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 游客用户
import userPopup from "@/multiplexing/userCouponPop";
// 新用户
import memberCouponPop from "@/multiplexing/memberCouponPop";
// 返回优惠券
import allCouponsBack from "@/multiplexing/allCouponsBack";
export default {
  name: "allCoupons", //会员用户弹窗
  components: {},
  props: {
    // 优惠券总数据
    hasAggregate: {
      type: Object,
      default: () => {
        return [];
      },
    },
    // 是否显示新人会员
    isNewSale: {
      type: Boolean,
      default: false,
    },
    // 是否显示新人优惠券列表
    newCoupon: {
      type: Array,
      default: () => {
        return [];
      },
    },
    // 总价格
    touristSum: {
      type: Number,
      default: 0,
    },
    /*
     *判断是否为新人券或会员券(是否领取)
     *1是游客，2 已领取 ，3 未领取
     */
    isShowCoupon: {
      type: Number,
      default: 1,
    },
    // 根据页面显示侧边框
    sideFrame: {
      type: Boolean,
      default: false,
    },
    // 根据页面显示侧边框
    isFrame: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isMistake: true, //默认显示
      isBonus: true, //默认侧边不显示
      isAll: true, //整体优惠券弹框
      isShow: true, //侧边弹框开启
    };
  },
  components: {
    userPopup,
    memberCouponPop,
    allCouponsBack,
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 侧边弹框是否再次打开弹框
    hasMistake() {
      this.isBonus = false;
    },
    // 侧边弹框关闭
    showMistake() {
      this.isShow = false;
    },

    // 游客关闭优惠券列表
    userUp() {
      this.isMistake = false;
    },

    // 返回优惠券列表
    allBack() {
      this.isMistake = true;
    },

    // 放弃领取优惠券列表
    waiveBack() {
      this.isBonus = true;
      this.isMistake = true;
    },

    // 会员新人放弃领取
    memberUp(item) {
      if (item == -1) {
        this.isBonus = false;
      } else {
        this.isMistake = false;
      }
      if (this.isShowCoupon == 2) {
        this.$emit("isShowBus", true);
      } else {
        this.$emit("isShowBus", false);
      }
    },

    // 领取优惠券id
    evBus(id) {
      if (id) {
        this.$emit("memberBus", id);
      }
    },
  },
};
</script>
<style scoped lang="less">
.bonus {
  width: 136px;
  height: 135px;
  position: fixed;
  top: 700px;
  right: 50px;
  z-index: 10;
  background-image: url("~@/assets/img/coupon/bonus_all.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  -moz-background-size: 100% 100%;
  overflow: hidden;
}
.bonus-money {
  font-size: 20px;
  font-family: Arial;
  font-weight: bold;
  color: #fff800;
  text-align: center;
  line-height: 176px;
}
.close-icon {
  width: 26px;
  height: 26px;
  position: fixed;
  top: 680px;
  right: 40px;
  z-index: 10;
}

.draw-one {
  top: 48%;
}
.draw-two {
  top: 36%;
}
.draw-three {
  top: 31%;
}
.cr-fs20 {
  color: #fde8d7;
  font-size: 20px;
  line-height: 30px;
}
.box-coupon {
  padding: 20px 0 0 47px;
  width: 320px;
}
.coupon-haslist {
  box-sizing: border-box;
  max-height: 580px;
  padding-bottom: 20px;
  overflow: scroll;
  &::-webkit-scrollbar {
    width: 0;
  }
}

.btn-coupon {
  width: 74px;
  height: 74px;
  border-radius: 50%;
  margin-top: 46px;
  margin-right: 38px;
}
.coupon-length-top {
  position: absolute;
  top: 9%;
  left: 2%;
  width: 506px;
  height: 40px;
  background-image: url("~@/assets/img/coupon/meber_bottom.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  -moz-background-size: 100% 100%;
  transform: rotate(180deg);
}
.coupon-length-bottom {
  position: absolute;
  bottom: 4%;
  width: 510px;
  height: 40px;
  background-image: url("~@/assets/img/coupon/meber_bottom.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  -moz-background-size: 100% 100%;
}
// // 待领取
.coupon-bg-get {
  margin-left: 6px;
  margin-top: 6px;
  width: 500px;
  height: 182px;
  background-image: url("~@/assets/img/coupon/meber_get.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  -moz-background-size: 100% 100%;
}
// 已领取
.coupon-bg-has {
  margin-left: 6px;
  margin-top: 6px;
  width: 500px;
  height: 182px;
  background-image: url("~@/assets/img/coupon/meber_re.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  -moz-background-size: 100% 100%;
}

.coupon-money {
  font-size: 90px;
  font-family: Arial;
  font-weight: bold;
  display: flex;

  .coupon-money-icon {
    font-size: 36px;
    font-weight: 400;
    color: #f6c5a8;
    margin-top: 6px;
  }
  .coupon-money-reduce {
    margin-left: 10px;
    background: linear-gradient(
      -23deg,
      #f6c4a6 0%,
      #fde9d8 54.5166015625%,
      #f6c4a6 100%
    );
    -webkit-background-clip: text;
    color: transparent;
  }
}

#memberPopUp {
  position: fixed;
  width: 100vw;
  // height: 100%;
  z-index: 5;
  // 优惠券
  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .block {
    width: 736px;
    max-height: 976px;
    overflow: hidden;
    position: relative;
    .wrapper-draw {
      position: absolute;
      left: 14%;
      color: #fb7c31;
      font-family: Arial;
      width: 520px;
    }
    .wrapper-main {
      position: relative;
      top: -42%;
      left: 3%;
      text-align: center;
      font-size: 68px;
      color: #e2200d;
      font-weight: bold;
      width: 660px;
    }
  }

  .wrapper-footer {
    text-align: center;
    margin-top: 38px;
    .close-icon {
      width: 70px;
      height: 70px;
    }
  }

  // 未领取
  .mistake {
    width: 630px;
    height: 540px;
    .mistake-main {
      position: relative;
      top: -48%;
      left: 9%;
      font-size: 30px;
      color: #fff;
      font-weight: bold;
      .mistake-title {
        margin-top: 30px;
        font-size: 24px;
        font-family: Arial;
        font-weight: 400;
        color: #ffffff;
      }
    }
    .mistake-btn {
      position: relative;
      top: -48%;
      left: 9%;
      font-size: 30px;
      color: #fff;
      font-weight: bold;
      width: 520px;
      margin-top: 56px;
    }
    .btn_up {
      width: 240px;
      height: 60px;
      border: 1px solid #ffffff;
      line-height: 60px;
      text-align: center;
    }
    .btn_return {
      width: 240px;
      height: 60px;
      background: #ffffff;
      color: #d73109;
      line-height: 60px;
      text-align: center;
    }
  }
}
</style>