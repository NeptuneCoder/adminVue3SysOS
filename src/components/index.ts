//这是一个钩子函数，用于注册全局组件
import SvgIcon from "@/components/SvgIcon.vue";
import type { App, Component } from "vue";
import Logo from "@/components/Logo.vue";
import NavMenu from "@/components/NavMenu.vue";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import MainContianer from "@/components/MainContianer.vue";
import Tabbar from "@/components/Tabbar.vue";
import NavBreadcrumb from "@/components/NavBreadcrumb.vue";
import Settings from "@/components/Settings.vue";
import Categroy from "@/components/Categroy.vue";
const components: { [name: string]: Component } = {
  SvgIcon,
  Logo,
  NavMenu,
  MainContianer,
  Tabbar,
  NavBreadcrumb,
  Settings,
  Categroy,
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
