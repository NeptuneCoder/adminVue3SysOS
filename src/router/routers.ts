//常量路由
export const constantRoute = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      title: "登录",
      hidden: true,
      icon: "HomeFilled",
    },
  },
  {
    path: "/",
    name: "layout",
    component: () => import("@/views/layout/index.vue"),
    meta: {
      title: "layout",
      icon: "HomeFilled",
      hidden: false,
    },
    redirect: "/home",//当访问根路径时，自动重定向到/home
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("@/views/home/index.vue"),
        meta: {
          title: "首页",
          icon: "HomeFilled",
          hidden: false,
        },
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
    name: "Any",
    meta: {
      icon: "HomeFilled",
      title: "404",
      hidden: true,
    },
  },
];
