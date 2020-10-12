<!--
 * @Author: 曹建勇
 * @Date: 2020-08-22 09:52:23
 * @LastEditors: 曹建勇
 * @LastEditTime: 2020-08-31 10:04:28
 * @Description: 
 * @FilePath: \app-en\src\components\tabbar\home\homeItem\ClearanceSale.vue
-->
<template>
  <section class="ClearanceSale">
    <div class="nav_bar flex" :class="{ on_fb: isExit, pre_fb: !isExit }">
      <div class="logo" @click="routeGo">
        <van-icon name="arrow-left" size="25px" color="#fff" />
      </div>
      <div class="title">Clearance Sale</div>
      <div class="icons">
        <img
          src="@/assets/img/tabbar/home/clearsale/search.png"
          class="img1"
          @click="
            $router.push({
              name: '特价清仓搜索',
              query: { clearSale: list[0].activityState },
            })
          "
        />
        <img
          src="@/assets/img/tabbar/home/clearsale/share.png"
          @click="showShare"
          class="img2"
        />
      </div>
    </div>
    <div class="filter_items flex flex_around" v-if="noSearchStatus">
      <span
        :class="{
          on_fc: query.sort === 0 && isExit,
          pre_fc: query.sort === 0 && !isExit,
        }"
        @click="ChangeStatus(0)"
        >Overall</span
      >
      <span
        :class="{
          on_fc: (query.sort === 1 || query.sort === 2) && isExit,
          pre_fc: (query.sort === 1 || query.sort === 2) && !isExit,
        }"
        @click="ChangeStatus(1)"
        >Sales
        <van-icon
          v-if="query.sort === 1"
          name="arrow-up"
          size="15px"
          class="ml_5"
          color="#333333"
        />
        <van-icon
          v-else
          name="arrow-down"
          size="15px"
          class="ml_5"
          color="#333333"
        />
      </span>
      <span
        class="flex"
        :class="{
          on_fc: (query.sort === 3 || query.sort === 4) && isExit,
          pre_fc: (query.sort === 3 || query.sort === 4) && !isExit,
        }"
        @click="ChangeStatus(3)"
      >
        Price
        <van-icon
          v-if="query.sort == 3"
          name="arrow-up"
          size="15px"
          class="ml_5"
          color="#333333"
        />
        <van-icon
          v-else
          name="arrow-down"
          size="15px"
          class="ml_5"
          color="#333333"
        />
      </span>
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
    <share ref="share" :links="sharelinks" :infos="shareinfos" />
  </section>
</template>

<script>
import cleargoods from "./compoents/clear-goods-items.vue";
import share from "@/multiplexing/share.vue";
import { gethomeClearanceList } from "@/api/home/index.js";
import moment from "moment";
import flashSaleVue from "./flashSale.vue";
export default {
  name: "ClearanceSale",
  data() {
    return {
      list: [],
      query: {
        page: 1,
        limit: 10,
        sort: 0, //  全部 0	排序 1 销量升序 2 销量降序 3 活动价格升序 4 活动价格降序
        isHome: 0,
      },
      isExit: false, // 是否存在活动中商品
      shareinfos: location.href, //分享链接
      sharelinks: location.href, //分享链接
      recordGroup: [],
      pulldown: true,
      pullup: true,
      guanmengou: true, //看门狗
      showData: false,
      noSearchStatus: true,
    };
  },
  computed: {},
  created() {
    // this.getData(this.query, true);
  },
  mounted() {
    this.getData(this.query, true);
    let time_atc = setInterval(() => {
      //   清仓时间戳
      let clear_time = moment(this.list[0].activityBegin).valueOf();
      let clear_end = moment(this.list[0].activityEnd).valueOf();
      let new_time = new Date().getTime();
      if (parseInt(clear_time / 1000) == parseInt(new_time / 1000)) {
        this.refreshOrder();
      }
      if (parseInt(new_time / 1000) == parseInt(clear_end / 1000)) {
        if (this.list.length == 0) {
          this.$router.push({ name: "首页" });
        }
        this.refreshOrder();
      }
    }, 1000);
  },
  watch: {},
  methods: {
    routeGo() {
      this.$router.go(-1);
    },
    getData(data, flag) {
      gethomeClearanceList(data).then((res) => {
        if (res.code == 0) {
          if (flag) {
            this.list = res.Data.list;
          } else {
            this.list = [...this.list, ...res.Data.list];
          }
          this.recordGroup = this.list;
          this.isExit = this.list[0].activityState;
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
    // 状态切换
    ChangeStatus(val) {
      switch (val) {
        case 0:
          this.query.sort = 0;
          break;
        case 1:
          if (this.query.sort === 1) {
            this.query.sort = 2;
          } else {
            this.query.sort = 1;
          }
          break;
        case 3:
          if (this.query.sort === 3) {
            this.query.sort = 4;
          } else {
            this.query.sort = 3;
          }
          break;
        //   this.$refs.wrapper.scrollTo(0, 0);
        //   this.refreshOrder();
      }
      this.refreshOrder();
      //   this.getData(this.query);
    },
    //下拉刷新
    _pulldown() {
      setTimeout(() => {
        this.refreshOrder();
      }, 500);
    },
    //上拉加载
    _pullup() {
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
    // 分享链接
    showShare() {
      this.$refs["share"].shows();
    },
  },
  components: {
    cleargoods,
    share,
  },
};
</script>

<style scoped lang='less'>
.bscroll-wrapper {
  height: calc(100vh - 158px);
  margin-top: 76px;
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
.ClearanceSale {
  padding-top: 88px;
  .nav_bar {
    width: 100%;
    height: 88px;
    background-color: #f95300;
    color: #fff;
    font-size: 36px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
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
    .title {
      width: 100%;
      text-align: center;
    }
    .icons {
      position: absolute;
      right: 40px;
      top: 25px;
      .img1 {
        width: 40px;
        height: 40px;
        margin-right: 25px;
      }
      .img2 {
        width: 40px;
        height: 40px;
      }
    }
  }
  .filter_items {
    background-color: #fff;
    z-index: 2;
    position: fixed;
    width: 100%;
    height: 80px;
    font-size: 28px;
    font-weight: 500;
    color: #333333;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid #eee;
  }
}
</style>