import Vue from 'vue'
import VueRouter from "vue-router"

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const Login = () => import("views/login/Login")
const Home = () => import("views/home/Home")
const Roles =() => import("views/roles/Roles")
const Users =() => import("views/users/Users")
const Rights =() => import("views/rights/Rights")

const routes = [


  {
    path:'/login',
    component:Login,
  },
  {
    path:'/home',
    component:Home,
    redirect:'/users',
    children:[
      {
        path:'/users',
        component:Users,
      },
      {
        path:'/rights',
        component:Rights,
      },
      {
        path:'/roles',
        component:Roles,
      }
    ]
  },
  {
    path:'/',
    redirect:'/login'
  }
]

const router = new VueRouter({
  mode:'history',
  routes
})

router.beforeEach((to, from, next) => {

  const token = sessionStorage.getItem("token")
  if (to.path !== "/login"){
    if (token){
      next()
    }else{
      next("/login")
    }
  }
  next()
})



export default router
