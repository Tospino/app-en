<template>
  <!-- 余额充值 -->
  <div class="account-balance">
    <balance-header
      title="Balance"
      title2="Records"
      @jumpRouter="jumpRouter"
      jumpName="账户明细"
    ></balance-header>
    <div class="balance-bottom">
      <p class="bottom-p1">Top Up</p>
      <p class="bottom-p2">
        Balance: {{ jn }}{{ walletMoney ? walletMoney : 0 }}
      </p>
      <div class="line"></div>
      <p class="tips-middle">
        Select an amount(you can choose an amount below or enter an amount)
      </p>
      <div class="money-list">
        <div
          v-for="(prepaidMoney, index) in prepaidMoneyList"
          :key="index"
          :class="{ active: index == currentIndex }"
          @click="choiceItem(prepaidMoney, index)"
        >
          <span class="mony1">{{ prepaidMoney.money }}&nbsp;GHS</span>
          <br />
          <span class="mony2"
            >To the account: GHS {{ prepaidMoney.arrivalAmount }}</span
          >
        </div>
      </div>
      <div class="enter-amount" @click="customNum">
        <van-field
          v-model="customMony"
          type="number"
          class="field"
          @input="changeMoney"
        />
      </div>
      <div
        class="btn-next"
        @click="showpaymen"
        :style="{ backgroundColor: disabledSubmit ? '#FA5300' : '#999' }"
      >
        Next
      </div>
      <div class="tips-bottom">
        <div class="b1">What is Top Up?</div>
        <div class="c-999">
          {{ prepaidMoneyData.payExplain ? prepaidMoneyData.payExplain : "" }}
        </div>
      </div>
    </div>

    <!-- 选择付款方式弹窗 -->
    <action-sheet-paymen
      ref="actionSheetPaymen"
      :moeny="Number(currentItem.money)"
      @paymoeny="paymoeny"
      @orderpay="orderpay"
      :ifYuEStatus="true"
    ></action-sheet-paymen>

    <!-- 支付成功弹窗 -->
    <action-sheet-sucess
      ref="sucess"
      @showsucess="showsucess"
    ></action-sheet-sucess>

    <!-- 支付密码 -->
    <action-sheet-password
      ref="actionSheetPassword"
      @getPassWord="getPassWord"
    ></action-sheet-password>
  </div>
</template>

