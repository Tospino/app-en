<template>
  <!-- 售后进度 -->
  <div class="afterSalesProgress c-b-gray">
    <sales-header title="After-sales progress"></sales-header>
    <div class="afterSales-wrapper">
      <ul class="afterSales-box">
        <li class="afterSales-item" v-for="(i,index) in afterList" :key="index">
          <h3>{{i.titletxt}}</h3>
          <span class="orderId" v-if="i.txt==20.63? false:true">{{i.txt}}</span>
          <span class="order" v-else>{{jn}}{{i.txt}}</span>
        </li>
      </ul>
      <div class="attention">
        <div class="attention-box">
          <van-icon name="warning" />
          <span
            class="warning-txt"
          >We will refund you the money you actually paid.The coupon value will not be refunded!</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import salesHeader from "./itemComponents/afterSalesHeader";
export default {
  name: "afterSalesProgress",
  components: {
    salesHeader
  },
  props: {},
  data() {
    return {
      afterList: [
        {
          titletxt: "Order No.:",
          txt: "XSD5416616161612612165"
        },
        {
          titletxt: "Refund:",
          txt: 20.63
        },
        {
          titletxt: "After state:",
          txt: " 取消申请金额"
        }
      ]
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>
<style scoped lang="less">
.afterSales-wrapper {
  height: calc(100vh - 88px);
  box-sizing: border-box;
}
.afterSales-box {
  padding-top: 50px;
  font-size: 24px;
  color: #999;
}
.afterSales-item {
  display: flex;
  padding: 15px;
}
h3 {
  width: 115px;
}
.orderId {
  padding-left: 32px;
  color: #666;
}
.order {
  padding-left: 32px;
  color: #fa5300;
}
.attention {
  padding: 15px;
  .attention-box {
    display: flex;
    align-items: center;
    height: 90px;
    background: rgba(255, 201, 201, 1);
    border: 1px solid rgba(255, 0, 0, 1);
    /deep/ .van-icon {
      font-size: 50px;
      color: rgba(255, 0, 0, 1);
      padding-left: 20px;
    }
    .warning-txt {
      font-size: 24px;
      color: rgba(255, 0, 0, 1);
      padding: 0 20px;
    }
  }
}
</style>