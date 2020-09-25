<template>
    <div class="setupname-container">
        <div class="setupname-main">
            <h4>收费/h：</h4><input type="text" placeholder="请输入收费标准" v-model="form.price">
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
            price: ''
          }

        }
    },
    mounted(){
      this.form = {price: this.$store.getters.getPrice};
    },
    methods: {
        getFinish() {
            if(this.form.price == '') return
          if (this.$store.getters.getCarSettingId) {
            Object.assign(this.form, {
              carSettingId: this.$store.getters.getCarSettingId
            })
          }
          api.carApi.updateCarSetting(this.form).then(res => {
            if (res.code === 1000) {
              // this.$store.commit("price", this.price)
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
            width: 120px;
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
