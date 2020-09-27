<!--
 * @Author: 曹建勇
 * @Date: 2020-08-22 10:59:34
 * @LastEditors: 曹建勇
 * @LastEditTime: 2020-08-25 17:37:41
 * @Description: 
 * @FilePath: \app-en\src\components\tabbar\home\homeItem\ClearanceSaleSearch.vue
-->
<template>
  <section class="ClearanceSaleSearch">
    <div class="nav_bar flex" :class="{'on_fb':clear_sea==1,'pre_fb':clear_sea==0}">
      <div class="logo" @click="routeGo">
        <van-icon name="arrow-left" size="25px" color="#fff" />
      </div>
      <div class="input_warp">
        <input type="text" v-model="query.sreachName" placeholder="Search" class="input_search" />
        <van-icon name="search" size="25px" color="#666" class="search" @click="getData"></van-icon>
      </div>
      <!-- <div class="icons">
        <img src="@/assets/img/tabbar/home/clearsale/share.png" class="img2" />
      </div>-->
    </div>
    <cleargoods :list="list" />
  </section>
</template>

<script>
import cleargoods from "./compoents/clear-goods-items.vue";
import { gethomeClearanceList } from "@/api/home/index.js";
export default {
  name: "ClearanceSaleSearch",
  data() {
    return {
      list: [],
      query: {
        sreachName: "",
        page: 1,
        limit: 100,
        sort: 0, //  全部 0	排序 1 销量升序 2 销量降序 3 活动价格升序 4 活动价格降序
        isHome: 0,
      },
      clear_sea: this.$route.query.clearSale, // 是否存在活动中商品
    };
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {
    routeGo() {
      this.$router.go(-1);
    },
    getData() {
      gethomeClearanceList(this.query).then((res) => {
        if (res.code == 0) {
          this.list = res.Data.list;
          //   this.isExit = res.IsConcat;
        }
      });
    },
  },
  components: { cleargoods },
};
</script>

<style scoped lang='less'>
.pre_fc {
  color: #00a670 !important;
}
.pre_fb {
  background-color: #00a670 !important;
}
.on_fc {
  color: #f95300 !important;
}
.on_fb {
  background-color: #f95300 !important;
}
.ClearanceSaleSearch {
  padding-top: 88px;
  .nav_bar {
    width: 100%;
    height: 88px;
    // background-color: #f95300;
    color: #fff;
    font-size: 36px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    .logo {
      margin-left: 20px;
      width: 75px;
      height: 50px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .input_warp {
      margin-right: 34px;
      flex: 1;
      position: relative;
      .input_search {
        background: rgba(255, 255, 255, 1);
        border-radius: 29px;
        font-size: 28px;
        color: #333;
        padding-left: 20px;
        width: 600px;
        height: 58px;
        border: none;
      }
      .search {
        position: absolute;
        right: 27px;
        top: 9px;
      }
    }

    .icons {
      width: 40px;
      height: 40px;
    }
  }
}
</style>