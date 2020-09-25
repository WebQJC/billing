<template>
  <div class="addgoods">
    <div class="box-card">
      <div class="clearfix">
        <span>商品信息</span>
      </div>
      <div class="box-main">
        <van-cell-group>
          <van-field label-align="center" required v-model="formGoods.productName" label="商品名称" colon placeholder="请输入商品名称" />
          <van-field label-align="center" required v-model="formGoods.productUnit" label="商品规格" colon placeholder="请输入商品规格" />
          <van-field label-align="center" required v-model="formGoods.productNo" label="商品编号" colon placeholder="请输入商品编号" />
        </van-cell-group>
      </div>
    </div>
    <div class="button">
      <van-button round type="primary" size="small" block @click="submitForm()">保存</van-button>
    </div>
  </div>
</template>
<script>
import * as api from "@/api";
import { Notify } from "vant";
import { Toast } from "mint-ui";
export default {
  components: {},
  data() {
    return {
      labelPosition: "right",
      formGoods: {
        productName: this.$route.params.productName,
        productNo: this.$route.params.productNo,
        productId: this.$route.params.productId,
        productUnit: this.$route.params.productUnit
      }
    };
  },
  methods: {
    submitForm() {
      console.log(this.formGoods);
      if (!this.formGoods.productName) {
        Notify({ type: "warning", message: "请输入商品名称" });
        return;
      }
      if (!this.formGoods.productUnit) {
        Notify({ type: "warning", message: "请输入商品规格" });
        return;
      }
      if (!this.formGoods.productNo) {
        Notify({ type: "warning", message: "请输入商品编号" });
        return;
      }
      api.bill.getUpdateProduct(this.formGoods).then(res => {
        if (res.code === 1000) {
          if(this.formGoods.productId){
            Toast('修改商品成功！')
          }else{
            Toast('添加商品成功！')
          }
          setTimeout(() => {
            this.$router.go(-1);
          },1000);
        }else{
          if(this.formGoods.productId){
            Toast('修改商品失败！')
          }else{
            Toast('添加商品失败！')
          }
        }
        
      });
    }
  }
};
</script>
<style scoped lang="less">
.addgoods {
  padding: 12px;
  .box-card {
    .clearfix {
      border-bottom: 1px solid #969799;
      font-size: 17px;
      height: 40px;
      display: flex;
      justify-content: left;
      align-items: center;
    }
    background-color: #f2f2f2;
    margin-top: 5px;
    border: 1px solid #f2f2f2;
    border-radius: 5px;
    padding: 0px 10px;
    padding-bottom: 11px;
    .box-main {
      .van-cell-group {
        background-color: #f2f2f2;
        .van-cell {
          background-color: #f2f2f2;
          padding: 10px 0px;
          border-bottom: 1px solid #969799;
        }
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