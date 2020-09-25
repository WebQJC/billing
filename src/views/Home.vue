<template>
  <div class="home">
    <div class="main">
      <div class="main-container">
        <ul>
          <li @click="billing()">
            <div class="img">
              <img :src="imgBilling" />
            </div>
            <div class="text">快速开单</div>
          </li>
          <li @click="add()">
            <div class="img">
              <img :src="imgAdd" />
            </div>
            <div class="text">新增商品</div>
          </li>
        </ul>
      </div>
      <div class="main-container">
        <ul>
          <li @click="bill()">
            <div class="img">
              <img :src="imgBill" />
            </div>
            <div class="text">单据查询</div>
          </li>
          <li @click="setup()">
            <div class="img">
              <img :src="imgSetup" />
            </div>
            <div class="text">设置</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: "Home",
  data() {
    return {
      imgBilling: require("../assets/billing.png"),
      imgBill: require("../assets/bill.png"),
      imgSetup: require("../assets/setup.png"),
      imgAdd: require("../assets/add.png")
    };
  },
  methods: {
    billing() {
      console.log("billing");
      this.$router.push({ name: "billing", params: { title: "快速开单" } });
    },
    add() {
      this.$router.push({ name: "add", params: { title: "增加商品" } });
    },
    bill() {
      this.$router.push({ name: "bill", params: { title: "查询单据" } });
    },
    setup() {
      this.$router.push({ name: "setup", params: { title: "设置" } });
    }
  },
  components: {
    //  HelloWorld
  }
};
</script>
<style scoped>
ul {
  list-style-type: none;
}
.home {
  margin-top: -50px;
  display: flex;
  justify-content: center;
}
.main {
  height: 362px;
  width: 100%;
}
.main-container {
  width: 100%;
  height: 180px;
  /* border: solid 1px black; */
}

.main-container > ul {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.main-container > ul > li {
  width: 80px;
}
.main-container > ul > li > div.img {
  width: 80px;
  height: 80px;
  /* border: 1px solid yellow; */
}
.main-container > ul > li > div.img > img {
  width: 100%;
  height: 100%;
}
.main-container > ul > li > div.text {
  width: 100%;
  /* border: 1px solid red; */
  margin-top: 4px;
  text-align: center;
  color: #3167a9;
  font-weight: 600;
}
</style>
