/**
 * @description 自动import导入所有 vuex 模块
 */
import { createStore } from 'vuex';
import { importAll } from '@/utils/modules'

// 使用 importAll 函数动态导入模块
const modules = await importAll(import.meta.glob('./modules/*.js',{ eager: true }))

console.log(modules);
export default createStore({
	modules
});


import { defineStore } from 'pinia'
//定义容器
//参数1:容器的id,必须唯一,将来pinia会把所有的容器挂载到根容器
//参数2:选项对象
export const useMainStore = defineStore('main', {
    /* 
    *类似组件的data,用来存储全局状态
    *1.必须是函数:这是为了在服务端渲染的时候避免交叉请求导致的数据污染
    *2.必须是箭头函数,这是为了更好的TS类型推导
    */
    state: () => {
        return {
            count: 100
        }
    },
    /* 类似组件的computed,用来封装计算属性,有缓存的功能 */
    getters: {},
    /* 类似组件的methods,封装业务逻辑,修改state */
    actions: {}
})
