import { createRouter, createWebHashHistory } from "vue-router";
import { constantRoute } from "./routers";

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoute,
  //滚动行为，
  scrollBeHavior: () => {
    return { x: 0, y: 0 };
  },
});

export default router;