<script>
import balanceHeader from "./itemComponents/balanceHeader";
import actionSheetPaymen from "./itemComponents/actionSheetPaymen";
import actionSheetSucess from "./itemComponents/actionSheetSucess";
import actionSheetPassword from "./itemComponents/actionSheetPassword";
import {
  getTodayPayTemplateApi,
  TopupBalanceApi,
  createInvoiceApi,
} from "@/api/prepaidRefill/index.js";
import { walletInfoApi } from "@/api/accountBalance/index.js";
import { Toast } from "vant";
export default {
  props: {},
  data() {
    return {
      prepaidMoneyData: {},
      prepaidMoneyList: [],
      showPaymen: false,
      paidMoneyData: {
        userId: null, //用户ID
        rechargeAmount: null, //到账金额
        payMoney: null, //实际付款金额
        disMoney: null, //赠送金额
        payMethod: 1, //充值方式 （1.三方支付）
        payType: null, //1.选择模板充值 2.输入金额充值
        payTemplateId: null, //充值模板ID,（在选择模板充值时必填）
      },
      userinfoShop: {},
      currentIndex: null,
      currentItem: {},
      invoiceData: {
        payMainNo: "",
        provider: "",
        orderSource: "1",
      },
      customMony: "",
      walletMoney: "",
    };
  },
  computed: {
    disabledSubmit() {
      return (
        (Number(this.customMony) && Number(this.customMony) > 0) ||
        this.currentItem.money
      );
    },
  },
  created() {},
  mounted() {
    if (localStorage.userinfoShop) {
      this.userinfoShop = JSON.parse(localStorage.userinfoShop);
      this.paidMoneyData.userId = this.userinfoShop.userId;
    }
    this.getTodayPayTemplate();
    this.walletInfo();
  },
  watch: {},
  methods: {
    orderpay() {
      this.topupBalance(this.paidMoneyData);
    },
    jumpRouter(name) {
      this.$router.push({ name });
    },
    //话费充值产品列表
    getTodayPayTemplate() {
      getTodayPayTemplateApi().then((res) => {
        if (res.status_code == 200) {
          this.prepaidMoneyData = res.data.payTemplateList[0]
            ? res.data.payTemplateList[0]
            : [];
          this.prepaidMoneyList = this.prepaidMoneyData.payMoneyList
            ? this.prepaidMoneyData.payMoneyList
            : [];
          Toast.clear();
        } else {
          Toast("error");
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

    topupBalance(data) {
      TopupBalanceApi(data).then((res) => {
        if (res.status_code == 200) {
          this.invoiceData.payMainNo = res.data.sn;
          this.createInvoice(this.invoiceData);
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
      this.paidMoneyData.rechargeAmount = this.currentItem.arrivalAmount;
      this.paidMoneyData.payMoney = this.currentItem.money;
      this.paidMoneyData.disMoney = this.currentItem.donateMoney;
      this.paidMoneyData.payTemplateId = this.currentItem.payMoneyId;
      this.paidMoneyData.payType = this.currentIndex === null ? 2 : 1;
      this.invoiceData.provider = paymentData.shortName;

      this.$refs.actionSheetPaymen.zhezhaoStatus = true;
      this.$refs.actionSheetPaymen.payStatus = true;
    },
    //弹出选择支付方式
    showpaymen() {
      if (this.currentIndex === null) {
        this.currentItem = {
          arrivalAmount: this.customMony,
          donateMoney: 0,
          money: this.customMony,
        };
      }
      if (!this.disabledSubmit) return;
      this.$refs.actionSheetPaymen.showyinhang();
    },
    //自定义金额
    customNum() {
      this.currentIndex = null;
      this.currentItem = {};
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
      (this.payPwd = value), this.topupBalance(this.paidMoneyData);
    },
    changeMoney(e) {
      this.customMony = e.replace(/^(\-)*(\d+)\.(\d\d).*$/, "$1$2.$3");
    },
  },
  components: {
    balanceHeader,
    actionSheetPaymen,
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
      font-size: 40px;
      color: #666;
      margin-bottom: 19px;
    }
    .bottom-p2 {
      font-size: 28px;
      color: #666;
      margin-bottom: 19px;
    }
    .line {
      height: 1px;
      background: #dcdcdc;
      margin: 35px 0;
    }
    .tips-middle {
      font-size: 24px;
      color: #666;
      line-height: 30px;
    }
    .money-list {
      display: -webkit-flex;
      display: flex;
      -webkit-flex-wrap: wrap;
      flex-wrap: wrap;
      margin: 30px 0;
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

      .active {
        border: 2px solid rgba(250, 83, 0, 1);
        box-shadow: 0px 4px 8px 0px rgba(228, 76, 0, 0.3);
        color: #fa5300;
      }
      .mony1 {
        display: inline-block;
        margin-top: 42px;
        font-size: 34px;
        font-weight: bold;
        margin-bottom: 9px;
      }
      .mony2 {
        display: inline-block;
        font-size: 24px;
      }
    }
    .btn-next {
      height: 88px;
      border-radius: 10px;
      line-height: 88px;
      text-align: center;
      color: #fff;
      margin: 100px 0 50px;
      font-size: 36px;
      background-color: #fa5300;
    }
  }
  .enter-amount {
    height: 88px;
    border: 1px solid #999999;
    border-radius: 10px;
  }
  .field {
    height: 100%;
    /deep/ .van-cell__value {
      height: 100%;
      .van-field__body {
        height: 100%;
        font-size: 40px;
      }
    }
  }
  .tips-bottom {
    font-size: 28px;
    line-height: 32px;
    .b1 {
      font-size: 34px;
      color: #333;
      margin-bottom: 30px;
    }
  }
}
</style>
