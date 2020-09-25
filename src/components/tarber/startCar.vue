<template>
    <div class="startcar-container">
        <!-- header -->
        <div class="startcar-header">
            <mt-button type="default" size="small" class="stopcar-scan" @click="popupVisible=true">
              {{ form.queryType ? pickerVal : '请选择' }}
            </mt-button>
            <div class="stopcar-search">
                <input type="text" placeholder="查询车牌号" v-model="form.keyword" @keyup.enter="formSearch"/>
                <span class="mui-icon mui-icon-search"></span>
            </div>
            <!-- 查询 -->
            <div class="startcar-select">
              <div class="startcar-select-main">
                <mt-button type="primary" size="small" @click="formSearch">查询</mt-button>
              </div>
            </div>
<!--          <mt-datetime-picker-->
<!--              ref="picker"-->
<!--              type="date"-->
<!--              v-model="form.date"-->
<!--              @confirm="getDate"-->
<!--          >-->
<!--          </mt-datetime-picker>-->
          <mt-popup
            v-model="popupVisible"
            position="bottom"
            class="popups"
          >
            <div class="popups-picker">
              <mt-picker
                :slots="slots"
                :showToolbar="true"
                ref="picker"
                @change="onValuesChange"
              >
                <div class="picker-check">
                  <div class="cancel" @click="popupVisible = false">取消</div>
                  <div class="sure" @click="surePicker">确定</div>
                </div>
              </mt-picker>
            </div>
          </mt-popup>
        </div>
      <div style="height: 50px"></div>

      <!-- main -->
        <div class="startcar-main">
          <mt-loadmore
            :top-method="loadTop"
            @top-status-change="topChange"
            ref="loadmore"
            style="min-height: 50px"
          >
            <div
              class="stopcar-main"
              v-infinite-scroll="scrollLoad"
              :infinite-scroll-disabled="loading"
              infinite-scroll-distance="30"
            >
              <div class="mui-card" v-for="item in startcarList" :key="item.id">
                <div class="mui-card-content">
                  <div class="mui-card-content-inner" @click="toPrint(item)">
                    <div class="content">
                        <span>车牌号：{{ item.carNumber }}</span>
                        <span>停车时间：<span class="text-color">{{ item.consumeTime }}小时</span></span>
                    </div>
                    <div class="content">
                        <span>进场时间：{{ item.enterTime }}</span>
                        <span>费用：<span class="text-color">￥{{ item.shouldPay }}</span></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </mt-loadmore>
        </div>
    </div>
</template>

<script>
  import * as api from '@/api';
export default {
    data() {
        return{
          startcar: [
          ],
          startcarList: [],
          form: {
            keyword: '',
            queryType: null,
          },
          pageInfo: {
            pageIndex: 1,
            pageSize: 8,
            reload: false,   // 上滑显示刷新
            isOver: false   // 是否加载完
          },
          loading: false,
          popupVisible: false,
          slots: [{
            flex: 1,
            defaultIndex: 1,
            values: ['当天', '当月', '当年']
          }],
          pickerObj: {
            '当天': 1,
            '当月': 2,
            '当年': 3
          },
          pickerVal: ''
        }
    },
    mounted() {

    },
    methods:{
      searchDate(){
        this.$refs.picker.open();
      },
      getDate(d){
        console.log(d);
      },
      toPrint(d){
        // 保存数据
        this.$store.commit('setCarInvoteInfo', d);
        //跳转到打印页面
        this.$router.push({ name: "printing" })
      },
      loadTop(){
        // 上滑刷新功能
        this.pageInfo = {
          ...this.pageInfo,
          pageIndex: 1,
          reload: true,
          isOver: false
        }
        this.startcarList = [];
        this.search(this.form);
      },
      topChange(status){
        this.topStatus = status;
      },
      onValuesChange(picker, values){
      },
      formSearch(){
        this.pageInfo.pageIndex = 1;
        this.pageInfo.isOver = false;
        this.startcarList = [];
        this.search(this.form);
      },
      surePicker(){
        let val = this.$refs.picker.getValues()[0];
        this.pickerVal = val;
        this.form.queryType = this.pickerObj[val];
        this.popupVisible = false;
        this.pageInfo.isOver = false;
        this.formSearch();
      },
      scrollLoad(){
        this.search(this.form)
      },
        search(form) { // 根据关键字，进行数据的搜索
          if (this.pageInfo.isOver) {
            return false;
          }
          let pageInfo = {
            pageIndex: this.pageInfo.pageIndex,
            pageSize: this.pageInfo.pageSize
          }
          this.loading = true;
          api.carApi.getHistoryRecord({
            ...form,
            ...pageInfo
          }).then(res => {
            // 关闭上滑刷新
            if (this.pageInfo.reload) {
              this.$refs.loadmore.onTopLoaded()
            }
            // 打开上滑刷新功能
            this.pageInfo.reload = false;
            // 加载完成
            this.loading = false;
            if (res.code === 1000) {
              const data = res.data;
              this.startcarList = [...this.startcarList, ...data.recordList];
              // 判断是否下滑刷新
              if (this.pageInfo.pageIndex < data.totalPage) {
                this.pageInfo.pageIndex = Number(data.pageNum) + 1;
              } else {
                this.pageInfo.isOver = true;
              }
            }
          })
        }
    }
}
</script>

<style>
  .stopcar-main {
    -webkit-overflow-scrolling:touch;
  }

</style>
<style lang="less" scoped>
.startcar-container{
  position: relative;
  z-index: 2;
  .popups {
    width: 100%;

    .popups-picker {
      .picker-check {
        overflow: hidden;
        .cancel {
          width: 40px;
          height: 40px;
          line-height: 40px;
          text-align: center;
          float: left;
        }
        .sure {
          width: 40px;
          height: 40px;
          line-height: 40px;
          float: right;
          color: #007aff;
        }
      }

    }
  }

  .startcar-header{
    position: fixed;
    top: 0;
    z-index: 1;
        display: flex;
        justify-content: space-between;
        padding: 5px 10px;
        .stopcar-search{
            margin-left: 5px;
            position: relative;
            .mui-icon-search{
                position: absolute;
                top: 5px;
                left: 9px;
            };
            input{
                padding-top: 14px;
                padding-left: 40px;
                height: 32px;
              line-height: 32px;
            }
        };

        .startcar-select{
          position: relative;
          margin-top: -10px;
          margin-left: 5px;
          /*width: 100px;*/
          background-color: #EFEFF4;
          .startcar-select-main{
            z-index: 1;
            margin-top: 10px;
            width: 100%;
            .startcar-select-date{
                font-size: 18px;
                z-index: 1;
                color: #000000;
                //background-color: red;
                width: 100%;
                height: 39px;
                line-height: 39px;
                margin-right: 10px;
            };
          }
          .select-icon{
            position: absolute;
            right: 2px;
            top: 19px;
          }
        }
    };
    .startcar-main{
      height: calc(100vh - 110px);
      overflow: scroll;
        .mui-card{
            .mui-card-content{
                .mui-card-content-inner{
                    padding: 10px;
                    .content{
                        display: flex;
                        justify-content: space-between;
                        font-size: 16px;
                        //background-color: yellow;
                        padding: 5px;
                      flex-wrap: wrap;
                        span{
                            .text-color{
                                color: red
                            }
                        }
                    }
                }
            }
        }
    };
}
</style>
