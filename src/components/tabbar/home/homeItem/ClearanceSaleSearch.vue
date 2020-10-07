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
    <div
      class="nav_bar flex"
      :class="{ on_fb: clear_sea == 1, pre_fb: clear_sea == 0 }"
    >
      <div class="logo" @click="routeGo">
        <van-icon name="arrow-left" size="25px" color="#fff" />
      </div>
      <div class="input_warp">
        <input
          type="text"
          v-model="query.sreachName"
          placeholder="Search"
          class="input_search"
        />
        <van-icon
          name="search"
          size="25px"
          color="#666"
          class="search"
          @click="getClaer(query, flag)"
        ></van-icon>
      </div>
      <!-- <div class="icons">
        <img src="@/assets/img/tabbar/home/clearsale/share.png" class="img2" />
      </div>-->
    </div>
    <scroll
      class="bscroll-wrapper"
      ref="wrapper"
      :data="recordGroup"
      :pulldown="pulldown"
      :pullup="pullup"
      @pulldown="_pulldown"
      @pullup="_pullup"
      v-show="showData"
    >
      <cleargoods :list="list" />
    </scroll>
    <div v-show="list.length == 0">
      <no-sear-good
        :imgSrc="nosear1"
        describe="Sorry, no products"
      ></no-sear-good>
    </div>
  </section>
</template>

<script>
import cleargoods from "./compoents/clear-goods-items.vue";
import { gethomeClearanceList } from "@/api/home/index.js";
import nosear1 from "@/assets/img/search/nosear1.png";
import noSearGood from "@/multiplexing/noSearGood";
export default {
  name: "ClearanceSaleSearch",
  data() {
    return {
      nosear1: nosear1,
      list: [],
      query: {
        sreachName: "",
        page: 1,
        limit: 10,
        sort: 0, //  全部 0	排序 1 销量升序 2 销量降序 3 活动价格升序 4 活动价格降序
        isHome: 0,
      },
      clear_sea: this.$route.query.clearSale, // 是否存在活动中商品
      flag: true,
      recordGroup: [],
      pulldown: true,
      pullup: true,
      guanmengou: true, //看门狗
      showData: false,
      noSearchStatus: true,
      totalPage: [],
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
    // 点击搜索按钮
    getClaer() {
      this.refreshOrder();
    },
    //下拉刷新
    _pulldown() {
      setTimeout(() => {
        this.refreshOrder();
      }, 500);
    },
    //上拉加载
    _pullup() {
      console.log("sdfa");
      if (!this.pullup) return;
      //不知道为什么触发两次,使用关门狗拦截
      if (this.guanmengou) {
        this.query.page++;
        this.getData(this.query, false);
        this.guanmengou = false;
      }
      setTimeout(() => {
        this.guanmengou = true;
      }, 500);
    },
    //刷新页面
    refreshOrder() {
      this.query.page = 1;
      this.query.limit = 10;
      this.getData(this.query, true);
      this.pullup = true;
    },
    // 清仓列表
    getData(data, flag) {
      gethomeClearanceList(data).then((res) => {
        if (res.code == 0) {
          if (flag) {
            this.list = res.Data.list;
          } else {
            this.list = [...this.list, ...res.Data.list];
          }
          this.recordGroup = this.list;
          //   this.isExit = this.list[0].activityState;
          this.totalPage = res.Data.totalPage;
          if (this.list.length > 0) {
            this.noSearchStatus = true;
            if (this.list.length >= res.Data.totalCount) {
              this.pullup = false;
            }
          } else {
            this.noSearchStatus = false;
            this.pullup = false;
            this.pulldown = false;
          }
          setTimeout(() => {
            this.showData = true;
          }, 1000);
        }
      });
    },
  },
  components: { cleargoods, noSearGood },
};
</script>

<style scoped lang='less'>
.bscroll-wrapper {
  height: calc(100vh - 158px);
}
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
        right: 30px;
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