<template>
  <!-- 账户余额 -->
  <div class="account-balance">
    <balance-header title="Add Minutes" title2="Records" @jumpRouter="jumpRouter" jumpName="话费充值记录"></balance-header>
    <div class="balance-bottom">
      <p class="bottom-p1">Enter the phone number you need to add minutes</p>
      <div class="phone-input">
        <span class="quhao">+&nbsp; 233</span>
        <input type="number" class="phone-num" v-model="phone" />
      </div>
      <div class="money-list">
        <div
          v-for="(prepaidMoney,index) in prepaidMoneyList"
          :key="index"
          :class="{active: index==currentIndex}"
          @click="choiceItem(prepaidMoney,index)"
        >
          <span class="mony1">{{prepaidMoney.money}}&nbsp;GHS</span>
          <br />
          <span class="mony2">Price: {{prepaidMoney.discountPrice}} GHS</span>
        </div>
        <div
          class="custom"
          :class="{active: currentIndex == 100}"
          v-if="prepaidMoneyData.isStartFreedom == 1"
        >
          <!-- <span class="mony1">自定义</span> -->
          <input
            type="number"
            class="custom-input"
            placeholder="User-defined"
            @click="customNum"
            @change="customOnblur"
            v-model="customMony"
          />
        </div>
      </div>
      <div
        class="btn-next"
        @click="showpaymen"
        :style="{backgroundColor:(disabledSubmit?'#FA5300':'#999')}"
      >Add Now</div>
    </div>

    <!-- 选择付款方式弹窗 -->
    <action-sheet-paymen
      ref="actionSheetPaymen"
      :moeny="Number(currentItem.discountPrice)"
      @showPassWord="showPassWord"
      @paymoeny="paymoeny"
      @orderpay="orderpay"
    ></action-sheet-paymen>

    <!-- 支付成功弹窗 -->
    <action-sheet-sucess ref="sucess" @showsucess="showsucess"></action-sheet-sucess>

    <!-- 支付密码 -->
    <action-sheet-password ref="actionSheetPassword" @getPassWord="getPassWord"></action-sheet-password>
  </div>
</template>

<script>
import balanceHeader from "./itemComponents/balanceHeader";
import actionSheetPaymen from "./itemComponents/actionSheetPaymen";
import actionSheetYinhang from "./itemComponents/actionSheetYinhang";
import actionSheetSucess from "./itemComponents/actionSheetSucess";
import actionSheetPassword from "./itemComponents/actionSheetPassword";
import {
  topupFlexiProductListApi,
  addPhoneRechargeOrderApi,
  createInvoiceApi,
  balancePrepaidRechargeApi,
} from "@/api/prepaidRefill/index.js";
import { Toast } from "vant";
export default {
  props: {},
  data() {
    return {
      prepaidMoneyData: {},
      prepaidMoneyList: [],
      showPaymen: false,
      phone: "",
      paidMoneyData: {
        userId: null,
        prepaidMoney: null,
        prepaidActuallyMoney: null,
        discount: null,
        paymentType: null,
        referalNumber: null,
      },
      userinfoShop: {},
      currentIndex: null,
      currentItem: {},
      invoiceData: {
        payMainNo: "",
        provider: "",
        phoneNumber: "",
      },
      customMony: "",
    };
  },
  computed: {
    disabledSubmit() {
      return (
        this.currentIndex != null &&
        this.phone &&
        (Number(this.customMony) || this.currentItem.discountPrice)
      );
    },
  },
  created() {},
  mounted() {
    if (localStorage.userinfoShop) {
      this.userinfoShop = JSON.parse(localStorage.userinfoShop);
      this.paidMoneyData.userId = this.userinfoShop.userId;
    }
    this.topupFlexiProductList();
  },
  watch: {},
  methods: {
    orderpay() {
      this.addPhoneRechargeOrder(this.paidMoneyData);
    },
    jumpRouter(name) {
      this.$router.push({ name });
    },
    //话费充值产品列表
    topupFlexiProductList() {
      topupFlexiProductListApi().then((res) => {
        if (res.status_code == 200) {
          this.prepaidMoneyData = res.data;
          this.prepaidMoneyList = res.data.prepaidMoneyList;
          Toast.clear();
        } else {
          Toast("error");
        }
      });
    },
    //余额话费充值
    balancePrepaidRecharge(data) {
      balancePrepaidRechargeApi(data).then((res) => {
        if (res.status_code == 200) {
          this.showsucess();
          Toast.clear();
        } else if (res.status_code == 101) {
          Toast("Wrong payment password");
        } else if (res.status_code == 102) {
          Toast("Insufficient balance");
        } else {
          Toast("error");
        }
      });
    },
    //生成话费充值订单
    addPhoneRechargeOrder(data) {
      addPhoneRechargeOrderApi(data).then((res) => {
        if (res.status_code == 200) {
          this.invoiceData.phoneNumber = 233 + this.phone;
          this.invoiceData.payMainNo = res.data.prepaidSn;
          if (this.paidMoneyData.paymentType == 1) {
            this.balancePrepaidRecharge({
              prepaidId: res.data.prepaidId,
              payPwd: this.payPwd,
            });
          } else {
            this.createInvoice(this.invoiceData);
          }
          Toast.clear();
        } else if (res.status_code == 102) {
          Toast("Incorrect phone number");
        } else {
          Toast("error");
        }
      });
    },
    //创建一个发票并发回slydepay支付令牌
    createInvoice(data) {
      createInvoiceApi(data).then((res) => {
        if (res.status_code == 200) {
          window.location.href = res.data.resultUrl;
        } else {
          Toast("error");
        }
      });
    },
    //选择模块
    choiceItem(data, index) {
      this.currentIndex = index;
      this.currentItem = data;
      this.customMony = "";
    },
    //获取支付方式
    paymoeny(paymentData) {
      this.paidMoneyData.paymentType = paymentData.payTypeList == 201 ? 1 : 2;
      this.paidMoneyData.prepaidMoney = this.currentItem.money;
      this.paidMoneyData.prepaidActuallyMoney = this.currentItem.discountPrice;
      this.paidMoneyData.discount = this.currentItem.discount;
      this.paidMoneyData.referalNumber = 233 + this.phone;
      this.invoiceData.provider = paymentData.shortName;
      if (this.paidMoneyData.paymentType == 1) {
        this.showPassWord(true);
      } else {
        this.$refs.actionSheetPaymen.zhezhaoStatus = true;
        this.$refs.actionSheetPaymen.payStatus = true;
      }
    },
    //弹出银行
    showPassWord(flag) {
      this.$refs.actionSheetPassword.showAction = flag;
    },
    //弹出选择支付方式
    showpaymen() {
      if (!this.disabledSubmit) return;
      this.$refs.actionSheetPaymen.showAction = true;
    },
    //自定义金额
    customNum() {
      this.currentIndex = 100;
      this.currentItem = {};
    },
    //自定义金额
    customOnblur() {
      if (this.customMony < 0) {
        this.customMony = 0;
      }
      this.currentItem = {
        money: Number(this.customMony),
        discountPrice: Number(this.customMony),
        discount: 0,
      };
    },
    //弹出支付成功
    showsucess() {
      this.$refs.sucess.showAction = true;
      setTimeout(() => {
        this.$router.push({ name: "话费充值记录" });
      }, 1000);
    },
    //获取到密码,请求接口
    getPassWord(value) {
      (this.payPwd = value), this.addPhoneRechargeOrder(this.paidMoneyData);
    },
  },
  components: {
    balanceHeader,
    actionSheetPaymen,
    actionSheetYinhang,
    actionSheetSucess,
    actionSheetPassword,
  },
};
</script>

