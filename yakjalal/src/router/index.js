import { createRouter, createWebHistory } from "vue-router";
import Search from "../components/Search/Search.vue";
import Register from "../components/Register/Register.vue";
import Main from "../components/Main/main.vue";

const routes = [
  {
    path: "/search",
    name: "Search",
    component: Search,
  },
  {
    path: "/",
    name: "Main",
    component: Main,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
];

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHistory("/"),
  routes,
});

export default router;
