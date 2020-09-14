import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from '../views/NotFound.vue'
// import SignIn from '../views/SignIn.vue'
import Home from '../views/Home.vue'
import store from './../store'

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'root',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/home/about',
    name: 'home-about',
    component: () => import('../views/About.vue')
  },
  {
    path: '/home/qa',
    name: 'home-Qa',
    component: () => import('../views/Qa.vue')
  },
  {
    path: '/users/teachers',
    name: 'users-teacher',
    component: () => import('../views/Teachers.vue')
  },
  {
    path: '/users/:id/orders',
    name: 'orders',
    component: () => import('../views/Order.vue')
  },
  {
    path: '/users/:id',
    name: 'user',
    component: () => import('../views/UserProfile.vue')
  },
  {
    path: '/order/:id',
    name: 'payment',
    component: () => import('../views/Payment.vue')
  },
  {
    path: '/student/questions',
    name: 'student-question',
    component: () => import('../views/MyQuestion.vue')
  },
  {
    path: '/teacher/questions',
    name: 'teacher-question',
    component: () => import('../views/Questions.vue')
  },
  {
    path: '*',
    name: 'not-found',
    component: NotFound
  }
]

const router = new VueRouter({
  linkExactActiveClass: 'active',
  routes
})

router.beforeEach((to, from, next) => {
  // 使用 dispatch 呼叫 Vuex 內的 actions
  store.dispatch('fetchCurrentUser')
  next()
})

export default router
