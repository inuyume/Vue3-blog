/* jshint esversion: 6 */
import { createApp } from 'vue';
import './style.css';
import App from './App.vue';

import router from "./router";

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'; //导入 ElementPlus 组件库中的所有图标



const app=createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {//注册 ElementPlus 组件库中的所有图标到全局 Vue 应用中
     app.component(key, component);
 }
app.use(router,ElementPlus);
app.mount('#app');
