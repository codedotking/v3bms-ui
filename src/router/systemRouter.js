import config from "@/config"

//系统路由
const routes = [
	{
		name: "sysLayout",
		path: "/",
		component: () => import('@/layout/index.vue'),
		redirect: config.DASHBOARD_URL || '/dashboard',
		children: []
	},
	{
		path: "/login",
		component: () => import('@/views/login/index.vue'),
		meta: {
			title: "登录"
		}
	},
	{
		path: "/user_register",
		component: () => import('@/views/login/userRegister.vue'),
		meta: {
			title: "注册"
		}
	},
	{
		path: "/reset_password",
		component: () => import('@/views/login/resetPassword'),
		meta: {
			title: "重置密码"
		}
	}
]

export default routes;
