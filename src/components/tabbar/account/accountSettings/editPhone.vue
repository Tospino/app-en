<template>
  <div class="edit-phone">
    <settings-header title="Reset Phone" v-if="type == 1"></settings-header>
    <settings-header title="Bind Phone" v-else-if="type == 2"></settings-header>
    <div v-if="type == 1">
      <div v-show="step == 1">
        <div class="tips">
          <span
            >For your account security, we will send a verification code to your
            mobile phone:</span
          >
          <p>+233 {{ phone }}</p>
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
          <p>Please enter the new phone number you need to bind</p>
        </div>
        <div class="enter-phone">
          <div class="newphone">
            <div class="iphone-option">
              <select ref="mobilecode">
                <option value="233">+233</option>
              </select>
            </div>
            <input
              type="text"
              class="phone-input"
              placeholder="Enter your phone number"
              v-model="newphone"
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
        <p>Please enter the new phone number you need to bind</p>
      </div>
      <div class="enter-phone">
        <div class="newphone">
          <div class="iphone-option">
            <select ref="mobilecode">
              <option value="233">+233</option>
            </select>
          </div>
          <input
            type="text"
            class="phone-input"
            placeholder="Enter your phone number"
            v-model="newphone"
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
import {
  msglistApi,
  checkphonesmsApi,
  updateuserphoneApi
} from "@/api/login/index.js";
import { Toast } from "vant";

export default {
  props: {},
  data() {
    return {
      type: 0, //类型 1.修改手机 2.绑定手机
      step: 1,
      phone: "",
      newphone: "",
      newsphone: "",
      newcode: "",
      countTrue: true,
      countdown: "Get",
      count: 0,
      timer: null,
      verCode: ""
    };
  },
  computed: {
    disabledSubmit() {
      return this.verCode.length == 6 || this.newcode.length == 6;
    }
  },
  created() {},
  mounted() {
    this.phone = this.$route.query.phone;
    if (this.phone) {
      this.type = 1;
    } else {
      this.type = 2;
    }
  },
  watch: {},
  methods: {
    inputFun1(e) {
      this.verCode = e.target.value.replace(/[^\d]/g, "");
    },
    toRevise() {
      if (!this.disabledSubmit) return;
      let data = {
        msg_phone: "",
        msg_num: "",
        msg_types: ""
      };
      if (this.type == 1) {
        if (this.step == 1) {
          data.msg_phone = this.phone;
          data.msg_num = this.verCode;
          data.msg_types = 5;
        } else if (this.step == 2) {
          var phoneReg = /^[1-9]\d*$/;
          if (!phoneReg.test(this.newphone)) {
            this.newsphone = this.newphone.substring(1);
          } else {
            this.newsphone = this.newphone;
          }
          data.msg_phone = this.newsphone;
          data.msg_num = this.newcode;
          data.msg_types = 9;
        }
      } else if (this.type == 2) {
        var phoneReg = /^[1-9]\d*$/;
        if (!phoneReg.test(this.newphone)) {
          this.newsphone = this.newphone.substring(1);
        } else {
          this.newsphone = this.newphone;
        }
        data.msg_phone = this.newsphone;
        data.msg_num = this.newcode;
        data.msg_types = 9;
      }
      checkphonesmsApi(data).then(res => {
        if (res.code == 0) {
          if (this.type == 1) {
            if (this.step == 1) {
              this.step++;
              this.countTrue = true;
              this.count = 0;
            } else if (this.step == 2) {
              this.updatauserphone({ newphone: data.msg_phone });
            }
          } else if (this.type == 2) {
            this.updatauserphone({ newphone: data.msg_phone });
          }
        } else if (res.code == -10001) {
          Toast("Verification code error");
        }
      });
    },
    updatauserphone(data) {
      updateuserphoneApi(data).then(res => {
        if (res.code == 0) {
          let userinfoShop = this.$storage("userinfoShop");
          userinfoShop.mobile = this.newsphone;
          this.$storage.set("userinfoShop", userinfoShop);
          this.$router.go(-1);
        } else {
          Toast("Failed to change cell phone number");
        }
      });
    },
    getCode() {
      let data = {
        msgphone: "",
        areaCode: "233",
        types: ""
      };
      if (this.type == 1) {
        if (this.step == 1) {
          data.types = 5;
          data.msgphone = this.phone;
        } else if (this.step == 2) {
          var phoneReg = /^[1-9]\d*$/;
          if (!phoneReg.test(this.newphone)) {
            this.newsphone = this.newphone.substring(1);
          } else {
            this.newsphone = this.newphone;
          }
          data.types = 9;
          data.msgphone = this.newsphone;
        }
      } else if (this.type == 2) {
        var phoneReg = /^[1-9]\d*$/;
        if (!phoneReg.test(this.newphone)) {
          this.newsphone = this.newphone.substring(1);
        } else {
          this.newsphone = this.newphone;
        }
        data.types = 9;
        data.msgphone = this.newsphone;
      }
      msglistApi(data).then(res => {
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
        } else if (res.code == 1) {
          Toast("A phone number cannot send over 20 messages a day");
        } else if (res.code == 2) {
          Toast("Failed sending");
        } else if (res.code == -130) {
          Toast("The phone number isn’t registered.");
        } else if (res.code == -131) {
          Toast(
            "The phone number was frozen by system.Please contact customer service"
          );
        } else if (res.code == -132) {
          Toast(
            "The phone number was deleted by system.Please contact customer service"
          );
        } else if (res.code == -133) {
          Toast(
            "The phone number is still being approved.Please contact customer service"
          );
        } else if (res.code == -134) {
          Toast(
            "The phone number didn’t get the approval.Please contact customer service"
          );
        } else if (res.code == -135) {
          Toast("Mobile phone number has been bound");
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
.edit-phone {
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
    .iphone-option {
      width: 78px;
      height: 52px;
      position: absolute;
      top: 200px;
      z-index: 2;
    }
    .phone-input,
    .code-input {
      height: 90px;
      width: 400px;
      padding-left: 140px;
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
.m-b-40 {
  margin-bottom: 40px;
}
</style>
