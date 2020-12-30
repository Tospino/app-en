<template>
  <!-- 第三方支付 -->
  <div>
    <div class="password-success" v-if="show">
      <third-header></third-header>
      <div class="success-img">
        <img src="@/assets/img/confirmOrder/icon-05@2x.png" />
      </div>
      <div class="success-test c-orange">
        Your order was paid successfully.
        <div class="success-shop" @click="shop">Continue shopping</div>
      </div>
    </div>
    <div v-else>
      <thirdLose></thirdLose>
    </div>
  </div>
</template>

<script>
import thirdHeader from "./itemComponents/thirdHeader";
import thirdLose from "./itemComponents/thirdLose";
export default {
  props: {},
  data() {
    return {
      show: false,
    };
  },
  computed: {},
  created() {
    setTimeout(() => {
      if (this.$route.query.token) {
        this.$storage.set("token", this.$route.query.token);
      }
    }, 500);
    if (this.$route.query.status == 1) {
      this.show = true;
    } else if (this.$route.query.status == 0) {
      this.show = false;
    }
  },
  mounted() {},
  watch: {},
  methods: {
    shop() {
      this.$router.push({
        name: "首页",
        query: { token: this.$route.query.token },
      });
    },
  },
  components: {
    thirdHeader,
    thirdLose,
  },
};
</script>

<style scoped lang="less">
/deep/ .van-loading__circular {
  width: 100%;
  height: 100%;
}
.password-success {
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
