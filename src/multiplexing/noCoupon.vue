<template>
  <!-- 新增-无优惠券 -->
  <div class="no-coupon">
    <div class="no-coupon-img">
      <img :src="imgSrc" />
      <div>{{describe}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "noCoupon",
  components: {},
  props: {
    imgSrc: {
      type: String,
      default: ""
    },
    describe: {
      type: String,
      default: ""
    }
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>
<style scoped lang='less'>
.no-coupon {
  width: 100vw;
  min-height: 50vh;
}
.no-coupon-img{
    width: 100%;
    position: absolute;
    top:50%;
    transform: translateY(-50%);
    text-align: center;
    img{
        width: 498px;
        height: 364px;
    }
    div{
        margin-top: 29px;
        font-size: 30px;
        color: #666;
    }
}
</style>