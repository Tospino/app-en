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
    <div class="filter_items flex flex_around">
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
        >Sales</span
      >
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
          v-show="query.sort === 4"
          name="arrow-down"
          size="15px"
          class="ml_5"
          color="#333333"
        />
        <van-icon
          v-show="query.sort === 3"
          name="arrow-up"
          size="15px"
          class="ml_5"
          color="#333333"
        />
      </span>
    </div>
    <cleargoods :list="list" />
    <!-- <share ref="share" /> -->
  </section>
</template>

<script>
import cleargoods from "./compoents/clear-goods-items.vue";
// import share from "@/multiplexing/share.vue";
import { gethomeClearanceList } from "@/api/home/index.js";
export default {
  name: "ClearanceSale",
  data() {
    return {
      list: [],
      query: {
        page: 1,
        limit: 100,
        sort: 0, //  全部 0	排序 1 销量升序 2 销量降序 3 活动价格升序 4 活动价格降序
        isHome: 0,
      },
      isExit: false, // 是否存在活动中商品
    };
  },
  computed: {},
  created() {
    this.getData();
  },
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
          this.isExit = res.IsConcat;
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
      }
      this.getData();
    },
    showShare() {
      this.$refs["share"].shows();
    },
  },
  components: {
    cleargoods,
    // share,
  },
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
    z-index: 1;
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