import router from "./router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
NProgress.configure({ showSpinner: false });
console.log("permission.ts");
import { useUserStore } from "./store/useUserStore";
import pinia from "./store";
const userStore = useUserStore(pinia);
router.beforeEach(async (to, from, next) => {
  NProgress.start();
  const token = userStore.token;
  const username = userStore.username;
  //用户登录判断
  if (token) {
    //登录成功,访问login,不能访问,指向首页
    console.log("token:", token);
    console.log("username:", username);
    if (to.path == "/login") {
      next({ path: "/" });
    } else {
      //登录成功访问其余六个路由(登录排除)
      //有用户信息
      if (username) {
        //放行
        next();
      } else {
        //如果没有用户信息,在守卫这里发请求获取到了用户信息再放行
        try {
          //获取用户信息
          await userStore.getUserInfo();
          //放行
          //万一:刷新的时候是异步路由,有可能获取到用户信息、异步路由还没有加载完毕,出现空白的效果
          next({ ...to });
        } catch (error) {
          //token过期:获取不到用户信息了
          //用户手动修改本地存储token
          //退出登录->用户相关的数据清空
          await userStore.logout();
          next({ path: "/login", query: { redirect: to.path } });
        }
      }
    }
  } else {
    //用户未登录判断
    if (to.path == "/login") {
      next();
    } else {
      next({ path: "/login", query: { redirect: to.path } });
    }
  }
});
router.afterEach(() => {
  NProgress.done();
});
