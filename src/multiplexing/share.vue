<!--
 * @Author: 曹建勇
 * @Date: 2020-08-31 09:41:20
 * @LastEditors: 曹建勇
 * @LastEditTime: 2020-09-02 09:38:53
 * @Description: 
 * @FilePath: \app-en\src\multiplexing\share.vue
-->
<template>
  <section class="share-pages">
    <van-popup v-model="show" position="bottom">
      <div class="flex share_list">
        <!-- <div class="flex_col_center share_item" @click="shares('facebook')">
          <img src="@/assets/img/coupon/facebook.png" alt />
          <span class="mt_8">Facebook</span>
        </div>
        <div class="flex_col_center share_item" @click="shares('whatsapp')">
          <img src="@/assets/img/coupon/whatsapp.png" alt />
          <span class="mt_8">WhatsApp</span>
        </div>
        <div class="flex_col_center share_item" @click="shares('weixin')">
          <img src="@/assets/img/coupon/weixin.png" alt />
          <span class="mt_8">weixin</span>
        </div>
        <div class="flex_col_center share_item" @click="shares('twitter')">
          <img src="@/assets/img/coupon/Twitter.png" alt />
          <span class="mt_8">Twitter</span>
        </div>-->
        <div
          class="flex_col_center share_item copy_info"
          @click="CopyInfo"
          :data-clipboard-text="infos"
          v-show="clearShare"
        >
          <img src="@/assets/img/coupon/copyinfo.png" alt />
          <span class="mt_8">Copy Info</span>
        </div>

        <div
          class="flex_col_center share_item copy_link"
          @click="CopyLink"
          :data-clipboard-text="links"
          v-show="clearShareLink"
        >
          <img src="@/assets/img/coupon/copylink.png" alt />
          <span class="mt_8">Copy Link</span>
        </div>
      </div>
      <van-button plain block class="btns" @click="closeShows"
        >Cancel</van-button
      >
    </van-popup>
  </section>
</template>

<script>
import { Dialog, Notify } from "vant";
export default {
  props: {
    infos: {
      type: String,
      default: () => "",
    },
    links: {
      type: String,
      default: () => "",
    },
    clearShareLink: {
      type: Boolean,
      default: true,
    },
    clearShare: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      show: false,
    };
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {
    shows() {
      this.show = true;
    },
    closeShows() {
      this.show = false;
    },
    shares(type) {
      var toOpen = function (url) {
        var option =
          "toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, width=600, height=450,top=100,left=350";
        window.open(url, "_blank", "Web");
      };
      let ometa = document.getElementsByTagName("meta"); // console.log("meta", document.getElementsByTagName("meta"));
      ometa[14].content = this.list.supplyTitle;
      ometa[12].content = this.$webUrl + this.list.locationUrl;
      ometa[8].content = "shop" + this.list.salePrice;
      var URL = encodeURIComponent(document.location.href);
      var title = encodeURIComponent(document.title);
      // var templates = {
      //     qzone: 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url={{URL}}&title={{TITLE}}&desc={{DESCRIPTION}}&summary={{SUMMARY}}&site={{SOURCE}}&pics={{IMAGE}}',
      //     qq: 'http://connect.qq.com/widget/shareqq/index.html?url={{URL}}&title={{TITLE}}&source={{SOURCE}}&desc={{DESCRIPTION}}&pics={{IMAGE}}&summary="{{SUMMARY}}"',
      //     weibo: 'https://service.weibo.com/share/share.php?url={{URL}}&title={{TITLE}}&pic={{IMAGE}}&appkey={{WEIBOKEY}}',
      //     wechat: 'javascript:',
      //     douban: 'http://shuo.douban.com/!service/share?href={{URL}}&name={{TITLE}}&text={{DESCRIPTION}}&image={{IMAGE}}&starid=0&aid=0&style=11',
      //     linkedin: 'http://www.linkedin.com/shareArticle?mini=true&ro=true&title={{TITLE}}&url={{URL}}&summary={{SUMMARY}}&source={{SOURCE}}&armin=armin',
      //     facebook: 'https://www.facebook.com/sharer/sharer.php?u={{URL}}',
      //     twitter: 'https://twitter.com/intent/tweet?text={{TITLE}}&url={{URL}}&via={{ORIGIN}}',
      //     google: 'https://plus.google.com/share?url={{URL}}'
      // };
      switch (type) {
        case "facebook": //分享到Facebook的代码
          toOpen(
            `https://www.facebook.com/sharer/sharer.php?u=${document.location.href}&t=${title}`
          );
          break;
        case "google": //分享到Google的代码
          toOpen(`https://plus.google.com/share?url=${URL}&title=${title}`);
          break;
        case "twitter": //分享到twitter的代码
          toOpen(`https://twitter.com/intent/tweet?text=${title}&url=${URL}`); // &via=${ORIGIN}
          break;
        case "whatsapp": //分享到whatsapp的代码
          break;
        case "wechat": //分享到wechat
          toOpen(``);
          break;
      }
    },
    // 复制信息
    CopyInfo() {
      var clipboard = new this.clipboard(".copy_info");
      clipboard.on("success", function (e) {
        // Dialog.alert({
        //   title: "Tips",
        //   message: "Copy information successfully",
        //   confirmButtonText: " ",
        // });
        Notify({
          background: "#fa5400",
          message: "Copy information successfully",
        });
        e.clearSelection();
      });
      clipboard.on("error", function (e) {
        // Dialog.alert({
        //   title: "Tips",
        //   message: "Copy information Failed",
        //   confirmButtonText: " ",
        // });
        Notify({ type: "warning", message: "Copy information Failed" });
      });
      this.closeShows();
    },
    // 复制链接
    CopyLink() {
      var clipboard = new this.clipboard(".copy_link");
      clipboard.on("success", function (e) {
        // Dialog.alert({
        //   title: "Tips",
        //   message: "Link Message Successful",
        //   confirmButtonText: " ",
        // });
        Notify({ type: "primary", message: "Link Message Successful" });
        e.clearSelection();
      });

      clipboard.on("error", function (e) {
        // Dialog.alert({
        //   title: "Tips",
        //   message: "Link Message Failed",
        //   confirmButtonText: " ",
        // });
        Notify({ type: "warning", message: "Link Message Failed" });
      });
      this.closeShows();
    },
  },
  components: {},
};
</script>

<style scoped lang='less'>
.share-pages {
  .share_list {
    padding: 80px 72px 60px;
    font-size: 20px;
    font-family: SF Pro Display;
    font-weight: 500;
    color: #333333;
    background: #f2f3f5;
    .share_item {
      margin-right: 70px;
    }
    img {
      width: 84px;
      height: 84px;
    }
  }
  .btns {
    height: 100px;
    font-size: 40px;
    font-family: SF Pro Display;
    font-weight: 600;
    color: #333333;
  }
}
</style>