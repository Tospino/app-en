<template>
  <!-- 会员用户弹框 -->
  <div id="memberPopUp">
    <!-- 根据后台判断是否为新用户 -->
    <zhezhao>
      <div class="wrapper" v-if="isMistake">
        <div class="block">
          <div>
            <img
              src="@/assets/img/coupon/menber_1.png"
              v-if="newCoupon.length == 1"
            />
            <img
              src="@/assets/img/coupon/menber_2.png"
              v-else-if="newCoupon.length == 2"
            />
            <img src="@/assets/img/coupon/menber_3.png" v-else />
          </div>
          <div
            class="wrapper-draw"
            :class="{
              'draw-one': newCoupon.length == 1,
              'draw-two': newCoupon.length == 2,
              'draw-three': newCoupon.length >= 3,
            }"
          >
            <div class="txt-center">
              <span class="fs-24 fw-b">—— Congratulations On Getting ——</span>
              <div class="mt_14 fs-22" v-if="newCoupon[0].isdraw === 0">
                Collect coupons before shopping.
              </div>
              <div class="mt_8" v-else>
                Please check coupons in My>>My Coupons.
              </div>
            </div>

            <div class="coupon-haslist">
              <div v-for="(item, index) in newCoupon" :key="index">
                <div
                  class="flex_space"
                  :class="{
                    'coupon-bg-has': item.isdraw > 0,
                    'coupon-bg-get': item.isdraw === 0,
                  }"
                >
                  <div class="box-coupon">
                    <div class="coupon-money">
                      <i class="coupon-money-icon">{{ jn }}</i>
                      <div class="coupon-money-reduce">
                        {{ item.sonReduceAmount }}
                      </div>
                    </div>
                    <div class="cr-fs20">
                      Mini Spend {{ jn }} {{ item.sonUpToAmount }}
                    </div>
                    <div class="cr-fs20">
                      Valid Till:{{
                        item.sonUseDay
                          ? ""
                          : item.sonUseBeginWebsite
                              .slice(0, 10)
                              .split("-")
                              .reverse()
                              .join("/") +
                            " " +
                            "~"
                      }}
                      {{
                        item.sonUseEndWebsite
                          ? item.sonUseEndWebsite
                              .slice(0, 10)
                              .split("-")
                              .reverse()
                              .join("/")
                          : ""
                      }}
                    </div>
                  </div>

                  <div
                    class="btn-coupon"
                    v-if="item.isdraw === 0"
                    @click="newPre(item.couponId)"
                  ></div>
                </div>
              </div>
              <div class="coupon-length-top" v-if="newCoupon.length >= 3"></div>
              <div
                class="coupon-length-bottom"
                v-if="newCoupon.length >= 3"
              ></div>
            </div>
          </div>
        </div>
        <div class="wrapper-footer">
          <img
            src="@/assets/img/coupon/home-icon@2x.png"
            class="close-icon"
            @click="showMistake(newCoupon[0].isdraw)"
          />
        </div>
      </div>
    </zhezhao>
  </div>
</template>

<script>
import zhezhao from "@/multiplexing/zhezhao";
export default {
  name: "memberPopUp", //会员用户弹窗
  components: {},
  props: {
    isNewSale: {
      type: Boolean,
      default: false,
    },
    newCoupon: {
      type: Array,
      default: () => {
        return [];
      },
    },
    touristSum: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      homeCoupons: -1,
      isMistake: true, //默认显示
    };
  },
  computed: {},
  components: {
    zhezhao,
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 新用户领取
    newPre(Id) {
      this.homeCoupons = {
        couponId: Id,
      };
      // 传对应id
      this.$emit("evBus", this.homeCoupons);
    },

    /*
     *showMistake 0显示是否放弃 -1显示当前是否领取
     */
    showMistake(item) {
      if (item === 0) {
        this.$emit("memberUp", item);
      } else {
        this.isMistake = false;
        this.$emit("memberUp", this.homeCoupons);
      }
    },
  },
};
</script>
<style scoped lang="less">
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