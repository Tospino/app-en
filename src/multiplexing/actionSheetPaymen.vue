<template>
  <!--付款方式弹窗 -->
  <div>
    <van-action-sheet
      v-model="showAction"
      title="Confirm the Payment"
      class="action-sheet-paymen"
      :close-on-click-overlay="false"
      @cancel="cancelSheet"
    >
      <div class="paymen-content">
        <div class="paymen-content-top" @click="showyinhang">
          <span>Pay by</span>
          <van-icon name="arrow" />
          <span>{{oneTypeName}}</span>
        </div>
        <div class="paymen-content-top">
          <span>Total Payment</span>
          <span class="c-orange">{{jn}}{{paymoeny}}</span>
        </div>
      </div>
      <div class="upload">
        <van-button type="info" size="large" class="load-btn" @click="confirm">Confirm the Payment</van-button>
      </div>
    </van-action-sheet>
    <action-sheet-yinhang
      ref="actionSheetYinhang"
      @toParnet="fnParent"
      @change="onChangePayMethod"
      :showList="showList"
      :paymoeny="paymoeny"
      @cancelSheet="cancelSheet"
    ></action-sheet-yinhang>

    <zhezhao v-if="zhezhaoStatus">
      <div class="tanchuang">
        <p class="p1">{{tips1}}</p>
        <p class="p2">{{tips2}}</p>
        <div v-if="payStatus">
          <div class="fl-left btn-left" @click="zhezhaoStatus = false">Other Ways</div>
          <div class="fl-right btn-right" @click="this.orderlaunchpay">OK</div>
        </div>
        <div v-else>
          <div class="fl-left btn-left" @click="leavePay">Leave without paying</div>
          <div class="fl-right btn-right" @click="zhezhaoStatus = false">Proceed To Pay</div>
        </div>
      </div>
    </zhezhao>
  </div>
</template>

