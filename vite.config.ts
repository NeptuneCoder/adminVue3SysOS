import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import { viteMockServe } from "vite-plugin-mock";
import vueSetupExtend from "vite-plugin-vue-setup-extend";
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  //加载不同的环境，测试，开发，生产环境;process.cwd() 表示根目录
  let env = loadEnv(mode, process.cwd());
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
        localEnabled: command === "serve", //保证开发阶段可以使用mock接口
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
    server: {
      proxy: {
        //根据不同的api选择不同的地址服务
        [env.VITE_APP_BASE_API]: {
          target: env.VITE_BASE_API, //根据不同的api选择不同的地址服务
          changeOrigin: true, //是否跨域
          rewrite: (path) => path.replace(env.VITE_APP_BASE_API, ""), //因为实际的api地址没有'/api'前缀，所以需要重写路径将其进行替换掉
        },
      },
    },
  };
});
