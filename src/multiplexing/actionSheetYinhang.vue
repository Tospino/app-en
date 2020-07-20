<template>
  <!-- 选择付款方式弹窗 -->
  <div>
    <van-action-sheet
      v-model="showAction"
      :title="title"
      class="action-sheet-yinhang"
      :close-on-click-overlay="false"
    >
      <div class="paymen-content">
        <div
          class="paymen-content-top"
          v-for="(reason,index) in list"
          :key="index"
          @click="cliItem(index)"
        >
          <img v-lazy="reason.logourl" class="icon-img" />
          <span>{{reason.name}}</span>
          <van-checkbox
            v-model="reason.checked"
            icon-size="24px"
            class="img-checkbox"
            checked-color="#FA5300"
          ></van-checkbox>
        </div>
      </div>
      <div class="btn-ljzf" @click="pay()   ">Confirm</div>
    </van-action-sheet>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "Choose the method of payment"
    },
    orderId: {
      type: Number,
      default: 0
    },
    showList: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      list: [],
      showAction: false,
      remark: "",
      id: 0
    };
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {
    orderId: {
      handler: function(newVal) {
        this.id = newVal;
        this.reasonList.forEach(item => {
          item.istrue = true;
        });
        this.remark = "";
      }
    },
    showList: {
      handler: function(newVal) {
        this.list = newVal.map(o => Object.assign({}, o));
        this.list[4].checked = true;
      }
    }
  },
  methods: {
    cliItem(index) {
      this.list.forEach((ele, i) => {
        ele.checked = index == i;
      });
    },
    pay(index) {
      this.showAction = false;
      let trueItem = {};
      this.list.forEach(ele => {
        if (ele.checked) {
          trueItem = ele;
        }
      });
      this.$emit("toParnet", trueItem);
    }
  },
  components: {}
};
</script>

<style scoped lang="less">
.action-sheet-yinhang {
  border-radius: 0;
  /deep/ .van-action-sheet__header {
    height: 120px;
    font-size: 32px;
    font-weight: bold;
    line-height: 109px;
    .van-icon {
      font-size: 34px;
    }
  }
  .paymen-content {
    width: 100%;
    height: 440px;
    background-color: #fff;
    box-sizing: border-box;
    padding: 0px 0px 0;
    position: relative;
    font-size: 34px;
    color: #333;
    margin-bottom: 100px;
    overflow: auto;
    .paymen-content-top {
      position: relative;
      width: 100%;
      height: 110px;
      line-height: 110px;
      border-top: 1px solid #dcdcdc;
      padding: 0 30px;
      box-sizing: border-box;
      &:nth-last-child(1) {
        border-bottom: 1px solid #dcdcdc;
      }
      .img-checkbox {
        float: right;
        margin-top: 30px;
      }
      .icon-img {
        width: 100px;
        height: 90px;
        vertical-align: middle;
        // &:last-child{
        //   width: 60px;
        //   height: 90px;
        //   vertical-align: middle;
        // }
      }
    }
  }
  .btn-ljzf {
    width: 100%;
    height: 100px;
    background: rgba(250, 83, 0, 1);
    line-height: 100px;
    text-align: center;
    color: #fff;
    font-size: 38px;
    position: relative;
    bottom: 0;
  }
}
</style>
