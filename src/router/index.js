import Vue from "vue";
import VueRouter from "vue-router";
import Auth from "../utils/auth";
// import Frequencimetro from '../views/Frequencimetro'
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

// router.beforeEach((to, from, next) => {
//   console.log("ta aquiiiiii->", Auth.loggedIn())
//   if (to.matched.some(record => record.meta.requiresAuth) && !Auth.loggedIn()) {
//     console.log('era pra voltar pro login')
//     next({
//       path: '/',
//       query: { redirect: to.fullPath }
//     })
//   } else if (to.matched.some(record => record.name === 'Login') && Auth.loggedIn()) {
//     console.log("ta errado")
//     next({ name: 'Users' })
//   } else {
//     next()
//   }
// })
router.beforeEach((to, from, next) => {
  if (to.name !== "Login" && !Auth.loggedIn()) next({ name: "Login" });
  else next();
});
export default router;
