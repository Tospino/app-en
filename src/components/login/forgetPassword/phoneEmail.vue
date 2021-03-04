<template>
  <!-- 忘记密码----选择验证方式 -->
  <div class="forget-password">
    <navar title="Forgot Password"></navar>
    <div class="tips">
      <span
        >Please select any verification method, and the verification is complete
        Set new password</span
      >
    </div>
    <div class="select-type">
      <div class="email flex flex_space" @click="toEmail">
        <span>Email</span>
        <img src="@/assets/img/login/forget.png" alt="" />
      </div>
      <div class="phone flex flex_space" @click="toPhone">
        <span>Phone</span>
        <img src="@/assets/img/login/forget.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import navar from "@/multiplexing/navar";
export default {
  data() {
    return {
      msgphone: null,
      msgemail: null
    };
  },
  mounted() {
    this.msgphone = this.$route.query.msgphone;
    this.msgemail = this.$route.query.msgemail;
  },
  methods: {
    toEmail() {
      this.$router.push({
        name: "邮箱验证码",
        query: { msgemail: this.msgemail }
      });
    },
    toPhone() {
      this.$router.push({
        name: "手机验证码",
        query: { msgphone: this.msgphone }
      });
    }
  },
  components: {
    navar
  }
};
</script>

<style scoped lang="less">
.forget-password {
  margin: 0 30px;
  .tips {
    line-height: 54px;
    font-size: 36px;
    color: #333333;
    margin-top: 72px;
  }
  .select-type {
    margin-top: 72px;
    .email,
    .phone {
      line-height: 125px;
      border-bottom: 1px solid #d2d2d2;
      font-size: 36px;
      color: #333333;
      img {
        width: 42px;
        height: 42px;
      }
    }
  }
}
</style>
