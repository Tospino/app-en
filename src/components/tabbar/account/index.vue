<template>
  <!-- 个人页 -->
  <section>
    <div class="account">
      <div class="header">
        <span class="header-wd">My Tospino</span>
        <div class="fl-right">
          <van-icon name="chat-o" size="17px" @click="jumpRouter('消息')" />
        </div>
      </div>
      <div class="head-con">
        <div class="head-img">
          <img src="@/assets/img/tabbar/my/account/touxiang@2x.png" />
          <br />
          <span class="head-name">{{
            userinfoShop.userName ? userinfoShop.userName : "Set your nickname"
          }}</span>
          <br />
          <span class="head-id">Account:{{ userinfoShop.userId }}</span>
        </div>
      </div>
      <div class="record">
        <van-row>
          <van-col span="8" @click="jumpRouter('收藏夹')">
            <span class="t1">Collection</span>
            <span class="num">{{ shoucangTotal }}</span>
          </van-col>
          <van-col span="8">
            <span class="t1" @click="jumpRouter('我的足迹')">Pageviews</span>
            <span class="num">{{ zujiTotal }}</span>
          </van-col>
          <van-col span="8" @click="jumpRouter('余额充值')">
            <!-- <van-col span="8" @click="jumpRouter('账户明细')"> -->
            <span class="t1">Balance</span>
            <span class="num">{{ jn }}{{ walletMoney ? walletMoney : 0 }}</span>
          </van-col>
        </van-row>
      </div>
      <div class="account-myorder">
        <div class="order-title" @click="toMyOrder(0)">
          <span>My Order</span>
        </div>
        <div class="order-tabbar">
          <van-tabbar
            class="icons"
            v-model="active"
            active-color="#666"
            inactive-color="#666"
          >
            <van-tabbar-item @click="toMyOrder(1)">
              <span>Pending Payment</span>
              <img
                slot="icon"
                slot-scope="props"
                :src="props.active ? icon.daifukuan : icon.daifukuan"
                class="icon-style"
              />
            </van-tabbar-item>
            <van-tabbar-item @click="toMyOrder(2)">
              <span>Pending Delivery</span>
              <img
                slot="icon"
                slot-scope="props"
                :src="props.active ? icon.daifahuo : icon.daifahuo"
                class="icon-style"
              />
            </van-tabbar-item>
            <van-tabbar-item @click="toMyOrder(3)">
              <span>Pending Receiving</span>
              <img
                slot="icon"
                slot-scope="props"
                :src="props.active ? icon.daishouhuo : icon.daishouhuo"
                class="icon-style"
              />
            </van-tabbar-item>
            <van-tabbar-item @click="toMyOrder(4)">
              <span>Finish</span>
              <img
                slot="icon"
                slot-scope="props"
                :src="props.active ? icon.yiwancheng : icon.yiwancheng"
                class="icon-style"
              />
            </van-tabbar-item>
          </van-tabbar>
        </div>
      </div>

      <van-cell-group class="border-0">
        <van-field
          v-model="username"
          clearable
          right-icon="arrow"
          placeholder="评价已购商品"
          left-icon="arrow"
          disabled
          @click="jumpRouter('评价列表')"
          v-if="false"
        >
          <div slot="left-icon" size="small" type="primary" class="icon-left">
            <img src="@/assets/img/tabbar/my/account/pingjia@2x.png" />
          </div>
        </van-field>
      </van-cell-group>
      <van-cell-group class="border-0">
        <van-field
          v-model="username"
          clearable
          right-icon="arrow"
          placeholder="After Sale Service"
          left-icon="arrow"
          disabled
          @click="jumpRouter('售后内容')"
        >
          <div slot="left-icon" size="small" type="primary" class="icon-left">
            <img src="@/assets/img/tabbar/my/account/shouhou@2x.png" />
          </div>
        </van-field>
      </van-cell-group>
      <van-cell-group class="border-0">
        <van-field
          v-model="username"
          clearable
          right-icon="arrow"
          placeholder="My coupons"
          left-icon="arrow"
          disabled
          @click="jumpRouter('优惠券中心')"
        >
          <div slot="left-icon" size="small" type="primary" class="icon-left">
            <img src="@/assets/img/tabbar/my/account/youhuiquan@2x.png" />
          </div>
        </van-field>
      </van-cell-group>
      <van-cell-group class="border-0">
        <van-field
          v-model="username"
          clearable
          right-icon="arrow"
          placeholder="我的优惠券"
          left-icon="arrow"
          disabled
          v-if="false"
        >
          <div slot="left-icon" size="small" type="primary" class="icon-left">
            <img src="@/assets/img/tabbar/my/account/youhuiquan@2x.png" />
          </div>
        </van-field>
      </van-cell-group>
      <van-cell-group class="border-0">
        <van-field
          v-model="username"
          clearable
          right-icon="arrow"
          placeholder="My Balance"
          left-icon="arrow"
          disabled
          @click="jumpRouter('账户余额')"
          v-if="false"
        >
          <div slot="left-icon" size="small" type="primary" class="icon-left">
            <img src="@/assets/img/tabbar/my/account/zhanghuyue@2x.png" />
          </div>
        </van-field>
      </van-cell-group>
      <div class="account-myorder maigin-t-14">
        <div class="order-title">
          <span>My TOSPINO</span>
        </div>
        <div class="order-tabbar">
          <van-tabbar
            class="icons"
            v-model="active"
            active-color="#666"
            inactive-color="#666"
          >
            <!-- <span>自定义</span> -->
            <!-- <img slot="icon" slot-scope="props" :src="props.active ? icon.active : icon.inactive"> -->
            <van-tabbar-item info="99" v-if="false">
              <span>心愿单</span>
              <img
                slot="icon"
                slot-scope="props"
                :src="props.active ? icon.xinyuandan : icon.xinyuandan"
                class="icon-style"
              />
            </van-tabbar-item>
            <van-tabbar-item @click="jumpRouter('我的足迹')">
              <span>Recently Viewed</span>
              <img
                slot="icon"
                slot-scope="props"
                :src="props.active ? icon.zuijinliulan : icon.zuijinliulan"
                class="icon-style"
              />
            </van-tabbar-item>
            <van-tabbar-item @click="jumpRouter('消息')">
              <span>New Messages</span>
              <img
                slot="icon"
                slot-scope="props"
                :src="props.active ? icon.xiaoxitixing : icon.xiaoxitixing"
                class="icon-style"
              />
            </van-tabbar-item>
            <van-tabbar-item v-if="false">
              <span>TOSPINO信用</span>
              <img
                slot="icon"
                slot-scope="props"
                :src="props.active ? icon.xinyong : icon.xinyong"
                class="icon-style"
              />
            </van-tabbar-item>
          </van-tabbar>
        </div>
      </div>
      <van-cell-group class="border-0">
        <van-field
          v-model="username"
          clearable
          right-icon="arrow"
          placeholder="意见反馈"
          left-icon="arrow"
          disabled
          v-if="false"
        >
          <div slot="left-icon" size="small" type="primary" class="icon-left">
            <img src="@/assets/img/tabbar/my/account/yijianfankui@2x.png" />
          </div>
        </van-field>
      </van-cell-group>
      <van-cell-group class="border-0" @click="service">
        <van-field
          v-model="username"
          clearable
          right-icon="arrow"
          placeholder="Customer Service"
          left-icon="arrow"
          disabled
        >
          <div slot="left-icon" size="small" type="primary" class="icon-left">
            <img src="@/assets/img/tabbar/my/account/kefu.png" />
          </div>
        </van-field>
      </van-cell-group>
      <van-cell-group class="border-0">
        <van-field
          v-model="username"
          clearable
          right-icon="arrow"
          placeholder="Settings"
          left-icon="arrow"
          disabled
          @click="jumpRouter('账户设置')"
        >
          <div slot="left-icon" size="small" type="primary" class="icon-left">
            <img src="@/assets/img/tabbar/my/account/zhanghushezhi@2x.png" />
          </div>
        </van-field>
      </van-cell-group>
      <!-- <van-cell-group class="border-0">
        <van-field
          v-model="username"
          clearable
          right-icon="arrow"
          placeholder="Bind Your Facebook Account"
          left-icon="arrow"
          disabled
          @click="toBindThird"
        >
          <div slot="left-icon" size="small" type="primary" class="icon-left">
            <img
              src="@/assets/img/coupon/facebook.png"
              style="width: 20px; height: 20px"
            />
          </div>
        </van-field>
      </van-cell-group> -->
      <van-cell-group class="border-0">
        <van-field
          v-model="username"
          clearable
          right-icon="arrow"
          placeholder="Change Country/District"
          left-icon="arrow"
          disabled
          @click="toLanguage('语言')"
        >
          <div slot="left-icon" size="small" type="primary" class="icon-left">
            <img
              src="@/assets/img/tabbar/my/account/genggaiguojiadiqu@2x.png"
            />
          </div>
        </van-field>
      </van-cell-group>
      <!-- <van-cell-group class="border-0">
        <van-field
          v-model="username"
          clearable
          right-icon="arrow"
          placeholder="Add Minutes"
          left-icon="arrow"
          disabled
          @click="jumpRouter('话费充值')"
        >
          <div slot="left-icon" size="small" type="primary" class="icon-left">
            <img
              src="@/assets/img/tabbar/my/account/chongzhi.png"
              class="chongzhi"
            />
          </div>
        </van-field>
      </van-cell-group> -->
      <div class="footer-btn">
        <van-button type="default" @click="logOut">Log Out</van-button>
      </div>

      <van-overlay :show="show2" @click="show2 = false" class="overlay">
        <!-- 客服电话 -->
        <kefu></kefu>
      </van-overlay>

      <!-- 整体优惠券 -->
      <allCoupons
        ref="allCoupons"
        v-if="isHomeCoupons"
        :isFrame="isFrame"
        :hasAggregate="hasAggregate"
        :isShowCoupon="isShowCoupon"
        :touristSum="touristSum"
        :newCoupon="newCoupon"
        :sideFrame="sideFrame"
        @memberBus="memberBus"
        @isShowBus="isShowBus"
      ></allCoupons>
    </div>
  </section>
