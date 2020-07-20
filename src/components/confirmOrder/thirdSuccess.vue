<template>
  <!-- 第三方支付 -->
  <div>
    <div class="password-success" v-if="show">
      <third-header></third-header>
      <div class="success-img">
        <img src="@/assets/img/confirmOrder/icon-05@2x.png" alt />
      </div>
      <div class="success-test c-orange">
        Your order was paid successfully.
        <button
          class="success-shop"
          @click="shop"
        >Continue shopping</button>
      </div>
    </div>
    <div v-else-if="lose">
      <thirdLose></thirdLose>
    </div>
    <div class="loading" v-else>
      <thirdLoading></thirdLoading>
    </div>
  </div>
</template>

<script>
import thirdHeader from "./itemComponents/thirdHeader";
import thirdLose from "./itemComponents/thirdLose";
import thirdLoading from "./itemComponents/thirdLoading";
import { main, park } from "@/api/index";
import {callbackApi} from '@/api/prepaidRefill/index.js'
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
      show: false,
      lose: false
    };
  },
  computed: {},
  created() {
    // this.getParams();
    console.log(123123132123);
    if(this.$route.query.orderType == 1){
      this.getPayStatus();
      console.log(this.$route.query);
    }else if(this.$route.query.orderType == 2){
      let obj = {
        status:this.$route.query.status,
        transac_id:this.$route.query.transac_id,
        cust_ref:this.$route.query.cust_ref,
        pay_token:this.$route.query.pay_token,
        orderType:this.$route.query.orderType,
        phoneNumber:this.$route.query.phoneNumber
      }
      console.log(obj,'obj');
      this.callback(obj)
    }
    
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
          cust_ref: this.$route.query.cust_ref,
          orderType:this.$route.query.orderType
        }
      }).then(res => {
        console.log("GET",res);
        if (res.status_code === 200) {
          this.show = true;
          // if
          // this.$router.push("/thirdLose");
        }else if (res.status_code === 100) {
           this.lose = true;
        }else{ 
          this.show = false;
          this.lose = false;
        }
      });
    },
    //支付回调接口
    callback(data){
      callbackApi(data).then(res => {
        if (res.status_code === 200) {
          this.show = true;
        }else if (res.status_code === 100) {
           this.lose = true;
        }else{ 
          this.show = false;
          this.lose = false;
        }
      })
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
    thirdHeader,
    thirdLose,
    thirdLoading
  }
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
