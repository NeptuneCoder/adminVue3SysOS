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
      title: "",
      icon: "HomeFilled",
      hidden: false,
    },
    redirect: "/home", //当访问根路径时，自动重定向到/home
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("@/views/home/index.vue"),
        meta: {
          title: "首页界面",
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
  {
    path: "/screen",
    name: "screen",
    component: () => import("@/views/screen/index.vue"),
    meta: {
      title: "数据大屏",
      icon: "HomeFilled",
      hidden: false,
    },
  },

  {
    path: "/acl",
    name: "acl",
    component: () => import("@/views/layout/index.vue"),
    redirect: "/acl/user", //当访问/acl时，自动重定向到/acl/user
    meta: {
      title: "权限管理",
      icon: "HomeFilled",
      hidden: false,
    },
    children: [
      {
        path: "/acl/user",
        name: "aclUser",
        component: () => import("@/views/acl/user/index.vue"),
        meta: {
          title: "用户管理",
          icon: "UserFilled",
          hidden: false,
        },
      },
      {
        path: "/acl/role",
        name: "aclRole",
        component: () => import("@/views/acl/role/index.vue"),
        meta: {
          title: "角色管理",
          icon: "UserFilled",
          hidden: false,
        },
      },
      {
        path: "/acl/permission",
        name: "permission",
        component: () => import("@/views/acl/permission/index.vue"),
        meta: {
          title: "权限菜单管理",
          icon: "UserFilled",
          hidden: false,
        },
      },
    ],
  },
  {
    path: "/product",
    name: "product",
    component: () => import("@/views/layout/index.vue"),
    redirect: "/product/sku", //当访问/product时，自动重定向到/product/sku
    meta: {
      title: "商品管理",
      icon: "HomeFilled",
      hidden: false,
    },
    children: [
      {
        path: "/product/sku",
        name: "sku",
        component: () => import("@/views/product/sku/index.vue"),
        meta: {
          title: "sku管理",
          icon: "UserFilled",
          hidden: false,
        },
      },
      {
        path: "/product/spu",
        name: "spu",
        component: () => import("@/views/product/spu/index.vue"),
        meta: {
          title: "spu管理",
          icon: "UserFilled",
          hidden: false,
        },
      },
      {
        path: "/product/attr",
        name: "attr",
        component: () => import("@/views/product/attr/index.vue"),
        meta: {
          title: "属性管理",
          icon: "UserFilled",
          hidden: false,
        },
      },
      {
        path: "/product/trademark",
        name: "trademark",
        component: () => import("@/views/product/trademark/index.vue"),
        meta: {
          title: "品牌管理",
          icon: "UserFilled",
          hidden: false,
        },
      },
    ],
  },
];
