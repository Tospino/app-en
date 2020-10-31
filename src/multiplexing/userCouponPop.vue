<template>
  <!-- 新用户弹框 -->
  <div id="userPopUp">
    <!-- 根据后台判断是否为新用户 -->
    <van-overlay :show="sale">
      <div class="wrapper">
        <div class="block">
          <img src="@/assets/img/activity/newUser@2x.png" class="wrapper-youhui" />
          <div class="wrapper-main">
            <i>GH{{jn}}</i>
            {{newCoupon.reduceAmount}}
            <i>OFF</i>
          </div>
          <div class="wrapper-btn">
            <p class="wrapper-title">For &nbsp;New&nbsp; User</p>
            <div class="btn" @click="newPre(newCoupon.couponId)">
              <img src="@/assets/img/activity/home-btn@2x.png" />
              <span class="btn-box">Get it now</span>
            </div>
          </div>
        </div>
        <div class="line-w"></div>
        <div class="wrapper-footer">
          <img src="@/assets/img/coupon/home-icon@2x.png" class="close-icon" @click="close" />
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
// import { Toast } from "vant";
export default {
  name: "userPopUp", //新用户弹窗
  components: {},
  //   props: ["sale", "newCoupon"],
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
      userStyle: "",
      homeCoupons: "",
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
      this.$emit("evBus", this.homeCoupons);
      this.close();
    },
    //   关闭
    close() {
      this.userStyle = document.getElementById("userPopUp");
      this.$emit("userPopUp", this.userStyle);
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
    width: 750px;
    height: 770px;
    overflow: hidden;
    
    .wrapper-main {
      position: relative;
      top: -45%;
      left: 7%;
      text-align: center;
      font-size: 50px;
      color: #F9CF96;
      font-weight: bold;
      width: 660px;
      i {
        font-size: 18px;
      }
    }
    .wrapper-btn {
      position: relative;
      top: -38%;
      left: 33%;
      width: 266px;
      text-align: center;
      .wrapper-title {
        height: 22px;
        font-size: 31px;
        color:#F3C686;
        padding-bottom: 13px;
      }
      .btn {
        width: 230px;
        height: 60px;
        padding: 27px 0 0 16px;
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
    .close-icon {
      width: 70px;
      height: 70px;
    }
  }
}
</style>