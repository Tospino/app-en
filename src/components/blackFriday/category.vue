<template>
  <div class="category">
    <div class="category-item" v-for="(item, index) in categorys" :key="index" @click="toProduList(item.classIdTwo, item.expIds)">
      <div class="image">
        <img :src="item.img" alt="" />
      </div>
      <div class="t1">
        <span>{{ item.name }}</span>
      </div>
      <div class="shop-now">
        <span>{{ item.shop }}</span>
      </div>
    </div>
  </div>
</template>

<script>
// import categoryItem from "@/components/blackFriday/category/categoryItem";

export default {
  name: "category",
  props: {
    categorys: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {};
  },
  methods: {
    toProduList(classIdTwo, expIds) {
      this.$emit("clickCate", classIdTwo, expIds);
    }
  },
  components: {}
};
</script>

<style scoped lang="less">
.category {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  background-color: #940000;
.category-item {
    width: 50%;
    height: 399px;
    box-sizing: border-box;
    .image {
      width: 280px;
      height: 240px;
      padding: 35px 0 0 48px;
      img {
        width: 100%;
      }
    }
    .t1 {
      font-size: 24px;
      color: #ffffff;
      padding: 9px 0 10px 132px;
    }
    .shop-now {
      width: 220px;
      height: 48px;
      background-color: #360b42;
      border-radius: 24px;
      margin-left: 78px;
      span {
        display: block;
        font-size: 24px;
        font-family: Arial;
        font-style: oblique;
        color: #fc0f0f;
        padding: 15px 0 0 42px;
        font-weight: bold;
      }
    }
  }
  .category-item:nth-child(odd) {
    border-right: 1px;
    border-bottom: 1px;
    border-style: solid;
    border-color: #790000;
  }
  .category-item:nth-child(even) {
    border-bottom: 1px;
    border-style: solid;
    border-color: #790000;
  }
}
</style>
