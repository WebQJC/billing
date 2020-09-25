<template>
  <div class="setup">
    <div class="box-card">
      <van-cell-group>
        <van-field v-model="data.header" label="打印头" placeholder="请输入打印头" input-align="right" />
        <!-- <van-field v-model="data.rqcode" label="二维码" placeholder="输入框内容右对齐" input-align="right" /> -->
        <van-cell title="收款码" is-link>
          <template #default>
            <img :src="imgRqcode" style="width:20px; hight: 20px" />
          </template>
        </van-cell>
        <van-field
          v-model="data.senderName"
          label="发货人"
          placeholder="请输入发货人姓名"
          input-align="right"
        />
        <van-field
          v-model="data.senderMobile"
          label="联系电话"
          type="tel"
          placeholder="请输入联系电话"
          input-align="right"
        />
        <div class="textarea">
          <van-field v-model="data.senderAddress" type="textarea" placeholder="详细地址" />
        </div>
      </van-cell-group>
    </div>
    <div class="setupFoot">
      <van-button round type="primary" block size="small" @click="finish()">保存</van-button>
    </div>
  </div>
</template>
<script>
import * as api from "@/api";
import { Toast } from "mint-ui";
import { Notify } from 'vant';
export default {
  data() {
    return {
      imgRqcode: require("../assets/rqcode.png"),
      show: false,
      data: {
        header: "",
        qrCode: "",
        senderAddress: "",
        senderMobile: "",
        senderName: "",
        id: ""
      }
    };
  },
  created() {
    this.getPageSetting(); //获取设置参数
  },
  methods: {
    getPageSetting() {
      api.bill.getPageSetting({}).then(res => {
        if (res.code === 1000) {
          this.data = res.data;
        }
      });
    },
    finish() {
      console.log(this.data);
      if(!this.data.header){
        Notify({ type: 'warning', message: '请输入请求头' });
        return;
      }
      if(!this.data.qrCode){
        Notify({ type: 'warning', message: '请选择收款码' });
        return;
      }
      if(!this.data.senderName){
        Notify({ type: 'warning', message: '请选择收货人姓名' });
        return;
      }
      if(!this.data.senderMobile){
        Notify({ type: 'warning', message: '请输入收货人电话' });
        return;
      }
      if(!this.data.senderAddress){
        Notify({ type: 'warning', message: '请输入详细地址' });
        return;
      }
      api.bill.updatePageSetting(this.data).then(res => {
        if (res.code === 1000) {
          Toast(res.msg);
          setTimeout(() => {
            this.$router.go(-1);
          },1000);
        }else{
          Toast(res.msg)
        }
        
      });
    }
  }
};
</script>
<style scoped lang="less">
.setup {
  padding: 12px;
  .box-card {
    margin-top: 5px;
    border: 1px solid #f2f2f2;
    border-radius: 5px;
    padding: 0px 10px;
    padding-bottom: 11px;
    .van-cell-group {
      .van-cell {
        border-bottom: 1px solid #969799;
        padding: 6px 3px;
      }
    }
    .textarea {
      border-radius: 3px;
      margin-top: 8px;
      .van-cell {
        height: 66px;
        padding: 4px 5px;
        border: none;
        background-color: #f2f2f2;
        border-radius: 5px;
      }
    }
  }
  .setupFoot {
    margin-top: 20px;
    width: 100%;
    display: flex;
    justify-content: center;
    .van-button--round {
      width: 90%;
    }
  }
}
</style>