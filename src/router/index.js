import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Sales from '../views/Sales.vue'
import Dashboard from '../views/Dashboard.vue'
import Register from '../views/Register.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  {path:'/sales',name:'sales',component:Sales},
  // {path:'/login',name:'login',component:Login},
  {path:'/register',name:'register',component:Register},
  {path:'/dashboard',name:'dashboard',component:Dashboard},

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
