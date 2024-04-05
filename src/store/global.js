import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import config from "@/config";

export const useGlobalStore = defineStore('APP_INFO', () => {
    const ismobile = ref(0)
    const layout = ref(config.LAYOUT) 	//布局
    const menuIsCollapse = ref(config.MENU_IS_COLLAPSE) 	//菜单是否折叠 toggle
    const layoutTags = ref(config.LAYOUT_TAGS) 	//多标签栏
    const theme = ref(config.THEME) // 主题
    const dark = ref(config.DARK) // 暗黑模式
    const lang = ref(config.LANG) // 暗黑模式


    watch(dark, ()=>{
        if (dark.value) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    })


    return {
        ismobile,
        layout,
        menuIsCollapse,
        layoutTags,
        theme,
        dark,
        lang
    }
})