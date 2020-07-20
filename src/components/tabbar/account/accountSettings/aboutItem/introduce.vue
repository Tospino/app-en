<template>
<!-- 平台介绍 -->
    <div class="introduce">
        <div class="title" v-if="showTitle">ABOUT TOSPINO APP</div>
        <p>
            <br><span class="jiacu">About Tospino Market</span>
            <br>
            <br>Tospino is an integrated shopping mall focusing on cross-border e-commerce in Africa, equipping with such online functions as product searching, browsing, collection, buying, payment, order inquiry, logistics tracking and return/exchange. By convenient cross-border direct mail, it converges huge global good products to meet people’s needs on daily consumption and online shopping, bringing consumers an easy, happy shopping experience.
            <br>
            <br><span class="jiacu">[Comprehensive Product Categories]</span>
            <br>
            <br>You can buy everything you want on the Tospino app!
            <br>Apparel, Beauty, Digital, Office, Maternity & Baby, Building, Home, Auto, Medical, Fitness, Agric, Lighting, and Chemical & Metallurgy.
            <br>Go and download the Tospino app! You will get everything you want!
            <br>
            <br><span class="jiacu">[Timely Delivery & Easy Access]</span>
            <br>
            <br>Fulfillment By Tospino (FBT)
            <br>Local warehouses and teams get goods ready in 24 hours and send them out within 72 hours. It takes only 1-3 days to send the goods to the shipping address. 
            <br>
            <br><span class="jiacu">[Promotion & Discount]</span>
            <br>
            <br>Tospino’s members can enjoy various special offers and benefits, such as good coupons for large orders, free gifts for higher consumption points, great discounts on holidays or festivals, exclusive birthday gifts and 1₵ flash deals.
            <br>
            <br><span class="jiacu">[Worry-free After-sales Services]</span>
            <br>
            <br>Tospino provides the Return/Exchange services for products with damages or quality problems. Buyers do not need to pay additional fees for the services.
            <br>It supports the Return/Exchange services within 7 days after the consumption. Some products can even be returned/exchanged within 365 days after the consumption if the products are till saleable for maintaining their good quality.

        </p>
    </div>
</template>

<script>
export default {
    props: {
        showTitle:{
            type:Boolean,
            default:true
        }
    },
    data() {
        return {

        };
    },
    computed: {

    },
    created() {

    },
    mounted() {

    },
    watch: {

    },
    methods: {

    },
    components: {

    },
};
</script>

<style scoped lang="less">
.title{
    margin:72px 0 41px;
    font-weight:bold;
    font-size:32px;
    text-align: center;
}
p{
    padding: 0 30px 131px;
    font-size:26px;
    line-height:39px;
    color: #333;
}
.h1{
    display: block;
    text-align: center;
    font-weight:bold;
    font-size:32px;
}
.jiacu{
    font-size:30px;
    font-weight: bold;
}
</style>
