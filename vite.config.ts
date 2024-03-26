import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import { viteMockServe } from "vite-plugin-mock";
import vueSetupExtend from "vite-plugin-vue-setup-extend";
// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  console.log("command ====== ", command);
  return {
    plugins: [
      vue(),
      vueSetupExtend(),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
        symbolId: "icon-[dir]-[name]",
      }),
      viteMockServe({
        mockPath: "./src/mocks", // mock 文件目录
        // localEnabled: command === "serve", // 开启本地 mock 功能
        localEnabled: command === 'serve',//保证开发阶段可以使用mock接口
        // prodEnabled: true, // 生产环境下关闭 mock 功能
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve("./src"), // 相对路径别名配置，使用 @ 代替 src
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/styles/variable.scss";',
        },
      },
    },
  };
});