</template>

<script>
import allCoupons from "@/multiplexing/allCoupons";
import { queryNewgiftpackApi } from "@/api/home/index.js";
import { couponDrawApi } from "@/api/confirmOrder/index";
import daifahuo from "@/assets/img/tabbar/my/account/daifahuo@2x.png";
import daifukuan from "@/assets/img/tabbar/my/account/daifukuan@2x.png";
import daishouhuo from "@/assets/img/tabbar/my/account/daishouhuo@2x.png";
import xiaoxitixing from "@/assets/img/tabbar/my/account/xiaoxitixing@2x.png";
import xinyong from "@/assets/img/tabbar/my/account/xinyong@2x.png";
import xinyuandan from "@/assets/img/tabbar/my/account/xinyuandan@2x.png";
import yiwancheng from "@/assets/img/tabbar/my/account/yiwancheng@2x.png";
import zuijinliulan from "@/assets/img/tabbar/my/account/zuijinliulan@2x.png";
import { logoutApi, userAddthird, getuserinfo } from "@/api/login/index";
import { selectuserfavoritesApi } from "@/api/favorites/index.js";
import { walletInfoApi } from "@/api/accountBalance/index.js";
import { selectuserbrowhistoryApi } from "@/api/favorites/index";
import { Dialog } from "vant";
import kefu from "@/multiplexing/kefu.vue";
import { Toast } from "vant";
export default {
  props: {},
  data() {
    return {
      active: 0,
      icon: {
        daifahuo,
        daifukuan,
        daishouhuo,
        xiaoxitixing,
        xinyong,
        xinyuandan,
        yiwancheng,
        zuijinliulan,
      },
      username: "",
      userinfoShop: {},
      shoucangTotal: 0,
      walletMoney: 0,
      zujiTotal: 0,
      formData: {
        page: 1,
        limit: 10,
        createtime: "",
      },
      show2: false,
      showServer: false, // 是否显示客户弹框
      thirdapp: [],

      isShowCoupon: 1, //判断是否为新人券或会员券(是否领取)
      touristSum: 0, //吸引游客金额
      isFrame: false, //是否显示平台优惠券弹框
      newCoupon: [], //新用户列表
      hasAggregate: {}, //总优惠数据
      sideFrame: true, //是否显示侧边优惠弹框
      isHomeCoupons: false,
    };
  },
  computed: {},
  created() {
    if (this.$storage.get("userinfoShop")) {
      this.userinfoShop = this.$storage.get("userinfoShop");
    } else {
      this.getUser();
    }
    if (this.$storage.get("thirdapp")) {
      this.thirdapp = this.$storage.get("thirdapp");
    } else {
      this.getUser();
    }
  },
  mounted() {
    this.selectuserfavorites();
    this.walletInfo();
    this.selectuserbrowhistory(this.formData);
    this.newCoupons();
  },
  watch: {},
  methods: {
    getUser() {
      getuserinfo().then((res) => {
        this.$storage.set("userinfoShop", res.user);
        this.$storage.set("thirdapp", res.applist);
      });
    },
    jumpRouter(name) {
      this.$router.push({ name });
    },
    toLanguage() {
      this.$router.push({ name: "语言", query: { type: 1 } });
    },
    toMyOrder(num) {
      sessionStorage.setItem("activeIndex", num);
      this.$router.push({ name: "我的订单" });
    },
    //登出
    logOut() {
      logoutApi().then((res) => {
        if (this.$storage.get("token")) {
          this.$storage.remove("token");
          this.$storage.remove("thirdapp");
          localStorage.removeItem("userinfoShop");
        }
        this.$router.push({ name: "登录" });
        location.reload();
      });
    },
    //收藏夹总数
    selectuserfavorites() {
      let data = {
        seraname: "",
        sort: 2,
        page: 1,
        limit: 10,
      };
      selectuserfavoritesApi(data).then((res) => {
        if (res.code == 0) {
          this.shoucangTotal = res.Data.totalCount;
        }
      });
    },
    //钱包信息
    walletInfo() {
      walletInfoApi().then((res) => {
        if (res.code == 0) {
          this.walletMoney = res.wallet.walletMoney;
        }
      });
    },
    selectuserbrowhistory(data) {
      selectuserbrowhistoryApi(data).then((res) => {
        if (res.code == 0) {
          this.zujiTotal = res.browtotal;
        }
      });
    },
    /**
     * @description:联系客服
     * @author: 曹建勇
     */
    service() {
      this.$router.push({ path: "/control/customerService" });
    },
    /**
     * @description:去绑定第三方 facebook
     * @author: 曹建勇
     */
    toBindThird() {
      if (this.thirdapp.length !== 0 && this.thirdapp[0].thirdUserId) {
        this.$router.push({ name: "授权详情" });
      } else {
        let a = this;
        FB.login(
          function (response) {
            if (response.status === "connected") {
              FB.api("/me", function (response1) {
                userAddthird({ thirduserId: response1.id, type: 1 }).then(
                  (res) => {
                    a.getUser();
                    Dialog.alert({
                      title: "Tips",
                      message: "Empower Facebook to succeed!",
                    }).then(() => {
                      a.$router.push({ name: "授权详情" });
                    });
                  }
                );
              });
            } else {
              Dialog.alert({
                title: "Tips",
                message: "Licensing Facebook failed! Please try again later",
              });
            }
          },
          { scope: "public_profile,email" }
        );
      }
    },
    // 首页平台用户优惠券
    async newCoupons() {
      let newGiftpack = await queryNewgiftpackApi();
      this.hasAggregate = newGiftpack;
      this.isShowCoupon = newGiftpack.isReceive;
      // 1游客显示金额吸引
      this.touristSum = newGiftpack.summoney;
      // 2.新人用户显示优惠券列表
      if (newGiftpack.code == 0) {
        if (newGiftpack.Data) {
          this.newCoupon = newGiftpack.Data;
        }
        if (this.isShowCoupon == 2 || this.isShowCoupon == 4) {
          localStorage.isShowOpen = true;
        } else {
          this.isFrame = true;
          this.isHomeCoupons = true;
        }
      } else if (newGiftpack.code == -300) {
        this.isFrame = false;
        this.isHomeCoupons = false;
      }
    },
    // 领取优惠按钮
    memberBus(id) {
      if (id) {
        couponDrawApi(id).then((res) => {
          if (res.code == 0) {
            this.newCoupons();
          } else if (res.code == 25 || res.code == 29 || res.code == 22) {
            Toast("The coupon has been collected");
            // 多个页面领取后code为25 关闭弹框
            setInterval(() => {
              this.isFrame = false;
            }, 1000);
          } else if (res.code == 32) {
            Toast("The coupon issue period ends");
            // 多个页面领取后code为32 关闭弹框
            setInterval(() => {
              this.isFrame = false;
            }, 1000);
          }
        });
      }
    },
    // 关闭优惠券弹框
    isShowBus(isShow) {
      if (isShow) {
        this.isFrame = false;
      } else {
        this.isFrame = true;
      }
    },
  },
  components: {
    kefu,
    allCoupons,
  },
};
</script>

