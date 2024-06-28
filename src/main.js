import { createApp } from "vue";
import App from "./App.vue";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import i18n from './i18n'

const app = createApp(App).use(i18n);

app.use(Toast);
app.mount("#app");
