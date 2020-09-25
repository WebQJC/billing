<template>
  <div class="add">
    <div class="box-card">
      <van-cell-group  v-for="i in list" :key="i.productId">
        <van-cell :title="i.productName" :value="i.productUnit" size="large" 
          :label="'NO.'+i.productNo" @click="updateGoods(i)" clickable />
      </van-cell-group>
    </div>
    <div class="foot">
      <div>
        <van-button type="primary" size="large" @click="addGoods()">新增商品</van-button>
      </div>
    </div>
  </div>
</template>
<script>
import * as api from "@/api";
export default {
  data() {
    return {
      list: [],
      pageInfo: {
        pageIndex: 1,
        pageSize: 10,
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
          this.list = [...res.data.recordList];
        }
      });
    },
    updateGoods(e) {
      e.title = "新增商品";
      console.log(e)
      this.$router.push({ name: "addGoods", params: e });
    },
    addGoods() {
      console.log("新增商品");
      this.$router.push({ name: "addGoods", params: { title: "新增商品" } });
    }
  }
};
</script>
<style scoped lang="less">
.add {
  padding: 12px;
  .box-card {
    margin-top: 5px;
    border: 1px solid #f2f2f2;
    background-color: #f2f2f2;
    border-radius: 5px;
    padding: 0px 10px;
    padding-bottom: 11px;
    margin-bottom: 45px;
    .van-cell--large{
      background-color: #f2f2f2;
      border-bottom: 1px solid #969799;
    }
  }
  .foot {
    width: 99%;
    height: 100px;
    background-color: #ffffff;
    //border: 1px solid red;
    position: fixed;
    bottom: 0px;
    left: 0px;

    div {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .van-button--large{
        width: 50%;
        border-radius: 5px;
        height: 35px;
      }
    }
  }
}
</style>