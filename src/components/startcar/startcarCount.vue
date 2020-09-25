<template>
<div class="startcarCount-container">
    <!-- 下拉框选择日期 -->
    <div class="startcarCount-select">
        <div class="startcarCount-select-main">
            <select autofocus class="startcarCount-select-date" v-model="dateVelue" ref="sd" id="sd">
                <option value="day">一天</option>
                <option value="month">一月</option>
                <option value="year">一年</option>
            </select>
            <span class="mui-icon mui-icon-arrowdown select-icon"></span>
        </div>
    </div>
     
    
    <!-- main    -->
    <div class="startcarcount-main">
        <!-- 收入结算 -->
        <div class="mui-card">
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
                    <div class="content">
                        <span>{{ dateText }}： <span class="text-color">{{ dateFormat }}</span></span>
                    </div>
                    <div class="content">
                        <span>总停车辆： <span class="text-color">{{ startcarNum.length }}</span></span>
                        <span>总收入：<span class="text-color">￥{{ generalIncome }}</span></span>
                    </div>
				</div>
			</div>
		</div>
        <hr/>
        <div class="mui-card" v-for="(item, i) in startcarNum" :key="i">
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
                    <div class="content">
                        <span>车牌号：{{ item.carId }}</span>
                        <span>共停时间：<span class="text-color">{{ item.inAllTime }}</span></span>
                    </div>
                    <div class="content">
                        <span>进场时间：{{ item.stopTime }}</span>
                        <span>费用：<span class="text-color">￥{{ item.stopCost }}</span></span>
                    </div>
				</div>
			</div>
		</div>
    </div>
</div> 
</template>

<script>
export default {
  data() {
    return {
      placeholders: '2019-11-12',
      startcarcount: [],
      startcarNum: [],
      dateVelue: 'day',
      dateText: '',
      dateFormat: '',
      generalIncome: 0
    }
  }, 
  created() {
    for(let i=0; i<30; i++){
        let startcarList = {
            "id": i+1,
            "carId": "DD123"+i,
            "stopTime": "2020-01-"+(i+1)+" 11:22:11",
            "inAllTime": "1:12",
            "stopCost": i+16
        }
        this.startcarcount.push(startcarList)
    }
  },
  mounted(){
    this.startCarCount()
  },
  watch: {
      //监听select中的变化
    'dateVelue': function (newVal, oldVal){
        this.startcarNum = []
        let num = 0
        if(newVal == 'day') {
            this.startCarCount()
        }else if(newVal == 'month'){
            let months = this.getDate('month')
            this.dateText = '月份'
            this.dateFormat = months
            
            this.startcarcount.filter(item => {
                if(item.stopTime.slice(0, months.length) == months){
                    this.startcarNum.push(item)
                    num += item.stopCost
                }   
            })
            this.generalIncome = num
        }else if(newVal == 'year'){
            let years = this.getDate('year')
            this.dateText = '年份'
            this.dateFormat = years
            this.startcarcount.filter(item => {
                if(item.stopTime.slice(0, 4) == years){
                    this.startcarNum.push(item)
                    num += item.stopCost
                }   
            })
            this.generalIncome = num
        }
    }
  },
  methods: {
      //获取系统时间-年月日
    getDate(date) {
        let dt = new Date()
        let y = dt.getFullYear() 
        let m = dt.getMonth() + 1 < 10 ? '0'+(dt.getMonth() + 1) : dt.getMonth() + 1
        let d = dt.getDate() < 10 ? '0'+dt.getDate() : dt.getDate()
        // return y + '-' + m + '-' + d 
        if(date == 'day'){
            return y + '-' + m + '-' + d
        }else if(date == 'month'){
            return y + '-' + m
        }else if(date == 'year'){
            return y
        }
    },
    startCarCount() {
        let days = this.getDate('day')
        //console.log(days)
        this.dateText = '日期'
        this.dateFormat = days
        let num = 0
        this.startcarcount.filter(item => {
            if(item.stopTime.slice(0,days.length) == days){
                this.startcarNum.push(item)
                num += item.stopCost
            }
        })
        this.generalIncome = num
    },
  }

}
</script>

<style lang="less" scoped>
.startcarCount-container{
    .text-color{
        color: red
    };
    padding: 1px 10px;
    margin-top: -1px;
    .startcarCount-select{
        position: fixed;
        margin-left: 9px;
        background-color: #EFEFF4;
        height: 63px;
        width: 91%;
        z-index: 1;
        .startcarCount-select-main{
            margin-top: 10px;
            width: 100%;
            .select-icon{
                position: absolute;
                right: 20px;
                top: 20px;
            }
            .startcarCount-select-date{
                font-size: 18px;
                color: #000000;
                background-color: red;
                width: 100%;
                height: 39px;
                margin-right: 10px; 
            };
        }
    };
    .startcarcount-main{ 
        margin-top: 70px;
        .mui-card{
            .mui-card-content{
                .mui-card-content-inner{
                    padding: 10px;
                    .content{
                        display: flex;
                        justify-content: space-between;
                        font-size: 16px;
                        padding: 5px;
                    }
                }
            }
        }
    };
}


</style>