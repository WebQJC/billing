<template>
    <div class="setupname-container">
        <div class="setupname-main">
            <h4>尾联：</h4><input type="text" placeholder="请输入尾联" v-model="form.floorName">
        </div>
        <mt-button type="primary" size="large" @click="getFinish">完成</mt-button>
    </div>
</template>
<script>
  import * as api from '@/api';
export default {
    data(){
        return{
          form: {
            floorName: ''
          }
        }
    },
  mounted(){
    this.form = {floorName: this.$store.getters.getFloorName};
  },
    methods: {
        getFinish() {
            if(this.form.floorName == '') return;
          if (this.$store.getters.getCarSettingId) {
            Object.assign(this.form, {
              carSettingId: this.$store.getters.getCarSettingId
            })
          }
          api.carApi.updateCarSetting(this.form).then(res => {
            if (res.code === 1000) {
              // this.$store.commit("floorName", this.form.floorName);
              this.$router.go(-1);
            }
          })


        }
    }
}
</script>
<style lang="less" scoped>
.setupname-container{
    padding: 10px;
    .setupname-main{
        display: flex;
         h4{
            width: 80px;
            margin-top: 11px;
           }
        input{
            border-top: 0;
            border-left: 0;
            border-right: 0;
            border-bottom: 2px solid #000000
        }
    }

}
</style>
