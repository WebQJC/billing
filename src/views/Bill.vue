<template>
  <div class="bill">
    <van-pull-refresh v-model="refreshing" success-text="刷新成功" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div class="box-card" v-for="i in list" :key="i.orderId" shadow="never">
          <ul>
            <li>
              <div class="odd">
                <div class="number">
                  订单号:
                  <span>{{i.orderId}}</span>
                </div>
                <div class="status">
                </div>
              </div>
            </li>
            <li>
              <div class="time">
                下单时间:
                <span>{{i.orderDate}}</span>
              </div>
            </li>
            <li>
              <div class="billNumber">
                <div class="goods">共{{i.productTotalCount}}件商品</div>
                <div class="money">{{i.productTotalAmount}}￥</div>
              </div>
            </li>
          </ul>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
import * as api from "@/api";
export default {
  data() {
    return {
      list: [],//数据
      loading: false, // 上滑显示刷新
      finished: false, // 是否加载完
      refreshing: false, // 下滑刷新；
      totalCount: 0, //总条数
      pageInfo: {
        pageIndex: 1,
        pageSize: 10,
      },
    };
  },
  created() {
    setTimeout(() => {
      this.search();
    }, 1000);
  },
  // mounted() {
    
  // },
  methods: {
    onLoad() {
      setTimeout(() => {
        this.search()
        // 加载状态结束
        //this.loading = false;

        // 数据全部加载完成
        if (this.list.length === this.totalCount) {
          this.finished = true;
        }
      }, 1000);
    },
    onRefresh() {  //下拉刷新
      // 清空列表数据
      this.finished = false;
      this.pageInfo.pageIndex = 1;
      this.search()//获取数据

      this.onLoad();

      // this.finished = false;
      // this.pageInfo.pageSize = 10;
      // this.pageInfo.pageIndex = 1;
      // this.search()//获取数据
      // // 重新加载数据
      // // 将 loading 设置为 true，表示处于加载状态
      //  this.loading = true;
      //  this.onLoad();
    },
    search() {  
      let pageInfo = {
        pageIndex: this.pageInfo.pageIndex,
        pageSize: this.pageInfo.pageSize
      };
      api.bill.orderGetByPage(pageInfo).then(res => {
        this.list = res.data.recordList;
        console.log(this.list)
        this.totalCount = res.data.totalCount //获取总条数
        this.refreshing = false;//上滑刷新结束
        this.refreshing = false;//下滑刷新结束
      });
    }
  }
};
</script>
<style scoped lang="less">
.bill {
  padding: 8px;
  background-color: #ffffff;
  .box-card {
    background-color: #f2f2f2;
    border-radius: 5px;
    margin-top: 7px;
    ul {
      padding: 7px 11px;
      li {
        .odd {
          //background-color: yellow;
          border-bottom: 1px solid #000;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          .number {
            color: #000000;
            font-size: 14px;
            font-weight: 400;
          }
          .status {
            width: 50px;
            height: 21px;
            font-size: 12px;
            //  border: 1px solid blue;
          }
        }
        .time {
          color: #808080;
          margin-top: 7px;
          font-size: 12px;
        }
        .billNumber {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-top: 5px;
          .goods {
            color: #808080;
            font-size: 12px;
          }
          .money {
            color: #1a1a1a;
            font-size: 13px;
          }
        }
      }
    }
  }
}
</style>