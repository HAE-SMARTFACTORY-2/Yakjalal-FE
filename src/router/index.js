import { createRouter, createWebHistory } from "vue-router";
import Search from "../components/Search/Search.vue";
import Register from "../components/Register/Register.vue";
import Main from "../components/Main/main.vue";
import Onboarding from "../components/OnBoarding/Onboarding.vue";
import Login from "../components/OnBoarding/Login.vue";
import RegisterResult from "../components/Register/Register-result.vue";
import SearchResult from "../components/Search/Search-result.vue";

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
  {
    path: "/ocr-result",
    name: "Regiser-Result",
    component: RegisterResult,
  },
  {
    path: "/search-result",
    name: "Search-Result",
    component: SearchResult,
  },
];

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHistory("/"),
  routes,
});

export default router;
