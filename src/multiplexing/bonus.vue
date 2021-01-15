<template>
  <div>
    <!-- 优惠券窗口贴边浮窗页面（首页、商品详情页、分类、购物车、我的） -->
    <!-- 须接收价格，跳转类型弹框，弹框是否再次弹起 -->
    <div class="bonus">
      <!-- <slot></slot>    -->
      <div class="bonus-money">₵150.00</div>
    </div>
    <img
      src="@/assets/img/coupon/home-icon-gb.png"
      class="close-icon"
      @click="showMistake"
    />
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {
    showMistake() {},
  },
  components: {},
};
</script>

<style scoped lang="less">
.bonus {
  width: 136px;
  height: 135px;
  position: fixed;
  top: 773px;
  right: 29px;
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
  width: 21px;
  height: 21px;
  position: fixed;
  top: 773px;
  right: 29px;
  z-index: 10;
}
</style>
