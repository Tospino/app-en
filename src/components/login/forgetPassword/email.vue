<template>
  <!-- 忘记密码点击下一步 =>输入验证码页 -->
  <div class="forget-password">
    <navar title="Forgot Password"></navar>
    <div class="password-con">
      <h1>Authentication Required</h1>
      <div class="line"></div>
      <div>
        <p class="tips">
          <span
            >For your security, we need to authenticate your request. We have
            sent a One Time Password (OTP) to your Email</span
          >
          <span class="o-c">{{ yzmData.msgphone }}</span>
        </p>
      </div>
      <div class="otp">
        <div class="otp-txt">OTP:</div>
        <div class="input-con">
          <input
            type="text"
            class="name-input"
            placeholder="OTP"
            v-model="verCode"
            @input="inputFun1"
            :maxlength="6"
          />
        </div>
        <div class="count-down">
          <div class="count-down-btn" @click="getCode" v-show="countTrue">
            {{ countdown }}
          </div>
          <div class="count-down-btn" v-show="!countTrue">{{ count }}S</div>
        </div>
      </div>
      <div
        class="confirm-btn"
        @click="toRevise"
        :style="{ backgroundColor: disabledSubmit ? '#FA5300' : '#999' }"
      >
        Confirm
      </div>
    </div>
  </div>
</template>

<script>
import navar from "@/multiplexing/navar";
import { getEmailCodeApi } from "@/api/register/index";
import { checkphonesmsApi } from "@/api/login/index.js";
import { Toast } from "vant";
export default {
  data() {
    return {
      timer: null,
      countdown: "Get It",
      count: "",
      countTrue: true,
      verCode: "",
      yzmData: {
        msgphone: "",
        types: "2",
        areaCode: "233"
      },
      jiaoyan: {
        msg_phone: "",
        msg_types: "2",
        msg_num: ""
      }
    };
  },
  mounted() {
    this.yzmData.msgphone = this.$route.query.msgemail;
  },
  computed: {
    disabledSubmit() {
      return this.verCode.length == 6;
    }
  },
  methods: {
    inputFun1(e) {
      this.verCode = e.target.value.replace(/[^\d]/g, "");
    },
    getCode() {
      getEmailCodeApi({ email: this.yzmData.msgphone, types: 3 }).then(res => {
        if (res.code == 0) {
          const TIME_COUNT = 120;
          if (!this.timer) {
            this.count = TIME_COUNT;
            this.countTrue = false;
            this.timer = setInterval(() => {
              if (this.count > 0 && this.count <= TIME_COUNT) {
                this.count--;
              } else {
                this.countTrue = true;
                clearInterval(this.timer);
                this.timer = null;
              }
            }, 1000);
          }
        } else {
          Toast("error");
        }
      });
    },
    toRevise() {
      if (!this.disabledSubmit) return;
      checkphonesmsApi({
        msg_phone: this.yzmData.msgphone,
        msg_num: this.verCode,
        msg_types: 3
      }).then(res => {
        if (res.code == 0) {
          this.$router.push({
            name: "修改密码",
            query: { phone: this.yzmData.msgphone, verCode: this.verCode }
          });
        }else if(res.code == -10001){
            Toast('Verification code is incorrect！')
        }
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
  .nav-bar {
    width: 100%;
    height: 88px;
    position: relative;
    .icon {
      width: 40px;
      height: 40px;
      position: absolute;
      top: 28px;
    }
    .title {
      text-align: center;
      font-size: 36px;
      color: #000;
    }
  }
  .password-con {
    padding: 0 30px;
    margin-top: 20px;
  }
  .otp {
    width: 100%;
    height: 75px;
    position: relative;
    border-bottom: 1px solid #dcdcdc;
    margin-bottom: 30px;
    .otp-txt {
      position: absolute;
      top: 0;
      left: 0;
      font-size: 30px;
      color: #333;
    }
    .input-con {
      position: absolute;
      left: 140px;
      width: 530px;
      height: 60px;
      font-size: 20px;
      .name-input {
        position: absolute;
        width: 240px;
        border: 0;
        background-color: #f8f8fa;
        font-size: 30px;
      }
    }
    .count-down {
      position: absolute;
      right: 0px;
      top: -10px;
      .count-down-btn {
        width: 200px;
        height: 68px;
        font-size: 30px;
        text-align: center;
        line-height: 68px;
        color: #999;
        background-color: #dcdcdc;
        border: 0;
      }
    }
  }
  .confirm-btn {
    height: 88px;
    line-height: 88px;
    text-align: center;
    color: #fff;
    font-size: 40px;
  }
  h1 {
    font-size: 36px;
    color: #333;
    margin-bottom: 40px;
  }
  .line {
    width: 670px;
    height: 2px;
    background-color: #dcdcdc;
    margin-bottom: 60px;
  }
  .tips {
    font-size: 26px;
    color: #333;
    line-height: 40px;
    margin-bottom: 62px;
  }
  .o-c {
    color: #fa5300;
    font-size: 30px;
  }
  .password-con {
  }
}
</style>
