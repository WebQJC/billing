<template>
  <div id="app">
    <!-- <div class="header">
      <div class="header-top" @click="goBack()">
        <div v-show="flag">
          <i class="el-icon-arrow-left"></i>
          <span class="fan">返回</span>
        </div>
      </div>
      <div class="header-main">
        <div>{{ title }}</div>
      </div>
      <div class="header-foot">
        <i class="el-icon-more"></i>
      </div>
    </div>-->
    <van-nav-bar :title="title" left-arrow @click-left="goBack" fixed class="top">
      <template #right>
        <van-icon name="weapp-nav" size="18" color="#000"/>
      </template>
      <template #left>
        <van-icon name="arrow-left" size="18" color="#000"/> 返回
      </template>
    </van-nav-bar>
    <div class="main">
      <transition>
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      flag: false,
      title: this.$route.params.title
    };
  },
  created() {
    //初始化
    this.flag = this.$route.path === "/Home" ? false : true; //---在首页时，没有返回
    this.title = "主页";
  },
  components: {
    // HelloWorld
  },
  methods: {
    goBack() {
      console.log("go back");
      if(this.flag === false){
        console.log('已经是首页');
      }else{
        this.$router.go(-1);
      }
      
    }
  },
  watch: {
    "$route.path": function(newVal) {
      if (newVal === "/Home") {
        this.flag = false;
        this.title = "主页";
      } else {
        this.title = this.$route.params.title;
        this.flag = true;
      }
    }
  }
};
</script>

<style>
* {
  margin: 0px;
  padding: 0px;
}
ul {
  list-style: none;
}
.app{
  background-color: #f2f2f2;
}
.v-enter {
  opacity: 0;
  transform: translateX(100%);
  position: absolute;
}
.v-leave-to {
  opacity: 0;
  transform: translateX(-100%);
  position: absolute;
}
.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}
.container {
  display: flex;
  flex-direction: column;
}
.header {
  background-color: #26a2ff;
  width: 100%;
  height: 50px;
  position: fixed;
  top: 0px;
  display: flex;
  align-items: center;
}
.header-top {
  width: 85px;
  height: 30px;
  /* background-color: red; */
  line-height: 32px;
  padding-left: 10px;
  font-size: 14px;
}
.header-top > span {
  font-size: 15px;
}
.header-main {
  width: 100%;
  height: 40px;
  /* background-color: yellow; */
  display: flex;
  justify-content: center;
  align-items: center;
}
.header-main > div {
  margin-right: 45px;
  font-weight: bold;
  font-size: larger;
  color: #ffffff;
}
.header-foot {
  width: 40px;
  height: 30px;
  line-height: 32px;
  padding-right: 10px;
  /* background-color: red; */
}
.top{
  background-color:#26a2ff;
}
.main {
  width: 100%;
  margin-top: 40px;
  padding-bottom: 50px;
  overflow-x: hidden;
}
</style>
   