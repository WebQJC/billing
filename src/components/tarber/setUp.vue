<template>
    <div class="setup-container">
        <div class="mui-card">
			<div class="mui-card-content">
				<div class="mui-card-content-inner" @click="getName">
                    <mt-cell title="名称" is-link>
                      <span style="color: green">{{ $store.getters.getCompanyName }}</span>
                    </mt-cell>
				</div>
                <div class="mui-card-content-inner" @click="getPaymentcode">
                    <mt-cell title="收款码" is-link>
                      <span style="color: green"><div class="img"><img :src="$store.getters.getQrcode" /></div></span>
                    </mt-cell>
				</div>
			</div>
		</div>
        <div class="mui-card">
			<div class="mui-card-content">
				<div class="mui-card-content-inner" @click="getChargeing">
                    <mt-cell title="收费设置" is-link>
                      <span style="color: green">{{ $store.getters.getPrice }}</span>
                    </mt-cell>
				</div>
			    <div class="mui-card-content-inner" @click="getTailcouplet">
                    <mt-cell title="尾联" is-link>
                      <span style="color: green">{{ $store.getters.getFloorName }}</span>
                    </mt-cell>
				</div>
			</div>
		</div>
    </div>
</template>

<script>
  import * as api from '@/api';
  import { Toast } from "mint-ui";
export default {
    data() {
        return{
        }
    },
  created(){
      api.carApi.getCarSettingInfo().then(res => {
        if (res.code === 1000) {
          if (res.data) {
            const data = res.data;
            if (Object.keys(data).length === 0) {
              Toast('请设置用户信息');
            } else {
              this.$store.commit("setCompanyName", data.companyName || '');
              this.$store.commit("setQrCode", data.qrCode || '');
              this.$store.commit("setPrice", data.price || '');
              this.$store.commit("setFloorName", data.floorName || '');
              this.$store.commit('setCarSettingId', data.carSettingId || '')
            }
          }
        }
      })
  },
    methods: {
        //名称跳转到components/setup/name.vue
        getName() {
            this.$router.push({name: 'setupname'})
        },
         //收款码跳转到components/setup/paymentcode.vue
        getPaymentcode() {
            this.$router.push({name: 'setuppaymentcode'})
        },
        //收费设置跳转到components/setup/chargeing.vue
        getChargeing() {
            this.$router.push({name: 'setupchargeing'})
        },
        //尾联设置跳转到components/setup/tailcouplet.vue
        getTailcouplet() {
            this.$router.push({name: 'setuptailcouplet'})
        },

    }
}
</script>

<style lang="less" scoped>
.setup-container{
    .mui-card{
        .mui-card-content{
            .mui-card-content-inner{
                padding: 10px;
                padding-bottom: 0px;
                .img{
                    width: 35px;
                    height: 35px;
                    /*border: 2px solid red;*/
                    box-sizing: border-box;
                    //background-color: red;
                    img{
                        width: 100%;

                    }
                }
            }
        }
    }
}
</style>