<style scoped lang="less">
.account {
  padding: 0 30px;
  /deep/ .van-tabbar-item {
    text-align: center;
  }
  .header {
    line-height: 88px;
    box-sizing: border-box;
  }
  .header-wd {
    font-size: 36px;
    color: #000;
  }
  .head-con {
    width: 100%;
    // height: 212px;
    position: relative;
    text-align: center;
    .head-img {
      display: inline-block;
      width: 100%;
      // height: 160px;
      img {
        width: 160px;
        height: 160px;
        margin-bottom: 15px;
      }
      .head-name {
        font-size: 30px;
        color: #333333;
      }
      .head-id {
        display: inline-block;
        height: 24px;
        background: rgba(219, 144, 0, 1);
        border-radius: 12px;
        color: #ffffff;
        font-size: 16px;
        margin: 8px 0 34px;
        padding: 0 11px;
        line-height: 28px;
      }
    }
  }
  .record {
    width: 100%;
    height: 150px;
    margin-bottom: 35px;
    .van-row {
      height: 100%;
      background-color: #fff;
    }
    /deep/ .van-col--8 {
      display: inline-block;
      height: 100%;
      text-align: center;
      position: relative;
      .t1 {
        position: absolute;
        top: 48px;
        font-size: 26px;
        color: #666;
        transform: translate(-50%);
      }
      .num {
        position: absolute;
        top: 93px;
        font-size: 30px;
        color: #333;
        transform: translate(-50%);
      }
    }
  }
  .account-myorder {
    width: 100%;
    background-color: #fff;
    .order-title {
      height: 67px;
      border-bottom: 1px solid #dcdcdc;
      font-size: 30px;
      color: #333;
      line-height: 67px;
      span {
        margin-left: 20px;
      }
    }
    .order-tabbar {
      position: relative;
      height: 126px;
      .icons {
        position: absolute;
        height: 98px;
        bottom: 10px;
        /deep/ i {
          font-size: 43px;
        }
      }
      .icon-style {
        // width: 40px;
        height: 40px;
        margin-bottom: 3px;
      }
      /deep/ .van-hairline--top-bottom {
        &::after {
          border-width: 0;
        }
      }
    }
  }

  .border-0 {
    //跳转栏
    margin-top: 14px;
    /deep/ .van-cell {
      height: 100px;
      line-height: 80px;
      .van-cell__value {
        border: 0;
        margin-left: 45px;
        /deep/ .van-field__body {
          width: 95%;
          .van-field__control {
            font-size: 30px;
          }
          .van-icon-arrow {
            font-size: 30px;
          }
        }
      }
      .icon-left {
        position: absolute;
        left: 23px;
        top: 20px;
        .chongzhi {
          width: 36px;
          height: 36px;
        }
      }
    }
  }
  .footer-btn {
    width: 100%;
    margin: 40px 0;
    text-align: center;
    /deep/ .van-button {
      width: 240px;
      height: 75px;
      background-color: #dcdcdc;
      color: #333333;
      font-size: 34px;
    }
  }
  .p-30 {
    padding: 0 30px;
  }
  .maigin-t-14 {
    margin-top: 14px;
  }
  .overlay {
    // position: relative;
    .overlay-wrapper {
      width: 100%;
      height: 1062px;
      position: absolute;
      bottom: 0;
    }
  }
}
</style>
