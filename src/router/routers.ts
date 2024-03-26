//常量路由
export const constantRoute = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      title: "登录",
      hidden: true,
    },
  },
  {
    path: "/",
    name: "layout",
    component: () => import("@/views/layout/index.vue"),
    meta: {
      title: "layout",
      icon: "el-icon-s-home",
      hidden: false,
    },
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("@/views/home/index.vue"),
        meta: {
          title: "首页",
          icon: "el-icon-s-home",
          hidden: false,
        },
      },
      {
        path: "/test",
        name: "test",
        component: () => import("@/views/home/index.vue"),
        meta: {
          title: "测试",
          icon: "el-icon-s-home",
          hidden: false,
        },
      },
      {
        path: "/test2",
        name: "test2",
        component: () => import("@/views/home/index.vue"),
        meta: {
          title: "测试2",
          icon: "el-icon-s-home",
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
      title: "404",
      hidden: true,
    },
  },
];