<style scoped lang="less">
.account-balance {
  .balance-bottom {
    padding: 39px 30px 0;
    .bottom-p1 {
      font-size: 20px;
      color: #666;
      margin-bottom: 19px;
    }
    .phone-input {
      padding: 20px 0;
      width: 690px;
      border-bottom: 1px solid #666666;
      margin-bottom: 60px;
      line-height: 80px;
      .quhao {
        font-size: 30px;
        color: #666;
      }
      .phone-num {
        margin-left: 20px;
        width: 500px;
        font-size: 50px;
        border: 0;
        background-color: #f8f8fa;
        font-weight: 800;
      }
    }
    .money-list {
      display: -webkit-flex;
      display: flex;
      -webkit-flex-wrap: wrap;
      flex-wrap: wrap;
      div {
        width: 220px;
        height: 170px;
        border: 2px solid #d2d2d2;
        border-radius: 10px;
        // line-height: 60px;
        text-align: center;
        color: #333;
        margin: 0 6px 15px 0;
        &:nth-last-child(1) {
          margin-right: 0;
        }
      }
      .custom {
        position: relative;
        .custom-input {
          position: absolute;
          top: 50%;
          left: 10%;
          transform: translateY(-50%);
          width: 80%;
          height: 50%;
          font-size: 26px;
          color: #333;
          font-weight: bold;
          text-align: center;
          border: 0;
          background-color: #f8f8fa;
        }
      }
      .active {
        border: 2px solid rgba(250, 83, 0, 1);
        box-shadow: 0px 4px 8px 0px rgba(228, 76, 0, 0.3);
        color: #fa5300;
      }
      .mony1 {
        display: inline-block;
        margin-top: 62px;
        font-size: 34px;
        font-weight: bold;
        margin-bottom: 9px;
      }
      .mony2 {
        display: inline-block;
        font-size: 22px;
      }
    }
    .btn-next {
      height: 88px;
      border-radius: 10px;
      line-height: 88px;
      text-align: center;
      color: #fff;
      margin: 20px 0 79px;
      font-size: 36px;
      background-color: #fa5300;
      margin-top: 200px;
    }
  }
}
</style>
