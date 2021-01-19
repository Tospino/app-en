<template>
  <!-- 所有优惠券 -->
  <div id="allCouponsBack">
    <zhezhao>
      <div class="wrapper">
      <div class="mistake">
        <img src="@/assets/img/coupon/homeNew1.png" class="wrapper-youhui" />
        <div class="mistake-main">
          You will lose your {{ jn }} {{ touristSum }} Bonus......
          <p class="mistake-title">Are you sure to give up?</p>
        </div>
        <div class="mistake-btn flex_space">
          <div class="btn_up" @click="close">Give up</div>
          <div class="btn_return" @click="showMistake">Return</div>
        </div>
      </div>
      </div>
    </zhezhao>
  </div>
</template>

<script>
import zhezhao from "@/multiplexing/zhezhao";
export default {
  name: "allCouponsBack", //用户返回弹窗
  components: {},
  props: {
    // 总价格
    touristSum: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {};
  },
  computed: {},
  components: {
    zhezhao,
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 放弃选择
    close() {
      this.$emit("waiveBack");
    },
    // 返回优惠券页面
    showMistake() {
       this.$emit("allBack");
    },
  },
};
</script>
<style scoped lang="less">
 .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
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
</style>