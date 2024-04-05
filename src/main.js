import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/display.css'
import HUALA from './global'
import i18n from './locales'
import router from './router'
import store from './store'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
import App from './App.vue'
const app = createApp(App);
const pinia = createPinia()
pinia.use(createPersistedState({ auto: true, }))


app.use(pinia)
app.use(store);
app.use(router);
app.use(ElementPlus);
app.use(i18n);
app.use(HUALA);

//挂载app
app.mount('#app');
