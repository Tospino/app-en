<template>
  <div class="add-address">
    <div v-show="choiceShow">
      <settings-header :title="title" title2="Save" @rightBtn="rightBtn"></settings-header>
      <div class="cell">
        <input
          type="search"
          :class="{'c-333':isBace}"
          class="input-xt"
          placeholder="Receiver"
          v-model="form.shr"
          :maxlength="20"
        />
      </div>
      <div class="cell">
        <input
          type="search"
          :class="{'c-333':isBace}"
          class="input-xt"
          placeholder="Phone Number"
          v-model="form.sjhm"
          :maxlength="11"
          @input="inputFun1"
        />
        <span class="hm c-999">+233</span>
        <van-icon name="arrow" class="arrow c-999" />
      </div>
      <div class="cell" @click="toChoiceList(1,0)">
        <input
          type="text"
          :class="{'c-333':isBace}"
          class="input-xt"
          placeholder="Choose A Country"
          v-model="form.lev1"
          :disabled="true"
        />
        <van-icon name="arrow" class="arrow c-999" />
      </div>
      <div class="cell" @click="toChoiceList(2,choiceForm.lev1.id)">
        <input
          type="text"
          :class="{'c-333':isBace}"
          class="input-xt"
          placeholder="State/Province/Region"
          v-model="form.lev2"
          :disabled="true"
        />
        <van-icon name="arrow" class="arrow c-999" />
      </div>
      <div class="cell" @click="toChoiceList(3,choiceForm.lev2.id)">
        <input
          type="text"
          :class="{'c-333':isBace}"
          class="input-xt"
          placeholder="City/County/Town"
          v-model="form.lev3"
          :disabled="true"
        />
        <van-icon name="arrow" class="arrow c-999" />
      </div>
      <div class="cell" @click="toChoiceList(4,choiceForm.lev3.id)">
        <input
          type="text"
          :class="{'c-333':isBace}"
          class="input-xt"
          placeholder="County/District/Street"
          v-model="form.lev4"
          :disabled="true"
        />
        <van-icon name="arrow" class="arrow c-999" />
      </div>
      <div class="top-textarea">
        <textarea placeholder="Enter a full address" v-model="form.message"></textarea>
      </div>
      <van-button
        style="height: 40px;margin-bottom: 15px;;font-size:16px"
        @click="getLoaction"
        block
      >Retrieves the location address</van-button>
      <div class="cell">
        <span class="c-333">Set it as dafault address</span>
        <van-switch
          v-model="form.checked"
          class="switch"
          active-color="#07c160"
          inactive-color="#999"
        />
      </div>
    </div>

    <choiceList
      v-show="!choiceShow"
      @getchoice="getchoice"
      @choiceStatus="choiceStatus"
      ref="choiceList"
    ></choiceList>
  </div>
</template>

