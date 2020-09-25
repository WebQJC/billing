<template>
    <div class="stopcar-container">
        <!-- stopcar header -->
        <div class="header">
            <!-- 拍照识别车牌模块 -->
            <mt-button type="default" size="small" class="stopcar-scan" @click="scan">
                <span class="mui-icon-extra mui-icon-extra-sweep"></span>
            </mt-button>
            <!-- 查询车牌号模块 -->
            <div class="stopcar-search">
                <input type="text" placeholder="查询车牌号" v-model="form.keyword"/>
                <span class="mui-icon mui-icon-search"></span>
            </div>
            <!-- 输入车牌号模块 -->
            <mt-button type="primary" size="small" class="stopcar-input" @click="inputStopCarCard">查询</mt-button>
        </div>
      <div style="height: 50px"></div>
        <!-- stopcar main 显示停车信息模块-->
      <div class="startcar-main">
      <mt-loadmore
        :top-method="loadTop"
        @top-status-change="topChange"
        ref="loadmore"
      >
        <div
           class="stopcar-main"
           v-infinite-scroll="scrollLoad"
           :infinite-scroll-disabled="loading"
           infinite-scroll-distance="30"
        >
          <div class="mui-card" v-for="item in stopcarList" :key="item.id">
            <div class="mui-card-content">
              <div class="mui-card-content-inner">
                <div class="content">
                    <span>车牌号：{{ item.carNumber }}</span>
                    <span>停车时间：{{ item.stopTime }}小时</span>
                </div>
                <div class="content">
                    <span class="in-time">进场时间：{{ item.enterTime }}</span>
                    <mt-button type="danger" size="small" @click="getprints(item)">出场</mt-button>
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
import { MessageBox, Toast } from 'mint-ui';
import {client} from "../../util/index";

  let o = {
    data() {
        return{
          stopcar:[],
          form: {
            keyword: ''
          },
          stopcarList: [],
          pageInfo: {
            pageIndex: 1,
            pageSize: 8,
            reload: false,   // 上滑显示刷新
            isOver: false   // 是否加载完
          },
          loading: false
        }
    },
    created() {
        //this.postInfo()
        //this.register()
      if (this.$route.query.carNumber && this.$route.query.carNumber !== this.$store.getters.getCarNumber) {
        this.scanOver(this.$route.query.carNumber);
        this.$store.commit('setCarNum', this.$route.query.carNumber);
      }
    },
    mounted() {

      // 调用app方法
      window['scanCarNum'] = (opt, p) => {
        let param = p;
        if (typeof param === 'string') {
          param = JSON.parse(p);
        }
        if (param.code == 1) {
          // this.$set(this.form, 'keyword', param.carNum);
          // this.scanOver();
          this.scanDialog(param.carNum);
        } else {
          Toast('识别失败')
        }
      }
    },
    methods: {
        //获取系统时间-年月日
        getDate() {
            let dt = new Date()
            let y = dt.getFullYear()
            let m = dt.getMonth() + 1 < 10 ? '0'+(dt.getMonth() + 1) : dt.getMonth() + 1
            let d = dt.getDate() < 10 ? '0'+dt.getDate() : dt.getDate()
            let hh = dt.getHours() < 10 ? '0'+dt.getHours() : dt.getHours()
            let mm = dt.getMinutes() < 10 ? '0'+dt.getMinutes() : dt.getMinutes()
            let ss = dt.getSeconds() < 10 ? '0'+dt.getSeconds() : dt.getSeconds()
             return y + '-' + m + '-' + d + ' '+ hh + ':' + mm + ':' + ss
        },
        //拍照识别车牌
        scan() {
          client.operation({
            opt: 'scanCarNum',
            data: {
              func: 'scanCarNum'
            }
          })
        },
      scanDialog(carNum){
        let _html = `<div class="carScanInfo">
                            <div class="info">车牌号：<input class="carScanInfoNumber" type="text" value="${carNum}"></div>
                          </div>`
        MessageBox.confirm(_html, {
          title: '确认车牌号',
          confirmButtonText: '出库',
          cancelButtonText: '入库'
        }).then(action => {
          // 出库
          const carNumber = document.querySelector('.carScanInfoNumber').value;
          this.getprints({
            carNumber
          });
        }).catch(e => {
          // 入库
          const carNumber = document.querySelector('.carScanInfoNumber').value;
          this.getCarIn({
            carNumber
          });
        })
      },
        scanOver(carNumber){
          api.carApi.getCarStatus({
            carNumber
          }).then(res => {
            if (res.code === 1000) {
              const data = res.data;
              const postFun = {
                1: this.getCarIn,
                2: this.getprints
              }
              postFun[data.opreateType]({ carNumber, batchNo: data.batchNo });
            }
          })
        },
        loadTop(){
             this.pageInfo = {
               ...this.pageInfo,
               pageIndex: 1,
               reload: true,
               isOver: false
             }
            this.stopcarList = [];
           this.search();
        },
        topChange(status){
             this.topStatus = status;
        },
      scrollLoad(){
          this.search(this.form);
      },
       //车牌查询
        search(keywords) { // 根据关键字，进行数据的搜索
          // 下滑到底不加载
          if (this.pageInfo.isOver) {
            return false;
          }
           let pageInfo = {
             pageIndex: this.pageInfo.pageIndex,
             pageSize: this.pageInfo.pageSize
           }
           this.loading = true;
            api.carApi.getStopCar({
              ...keywords,
              ...pageInfo
            }).then(res => {
              // 关闭上滑刷新
              if (this.pageInfo.reload) {
                this.$refs.loadmore.onTopLoaded()
              }
              // 打开上滑刷新功能
              this.pageInfo.reload = false;
              // 加载完成
              if (res.code === 1000) {
                const data = res.data;
                this.stopcarList = [...this.stopcarList, ...data.recordList];
                // 判断是否下滑刷新
                if (this.pageInfo.pageIndex < data.totalPage) {
                  this.pageInfo.pageIndex = Number(data.pageNum) + 1;
                } else {
                  this.pageInfo.isOver = true;
                }
              }
            });
        },
        //监听输入车牌号
        inputStopCarCard(item) {
          this.pageInfo = {
            ...this.pageInfo,
            pageIndex: 1,
            reload: true,
            isOver: false
          }
          this.stopcarList = [];
          this.search(this.form);
        },
      //  汽车入场
      getCarIn(item){
        let _html = `<div class="carLeaveInfo">
                            <div class="info">车牌号：<input class="carNumber" type="text" value="${item.carNumber}"></div>
                          </div>`
        MessageBox.confirm(_html, '确认车牌号').then(action => {
          const carNumber = document.querySelector('.carNumber').value;
          if (carNumber !== undefined || carNumber !== '') {
            api.carApi.enterIntoPark({
              carNumber
            }).then(res => {
              if (res.code === 1000) {
                Toast(res.msg);
                this.loadTop();
                //跳转到打印页面
                // this.$router.push({ name: "printing", params: { id } })
                // this.stopcar.splice(id-1, 1)
              }
            })
          } else {
            Toast('请输入正确的数字');
          }
        }) ;
      },
       //汽车出场按钮弹框和跳转
        getprints(item) {
          api.carApi.getCarConsumeInfo({
            carNumber: item.carNumber
          }).then(res => {
            if (res.code === 1000) {
              let data = res.data;
              let _html = `<div class="carLeaveInfo">
                            <div class="info">车牌号：${item.carNumber}</div>
                            <div class="info">单价: ${data.price}元/小时</div>
                            <div class="info">消费时间: ${data.consumeTime}小时</div>
                            <div class="info">消费金额: ${data.shouldPay}元</div>
                            <div class="info">
                              <div style="width: 90px">优惠金额: </div>
                              <div class="input"><input class="pay" type="text" value="${data.shouldPay}"></div>
                            </div>
                            </div>`
              MessageBox.confirm(_html, '费用详情').then(action => {
                const actualPay = Number(document.querySelector('.pay').value);
                if (actualPay >= 0) {
                  api.carApi.leavePark({
                    carNumber: item.carNumber,
                    actualPay: actualPay
                  }).then(async res => {
                    if (res.code === 1000) {
                      Toast(res.msg);
                      await this.loadTop()
                      // 保存数据
                      this.$store.commit('setCarInvoteInfo', res.data);
                      //跳转到打印页面
                      this.$router.push({ name: "printing" })
                      // this.stopcar.splice(id-1, 1)
                    }
                  })
                } else {
                  Toast('请输入正确的数字');
                }
              }) ;
            }
          });
        },
    }
}
export default o;
</script>
<style lang="less">
  .carLeaveInfo, .carScanInfo {
    text-align: left;

    .info {
      height: 30px;
      display: flex;
      input {
        height: 30px;
      }
    }
  }
</style>
<style lang="less" scoped>
.stopcar-container{
  height: 100%;

    .header{
      position: fixed;
    top: 0;
      z-index: 1;
        padding: 10px;
        display: flex;
        .stopcar-scan{
            margin-right: 5px;
            padding-left: 5px;
            padding-right: 5px;
        }
        .stopcar-search{
            position: relative;
            .mui-icon-search{
                position: absolute;
                top: 3px;
                left: 6px;
            };
            input{
                height: 32px;
                padding-top: 14px;
                padding-left: 38px
            }
        }

        .stopcar-input{
            text-align: center;
            // margin-right: 10px;

            margin-left: 5px
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
                        .mint-button--small{
                            height: 30px;
                        }
                        .in-time{
                            margin-top: 5px;
                        }
                    }
                }
            }
        }
    }
}
</style>
