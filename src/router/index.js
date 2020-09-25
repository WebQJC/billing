import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Billing from '../views/Billing.vue'
import Bill from '../views/Bill.vue'
import Setup from '../views/Setup.vue'
import Add from '../views/Add.vue'
import AddGoods from '@/views/children/addGoods.vue'
import AddBilling from '@/views/children/addBilling.vue'
import BillingOk from '@/views/children/billingOk.vue'
Vue.use(VueRouter)

const routes = [
  
  { path: '/', redirect: '/Home' }, // 这里的 redirect 和 Node 中的 redirect 完全是两码 事 
  {  //首页
    path: '/Home',
    name: 'home',
    component: Home
  },
  {  //快速开单
    path: '/Billing/:title',
    name: 'billing',
    component: Billing
  },
  { //单据查询
    path: '/Bill/:title',
    name: 'bill',
    component: Bill
  },
  { // 设置
    path: '/Setup/:title',
    name: 'setup',
    component: Setup
  },
  {  //增加商品
    path: '/Add/:title',
    name: 'add',
    component: Add
  },
  { //添加商品
    path: '/Add/:title/addGoods/:title', 
    name: 'addGoods', 
    component: AddGoods 
  },
  { //添加开单信息
    path: '/Billing/:title/addBilling/:title', 
    name: 'addBilling', 
    component: AddBilling 
  },
  { //确定开单信息
    path: '/Billing/:title/billingok/:title', 
    name: 'billingOk', 
    component: BillingOk 
  },
]

const router = new VueRouter({
  //mode: 'history',
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
