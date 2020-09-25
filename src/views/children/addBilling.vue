<template>
  <div class="addbilling">
    <div class="box-card">
      <van-cell-group>
        <van-cell is-link title="商品名称" :value="data.productName" @click="show = true" 
          arrow-direction="down" />
        <van-action-sheet v-model="show" :actions="actions" @select="onSelect" />
        
        <van-field v-model="data.quantity" label="数量" placeholder="请输入商品数量" />
        <van-field v-model="data.price" label="价格" placeholder="请输入商品价格" />
      </van-cell-group>
    </div>
    <div class="button">
      <van-button round type="primary" size="small" block @click="submitForm()">确定</van-button>
    </div>
  </div>
</template>
<script>
import { Notify } from "vant";
import * as api from "@/api";
export default {
  data() {
    return {
      show: false,
      actions: [],
      data: {
        productName: "",
        quantity: "",
        price: "",
        productId: ""
      },
      pageInfo: {
        pageIndex: 1,
        pageSize: 1000,
      },
    };
  },
  created() {
    this.getProductByPage()
  },
  methods: {
    getProductByPage() {
      api.bill.getProductByPage(this.pageInfo).then(res => {
        if (res.code === 1000) {
          console.log(res.data)
          res.data.recordList.forEach(item => {
            let q ={
              name: item.productName,
              id: item.productId
            }
            this.actions.push(q)
          })
        }
      });
    },
    onSelect(item) {
      this.show = false;
      this.data.productName = item.name;
      this.data.productId = item.id;
      console.log(this.data)
    },
    submitForm() {
      if (!this.data.productName) {
        Notify({ type: "warning", message: "请选择商品名称" });
        return;
      }
      if (!this.data.quantity) {
        Notify({ type: "warning", message: "请输入商品数量" });
        return;
      }
      if (!this.data.price) {
        Notify({ type: "warning", message: "请输入商品价格" });
        return;
      }
      this.$store.commit("setAddBilling", this.data || "");
      this.$router.go(-1);
    }
  }
};
</script>
<style scoped lang="less">
.addbilling {
  padding: 12px;
  .box-card {
    margin-top: 5px;
    border: 1px solid #f2f2f2;
    border-radius: 5px;
    padding: 0px 10px;
    padding-bottom: 11px;
  }
  .button {
    display: flex;
    justify-content: center;
    margin-top: 25px;
    .el-button {
      width: 90%;
    }
  }
}
</style>