<template>
    <div class="printing-container">
      <div ref="infos">
        <h5 class="title">{{title}}</h5>
        <ul class="info">
            <li>车牌号：{{ inviteInfo.carNumber }}</li>
            <li>进场时间：{{ inviteInfo.enterTime }}</li>
            <li>停车时间：{{ inviteInfo.consumeTime }}小时</li>
            <li>单价：{{ inviteInfo.price }}元/小时</li>
            <li>应付金额：{{ inviteInfo.shouldPay }}元</li>
            <li>实付金额：{{ inviteInfo.actualPay }}元</li>
            <li class="imgs"><div class="img"><img :src="inviteInfo.qrUrl" /></div></li>
        </ul>
        <div class="floor">{{ end }}</div>
      </div>
        <div class="printing-button">
            <mt-button type="primary" size="large" plain @click="printTickertape">打印</mt-button>
            <mt-button type="danger" size="large" plain @click="signOut">退出</mt-button>
        </div>
    </div>
</template>

<script>
  import * as api from '@/api';
  import { Toast } from 'mint-ui'
  import {client} from "../../util/client";
  export default {
    data() {
        return{
          title: '',
          end: '',
          inviteInfo: null,
        }
    },
    created() {
      if (this.$store.getters.getInvoteInfo) {
        this.inviteInfo = this.$store.getters.getInvoteInfo
      } else {
        this.$router.go(-1);
      }

      api.carApi.getCarSettingInfo().then(res => {
        if (res.code === 1000) {
          if (res.data) {
            const data = res.data;
            if (Object.keys(data).length === 0) {
              // Toast('请设置用户信息');
            } else {
              api.carApi.getCarSettingInfo().then(res => {
                if (res.code === 1000) {
                  if (res.data) {
                    const data = res.data;
                    if (Object.keys(data).length === 0) {
                      // Toast('请设置用户信息');
                    } else {
                      this.title = data.companyName || '';
                      this.end = data.floorName || '';
                    }
                  }
                }
              })
            }
          }
        }
      })
    },
    mounted() {

        //console.log(this.printing)
      window['print'] = (opt, p) => {
        let param = p;
        if (typeof param === 'string') {
          param = JSON.parse(p);
        }
        if (param.code == 1) {
          // this.$set(this.form, 'keyword', param.carNum);
          // this.scanOver();
          Toast('打印成功')
        } else {
          Toast('打印失败')
        }
      }
    },
    methods:{
        //获取打印的数据列表
        getPrintList(bathNo) {
        },
        //退出  返回
        signOut() {
            this.$router.go(-1);
        },
        //打印凭条
        printTickertape() {
          const dom = this.$refs.infos;
          const height = (dom.clientHeight+20).toString();
          const width = document.body.clientWidth.toString();
            client.operation({
              opt: 'print',
              data: {
                "func":"print",
                "param": {
                  "cmdType":"ESC",
                  "height": height,
                  "width": width,
                  "x":"0",
                  "y":"0"
                }
              }
            })
        }
    }

}
</script>

<style lang="less">
  .popups-picker {
    z-index: 2;
  }
</style>
<style lang="less" scoped>
    .printing-container{
        padding: 10px;
        /*text-align: center;*/
      height: 100%;
      overflow: scroll;

      .title {
        font-size: 22px;
        color: #000;
        text-align: center;
      }
      .floor {
        font-size: 18px;
        text-align: center;
      }
        ul{
            list-style-type:none;
            li{
                margin-bottom: 15px;
                margin-left: 40px;
              font-size: 18px;
              &.imgs {
                margin-left: 0;
              }
                .img{
                    margin: 0 auto;
                    width: 150px;
                    height: 150px;
                    img{
                        width: 100%;
                    }
                }
            }
        }
        .printing-button{
            margin: 80px auto 20px auto;
            .mint-button{
                margin-top: 15px;
            }
        }
    }
</style>
