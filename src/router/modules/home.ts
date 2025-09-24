export default {
  path: "/",
  name: "home",
  component: () => import("@/views/home/index.vue"),
  meta: {
    title: "首页",
  },
  children: [],
};