<script>
import { getonlinepaytypelistApi } from "@/api/myOrder/index";
import actionSheetYinhang from "@/multiplexing/actionSheetYinhang";
import { listPayOptionsApi } from "@/api/confirmOrder/index";
import { park } from "@/api";
import { Toast } from "vant";
export default {
  props: {
    moeny: {
      type: Number,
      default: 0,
    },
    orderSn: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      showAction: false,
      payTypeList: [
        {
          type: 203,
          name: "MTN Mobile Money",
          shortName: "MTN_MONEY",
        },
      ],
      list: [],
      nalist: [],
      oneTypeName: "",
      showList: [],
      zhezhaoStatus: false,
      tips1: "Are you sure want to leave?",
      tips2:
        "This order will automatically be cancelled if not paid for within 30 minutes.",
      payStatus: false,
    };
  },
  computed: {
    paymoeny() {
      return this.moeny;
    },
  },
  created() {},
  mounted() {
    this.getonlinepaytypelist();
    this.listPayOptions();
  },
  watch: {},
  methods: {
    onChangePayMethod(item) {
      this.oneTypeName = item.msg;
      this.payTypeList = [
        {
          name: item.name,
          type: item.type,
        },
      ];
      this.list[0].payTypeList = item.type;
      this.list[0].payTypeDetail = item.name;
    },
    // 付款方式
    fnParent(e) {
      this.oneTypeName = e.name;
      this.payTypeList = [
        {
          name: e.name,
          type: e.type,
          shortName: e.shortName,
        },
      ];
      this.list[0].payTypeList = e.type;
      this.list[0].payTypeDetail = e.name;
      this.confirm();
    },
    // 立即支付
    confirm() {
      if (this.payTypeList[0].type === 203) {
        this.zhezhaoStatus = true;
        this.payStatus = true;
        this.tips2 =
          "The advanced logout during payment process will cause failed order payment. The order will be canceled automatically if it cannot be paid within 30 minutes.";
        this.tips1 = "";
      } else {
        this.$emit("showPassWord", true, "支付");
      }
    },
    orderlaunchpay() {
      park({
        url: `/appsaleorder/orderlaunchpay`,
        method: "POST",
        data: {
          payTypeDetail: 203,
          orderList: this.orderSn,
        },
        dataType: "text",
      }).then((res) => {
        park({
          url: `/appWallet/CreateInvoice?payMainNo=${res.Data.payMainNo}&provider=${this.payTypeList[0].shortName}&orderSource=1`,
          method: "POST",
        }).then((result) => {
          if (result.status_code) {
            // 第三方支付页面跳转
            window.location.href = result.data.resultUrl;
          }
        });
      });
    },
    getonlinepaytypelist() {
      getonlinepaytypelistApi({}).then((res) => {
        if (res.code == 0) {
          this.list = res.Data;
        }
      });
    },
    //编译状态
    orderStatus(type, list, shortName) {
      let name = "";
      this[list].forEach((statu) => {
        if (statu.type == type) {
          name = statu.name;
        }
      });
      return name;
    },
    //展示支付方式列表
    showyinhang() {
      this.$refs.actionSheetYinhang.showAction = true;
    },
    //付款方式列表
    listPayOptions() {
      let arr = [];
      listPayOptionsApi().then((res) => {
        if (res.status_code == 200) {
          this.nalist = res.data;
          this.oneTypeName = this.oneTypeName =
            this.list.length > 0
              ? this.orderStatus(203, "payTypeList", this.nalist[4].shortName)
              : "";
          //支付方式
          res.data.forEach((item) => {
            let itemObj = {
              name: item.name,
              shortName: item.shortName,
              logourl: item.logourl,
              checked: false,
              type: 203,
            };
            arr.push(itemObj);
          });
          //单独添加余额支付类型
          arr.push({
            name: "Balance",
            shortName: "Balance",
            logourl: this.$webUrl + "/common/image/yuan.png",
            checked: false,
            type: 201,
          });
          this.showList = arr;
        }
        Toast.clear();
      });
    },
    //确认离开
    leavePay() {
      this.zhezhaoStatus = false;
      this.showAction = false;
      this.$refs.actionSheetYinhang.showAction = false;
      sessionStorage.setItem("activeIndex", 1);
      if (this.$route.name != "我的订单") {
        this.$router.replace({ name: "我的订单" });
      }
      this.$emit("duanxin");
    },
    //点击关闭面板
    cancelSheet(el) {
      // this.showAction = true;
      this.zhezhaoStatus = true;
      this.payStatus = false;
      this.tips1 = "Are you sure want to leave?";
      this.tips2 =
        "This order will automatically be cancelled if not paid for within 30 minutes.";
    },
  },
  components: {
    actionSheetYinhang,
  },
};
</script>

<style scoped lang="less">
.action-sheet-paymen {
  border-radius: 0;
  /deep/ .van-action-sheet__header {
    height: 109px;
    font-size: 40px;
    font-weight: bold;
    line-height: 109px;
    .van-icon {
      font-size: 34px;
    }
  }
  .paymen-content {
    width: 100%;
    height: 590px;
    background-color: #fff;
    box-sizing: border-box;
    padding: 80px 30px 0;
    position: relative;
    font-size: 34px;
    color: #333;
    .paymen-content-top {
      position: relative;
      width: 100%;
      height: 80px;
      .van-icon-arrow {
        float: right;
      }
      span {
        &:nth-child(2) {
          float: right;
          font-size: 30px;
        }
        &:nth-child(3) {
          float: right;
          padding-right: 29px;
        }
      }
    }
  }
  .upload {
    overflow: hidden;
    .load-btn {
      display: inline-block;
      height: 88px;
      background-color: #fa5300;
      font-size: 40px;
    }
  }
}
.zhezhao {
  z-index: 3000 !important;
  .tanchuang {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 67px 30px 43px;
    background-color: #fff;
    line-height: 27px;
    font-size: 24px;
    width: 600px;
    color: #333;
    box-sizing: border-box;
    .p1 {
      font-weight: bold;
    }
    .p2 {
      margin: 16px 0 42px;
    }
    .btn-left {
      width: 260px;
      height: 60px;
      border: 1px solid rgba(153, 153, 153, 1);
      line-height: 60px;
      text-align: center;
      font-size: 24px;
    }
    .btn-right {
      width: 260px;
      height: 60px;
      background: rgba(250, 83, 0, 1);
      line-height: 60px;
      text-align: center;
      font-size: 24px;
      color: #fff;
    }
  }
}
</style>
