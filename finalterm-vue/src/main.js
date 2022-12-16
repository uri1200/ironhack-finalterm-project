import { createApp } from "vue";
import { createPinia } from "pinia";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';


import App from "./App.vue";
import router from "./router";
import "./index.css";
import "./assets/style.css";

library.add(fas, fab);
const app = createApp(App);

app.component("fa", FontAwesomeIcon);
app.use(createPinia());
app.use(router);
app.use(VueSweetalert2);

app.mount("#app");
