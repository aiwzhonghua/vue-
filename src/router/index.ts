import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

// 配置路由
// const routes: Array<RouteRecordRaw> = [
//   {
//     path: "/",
//     name: "Home",
//     component: () => import("@/views/home/index.vue"),
//     meta: {},
//     children: [],
//   },
// ];

//新的理由配置
const modules: Record<string, any> = import.meta.glob(["./modules/*.ts"], {
  eager: true,
});
const routes: Array<RouteRecordRaw> = [];
Object.keys(modules).forEach((key) => {
  const module = modules[key].default;
  routes.push(module);
});

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(async (_to, _from, next) => {
  NProgress.start();
  next();
});

router.afterEach((_to) => {
  NProgress.done();
});

export default router;
