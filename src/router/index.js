import Vue from "vue";
import VueRouter from "vue-router";
import Auth from "../utils/auth";
import FrequencimetroRouter from "./frequencimetro";
import Login from "../views/Login";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login
  }
];
routes.push(FrequencimetroRouter);
const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  if (to.name !== "Login" && !Auth.loggedIn()) next({ name: "Login" });
  else next();
});
export default router;
