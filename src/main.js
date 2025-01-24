import { createApp } from "vue";
import axios from "axios";
import App from "./App.vue";
import ElementPlus from "element-plus";
import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import router from "./router";

const app = createApp(App);
app.use(ElementPlus);
app.use(axios);
app.use(router);
app.mount("#app");

AOS.init({
  duration: 1000,
  once: true,
});

App.config.globalProperties.axios = axios;
