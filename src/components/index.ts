//这是一个钩子函数，用于注册全局组件
import SvgIcon from "@/components/SvgIcon.vue";
import type { App, Component } from "vue";
import Logo from "@/components/Logo.vue";
import NavMenu from "@/components/NavMenu.vue";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import MainContianer from "@/components/MainContianer.vue";
const components: { [name: string]: Component } = {
  SvgIcon,
  Logo,
  NavMenu,
  MainContianer,
};
export default {
  install(app: App) {
    Object.keys(components).forEach((key: string) => {
      app.component(key, components[key]);
    });
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component);
    }
  },
};
