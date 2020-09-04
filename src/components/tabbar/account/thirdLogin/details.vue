<!--
 * @Author: 曹建勇
 * @Date: 2020-09-01 17:29:26
 * @LastEditors: 曹建勇
 * @LastEditTime: 2020-09-03 16:36:40
 * @Description: 
 * @FilePath: \app-en\src\components\tabbar\account\thirdLogin\details.vue
-->
<template>
  <section class="thirdLogin-details-pages">
    <settings-header title="Authorization details" title2></settings-header>
    <div class="flex flex_space auth_items">
      <div class="flex">
        <img src="@/assets/img/coupon/facebook.png" alt />
        <span class="title">Facebook</span>
      </div>
      <div class="auth_status">Authorized</div>
    </div>
    <div class="flex_col items">
      <span v-if="thirdapp.length!==0">authorization at：{{thirdapp[0].addTime}}</span>
      <span class="mt_10">expiration at：long-term effective</span>
    </div>
    <div class="flex_col items">
      <span>Authorized content：</span>
      <span class="mt_10">public_profile,email</span>
    </div>
    <div class="flex_center2">
      <span class="btns" @click="CancelThirds">Cancel Authorization</span>
    </div>
  </section>
</template>

<script>
import { cancelthird } from "@/api/login/index.js";
import { Toast } from "vant";
import settingsHeader from "@/components/tabbar/account/accountSettings/itemComponents/settingsHeader";
export default {
  data() {
    return {
      thirdapp: [],
    };
  },
  computed: {},
  created() {},
  mounted() {
    if (this.$storage.get("thirdapp")) {
      this.thirdapp = this.$storage.get("thirdapp");
    } else {
      getuserinfo().then((res) => {
        this.$storage.set("userinfoShop", res.user);
        this.$storage.set("thirdapp", res.applist);
      });
    }
  },
  watch: {},
  methods: {
    // 解除绑定
    CancelThirds() {
      cancelthird({ thirduserId: this.thirdapp[0].thirdUserId, type: 1 }).then(
        (res) => {
          if (res.code == 0) {
            Toast("Unbound successfully");
            this.$storage.remove("thirdapp");
            setTimeout(() => {
              this.$router.go(-1);
            }, 2000);
          }
        }
      );
    },
  },
  components: { settingsHeader },
};
</script>

<style scoped lang='less'>
.thirdLogin-details-pages {
  .auth_items {
    background-color: #fff;
    height: 96px;
    padding: 10px 24px;
    img {
      width: 48px;
      height: 48px;
    }
    .title {
      color: rgba(16, 16, 16, 1);
      font-size: 14px;
      margin-left: 16px;
    }
    .auth_status {
      background-color: rgba(239, 239, 239, 1);
      width: 124px;
      height: 48px;
      color: rgba(16, 16, 16, 1);
      font-size: 12px;
      text-align: center;
      line-height: 48px;
    }
  }
  .items {
    background-color: #fff;
    border-top: 1px solid #eee;
    width: 100%;
    padding: 30px 40px 20px;
    color: rgba(16, 16, 16, 1);
    font-size: 14px;
    .mt_10 {
      margin-top: 20px;
    }
  }
  .btns {
    margin-top: 70px;
    width: 500px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border-radius: 8px;
    color: rgba(16, 16, 16, 1);
    background-color: #fff;
    font-size: 14px;
    text-align: center;
    display: block;
  }
}
</style>