import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../components/MyLogin.vue'
import Home from '../components/MyHome.vue'

import Users from '../components/menus/MyUsers.vue'
import Settings from '../components/menus/MySettings.vue'
import Rights from '../components/menus/MyRights.vue'
import Orders from '../components/menus/MyOrders.vue'
import Goods from '../components/menus/MyGoods.vue'
import UserDetail from '../components/user/MyUserDetail.vue'

Vue.use(VueRouter)

const router = new VueRouter({
	routes:[
		//重定向 访问/也是登陆页面
		{path:'/',redirect:'/login'},
		{path:'/login',component:Login},
		{path:'/home',component:Home,redirect:'/home/users',children:[
			{path:'users',component:Users},
			{path:'settings',component:Settings},
			{path:'rights',component:Rights},
			{path:'orders',component:Orders},
			{path:'goods',component:Goods},
			//用户详情路由
			{path:'userinfo/:id',component:UserDetail,props:true}
		]}
	],
	
})

router.beforeEach(function(to,from,next){
	if(to.path === '/home'){
		const token = localStorage.getItem('token')
		if(token){
			next()
		}else{
			next('/login')
		}
	}else{
		next()
	}
})


export default router