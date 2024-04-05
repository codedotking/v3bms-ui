import { importAll } from '@/utils/modules'

// 使用 importAll 函数动态导入模块
const modules = await importAll(import.meta.glob('./modules/*.js', { eager: true }))


export default modules