<script>
import settingsHeader from "./itemComponents/settingsHeader";
import {
  adduseraddressApi,
  updateaddressApi
} from "@/api/accountSettings/index.js";
import { ipgetcountry, areanamegetid, addbasearea } from "@/api/location/index";
import { Toast } from "vant";
import choiceList from "@/multiplexing/choiceList.vue";
import axios from "axios";
export default {
  props: {},
  data() {
    return {
      title: "Add Shipping Address",
      isBace: true,
      choiceShow: true,
      form: {
        shr: "",
        sjhm: "",
        lev1: null,
        lev2: null,
        lev3: null,
        lev4: null,
        message: "",
        checked: true
      },
      areaId: "",
      areaNameEng: "",
      areaCode: "",
      choiceForm: {
        lev1: {
          id: "",
          name: "",
          areaCode: ""
        },
        lev2: {
          id: "",
          name: "",
          areaCode: ""
        },
        lev3: {
          id: "",
          name: "",
          areaCode: ""
        },
        lev4: {
          id: "",
          name: "",
          areaCode: ""
        }
      }
    };
  },
  computed: {},
  async created() {
    if (this.$route.query.type == "add") {
      this.getLoaction();
    }
  },
  mounted() {
    this.isEdit();
  },
  watch: {},
  methods: {
    // 获取定位地址
    async getLoaction() {
      let latlng = "";
      let key = "AIzaSyBw4RT57Ny-Cq9hVnpACvAscXoQpQHvOkY";
      let a = this;
      // 通過經緯度 獲取位置信息 例如國家，省，市，區
      //   await ipgetcountry({ IP: document.cookie }).then(res => {
      //     latlng = `${res.Data.lat},${res.Data.lon}`;
      //   });
      await axios({
        url: `https://www.googleapis.com/geolocation/v1/geolocate?key=${key}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        }
      }).then(res => {
        let data = res.data;
        latlng = `${data.location.lat},${data.location.lng}`;
      });
      let data = await axios({
        url: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng}&key=${key}&language=EN`,
        method: "GET"
      });
      // 获取中文数据，添加到数据库
      let dataEN = await axios({
        url: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng}&key=${key}&language=CN`,
        method: "GET"
      });
      let total_data = [...dataEN.data.results, ...data.data.results];
      if (Array.isArray(total_data) && total_data.length !== 0) {
        let datas = total_data.reverse();
        let lev1 = await datas.filter((v, i) => {
          return v.types.toString().indexOf("country") !== -1;
        });
        a.form.lev1 =
          lev1 && lev1.length !== 0 ? lev1[0].formatted_address : "";
        a.form.lev1
          ? await a.getAreaId(
              lev1[0].formatted_address,
              1,
              lev1[0].place_id,
              lev1[1].formatted_address
            )
          : "";
        let lev2 = await datas.filter((v, i) => {
          return (
            v.types.toString().indexOf("administrative_area_level_1") !== -1
          );
        });
        a.form.lev2 =
          lev2 && lev2.length !== 0 ? lev2[0].formatted_address : "";
        a.form.lev2
          ? await a.getAreaId(
              lev2[0].formatted_address,
              2,
              lev2[0].place_id,
              lev2[1].formatted_address
            )
          : "";
        let lev3 = await datas.filter((v, i) => {
          return v.types.toString().indexOf("locality") !== -1;
        });
        a.form.lev3 =
          lev3 && lev3.length !== 0 ? lev3[0].formatted_address : "";
        a.form.lev3
          ? await a.getAreaId(
              lev3[0].formatted_address,
              3,
              lev3[0].place_id,
              lev3[1].formatted_address
            )
          : "";
        let lev4 = await datas.filter((v, i) => {
          return (
            v.types.toString().indexOf("administrative_area_level_2") !== -1
          );
        });
        a.form.lev4 =
          lev4 && lev4.length !== 0 ? lev4[0].formatted_address : "";
        a.form.lev4
          ? await a.getAreaId(
              lev4[0].formatted_address,
              4,
              lev4[0].place_id,
              lev4[1].formatted_address
            )
          : "";
      }
    },
    //选择地址组件返回信息
    getchoice(choicDate) {
      this.choiceForm = Object.assign({}, this.choiceForm, choicDate);
      this.form.lev1 = this.choiceForm.lev1.name;
      this.form.lev2 = this.choiceForm.lev2.name;
      this.form.lev3 = this.choiceForm.lev3.name;
      this.form.lev4 = this.choiceForm.lev4.name;
    },
    //是否显示选择地址组件
    choiceStatus(status) {
      this.choiceShow = status;
    },
    //点击选择地址
    toChoiceList(level, parent) {
      this.choiceShow = false;
      let obj = {
        area_level: level,
        parent_id: parent
      };
      this.$refs.choiceList.formData.area_level = obj.area_level;
      this.$refs.choiceList.formData.parent_id = obj.parent_id;
      this.$refs.choiceList.basearealist(obj);
    },
    //点击保存
    rightBtn() {
      if (this.form.message == "") {
        Toast("Fill in the details address.");
        return;
      }
      if (this.form.shr == "") {
        Toast("Fill in the receiver.");
        return;
      }
      if (this.form.sjhm == "") {
        Toast("Enter phone number");
        return;
      }
      this.axiosAddress();
    },
    //判断是否编辑状态
    isEdit() {
      if (this.$route.query.type == "edit") {
        let posseObj = this.$store.state.posseObj;
        posseObj.allParentids =
          posseObj.allParentids + posseObj.addressAreaId + ",";
        if (JSON.stringify(posseObj) == "{}") return;
        let nameArr = posseObj.addreCitys.split("-");
        //后台返回数据前面前后各有一个多余逗号
        let parenArr = posseObj.allParentids.split(",");

        parenArr.pop();
        parenArr.shift();

        //父级ID
        this.choiceForm.lev1.id = parenArr[0];
        this.choiceForm.lev2.id = parenArr[1];
        this.choiceForm.lev3.id = parenArr[2];
        //当前城市名字
        this.form.lev1 = nameArr[0];
        this.form.lev2 = nameArr[1];
        this.form.lev3 = nameArr[2];
        this.form.lev4 = nameArr[3];
        this.form.shr = posseObj.name;
        this.form.sjhm = posseObj.phoneNumber;
        this.form.message = posseObj.userAddress;
        this.form.checked = posseObj.isDefault == 1 ? true : false;
        //给选择城市列表当前城市名字,不给的话每个选择完就没有名字了
        this.$refs.choiceList.addreData.lev1.name = this.form.lev1;
        this.$refs.choiceList.addreData.lev2.name = this.form.lev2;
        this.$refs.choiceList.addreData.lev3.name = this.form.lev3;
        this.$refs.choiceList.addreData.lev4.name = this.form.lev4;
        this.title = "Edit Shipping Address";
      }
    },
    axiosAddress() {
      let addressAreaId = null;
      let areaCode = null;
      if (this.choiceForm.lev4.id != null) {
        addressAreaId = this.choiceForm.lev4.id;
        areaCode = this.choiceForm.lev4.areaCode;
      } else if (this.choiceForm.lev3.id != null) {
        addressAreaId = this.choiceForm.lev3.id;
        areaCode = this.choiceForm.lev3.areaCode;
      } else if (this.choiceForm.lev2.id != null) {
        addressAreaId = this.choiceForm.lev2.id;
        areaCode = this.choiceForm.lev2.areaCode;
      }
      let obj = {
        addressAreaId: addressAreaId,
        phoneCode: "233",
        isDefault: this.form.checked ? 1 : 2,
        name: this.form.shr,
        phoneNumber: this.form.sjhm,
        userAddress: this.form.message,
        addreCitys:
          this.form.lev1 +
          "-" +
          this.form.lev2 +
          (this.form.lev3 ? "-" + this.form.lev3 : "") +
          (this.form.lev4 ? "-" + this.form.lev4 : ""),
        areaCode: areaCode,
        country: this.form.lev1,
        province: this.form.lev2,
        city: this.form.lev3,
        district: this.form.lev4
      };
      if (this.$route.query.type == "edit") {
        this.updateaddress(obj);
      } else {
        this.adduseraddress(obj);
      }
    },
    //新增地址
    adduseraddress(data) {
      let arr = [];
      for (let key in this.choiceForm) {
        arr.push(this.choiceForm[key].id);
      }
      data.addressAreaIds = arr.toString();
      adduseraddressApi(data).then(res => {
        if (res.code == 0) {
          Toast("success");
          setTimeout(() => {
            this.$router.go(-1);
          }, 1000);
        }
      });
    },
    //编辑地址
    updateaddress(data) {
      data.addressId = this.$store.state.posseObj.addressId;
      updateaddressApi(data).then(res => {
        if (res.code == 0) {
          Toast("success");
          setTimeout(() => {
            this.$router.go(-1);
          }, 1000);
        }
      });
    },
    inputFun1(e) {
      this.form.sjhm = e.target.value.replace(/[^\d]/g, "");
    },
    // 通过名称获取对应位置的id
    async getAreaId(name, level, id, name_cn) {
      let data = await areanamegetid({ areaname: name, arealevel: level });
      if (data.code === 0) {
        let obj = {
          id: data.Data.areaId,
          name: data.Data.areaNameEng,
          areaCode: data.Data.areaCode
        };
        this.$set(this.choiceForm, `lev${level}`, obj);
      } else {
        let lev = level - 1;
        if (lev === 0) {
          lev = 1;
        }
        await this.addAreaID({
          areaCode: id, // 编码
          areaLevel: level, // 当前层级
          areaName: name_cn, // 名称
          areaNameEng: name, // 名称英语
          parentId: level == 1 ? 0 : this.choiceForm[`lev${lev}`].id, // 父级ID
          area_status: 1
        });
      }
    },
    // 当检索不到数据时，添加地址id
    async addAreaID(params) {
      await addbasearea(params).then(res => {
        this.$set(this.choiceForm, `lev${params.areaLevel}`, {
          id: res.Data.areaId,
          name: res.Data.areaNameEng,
          areaCode: res.Data.areaCode
        });
      });
    }
  },
  components: {
    settingsHeader,
    choiceList
  }
};
</script>

<style scoped lang="less">
.add-address {
  .cell {
    height: 88px;
    line-height: 88px;
    padding: 0 30px;
    background-color: #fff;
    color: #999;
    position: relative;
    font-size: 26px;
    border-bottom: 1px solid #dcdcdc;
    &:nth-last-child(1) {
      border: 0;
    }
    .arrow {
      position: absolute;
      right: 30px;
      top: 50%;
      transform: translateY(-50%);
    }
    .text {
      position: absolute;
      right: 60px;
    }
    .text-tk {
      position: absolute;
      right: 30px;
    }
    .input-xt {
      height: 80px;
      border: 0;
      width: 80%;
      background-color: #fff;
    }
    .hm {
      position: absolute;
      right: 80px;
      top: 50%;
      transform: translateY(-50%);
    }
    .switch {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 57px;
    }
  }
  .top-textarea {
    padding: 36px 30px 0;
    background-color: #fff;
    margin-bottom: 40px;
    textarea {
      width: 100%;
      border: 0;
      font-size: 26px;
      min-height: 199px;
    }
  }
}
</style>
