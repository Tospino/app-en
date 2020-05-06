<template>
  <!-- 第三方支付成功 -->
  <div class="password-success">
    <balance-header></balance-header>
    <div class="success-img">
      <img src="@/assets/img/confirmOrder/icon-05@2x.png" alt />
    </div>
    <div class="success-test c-orange">
      Your order was paid successfully.
      <button class="success-shop" @click="shop">Continue shopping</button>
    </div>
  </div>
</template>

<script>
import balanceHeader from "./itemComponents/balanceHeader";
import ThirdSuccessVue from "./thirdSuccess.vue";
import { main, park } from "@/api/index";
export default {
  props: {},
  data() {
    return {
      // getPayStatusParams: {
      //   status: 0,
      //   transac_id: "221b2611-8ac8-11ea-9377-02273b027730",
      //   pay_token: "eff11e4d-5f96-4d96-8191-eeb559dc2feb",
      //   cust_ref: "FKD202004301750406499d4a43b4e"
      // }
    };
  },
  computed: {},
  created() {
    // this.getParams();
    this.getPayStatus();
  },
  mounted() {
     //setTimeout(()=>{
     //  this.$router.go(-3)
    //},1500)
  },
  watch: {},
  methods: {
    shop() {
      this.$router.push("/control/home");
    },
    // getPayStatus () {
    //   park({
    //     url:`/appWallet/callback`,
    //     method: 'POST',
    //     data:this.getPayStatusParams
    //   }).then(res=>{
    //     console.log(res);
    //   })
    getPayStatus() {
      park({
        url: `/appWallet/callback`,
        method: "GET",
        params: {
          status: this.$route.query.status,
          transac_id: this.$route.query.transac_id,
          pay_token: this.$route.query.pay_token,
          cust_ref: this.$route.query.cust_ref
        }
      }).then(res => {
        // console.log("GET",res);
        if (res.status_code === 100) {
          this.$router.push("/thridlose");
        }
      });
    }
    // getParams() {
    //   console.log(111111111111111111111);
    //   console.log(this.$route.query);
    //   this.getPayStatusParams.status = this.$route.query.status;
    //   this.getPayStatusParams.transac_id = this.$route.query.transac_id;
    //   this.getPayStatusParams.pay_token = this.$route.query.pay_token;
    //   this.getPayStatusParams.cust_ref = this.$route.query.cust_ref;
    //   console.log(222222222222222222222);
    //   console.log(this.getPayStatusParams);
    // }
  },
  components: {
    balanceHeader
  }
};
</script>

<style scoped lang="less">
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
      position: relative;
      top: 26px;
      display: block;
      width: 500px;
      height: 78px;
      background-color: #fa5300;
      color: #ffffff;
      margin: 0 auto;
      outline: none;
      border: 0px;
      font-size: 36px;
    }
  }
}
</style>
