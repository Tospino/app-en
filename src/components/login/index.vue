<template>
  <!-- 登录页 -->
  <div class="login">
    <div class="logo">
      <img src="@/assets/img/login/logo@3x.png" />
    </div>
    <div class="user-name">
      <img src="@/assets/img/login/user@3x.png" alt="图标" class="name-icon" />
      <div class="input-con">
        <select name>
          <option value="0">+233</option>
        </select>
        <input
          type="text"
          class="name-input"
          placeholder="Enter your username"
          v-model="userData.username1"
        />
      </div>
    </div>
    <div class="pass-word">
      <img
        src="@/assets/img/login/password@3x.png"
        alt="图标"
        class="name-icon"
      />
      <div class="input-con">
        <input
          :type="inputType"
          class="name-input"
          placeholder="Enter your password"
          v-model="userData.password"
        />
        <van-icon
          :name="eyeName"
          class="password-icon"
          size="20px"
          @click="eyeStatus = !eyeStatus"
        />
      </div>
    </div>
    <div class="forgetPassword clearfix">
      <span class="c1 fl-right fs-24" @click="jumpRouter('忘记密码')"
        >Forgot Password？</span
      >
    </div>
    <div class="upload">
      <div
        class="load-btn"
        @click="logIn"
        :style="{ backgroundColor: disabledSubmit ? '#FA5300' : '#999' }"
      >
        Log In
      </div>
    </div>
    <div class="remarks-option">
      <span class="c2 fs-24" @click="jumpRouter('注册')">Create Account</span>
    </div>
    <div class="footer">
      <div>
        <div class="line left-80"></div>
        <div class="other">Other ways to login</div>
        <div class="line right-80"></div>
        <div class="icons flex flex_around">
          <img src="@/assets/img/login/facebook@3x.png" />
          <!-- <van-row type="flex" justify="space-between">
            <van-col span="8" style="text-align:center" @click="ThirdLogin('facebook')">
              <img src="@/assets/img/login/facebook@3x.png" />
            </van-col>
            <van-col span="8" style="text-align:center" @click="ThirdLogin('twitter')">
              <img src="@/assets/img/login/twitter@3x.png" />
            </van-col>
            <van-col span="8" style="text-align:center" @click="ThirdLogin('weixin')">
              <img src="@/assets/img/login/weixin@3x.png" />
            </van-col>
          </van-row>-->
        </div>
      </div>
      <div class="agreement">
        <input type="checkbox" class="checkbox" v-model="checked" />
        <span class="c1 fs-24">
          <span>You agree to the</span>
          <span>TOSPINO Law Agreement</span>
          <span>and the</span>
          <span @click="zhengce = true" class="c2">Privacy Policy</span>
        </span>
      </div>
    </div>

    <zhezhao v-if="zhengce">
      <div class="tanchuang">
        <div class="tanchuang-header">
          <span>Privacy Policy</span>
          <div class="fl-right">
            <van-icon name="cross" @click="zhengce = false" />
          </div>
        </div>
        <div class="tanchuang-content">
          <yinsi :showTitle="false"></yinsi>
        </div>
      </div>
    </zhezhao>

    <van-action-sheet
      v-model="show"
      title="Bind mobile phone number"
      style="height: 350px"
    >
      <section class="bind_pop">
        <div class="flex flex_space items">
          <div class="flex">
            <span class="labels">Phone Number</span>
            <input
              type="text"
              style="width: 200px"
              class="inputs"
              v-model="bindForm.phone"
              @blur="CheckPhone"
              placeholder="Please enter phone number"
            />
          </div>
          <select ref="phone_select">
            <option value="+233">+233</option>
          </select>
        </div>
        <div class="flex items flex_space mt_20">
          <div class="flex">
            <span class="labels">Verification code</span>
            <input
              type="text"
              style="width: 200px"
              class="inputs"
              v-model="bindForm.code"
              placeholder
            />
          </div>
          <span class="getCode" @click="getMsgCode">{{ msg }}</span>
        </div>
        <div class="flex items mt_20" v-if="!hasUser">
          <span class="labels">password</span>
          <input
            type="text"
            style="width: 200px"
            class="inputs"
            v-model="bindForm.password"
            placeholder="Please enter password"
          />
        </div>
        <div class="bind_btns" @click="thirdSubmit">Bind phone</div>
      </section>
    </van-action-sheet>
  </div>
