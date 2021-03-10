<!--
 * @Author: 曹建勇
 * @Date: 2020-08-30 17:42:23
 * @LastEditors: 曹建勇
 * @LastEditTime: 2021-03-10 14:45:49
 * @Description: 
 * @FilePath: \app-en\src\components\confirmOrder\thirdSuccess.vue
-->
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
import { getuserinfoApi } from "@/api/accountSettings/index";
export default {
  props: {},
  data() {
    return {
      show: false,
      orderType: null, //orderType：1平台商品订单，2话费充值订单 3余额充值
    };
  },
  computed: {},
  created() {
    this.orderType = this.$route.query.orderType;
    setTimeout(() => {
      if (this.$route.query.token) {
        this.$storage.set("token", this.$route.query.token);
        this.getuserinfo();
      }
    }, 500);
    if (this.$route.query.status == 1) {
      this.show = true;
    } else if (this.$route.query.status == 0) {
      this.show = false;
    }
  },
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
