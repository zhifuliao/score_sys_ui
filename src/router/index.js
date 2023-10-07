import {createRouter, createWebHistory} from 'vue-router'
 
// 引入组件（方式一）
import SysLoginVue from '@/components/SysLogin.vue' 
 
// 配置路由
const routes = [
  {
	// 路径，/ 表示首页
    path: '/',
    // 使用组件（方式一）
    component: SysLoginVue
  },
  {
	// 路径
    path: '/main_page/:account_val',
    // 引入并使用组件（方式二）
    // 跳转到这个页面的时候，再去加载这个文件
    component: () => import('@/components/SysMainPage.vue')
  }
]
 
// 导出路由器
export default createRouter({
    history: createWebHistory(),
    routes
  })