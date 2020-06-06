<template>
  <!--付款方式弹窗 -->
  <div>
    <van-action-sheet
      v-model="showAction"
      title="Confirm the Payment"
      class="action-sheet-paymen"
      :close-on-click-overlay="false"
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
      :showList="showList"
    ></action-sheet-yinhang>
  </div>
</template>

<script>
import { getonlinepaytypelistApi } from "@/api/myOrder/index";
import actionSheetYinhang from "@/multiplexing/actionSheetYinhang";
import { listPayOptionsApi } from "@/api/confirmOrder/index";
import { park } from "@/api";
export default {
  props: {
    moeny: {
      type: Number,
      default: 0
    },
    orderSn: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      showAction: false,
      // payTypeList: [
      //   {
      //     type: 201,
      //     name: "Balance"
      //   }
      // ],
      payTypeList: [
        {
          type: 203,
          name: "MTN Mobile Money"
        },
      ],
      list: [{payTypeDetail: 'MTN Mobile Money'}],
      nalist:[],
      oneTypeName: "",
      showList: []
    };
  },
  computed: {
    paymoeny() {
      return this.moeny;
    }
  },
  created() {},
  mounted() {
    this.listPayOptions();
  },
  watch: {},
  methods: {
    onChangePayMethod(item) {
      this.oneTypeName = item.msg;
      this.payTypeList = [
        {
          name: item.name,
          type: item.type
        }
      ];
      this.list[0].payTypeList = item.type;
      this.list[0].payTypeDetail = item.name;
    },
    // 付款方式
    fnParent(e) {
      this.oneTypeName = e.name;
    //   console.log("付款方式", e);
      this.payTypeList = [
        {
          name: e.name,
          type: e.type,
          shortName: e.shortName
        }
      ];
      this.list[0].payTypeList = e.type;
      this.list[0].payTypeDetail = e.name;
      this.$refs.actionSheetYinhang.showAction = false;
    },
    // 立即支付
    confirm() {
		this.list[0].shortName = this.payTypeList[0].shortName
		this.$emit('paymoeny',this.list[0])
    },
    //编译状态
    orderStatus(type, list) {
      let name = "";
      this[list].forEach(statu => {
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
      listPayOptionsApi().then(res => {
		// console.log("付款方式列表",res.data)
		if (res.status_code == 200) {
			this.nalist = res.data;
			if(this.list.length > 0){
				this.oneTypeName = this.orderStatus(203, "payTypeList")
				this.list[0].payTypeList = 203
				
				this.nalist.forEach(item => {
					if(item.name == 'MTN Mobile Money'){
						this.payTypeList[0].shortName = item.shortName
					}
				})
			}else{
				this.oneTypeName = ''
			}
			//支付方式
			res.data.forEach(item => {
				let itemObj = {
					name: item.name,
					shortName: item.shortName,
					logourl: item.logourl,
					checked: false,
					type: 203
				};
				arr.push(itemObj);
			});
			//单独添加余额支付类型
			arr.push({
				name: "Balance",
				shortName: "Balance",
				logourl: "http://47.52.210.251:8091/tospino/test/common/image/yuan.png",
				checked: false,
				type: 201
			});
			this.showList = arr;
        }
      });
    }
  },
  components: {
    actionSheetYinhang
  }
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
</style>
