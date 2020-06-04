
import Vue from 'vue'
import VueRouter from "vue-router"
Vue.use(VueRouter)
import login from '@/components/login'
import home from '@/components/home'
import welcome from '@/components/welcome'
let router= new VueRouter({
    routes:[{
        path:"/login",
        component:login
    },
    {
        path:'/home',
        component:home,
        redirect:'/welcome',
        children:[
            {
                path:'/welcome',
                component:welcome
            },
           
        ]

    },
    {
        path:"/",
        redirect:"/login"
    }]
  
})
router.beforeEach((to,from,next)=>{
    if(to.path=='/login') return next()
  console.log(to,from,next);
  const tokenStr=window.sessionStorage.getItem('token')
  if(!tokenStr) return next('/login')
  next()
})
export default router