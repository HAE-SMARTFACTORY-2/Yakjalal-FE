import { createRouter, createWebHistory } from "vue-router";
import Search from "../components/Search/Search.vue";
import Register from "../components/Register/Register.vue";
import Main from "../components/Main/main.vue";
import Onboarding from "../components/OnBoarding/Onboarding.vue";
import Login from "../components/OnBoarding/Login.vue";

const routes = [
  {
    path: "/",
    component: Onboarding,
    meta: { hideNavBar: true },
  },
  {
    path: "/login",
    component: Login,
    meta: { hideNavBar: true },
  },
  {
    path: "/search",
    name: "Search",
    component: Search,
  },
  {
    path: "/main",
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
