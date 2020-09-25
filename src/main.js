// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {store as localStore} from "./util";
import Axios from "axios"
//将axios挂载到原型上
Vue.prototype.$axios = Axios;
//axios.defaults.baseURL="/api";

import { Button, NavBar, Icon,Toast,Card,List,Cell, CellGroup,PullRefresh,Popup,Field,
  AddressEdit,Col,Row,SwipeCell,Empty,DropdownMenu,DropdownItem, ActionSheet } from 'vant';
Vue.use(Button);
Vue.use(NavBar);
Vue.use(Icon);
Vue.use(Toast);
Vue.use(Card);
Vue.use(List);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(PullRefresh);
Vue.use(Popup);
Vue.use(Field);
Vue.use(AddressEdit);
Vue.use(Col);
Vue.use(Row);
Vue.use(SwipeCell);
Vue.use(Empty);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(ActionSheet);
// //导入mint-ui模块
// import { Progress,Header, Button, Popup, Search, Actionsheet, Cell, Field, InfiniteScroll, Loadmore, Picker, DatetimePicker, Tabbar, TabItem } from 'mint-ui';
// Vue.component(Button.name, Button);
// Vue.component(Header.name, Header);
// Vue.component(Popup.name, Popup);
// Vue.component(Progress.name, Progress);
// Vue.component(Search.name, Search);
// Vue.component(Actionsheet.name, Actionsheet);
// Vue.component(Cell.name, Cell);
// Vue.component(Field.name, Field);
// Vue.component(Loadmore.name, Loadmore);
// Vue.component(Picker.name, Picker);
// Vue.component(Tabbar.name, Tabbar);
// Vue.component(TabItem.name, TabItem);

// Vue.use(InfiniteScroll)
// //导入mui
// import './lib/mui/css/mui.css'
// import './lib/mui/css/icons-extra.css'


import Vuex from 'vuex'
Vue.use(Vuex)

// 每次刚进入 网站，肯定会 调用 index.js 在刚调用的时候，先从本地存储中，把数据读出来，放到 store 中
//名称
 //let localStorageSetupName = JSON.parse(localStorage.getItem('getSetupName') || '广州微体')
// //收款码
// let localStorageSetupPay = JSON.parse(localStorage.getItem('setupPay'))
// //收费设置
// let localStorageSetupCharge = JSON.parse(localStorage.getItem('setupCharge') || '4')
// //尾联
// let localStorageSetupTail = JSON.parse(localStorage.getItem('setupTail') || '欢迎光临')

let store = new Vuex.Store({
  state: {
    companyName: '',
    qrCode: '' || localStore.session.get('qrCode'),
    price: '',
    floorName: '',
    carSettingId: '',
    carNumber: '' || localStore.session.get('carNumber'),
    carInvoteInfo: null,
    addbilling: []
  },
  
  mutations: {
    //开单信息
    setAddBilling(state, addbilling) {
      addbilling.id = state.addbilling.length;  //添加一个id值
      state.addbilling=state.addbilling.concat(addbilling)
    },

    // //名称
    // setCompanyName(state, companyName) {
    //   state.companyName = companyName
    //   // 当 更新 setupName 之后，把 setupName ，存储到 本地的 localStorage 中
    //   //localStorage.setItem('getSetupName', JSON.stringify(state.setupName))
    // },
    // //收款码
    // setQrCode(state, qrCode) {
    //   state.qrCode = qrCode;
    //   // 当 更新 setupPay 之后，把 setupPay ，存储到 本地的 localStorage 中
    //   localStore.session.set('qrCode', qrCode);
    // },
    // //收费
    // setPrice(state, price) {
    //   state.price = price
    //   // 当 更新 setupCharge 之后，把 setupCharge，存储到 本地的 localStorage 中
    //  // localStorage.setItem('setupCharge', JSON.stringify(state.setupCharge))
    // },
    // //尾联
    // setFloorName(state, floorName) {
    //   state.floorName = floorName
    //   // 当 更新 setupTail 之后，把 setupTail，存储到 本地的 localStorage 中
    //  // localStorage.setItem('setupTail', JSON.stringify(state.setupTail))
    // },
    // //主键ID
    // setCarSettingId(state, carSettingId) {
    //   state.carSettingId = carSettingId
    //   // 当 更新 setupTail 之后，把 setupTail，存储到 本地的 localStorage 中
    //   // localStorage.setItem('setupTail', JSON.stringify(state.setupTail))
    // },
    // // 车牌号
    // setCarNum(state, carNumber) {
    //   state.carNumber = carNumber;
    //   localStore.session.set('carNumber', carNumber);
    // },
    // setCarInvoteInfo(state, invoteInfo) {
    //   state.carInvoteInfo = invoteInfo;
    // }
  },
  getters: {
    //开单信息
    getAddBilling (state) {
      return state.addbilling
    },
    // //名称
    // getCompanyName (state) {
    //   return state.companyName
    // },
    // //收款码
    // getQrcode (state) {
    //   return state.qrCode;
    // },
    // // 收费
    // getPrice (state) {
    //   return state.price
    // },
    // //尾联
    // getFloorName (state) {
    //   return state.floorName
    // },
    // //主键
    // getCarSettingId (state) {
    //   return state.carSettingId
    // },
    // getCarNumber (state) {
    //   return state.carNumber;
    // },
    // getInvoteInfo (state) {
    //   return state.carInvoteInfo;
    // }
  },
  
})

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
