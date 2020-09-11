import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from '../views/NotFound.vue'
// import SignIn from '../views/SignIn.vue'
import Home from '../views/Home.vue'

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'root',
    redirect: '/home'
  },
  // {
  //   path: '/signin',
  //   name: 'sign-in',
  //   component: SignIn
  // },
  // {
  //   path: '/signup',
  //   name: 'sign-up',
  //   component: () => import('../views/SignUp.vue')
  // },
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
    path: '/users/:id',
    name: 'user',
    component: () => import('../views/UserProfile.vue')
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

export default router
