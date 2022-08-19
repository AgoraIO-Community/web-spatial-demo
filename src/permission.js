
import router from './router';
const whiteList = ['/login','/privacy'];
router.beforeEach((to, from, next) => {
  let token = window.sessionStorage.getItem('token');
  if (token == 'sssss') {
    /* has token*/
    if (to.path === '/') {
      next({ path: '/login' })
    } else {
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next()
    }else {
      next(`/login`) // 否则全部重定向到登录页
    }
  }
})
