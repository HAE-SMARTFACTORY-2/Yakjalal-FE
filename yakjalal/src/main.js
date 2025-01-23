import { createApp } from "vue";
import axios from "axios";
import App from "./App.vue";

createApp(App).mount("#app");

App.use(axios).mount("#app");
App.config.globalProperties.axios = axios; // axios 전역 설정
