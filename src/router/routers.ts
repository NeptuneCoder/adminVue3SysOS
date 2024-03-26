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
      {
        path: "/test",
        name: "test",
        component: () => import("@/views/home/index.vue"),
        meta: {
          title: "测试",
          icon: "HomeFilled",
          hidden: false,
        },
      },
      {
        path: "/test2",
        name: "test2",
        component: () => import("@/views/home/index.vue"),
        meta: {
          title: "测试2",
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
