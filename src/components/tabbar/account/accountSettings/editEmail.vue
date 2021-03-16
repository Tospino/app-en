<template>
  <div class="edit-email">
    <settings-header title="Reset Email" v-if="type == 1"></settings-header>
    <settings-header title="Bind Email" v-else-if="type == 2"></settings-header>
    <div v-if="type == 1">
      <div v-show="step == 1">
        <div class="tips">
          <span
            >For your account security, we will send a verification code to your
            Email</span
          >
          <p>{{ email }}</p>
        </div>
        <div class="otp">
          <div class="input-con">
            <input
              type="text"
              class="name-input"
              placeholder="verification code"
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
      </div>
      <div v-show="step == 2">
        <div class="tip">
          <p>Please enter the new Email you need to bind</p>
        </div>
        <div class="enter-phone">
          <div class="newphone">
            <input
              type="text"
              class="phone-input"
              placeholder="Enter your Email"
              v-model="newemail"
            />
          </div>
          <div class="newcode">
            <input
              type="text"
              class="code-input"
              placeholder="Enter your verification code"
              v-model="newcode"
            />
            <div class="count-down">
              <div class="count-down-btn" @click="getCode" v-show="countTrue">
                {{ countdown }}
              </div>
              <div class="count-down-btn" v-show="!countTrue">{{ count }}S</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="type == 2">
      <div class="tip">
        <p>Please enter the new Email you need to bind</p>
      </div>
      <div class="enter-phone">
        <div class="newphone">
          <input
            type="text"
            class="phone-input"
            placeholder="Enter your Email"
            v-model="newemail"
          />
        </div>
        <div class="newcode">
          <input
            type="text"
            class="code-input"
            placeholder="Enter your verification code"
            v-model="newcode"
          />
          <div class="count-down">
            <div class="count-down-btn" @click="getCode" v-show="countTrue">
              {{ countdown }}
            </div>
            <div class="count-down-btn" v-show="!countTrue">{{ count }}S</div>
          </div>
        </div>
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
</template>

<script>
import settingsHeader from "./itemComponents/settingsHeader";
import { getEmailCodeApi, checkEmailCodeApi } from "@/api/register/index";
import { Toast } from "vant";

export default {
  props: {},
  data() {
    return {
      type: 0, //1.修改邮箱 2.绑定邮箱
      step: 0,
      email: "",
      newemail: "",
      countTrue: true,
      countdown: "Get",
      count: 0,
      timer: null,
      verCode: "",
      newcode: ""
    };
  },
  computed: {
    disabledSubmit() {
      return this.verCode.length == 6 || this.newcode.length == 6;
    }
  },
  created() {},
  mounted() {
    this.email = this.$route.query.email;
    if (this.email) {
      this.type = 1;
      this.step = 1;
    } else {
      this.type = 2;
    }
  },
  watch: {},
  methods: {
    toRevise() {
      if (!this.disabledSubmit) return;
      let data = {
        email: "",
        emailCode: "",
        types: ""
      };
      if (this.step == 1) {
        data.email = this.email;
        data.emailCode = this.verCode;
        data.types = 6;
      } else if (this.step == 2 || this.type == 2) {
        data.email = this.newemail;
        data.emailCode = this.newcode;
        data.types = 4;
      }
      checkEmailCodeApi(data).then(res => {
        if (res.code == 0) {
          if (this.step == 1) {
            this.step++;
            this.countTrue = true;
            this.count = 0;
          } else if (this.step == 2 || this.type == 2) {
            let userinfoShop = this.$storage("userinfoShop");
            userinfoShop.email = data.email;
            this.$storage.set("userinfoShop", userinfoShop);
            this.$router.go(-1);
          }
        } else if (res.code == -10001) {
          Toast("Verification code error");
        }
      });
    },
    inputFun1(e) {
      this.verCode = e.target.value.replace(/[^\d]/g, "");
    },
    getCode() {
      let data = {
        email: "",
        types: ""
      };
      if (this.step == 1) {
        data.email = this.email;
        data.types = 6;
      } else if (this.step == 2 || this.type == 2) {
        var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
        if (reg.test(this.newemail)) {
          data.email = this.newemail;
          data.types = 4;
        } else {
          Toast("E-mail format is incorrect");
          return;
        }
      }

      getEmailCodeApi(data).then(res => {
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
    }
  },
  components: {
    settingsHeader
  }
};
</script>

<style scoped lang="less">
.edit-email {
  .tips {
    margin: 58px 30px 0;
    font-size: 30px;
    color: #333333;
    span,
    p {
      line-height: 40px;
    }
    p {
      color: #999999;
    }
  }
  .otp {
    height: 75px;
    position: relative;
    border-bottom: 1px solid #dcdcdc;
    margin: 80px 30px 40px;
    .otp-txt {
      position: absolute;
      top: 0;
      left: 0;
      font-size: 30px;
      color: #333;
    }
    .input-con {
      position: absolute;
      width: 530px;
      height: 60px;
      font-size: 20px;
      .name-input {
        position: absolute;
        width: 520px;
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
        width: 160px;
        height: 60px;
        font-size: 30px;
        text-align: center;
        line-height: 60px;
        color: #999;
        background-color: #dcdcdc;
        border: 0;
      }
    }
  }
  .tip {
    margin: 0 30px;
    color: #666666;
    margin-top: 40px;
    font-size: 24px;
  }
  .enter-phone {
    margin: 20px 30px 40px;
    background-color: #fff;
    .newphone {
      height: 100px;
      border-bottom: 1px solid #dcdcdc;
    }
    .phone-input,
    .code-input {
      height: 90px;
      width: 400px;
      border: 0;
    }
    .code-input {
      padding-left: 0px;
    }
    .newcode {
      position: relative;
      .count-down {
        position: absolute;
        top: 20px;
        right: 10px;
        .count-down-btn {
          width: 160px;
          height: 60px;
          font-size: 30px;
          text-align: center;
          line-height: 60px;
          color: #999;
          background-color: #dcdcdc;
          border: 0;
        }
      }
    }
  }
  .confirm-btn {
    margin: 0 30px;
    height: 88px;
    line-height: 88px;
    text-align: center;
    color: #fff;
    font-size: 40px;
  }
}
</style>