</template>

<script>
import {
  loginApi,
  doLogin,
  checkphonethird,
  userAddthird,
  userregister,
  msglistApi,
  getuserinfo,
} from "@/api/login/index";
import { accReg, passReg } from "@/common/reg.js";
import zhezhao from "@/multiplexing/zhezhao";
import yinsi from "@/components/tabbar/account/accountSettings/aboutItem/privacyPolicy.vue";
import { Toast, Dialog } from "vant";
import { mapActions } from "vuex";
export default {
  props: {},
  data() {
    return {
      checked: true,
      inputType: "password",
      eyeName: "closed-eye",
      eyeStatus: Boolean,
      userData: {
        username: "",
        password: "",
        username1: "",
      },
      rules: {
        username1: {
          required: true,
          messages: "Enter login username",
        },
        password: {
          required: true,
          messages: "Enter login password",
        },
      },
      zhengce: false,
      show: false,
      bindForm: {
        phone: "",
        code: "",
        password: "",
        areaCode: "+233",
      },
      showKeyboard: false,
      facebook_id: "",
      hasUser: true, // 是否是已注册用户
      msg: "get code",
    };
  },
  computed: {
    disabledSubmit() {
      return !this.$fn.isDisabled(this.userData, this.rules) && this.checked;
    },
  },
  created() {
    //易观数据采集-----核心页面加载
    let urlHtm = window.location.href;
    let titHtm = document.title;
    AnalysysAgent.track(
      "core_page_load",
      {
        $url: urlHtm,
        $title: titHtm,
      },
      (rel) => {}
    );
  },
  mounted() {
    if (localStorage.mobile) {
      this.userData.username1 = localStorage.mobile;
    }
    window.addEventListener("keyup", this.keyupEnter, false);
  },
  beforeDestroy() {
    window.removeEventListener("keyup", this.keyupEnter, false);
  }, //生命周期 - 销毁之前
  destroyed() {
    window.removeEventListener("keyup", this.keyupEnter, false);
  }, //生命周期 - 销毁完成
  watch: {
    eyeStatus: {
      handler: function (newVal, oldVal) {
        this.eyeStatus
          ? (this.eyeName = "eye-o")
          : (this.eyeName = "closed-eye");
        this.eyeStatus
          ? (this.inputType = "text")
          : (this.inputType = "password");
      },
    },
  },
  methods: {
    ...mapActions(["classifykeep"]),
    //登录按钮
    logIn() {
      if (this.disabledSubmit) {
        var phoneReg = /^[1-9]\d*$/;
        if (!phoneReg.test(this.userData.username1)) {
          this.userData.username = this.userData.username1.substring(1);
        } else {
          this.userData.username = this.userData.username1;
        }

        loginApi(this.userData).then((res) => {
          if (res.code == 0) {
            localStorage.token = res.token;
            // if (this.$storage("?historyList")) {
            //   if (
            //     this.$storage.get("historyList")[0].userId != res.user.userId
            //   ) {
            //     this.$storage.remove("historyList");
            //   }
            // }
            //第一次登录：dengluOne
            let obj = Object.assign(res.user, { dengluOne: true });
            localStorage.userinfoShop = JSON.stringify(obj);
            this.$router.push({ name: "首页" });
            this.classifykeep(true);
          } else if (res.code == -4) {
            Toast("Password error");
          } else if (res.code == -26) {
            Toast(
              "The phone number is frozen. Please contact customer service."
            );
          } else if (res.code == -27) {
            Toast(
              "The phone number is deleted. Please contact customer service."
            );
          } else if (res.code == -28) {
            Toast("The phone isn't registered.");
          }

          //易观数据采集----登录
          let reason = "";
          if (res.code == -4) {
            reason = "Password error";
          } else if (res.code == -26) {
            reason =
              "The phone number is frozen. Please contact customer service.";
          } else if (res.code == -27) {
            reason =
              "The phone number is deleted. Please contact customer service.";
          } else if (res.code == -28) {
            reason = "The phone isn't registered.";
          }
          AnalysysAgent.track(
            "log_in",
            {
              user_id: this.userData.username,
              login_method: "密码",
              is_successful: res.code == 0 ? true : false,
              failure_reason: reason,
            },
            (rel) => {}
          );
          if (res.code == 0) {
            //绑定用户ID
            AnalysysAgent.alias(this.userData.username, (rek) => {});
            //易观绑定用户属性
            AnalysysAgent.profileSet(
              {
                user_id: res.user.userId,
                user_type: res.user.isBusiness,
                phone: res.user.mobile,
                name: res.user.nickName,
                vip_level: res.user.levelTitle,
                register_date: res.user.userAddtime,
                company_name: res.user.companyName,
                cumulative_order: res.user.orderTotalNum,
                balance: res.user.balance,
                first_source: res.user.auditRemark,
                total_gmv: res.user.orderAmountWebsite,
                detailed_address: res.user.companyAddress,
                main_business: res.user.typeTitle,
              },
              (rel) => {}
            );
          }
        });
      }

      //易观数据采集---按钮点击
      let titHtm = document.title;
      AnalysysAgent.track(
        "btn_click",
        {
          $title: titHtm,
          btn_name: "Log In",
        },
        (rel) => {}
      );
    },
    //回车键
    keyupEnter() {
      const that = this;
      if (window.event.keyCode == 13) {
        //执行登录方法
        this.logIn();
      }
    },
    jumpRouter(name) {
      this.$router.push({ name });
    },
    // 第三方登录
    ThirdLogin(val) {
      let a = this;
      if (val === "facebook") {
        // 调用facebook登录
        FB.login(
          function (response) {
            if (response.status === "connected") {
              a.facebook_id = response.authResponse.userID;
              FB.api("/me", function (response1) {
                doLogin({
                  inputToken: response.authResponse.accessToken,
                  name: response1.name,
                }).then((res) => {
                  if (res.code === 0) {
                    localStorage.token = res.token;
                    a.$router.push({ name: "首页" });
                  } else if (res.code === -330) {
                    a.show = true;
                  } else if (res.code === -340) {
                    a.show = true;
                  }
                });
              });
            } else {
              Dialog.alert({
                title: "Tips",
                message: "User cancelled login or did not fully authorize.",
              }).then(() => {
                // on close
              });
              // The person is not logged into your webpage or we are unable to tell.
            }
          },
          { scope: "public_profile,email" }
        );
        // 调用facebook退出登录
        // FB.logout(function (response) {
        //   // Person is now logged out
        // });
      }
    },
    // 检测手机号是否注册平台账号
    CheckPhone() {
      if (this.bindForm.phone.length === 11) {
        checkphonethird({
          userPhone: this.bindForm.phone,
          thirduserId: this.facebook_id,
          type: 1,
        }).then((res) => {
          switch (res.code) {
            case -110:
              this.hasUser = false;
              Toast(
                "The mobile phone number is not registered on this platform"
              );
              break;
            case 0:
              this.hasUser = true;
              Toast(
                "The mobile phone number has been registered on the platform. Whether to bind the mobile phone"
              );
              break;
            case -26:
              Toast(
                "The mobile phone number has been frozen, please contact the customer service"
              );
              break;
            case -27:
              Toast(
                "The phone number has been deleted. Please contact the customer service"
              );
              break;
          }
        });
      }
    },
    // 第三方登录 绑定手机提交
    thirdSubmit() {
      const query = {
        userPhone: this.bindForm.phone,
        thirduserId: this.facebook_id,
        smsCode: this.bindForm.code,
        password: this.bindForm.password,
        ishaveuser: this.hasUser ? 1 : 0,
        type: 1,
      };
      if (this.hasUser) {
        delete query.password;
      }
      userregister(query).then((res) => {
        if (res.code === 0) {
          Toast("Binding success");
          setTimeout(() => {
            localStorage.token = res.token;
            this.$router.push({ name: "首页" });
          }, 1500);
          getuserinfo().then((req) => {
            this.$storage.set("userinfoShop", req.user);
            this.$storage.set("thirdapp", req.applist);
          });
        }
      });
    },
    // 获取手机验证码
    getMsgCode() {
      if (this.bindForm.phone.length === 11 && typeof this.msg == "string") {
        msglistApi({
          msgphone: this.bindForm.phone,
          areaCode: this.$refs["phone_select"].value,
          types: 8,
        }).then((res) => {
          if (res.code == 0) {
            Toast("Send Successfully");
            this.msg = 60;
            let timer = setInterval(() => {
              this.msg--;
              if (this.msg === 0) {
                clearInterval(timer);
              }
            }, 1000);
          }
        });
      } else {
        Toast("please enter a valid phone number");
      }
    },
  },
  components: {
    zhezhao,
    yinsi,
  },
};
</script>

