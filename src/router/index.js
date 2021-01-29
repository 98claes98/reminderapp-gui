import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import Forgot from '../views/Forgot.vue'
import Reminder from '../views/Reminder.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup
  },
  {
    path: '/forgot',
    name: 'forgot',
    component: Forgot
  },
  {
    path: '/reminder',
    name: 'reminder',
    component: Reminder
  },
  {
    path: "*",
    redirect: "/login",
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.name == 'login' || to.name == 'signup' || to.name == 'forgot'){
    sessionStorage.clear();
    next();
  } else if (to.name == 'reminder') {
    if (sessionStorage.getItem("authenticated" == 'true')){
      next();
    } else {
      next('/login');
    }
  } else {
    next();
  }
});

export default router
