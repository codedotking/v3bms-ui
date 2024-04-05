<template>
    <!-- 经典布局 -->
    <header class="adminui-header">
        <div class="adminui-header-left">
            <div class="logo-bar">
                <img class="logo" src="/img/logo.png">
                <span>{{ $CONFIG.APP_NAME }}</span>
            </div>
        </div>
        <div class="adminui-header-right">
            <userbar></userbar>
        </div>
    </header>
    <section class="aminui-wrapper">
        <div v-if="!ismobile" :class="menuIsCollapse ? 'aminui-side isCollapse' : 'aminui-side'">
            <div class="adminui-side-scroll">
                <el-scrollbar>
                    <el-menu :default-active="active" router :collapse="menuIsCollapse"
                        :unique-opened="$CONFIG.MENU_UNIQUE_OPENED">
                        <NavMenu :navMenus="menu"></NavMenu>
                    </el-menu>
                </el-scrollbar>
            </div>
            <div class="adminui-side-bottom" @click="store.commit('TOGGLE_menuIsCollapse')">
                <el-icon><el-icon-expand v-if="menuIsCollapse" /><el-icon-fold v-else /></el-icon>
            </div>
        </div>
        <Side-m v-if="ismobile"></Side-m>
        <div class="aminui-body el-container">
            <Topbar v-if="!ismobile"></Topbar>
            <Tags v-if="!ismobile && layoutTags"></Tags>
            <div class="adminui-main" id="adminui-main">
                <router-view v-slot="{ Component }">
                    <keep-alive :include="store.state.keepAlive.keepLiveRoute">
                        <component :is="Component" :key="route.fullPath" v-if="store.state.keepAlive.routeShow" />
                    </keep-alive>
                </router-view>
                <iframe-view></iframe-view>
            </div>
        </div>
    </section>
</template>

<script setup>
import SideM from './sideM.vue';
import Topbar from './topbar.vue';
import Tags from './tags.vue';
import NavMenu from './NavMenu.vue';
import userbar from './userbar.vue';
import iframeView from './iframeView.vue';
import { useRouter, useRoute } from 'vue-router'
import { computed, nextTick, onMounted, ref, watch } from 'vue';

import { useStore } from 'vuex';


import { useGlobalStore } from "@/store/global.js"


const route = useRoute();
const router = useRouter();

const globalStore = useGlobalStore();

watch(route.fullPath, () => {
    showThis();
})

const pmenu = ref({
    path: '',
    children: [],
    meta: {
        title: ''
    }
});
const nextMenu = ref([]);
const active = ref('');


//路由监听高亮
const showThis = () => {
    const route = useRoute();

    console.log(route);
    pmenu.value = route.meta.breadcrumb ? route.meta.breadcrumb[0] : {};
    nextMenu.value = filterUrl(pmenu.value.children);
    nextTick(() => {
        active.value = route.meta.active || route.fullPath;
    })
}



const filterUrl = (map) => {
    const newMap = [];
    map && map.forEach(item => {
        item.meta = item.meta ? item.meta : {};
        //处理隐藏
        if (item.meta.hidden || item.meta.type == "button") {
            return false
        }
        //处理http
        if (item.meta.type == 'iframe') {
            item.path = `/i/${item.name}`;
        }
        //递归循环
        if (item.children && item.children.length > 0) {
            item.children = filterUrl(item.children)
        }
        newMap.push(item)
    })
    return newMap;
}


const onLayoutResize = () => {
    store.commit("SET_ismobile", document.body.clientWidth < 992)
}


const store = useStore();
const ismobile = computed(() => {
    return globalStore.ismobile
})


const layout = computed(() => {
    return globalStore.layout
})

const layoutTags = computed(() => {
    return globalStore.layoutTags;
})


const menuIsCollapse = computed(() => {
    return globalStore.menuIsCollapse
})


watch(layout, (val) => {
    document.body.setAttribute('data-layout', val);
}, { immediate: true });

const menu = ref([]);

onMounted(() => {
    onLayoutResize();
    window.addEventListener('resize', onLayoutResize);
    const menus = router.sc_getMenu();
    menu.value = filterUrl(menus);

    console.log(menu);
    showThis()
})


</script>
