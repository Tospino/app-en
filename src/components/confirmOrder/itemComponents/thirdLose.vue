<template>
  <!-- 第三方支付失败 -->
  <div class="Lose">
    <third-header></third-header>
    <div class="success-img">
      <img src="@/assets/img/confirmOrder/icon-06@2x.png" alt />
    </div>
    <div class="success-test c-orange">
      Your order was failed to be paid.
      <div class="success-shop" @click="toOrder">View the order</div>
    </div>
  </div>
</template>

<script>
import thirdHeader from "./thirdHeader";
import { main, park } from "@/api/index";
export default {
  props: {},
  data() {
    return {};
  },
  methods: {
    //去订单
    toOrder() {
      this.$router.push({ name: "我的订单" });
    },
  },
  components: {
    thirdHeader,
  },
};
</script>

<style scoped lang="less">
.Lose {
  position: relative;
  text-align: center;
  .success-img {
    display: inline-block;
    width: 160px;
    height: 160px;
    position: relative;
    top: 172px;
  }
  .success-test {
    position: relative;
    top: 200px;
    font-size: 36px;
    .success-shop {
      width: 500px;
      height: 78px;
      margin-top: 20px;
      background-color: #fa5300;
      color: #ffffff;
      margin: 40px auto;
      line-height: 78px;
      font-size: 36px;
    }
  }
}
</style>