<style scoped lang="less">
.van-action-sheet__header {
  height: 80px;
  line-height: 80px;
  font-size: 30px;
}
.van-action-sheet__close {
  font-size: 36px;
  margin-right: 30px;
}
.bind_pop {
  padding: 50px 30px;
  .items {
    border-bottom: 1px solid #eee;
    padding: 20px 0;
    .labels {
      font-size: 18px;
      color: #333;
      width: 120px;
    }
    .inputs {
      display: block;
      box-sizing: border-box;
      width: 100%;
      min-width: 0;
      margin: 0;
      padding: 0;
      color: #323233;
      line-height: inherit;
      text-align: left;
      background-color: transparent;
      border: 0;
      resize: none;
    }
  }

  .mt_20 {
    margin-top: 40px;
  }
  .getCode {
    color: #fa5300;
  }
  .bind_btns {
    font-size: 24px;
    text-align: center;
    margin-top: 120px;
    width: 100%;
    height: 70px;
    line-height: 70px;
    color: #fff;
    background-color: #fa5300;
    border-radius: 32px;
  }
}

.login {
  min-height: 100%;
  position: relative;
  background-color: #fff;
  padding-top: 127px;
  box-sizing: border-box;
  .logo {
    width: 281px;
    margin-left: 50%;
    transform: translateX(-50%);
    padding-bottom: 125px;
  }
  .user-name {
    padding: 0 85px;
    .name-icon {
      width: 50px;
      height: 50px;
    }
    .input-con {
      display: inline-block;
      width: 510px;
      height: 60px;
      border-bottom: 1px solid #999;
      font-size: 26px;
      margin-left: 10px;
    }
    .name-input {
      width: 300px;
      border: 0;
    }
  }
  .pass-word {
    padding: 53px 85px 36px;
    .name-icon {
      width: 50px;
      height: 50px;
    }
    .input-con {
      display: inline-block;
      width: 510px;
      height: 60px;
      border-bottom: 1px solid #999;
      font-size: 26px;
      margin-left: 10px;
    }
    .name-input {
      width: 420px;
      border: 0;
    }
  }
  .forgetPassword {
    padding: 0 80px;
  }
  .upload {
    width: 100%;
    padding: 0 80px;
    height: 88px;
    box-sizing: border-box;
    overflow: hidden;
    line-height: 88px;
    text-align: center;
    margin: 49px 0 29px;
    .load-btn {
      height: 100%;
      background-color: #999;
      border-radius: 44px;
      color: #fff;
      font-size: 40px;
    }
  }
  .remarks-option {
    text-align: center;
    font-size: 24px;
    padding-bottom: 156px;
  }
  .footer {
    position: relative;
    text-align: center;
    .other {
      font-size: 24px;
      color: #999;
    }
    .icons {
      width: 100%;
      box-sizing: border-box;
      overflow: hidden;
      padding: 0 100px;
      margin: 49px 0;
      img {
        width: 80px;
        height: 80px;
      }
    }

    /deep/ .van-row {
      img {
        width: 80px;
        height: 80px;
      }
    }
    .agreement {
      padding-right: 60px;
      font-size: 20px;
    }
  }
  .checkbox {
    vertical-align: middle;
  }
  .c1 {
    color: #999;
  }
  .c2 {
    color: #fa5300;
  }
  .line {
    width: 206px;
    background-color: #999;
    height: 2px;
  }
  .left-80 {
    position: absolute;
    left: 40px;
    top: 10px;
  }
  .right-80 {
    position: absolute;
    right: 40px;
    top: 10px;
  }
  .tanchuang {
    height: 80%;
    margin: 80px 30px;
    background-color: #fff;
    .tanchuang-header {
      height: 109px;
      line-height: 109px;
      font-size: 36px;
      text-align: center;
      color: #333;
      font-weight: bold;
      padding: 0 40px;
      border-bottom: 1px solid #c9c9c9;
      div {
        display: inline-block;
      }
    }
    .tanchuang-content {
      max-height: 85%;
      overflow: auto;
      padding-top: 29px;
    }
  }
}
</style>
