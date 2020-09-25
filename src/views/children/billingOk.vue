<template>
  <div class="billingok">
    <div class="box-card">
      <van-cell-group>
        <van-field required v-model="data.shipTo" label="收货人" colon placeholder="请输入收货人姓名" />
        <van-field required v-model="data.cellPhone" label="联系电话" colon placeholder="请输入联系电话" />
        <div class="textarea">
          <van-field v-model="data.address" type="textarea" placeholder="详细地址" />
        </div>
      </van-cell-group>
    </div>
    <div class="button">
      <van-button round type="primary" block size="small" @click="print()">打印</van-button>
    </div>
  </div>
</template>
<script>
import * as api from "@/api";
import { Notify } from "vant";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      orderList:this.$store.getters.getAddBilling || [],
      data: {
        shipTo: "",
        cellPhone: "",
        address: "",
        orderDetailList: []
      }
    };
  },
  methods: {
    print() {
      if (!this.data.shipTo) {
        Notify({ type: "warning", message: "请输入收货人姓名" });
        return;
      }
      if (!this.data.cellPhone) {
        Notify({ type: "warning", message: "请输入联系电话" });
        return;
      }
      if (!this.data.address) {
        Notify({ type: "warning", message: "请输入详细地址" });
        return;
      }
      this.orderList.forEach(item => {
        let q = {
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
          realTotalPrice: item.quantity*item.price
        }
        this.data.orderDetailList.push(q)
      });
      console.log(this.data)
      api.bill.getPrint(this.data).then(res => {
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
.billingok {
  padding: 12px;
  .box-card {
    margin-top: 5px;
    border: 1px solid #f2f2f2;
    border-radius: 5px;
    padding: 0px 10px;
    padding-bottom: 11px;
    .textarea {
      border-radius: 3px;
      margin-top: 8px;
      padding: 0 10px;
      .van-cell {
        height: 66px;
        padding: 4px 5px;
        border: none;
        background-color: #f2f2f2;
        border-radius: 5px;
      }
    }
  }
  .button {
    // border: 1px solid red;
    display: flex;
    justify-content: center;
    margin-top: 25px;
    .el-button {
      width: 90%;
    }
  }
}
</style>