import modules from './modules'
import Vue from 'vue'
import Router from 'uni-simple-router'
import LOGIN from '@/api/index.js'

Vue.use(Router)
//初始化
const router = new Router({
	routes: [...modules] //路由表
});

//全局路由前置守卫
router.beforeEach((to, from, next) => {
	console.log('去往的页面'+to.path)
	// tabbar页面
	if(to.isTab) return  next()
	// 登录页面
	if(to.path==LOGIN) return next()
	const token=uni.getStorage('sess_jk')
	// 判断是否有token
	token?next():next(LOGIN)
})

export default router;
