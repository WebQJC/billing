<template>
    <div class="setupname-container">
        <div class="paymentcode" v-show="form.qrCode">
            <img :src="form.qrCode" />
        </div>
        <mt-button type="danger" size="large" plain class="upload" @click="actionSheet">上传图片</mt-button>
        <mt-button type="primary" size="large" @click="getFinish">完成</mt-button>
<!--        <mt-actionsheet-->
<!--            :actions= "actions"-->
<!--            v-model="sheetVisible">-->
<!--        </mt-actionsheet>-->

    </div>
</template>
<script>
  import * as api from '@/api';
  import { Toast } from 'mint-ui';
  import {client} from "../../util/index";

  export default {
    data(){
        return{
          form: {
            qrCode: ''
          },
        }
    },
    created(){
      this.form = {qrCode: this.$store.getters.getQrcode};
      if (this.$route.query.qrCode && this.$route.query.qrCode !== this.$store.getters.getQrcode) {
        this.form.qrCode = this.$route.query.qrCode;
        // this.$store.commit('setQrCode', this.$route.query.qrCode)
      }
    },
    mounted(){
      window['uploadPic'] = (opt,p) => {
        let parmas = p;
        if (typeof p === 'string') {
          parmas = JSON.parse(p);
        }
        if (parmas.code == 1) {
          this.$set(this.form, 'qrCode', parmas.picUrl);
        } else {
          Toast('上传失败')
        }
      }
    },
    methods: {
        //手机图片获取
        actionSheet() {
            // this.sheetVisible = true;
          client.operation({
            opt: 'uploadPic',
            data: {
              func: 'uploadPic'
            }
          })
        },
        //完成上传数据与返回
        getFinish() {
            if(this.form.qrCode == '') return
          if (this.$store.getters.getCarSettingId) {
            Object.assign(this.form, {
              carSettingId: this.$store.getters.getCarSettingId
            })
          }
            api.carApi.updateCarSetting(this.form).then(res => {
              if (res.code === 1000) {
                // this.$store.commit("companyName", this.companyName)
                this.$router.go(-1);
              }
            })
        },

    }
}
</script>
<style lang="less" scoped>
.setupname-container{
    padding: 10px;
    .paymentcode{
        margin: 10px auto;
        width: 300px;
        height: 300px;
        padding: 10px;
        border: 1px solid #000000;
        background-color: #ffffff;
        border-radius: 10px;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .upload{
        margin-bottom: 10px
    }

}
</style>
