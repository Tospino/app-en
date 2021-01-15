<template>
  <!-- 新用户弹框 -->
  <div id="userPopUp">
    <!-- 根据后台判断是否为新用户 -->
    <van-overlay :show="sale">
      <div class="wrapper" v-if="isMistake==false">
        <div class="block">
          <img src="@/assets/img/coupon/homeNew.png" class="wrapper-youhui" />
          <div class="wrapper-main">{{ jn }} {{ newCoupon.reduceAmount }}</div>
          <div class="wrapper-btn">
            <div class="btn" @click="newPre(newCoupon.couponId)"></div>
          </div>
        </div>
        <!-- <div class="line-w"></div> -->
        <div class="wrapper-footer">
          <img
            src="@/assets/img/coupon/home-icon@2x.png"
            class="close-icon"
            @click="showMistake(1)"
          />
        </div>
      </div>
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
  name: "userPopUp", //新用户弹窗
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
#userPopUp {
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
    width: 668px;
    height: 789px;
    overflow: hidden;

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
    .wrapper-btn {
      position: relative;
      top: -31%;
      left: 22%;
      width: 264px;
      text-align: center;
      .wrapper-title {
        font-size: 28px;
        color: #fa5300;
        padding-bottom: 13px;
      }
      .btn {
        width: 400px;
        height: 70px;
        // padding: 27px 0 0 16px;
        img {
          max-width: 100%;
          max-height: 100%;
        }
        .btn-box {
          position: relative;
          top: -88%;
          font-size: 36px;
          color: #ffffff;
        }
      }
    }
  }
  .line-w {
    width: 2px;
    height: 135px;
    background: rgba(255, 255, 255, 1);
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