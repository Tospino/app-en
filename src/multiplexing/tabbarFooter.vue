<template>
  <!-- 底部导航 -->
  <div class="tabbar">
    <van-tabbar
      class="icons"
      v-model="active"
      active-color="#A3030D"
      inactive-color="#000000"
      route
    >
      <!-- <span>自定义</span> -->
      <!-- <img slot="icon" slot-scope="props" :src="props.active ? icon.active : icon.inactive"> -->
      <van-tabbar-item route to="/control/home" replace>
        <span>Home</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? icon.home1 : icon.home"
          class="icon-style"
        />
      </van-tabbar-item>
      <van-tabbar-item route to="/control/classify" replace>
        <span>Category</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? icon.sort1 : icon.sort"
          class="icon-style"
        />
      </van-tabbar-item>
      <van-tabbar-item route to="/control/customerService">
        <span>Message</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? icon.Message1 : icon.Message"
          class="icon-style"
        />
      </van-tabbar-item>
      <van-tabbar-item route to="/control/shoppingCart" :replace="isreplace">
        <span>Cart</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? icon.cart1 : icon.cart"
          class="icon-style"
        />
      </van-tabbar-item>
      <van-tabbar-item route to="/control/account" :replace="isreplace">
        <span>My</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? icon.mine1 : icon.mine"
          class="icon-style"
        />
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import home from "@/assets/img/activity/christmas/christmas_nav_home_1.png";
import cart from "@/assets/img/activity/christmas/christmas_nav_cart_4.png";
import mine from "@/assets/img/activity/christmas/christmas_nav_my_5.png";
import sort from "@/assets/img/activity/christmas/christmas_nav_categor_2.png";
import Message from "@/assets/img/activity/christmas/christmas_nav_hlep_3.png";

import home1 from "@/assets/img/activity/christmas/christmas_nav_home_1hover.png";
import cart1 from "@/assets/img/activity/christmas/christmas_nav_cart_4hover.png";
import mine1 from "@/assets/img/activity/christmas/christmas_nav_my_5hover.png";
import sort1 from "@/assets/img/activity/christmas/christmas_nav_categor_2hover.png";
import Message1 from "@/assets/img/activity/christmas/christmas_nav_hlep_3hover.png";
// import home from "@/assets/img/tabbar/home/home@3x.png";
// import cart1 from "@/assets/img/tabbar/home/cart1@3x.png";
// import mine1 from "@/assets/img/tabbar/home/mine1@3x.png";
// import sort1 from "@/assets/img/tabbar/home/sort1@3x.png";
// import Message1 from "@/assets/img/tabbar/home/Message.png";
export default {
  props: {},
  data() {
    return {
      active: 0,
      icon: {
        home,
		cart,
		mine,
		sort,
		Message,
		
        home1,
        cart1,
        mine1,
        sort1,
        Message1,
      },
      isreplace: false,
    };
  },
  computed: {},
  created() {},
  mounted() {
    this.isreplace = this.$storage.get("token") ? true : false;
  },
};
</script>

<style scoped lang="less">
.tabbar {
  width: 100%;
  height: 98px;
  .icons {
    height: 98px;
    /deep/ i {
      font-size: 43px;
    }
    /deep/ .van-tabbar-item__text {
      font-size: 20px;
      font-weight: bold;
    }
  }
  .icon-style {
    width: 43px;
    height: 43px;
    margin-bottom: 3px;
  }
}
</style>
