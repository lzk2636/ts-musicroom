import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
     component: () => import('@/views/Login/index.vue')
  },{
    path:"/home",
    component:()=>import('@/views/Layout/index.vue'),
    children:[
      {
        path:"/home",
        component:()=>import('@/views/home/index.vue')
      }, {
        path:"/course",
        component:()=>import('@/views/course/index.vue')
      },
      {
        path:"/my",
        component:()=>import('@/views/my/index.vue')
      },
      {
        path:"/study",
        component:()=>import('@/views/study/index.vue')
      }
    ]
  },
  {
    path:"/PhoneLogin",
    component:()=>import('@/views/PhoneLogin')
  },
  {
    path:"/course-detail/:id",
    component:()=>import('@/views/course-detail')
  },
  {
    path:"/search",
    component:()=>import('@/views/search')
  },
  {
    path:"/play/:id",
    component:()=>import('@/views/play')
  },
  {
    path:"/pay/:id/:price/:title",
    name:"pay",
    component:()=>import('@/views/pay')
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
const list=['/',"/PhoneLogin"]
router.beforeEach((to, from, next) => {
  // ...
  // console.log(to)
  if(list.includes(to.path)){
    next()
  }else{
    const token =localStorage.getItem('my_token')
    if(token){
      store.commit('saveToken', token)
      next()
    }else{
      next("/")
    }
  }

})

export default router
