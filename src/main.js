import { createApp } from 'vue';
import App from './App.vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
// import router from './router';
// 获取electron
// const electron = window.require('electron');
const app = createApp(App);
// 挂载electron
// app.provide('electron-set', electron);
// app.use(router);
app.use(ElementPlus);
app.mount('#app');
