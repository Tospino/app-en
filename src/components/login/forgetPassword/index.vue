<template>
<!-- 忘记密码 -->
  <div class="forget-password">
        <navar title="Forgot Password"></navar>
        <div class="footer">
            <p>Enter your email or phone number</p>
            <div class="otp">
                <div class="input-con">
                    <input type="text" class="name-input" placeholder="Enter your phone number/email" v-model="formData.msgphone1">
                </div>
            </div>
            <div class="confirm-btn">
                <div class="load-btn" @click="next">next</div>
            </div>
            <p class="fs-26">Have you changed your email or phone number?</p>
            <p class="fs-20">If Yes, please contact the service personnel to get an access to Tospino.</p>
        </div>
  </div>
</template>

<script>
import navar from '@/multiplexing/navar'
import { selectPhoneExistApi } from "@/api/login/index.js";
import { Toast } from 'vant';

export default {
    data () {
        return {
            formData:{
                msgphone:'',
                msgphone1:''
            },
            phone: '',
            email: '',
            type: '',
            rules:{
                msgphone:{
                    required: true,
                    messages: "Enter phone number"
                }
            }
        }
    },
    methods: {
        next(){
            if(!this.formData.msgphone1){
                Toast('Please enter your email or phone number');
                return;
            }
            // this.$router.push({name:'验证码',query:{msgphone:this.formData.msgphone}})
            var phoneReg = /^[1-9]\d*$/;
			var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
            if(reg.test(this.formData.msgphone1)){
                this.formData.msgphone = this.formData.msgphone1;
            }else if(!phoneReg.test(this.formData.msgphone1)){
                this.formData.msgphone = this.formData.msgphone1.substring(1);
            }else {
                this.formData.msgphone = this.formData.msgphone1;
            }
            selectPhoneExistApi({msg_phone: this.formData.msgphone}).then(res => {
                if(res.code == 0){
                    this.type = res.phoneOremail;
                    this.phone = res.phone;
                    this.email = res.email;
                    if(res.phone && res.email){
                        this.$router.push({name:'手机邮箱验证码',query:{msgphone:this.phone,msgemail:this.email}});
                    }else if(res.email){
                        this.$router.push({name:'邮箱验证码',query:{msgemail:this.email}});
                    }else if(res.phone){
                        this.$router.push({name:'手机验证码',query:{msgphone:this.phone}});
                    }
                }else if(res.code == -26){
					Toast('The phone number or email has been frozen')
				}else if(res.code == -27){
					Toast('The phone number or email has been deleted')
				}else if(res.code == -28){
					Toast('The phone number or email address is not registered')
				}
            })
        },
        inputFun1(e){
            this.formData.msgphone=e.target.value.replace(/[^\d]/g,'');
        }
    },
    computed:{
        disabledSubmit() {
            return !this.$fn.isDisabled(this.formData,this.rules)
        }
    },
    components: {
        navar
    },
}
</script> 

<style scoped lang="less">
.forget-password{
    .nav-bar{
        width: 100%;
        height: 88px;
        // padding-top:28px;
        position: relative;
        .icon{
            width: 40px;
            height:40px;
            position: absolute;
            top:28px;
        }
        .title{
            text-align: center;
            font-size: 36px;
            color: #000;
        }
    }
    .otp{
        width: 100%;
        height:75px;
        position: relative;
        border-bottom: 1px solid #dcdcdc;
        margin: 50px 0;
        .otp-txt{
            position: absolute;
            top:0;
            left:0;
            font-size: 30px;
            color: #333;
        }
        .input-con{
            position: absolute;
            left:0px;
            width: 530px;
            height:60px;
            font-size: 26px;
            .name-input{
                position: absolute;
                width: 500px;
                border: 0;
                background-color: #F8F8FA;
                font-size: 30px;
            }
        }
        .count-down{
            position: absolute;
            right:0px;
            top:-10px;
            .count-down-btn{
                width: 200px;
                height:68px;
                font-size: 30px;
                color: #999
            }
        }
        
    }
    .confirm-btn{
        width: 670px;
        height:88px;
        .load-btn{
            height:88px;
            line-height: 88px;
            background-color: #FA5300;
            color: #fff;
            text-align: center;
            font-size:40px;
        }
    }
    h1{
        font-size: 36px;
        color:#333;
        margin-bottom: 40px;
    }
    .line{
        width: 670px;
        height: 2px;
        background-color: #dcdcdc;
        margin-bottom: 60px;

    }
    .tips{
        font-size: 26px;
        color: #333;
        line-height: 40px;
        margin-bottom: 62px;
    }
    .o-c{
        color: #fa5300;
        font-size: 30px;
    }
    .footer{
        padding: 0 30px;
        margin-top:20px;
        p:nth-child(1){
            font-size: 20px;
            color: #333
        }
        p:nth-child(4){
            font-size: 26px;
            color: #333;
            margin:30px 0 20px
        }
        p:nth-child(5){
            font-size: 20px;
            color: #666
        }
    }
}
</style>
