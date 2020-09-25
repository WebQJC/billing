<template>
  <div class="add">
    <div :class="list.length===0? 'box-card1':'box-card'">
      <div class="row" v-for="i in list" :key="i.id">
        <van-swipe-cell>
          <div class="content">
            <div class="div1">{{i.productName}}</div>
            <div class="div2 color">数量: {{i.quantity}}</div>
            <div class="div3 color">{{i.price}}￥</div>
          </div>
          <template #right>
            <van-button square type="danger" text="删除" @click="deletes(i.id)" />
          </template>
        </van-swipe-cell>
      </div>
    </div>
    <van-empty description="" v-if="!list.length" />
    <div class="foot">
      <div>
        <van-button round type="primary" size="small" block @click="addBilling()">增加</van-button>
        <van-button round type="primary" size="small" block @click="billingOk()">确定</van-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: this.$store.getters.getAddBilling || []
    };
  },
  created() {},
  methods: {
    deletes(e){
      console.log(e)
      this.list.filter(item => {
        return item.id !=e;
      })
      console.log(this.list)
    },
    addBilling() {
      this.$router.push({ name: "addBilling", params: { title: "开单信息" } });
    },
    billingOk() {
      this.$router.push({ name: "billingOk", params: { title: "确定信息" } });
    }
  }
};
</script>
<style scoped lang="less">
.add {
  padding: 12px;
  .box-card1 {
    background-color: #ffffff;
  }
  .box-card {
    margin-top: 5px;
    border: 1px solid #f2f2f2;
    border-radius: 5px;
    padding: 0px 10px;
    padding-bottom: 11px;
    margin-bottom: 45px;
    background-color: #f2f2f2;
    .content {
      width: 100%;
      height: 40px;
      border-bottom: 1px solid #969799;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-top: 10px;
      div{
        margin-bottom: 6px;
      };
      .div1{
       // border:1px solid red;
        //width: 200px;
        flex: 1
      };
      .div2{
       // border:1px solid red;
        //width: 100%;
        flex: 1;
        text-align: left;
      };
      .div3{
      // border:1px solid red;
        //width: 90px;
        flex: 1;
        text-align: right;
      }
      .color{
        color: #969799;
      }
    }
    // .row {
    //   .van-row {
    //     margin-top: 18px;
    //     margin-top: 21px;
    //     border-bottom: 1px solid #969799;
    //     height: 30px;
    //     .col2 {
    //       font-size: 14px;
    //       color: #808080;
    //     }
    //     .col3 {
    //       text-align: right;
    //       font-size: 14px;
    //       color: #808080;
    //     }
    //   }
    // }
  }
  .foot {
    width: 99%;
    height: 100px;
    background-color: #ffffff;
    position: fixed;
    bottom: 0px;
    left: 0px;
    div {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .van-button--block {
        width: 40%;
      }
    }
  }
}
</style>