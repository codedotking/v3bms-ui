import {markRaw} from 'vue';
import { importAll } from '@/utils/modules'

// 使用 importAll 函数动态导入模块
const modules = await importAll(import.meta.glob('./*.vue', { eager: true }))

export default markRaw(modules)
