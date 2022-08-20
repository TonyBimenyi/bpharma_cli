import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Sales from '../views/Sales.vue'
import Dashboard from '../views/Dashboard.vue'
import Register from '../views/Register.vue'
import Ventes from '../views/Ventes.vue'
import Categories from '../views/Categories.vue'
import Medicaments from '../views/Medicaments.vue'
import Stock from '../views/Stock.vue'
import Requisition from '../views/Requisition.vue'
import Test from '../components/LionnelTest.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  {path:'/sales',name:'sales',component:Sales},
  // {path:'/login',name:'login',component:Login},
  {path:'/register',name:'register',component:Register},
  {path:'/dashboard',name:'dashboard',component:Dashboard},
  {path:'/ventes',name:'ventes',component:Ventes},
  {path:'/categories',name:'categories',component:Categories},
  {path:'/medicaments',name:'medicaments',component:Medicaments},
  {path:'/stock',name:'stock',component:Stock},
  {path:'/requisition',name:'requisition',component:Requisition},
  {path:'/test',name:'test',component:Test}

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
