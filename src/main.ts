import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import App from "@/App.vue";
//@ts-ignore
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import "virtual:svg-icons-register";
import gloablComponent from "@/components/index";
import "@/styles/index.scss";
import router from "@/router";
import pinia from "@/store";

const app = createApp(App);
app.use(ElementPlus, {
  locale: zhCn,
});
app.use(gloablComponent);
app.use(router);
app.use(pinia);
app.mount("#app");
