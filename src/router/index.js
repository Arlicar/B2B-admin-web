import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import CommodityList from '../components/commodity/CommodityList.vue'
import CommodityExam from '../components/commodity/Exam.vue'
import Transaction from '../components/order/Transaction.vue'
import Inquiry from '../components/order/Inquiry.vue'
import Bidding from '../components/order/Bidding.vue'
import AfterSaleList from '../components/order/AfterSaleList.vue'
import Template from '../components/contract/Template.vue'
import Sale from '../components/Statistics/Sale.vue'
import Visit from '../components/Statistics/Visit.vue'
import StoreAudit from '../components/StoreManagement/StoreAudit.vue'
import Person from '../components/users/Person.vue'
import Enterprise from '../components/users/Enterprise.vue'
import Users from '../components/users/Users.vue'
import UserRouter from '../components/users/UserRouter.vue'
import UserApi from '../components/users/UserApi.vue'
import Kind from '../components/commodity/Kind.vue'
import Administrator from '../components/SystemManagement/Administrator.vue'
Vue.use(VueRouter)

const routes = [
	{path:'/',redirect:'/login'},
  {path:'/login',component:Login},
  {path:'/Home',component:Home,redirect:'/Welcome',
    children:[
    {path:'/Welcome',component:Welcome},
    {path:'/CommodityList',component:CommodityList},
    {path:'/CommodityExam',component:CommodityExam},
    {path:'/Transaction',component:Transaction},
    {path: '/Inquiry',component: Inquiry},
    {path:'/Bidding',component:Bidding},
    {path:'/AfterSaleList',component:AfterSaleList},
    {path:'/Template',component:Template},
    {path:'/Sale',component:Sale},
    {path:'/Visit',component:Visit},
    {path:'/StoreAudit',component:StoreAudit},
    {path:'/Person',component:Person},
    {path:'/Enterprise',component:Enterprise},
    {path:'/Users',component:Users},
    {path:'/Kind',component:Kind},
    {path:'/UserRouter',component:UserRouter},
    {path:'/UserApi',component:UserApi},
    {path:'/Administrator',component:Administrator}
    ]}
]

const router = new VueRouter({
  routes
})

export default router
