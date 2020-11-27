<template>
  <!-- 新用户弹框 -->
  <div id="userPopUp">
    <!-- 根据后台判断是否为新用户 -->
    <van-overlay :show="sale">
      <div class="wrapper">
        <div class="block">
          <img src="@/assets/img/activity/christmas/christmas_home_users_1.png" class="wrapper-youhui" />
          <div class="wrapper-main">
            <i class="money">GH{{jn}}</i>
            {{newCoupon.reduceAmount}}
            <i class="money">OFF</i>
          </div>
          <div class="wrapper-btn">
            <p class="wrapper-title"><!-- FOR &nbsp;NEW&nbsp; USER --></p>
            <div class="btn" @click="newPre(newCoupon.couponId)">
              <!-- <img src="@/assets/img/activity/home-btn@2x.png" /> -->
              <div class="btn-box">Get it now</div>
            </div>
          </div>
        </div>
        <!-- <div class="line-w"></div> -->
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
	position: relative;
  }

  .block {
    width: 556px;
    height: 692px;
    overflow: hidden;
    
    .wrapper-main {
      position: relative;
      top: -63%;
      left: -10%;
      text-align: center;
      font-size: 42px;
      color: #F9CF96;
      font-weight: bold;
      width: 660px;
      .money {
        font-size: 14px;
		 font-weight: 0;
      }
    }
    .wrapper-btn {
      position: relative;
      top: -64%;
      left: 26%;
      width: 266px;
      text-align: center;
      .wrapper-title {
        height: 22px;
        font-size: 31px;
        color:#F3C686;
        padding-bottom: 318px;
        font-weight: bold;
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
		  width: 210px;
		  height: 50px;
		  line-height: 50px;
          top: -98%;
		  left:6%;
          font-size: 30px;
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
    // text-align: center;
	position: relative;
	top:-676px;
	left: 260px;
    .close-icon {
      width: 40px;
      height: 40px;
    }
  }
}
</style>