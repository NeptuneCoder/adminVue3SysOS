import router from "./router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
console.log("permission.ts");
router.beforeEach((to, from, next) => {
    NProgress.start();
  const token = localStorage.getItem("token");
console.log("beforeEach topermission.ts token:", token);
  if (to.path === "/login") {
    next();
  } else if (token) {
    next();
  } else {
    next("/login");
  }
});
router.afterEach(() => {
    NProgress.done();
  const token = localStorage.getItem("token");
  console.log("afterEach topermission.ts token:", token);
  if (token) {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user.roles.includes("admin")) {
      router.addRoute({
        path: "*",
        redirect: "/404",
        hidden: true,
      });
    } else {
      router.addRoute({
        path: "*",
        redirect: "/403",
        hidden: true,
      });
    }
  }
});