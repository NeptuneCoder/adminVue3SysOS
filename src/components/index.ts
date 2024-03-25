//这是一个钩子函数，用于注册全局组件
import SvgIcon from "@/components/SvgIcon.vue";
import type { App, Component } from "vue";
import Logo from "@/components/Logo.vue";
import Menu from "@/components/Menu.vue";
const components: { [name: string]: Component } = { SvgIcon, Logo, Menu };
export default {
  install(app: App) {
    Object.keys(components).forEach((key: string) => {
      app.component(key, components[key]);
    });
  },
};
