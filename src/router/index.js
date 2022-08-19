import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login'),
  },
  {
    path:'/chatPage',
    name:'chatPage',
    component:()=>import('@/views/chatPage')
  },
  {
    path:'/privacy',
    name:'privacy',
    component:()=>import('@/views/privacy')
  },
]


// 防止连续点击多次路由报错
let routerPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(err => err)
}

const router = new Router({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  routes
})
export default router