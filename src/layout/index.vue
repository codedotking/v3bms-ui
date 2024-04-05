<template>
	<!-- 通栏布局 -->
	<template v-if="layout == 'header'">
		<header class="adminui-header">
			<div class="adminui-header-left">
				<div class="logo-bar">
					<img class="logo" src="/img/logo.png">
					<span>{{ $CONFIG.APP_NAME }}</span>
				</div>
				<ul v-if="!ismobile" class="nav">
					<li v-for="item in menu" :key="item" :class="pmenu.path == item.path ? 'active' : ''"
						@click="showMenu(item)">
						<el-icon>
							<component :is="item.meta.icon || 'el-icon-menu'" />
						</el-icon>
						<span>{{ item.meta.title }}</span>
					</li>
				</ul>
			</div>
			<div class="adminui-header-right">
				<userbar></userbar>
			</div>
		</header>
		<section class="aminui-wrapper">
			<div v-if="!ismobile && nextMenu.length > 0 || !pmenu.component"
				:class="menuIsCollapse ? 'aminui-side isCollapse' : 'aminui-side'">
				<div v-if="!menuIsCollapse" class="adminui-side-top">
					<h2>{{ pmenu.meta.title }}</h2>
				</div>
				<div class="adminui-side-scroll">
					<el-scrollbar>
						<el-menu :default-active="active" router :collapse="menuIsCollapse"
							:unique-opened="$CONFIG.MENU_UNIQUE_OPENED">
							<NavMenu :navMenus="nextMenu"></NavMenu>
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

	<!-- 经典布局 -->
	<classicsLayout v-else-if="layout == 'menu'" />

	<!-- 功能坞布局 -->
	<template v-else-if="layout == 'dock'">
		<header class="adminui-header">
			<div class="adminui-header-left">
				<div class="logo-bar">
					<img class="logo" src="/img/logo.png">
					<span>{{ $CONFIG.APP_NAME }}</span>
				</div>
			</div>
			<div class="adminui-header-right">
				<div v-if="!ismobile" class="adminui-header-menu">
					<el-menu mode="horizontal" :default-active="active" router background-color="#222b45"
						text-color="#fff" active-text-color="var(--el-color-primary)">
						<NavMenu :navMenus="menu"></NavMenu>
					</el-menu>
				</div>
				<Side-m v-if="ismobile"></Side-m>
				<userbar></userbar>
			</div>
		</header>
		<section class="aminui-wrapper">
			<div class="aminui-body el-container">
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

	<!-- 默认布局 -->
	<defaultLayout v-else />

	<div class="main-maximize-exit" @click="exitMaximize"><el-icon><el-icon-close /></el-icon></div>

	<div class="layout-setting" @click="openSetting"><el-icon><el-icon-brush-filled /></el-icon></div>

	<el-drawer title="布局实时演示" v-model="settingDialog" :size="400" append-to-body destroy-on-close>
		<setting></setting>
	</el-drawer>

	<auto-exit></auto-exit>
</template>

<script setup>
import defaultLayout from "./components/defaultLayout.vue"
import classicsLayout from "./components/classicsLayout.vue"
import SideM from './components/sideM.vue';
import Topbar from './components/topbar.vue';
import Tags from './components/tags.vue';
import NavMenu from './components/NavMenu.vue';
import userbar from './components/userbar.vue';
import setting from './components/setting.vue';
import iframeView from './components/iframeView.vue';
import autoExit from './other/autoExit.js';
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

const showMenu = (r) => {
	pmenu.value = r;
	nextMenu.value = filterUrl(r.children);
	if ((!r.children || r.children.length == 0) && r.component) {
		router.push({ path: r.path })
	}
}


const settingDialog = ref(false)
const openSetting = () => {
	settingDialog.value = true;
}

const exitMaximize = () => {
	document.getElementById('app').classList.remove('main-maximize')
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
