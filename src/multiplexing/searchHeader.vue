<template>
  <!-- 首页搜索框 -->
  <div>
    <div class="search-header c-b-gray">
      <div class="search">
        <van-search v-model="value" shape="round" @click="toSearch">
          <!-- <template #right-icon>    隐藏掉搜索框里的扫描
            <van-icon name="scan" size="20" style="margin-top:6px" />
          </template> -->
        </van-search>
      </div>
      <div class="icons">
        <!-- 扫码功能去掉 -->
        <img
          src="@/assets/img/activity/christmas/christmas_nav_hlep_3.png"
          class="img1"
          @click="toMessage()"
        />
        <img
          src="@/assets/img/activity/christmas/christmas_nav_hlep_4.png"
          class="img2"
          @click="$router.push({name:'消息'})"
        />
      </div>
    </div>
    <div class="place"></div>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      value: "",
    };
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {
    toSearch() {
      this.$router.push({ name: "历史记录" });
    },
    saoma() {
      this.$router.push({ name: "扫码" });
    },
    onSearch() {},
    toMessage(){
      this.$router.push({path:'/control/customerService'});
      //易观数据采集---联系客服
      AnalysysAgent.track('contact',{
        contact_type: '自定义'
      },rel => {})
    }
  },
  components: {},
};
</script>

<style scoped lang="less">
.search-header {
  width: 100%;
  height: 88px;
  position: fixed;
  z-index: 1;
  background-color: #A3030D; //新增
  .logo {
    position: absolute;
    left: 40px;
    top: 20px;
    width: 75px;
    height: 50px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .search {
    position: absolute;
    left: 20px;
    top: 20px;
    width: 600px;  
    height: 58px;
    overflow: hidden;
    /deep/ .van-search {
      // background: #f2f3f5 !important;
      background: #A3030D!important;  //修改
      .van-search__content--round {
        height: 58px;
        border-radius: 29px;
        margin-top: -12px;
        background-color: #fff;
        .van-field__left-icon {
          margin-top: 10px;
          .van-icon.van-icon-search {
            font-size: 27px;
            color: #999;
          }
        }
      }
    }
  }
  .icons {
    position: absolute;
    left: 623px;
    top: 30px;
    .img1 {
      width: 35px;
      height: 35px;
      margin-right: 25px;
    }
    .img2 {
      width: 34px;
      height: 34px;
    }
  }
}
</style>
