<template>
  <!-- 会员用户弹框 -->
  <div id="memberPopUp">
    <!-- 根据后台判断是否为新用户 -->
    <van-overlay :show="sale">
      <div class="wrapper" v-if="isMistake == false">
        <div class="block">
          <div>
            <img
              src="@/assets/img/coupon/menber_1.png"
              v-if="menberCoupon.length == 1"
            />
            <img
              src="@/assets/img/coupon/menber_2.png"
              v-else-if="menberCoupon.length == 2"
            />
            <img src="@/assets/img/coupon/menber_3.png" v-else />
          </div>
          <div
            class="wrapper-draw"
            :class="{
              'draw-one': menberCoupon.length == 1,
              'draw-two': menberCoupon.length == 2,
              'draw-three': menberCoupon.length >= 3,
            }"
          >
            <div class="txt-center">
              <span class="fs-24 fw-b">—— Congratulations On Getting ——</span>
              <div class="mt_14 fs-22" v-if="isMistake == false">
                Collect coupons before shopping.
              </div>
              <div class="mt_14 fs-22" v-else>
                Please check your coupons in "My >> My Coupons.
              </div>
            </div>

            <div class="coupon-get">
              <div v-for="(item,index) in menberCoupon" :key="index">

                <div class="coupon-bg">
                <div class="box-coupon">
                  <div class="coupon-money">
                    <i class="coupon-money-icon">{{ jn }}</i>
                    <div class="coupon-money-reduce">
                      {{ newCoupon.reduceAmount }}
                    </div>
                  </div>
                  <div class="cr-fs20">
                    Mini Spend {{ jn }} {{ newCoupon.upToAmount }}
                  </div>
                  <!-- <div class="cr-fs20">Valid Till:{{
                  newCoupon.useEndWebsite
                    .slice(0, 10)
                    .split("-")
                    .reverse()
                    .join("/")
                }}</div> -->
                </div>
                 <div class="wrapper-btn">
            <div class="btn" @click="newPre(newCoupon.couponId)"></div>
          </div>
              </div>
              </div>
              
            </div>
          </div>

          <!-- <div class="wrapper-main">{{ jn }} {{ newCoupon.reduceAmount }}</div> -->
          <!-- <div class="wrapper-btn">
            <div class="btn" @click="newPre(newCoupon.couponId)"></div>
          </div> -->
        </div>
        <div class="wrapper-footer">
          <img
            src="@/assets/img/coupon/home-icon@2x.png"
            class="close-icon"
            @click="showMistake(1)"
          />
        </div>
      </div>

      <!-- 是否选择 -->
      <div class="wrapper" v-else>
        <div class="mistake">
          <img src="@/assets/img/coupon/homeNew1.png" class="wrapper-youhui" />
          <div class="mistake-main">
            You will lose your {{ jn }} {{ newCoupon.reduceAmount }} Bonus......
            <p class="mistake-title">Are you sure to give up?</p>
          </div>
          <div class="mistake-btn flex_space">
            <div class="btn_up" @click="close">Give up</div>
            <div class="btn_return" @click="showMistake(2)">Return</div>
          </div>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
export default {
  name: "memberPopUp", //会员用户弹窗
  components: {},
  props: {
    sale: {
      type: Boolean,
      default: false,
    },
    newCoupon: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      homeCoupons: "",
      isMistake: false, //默认显示
      menberCoupon: [
        //模拟数据
        {
          id: 0,
        },
        {
          id: 2,
        },
        {
          id: 1,
        },
      ],
    };
  },
  computed: {},
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
    //   关闭
    close() {
      this.$emit("userPopUp");
    },
    /*
     *showMistake 1显示是否放弃 2显示当前是否领取
     */
    showMistake(item) {
      switch (item) {
        case 1:
          this.isMistake = true;
          break;
        case 2:
          this.isMistake = false;
          break;
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
.coupon-get {
  max-height: 550px;
  overflow: hidden;
}

.coupon-bg {
  margin-left: 6px;
  margin-top: 6px;
  width: 500px;
  height: 182px;
  background-image: url("~@/assets/img/coupon/meber_get.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  -moz-background-size: 100% 100%;
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
      // i {
      //   font-size: 22px;
      // }
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