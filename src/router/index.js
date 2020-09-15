import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from '../views/NotFound.vue'
// import SignIn from '../views/SignIn.vue'
import Home from '../views/Home.vue'
import store from './../store'
import { Toast } from "./../utils/helpers";

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
    component: () => import('../views/Order.vue'),
    beforeEnter: (to, from, next) => {
      const currentUser = store.state.currentUser
      if (Number(to.params.id) !== Number(currentUser.id)) {
        next('/not-found')
        return
      }
      next()
    }
  },
  {
    path: '/users/:id',
    name: 'user',
    component: () => import('../views/UserProfile.vue'),
    beforeEnter: (to, from, next) => {
      const currentUser = store.state.currentUser
      if (Number(to.params.id) !== Number(currentUser.id)) {
        next('/not-found')
        return
      }
      next()
    }
  },
  {
    path: '/order/:id',
    name: 'payment',
    component: () => import('../views/Payment.vue'),
    beforeEnter: (to, from, next) => {
      const currentUser = store.state.currentUser
      if (currentUser.role !== 'student') {
        next('/not-found')
        return
      }
      next()
    }
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

router.beforeEach(async (to, from, next) => {
  // 使用 dispatch 呼叫 Vuex 內的 actions
  const tokenInLocalStorage = localStorage.getItem('token')
  const tokenInStore = store.state.token
  const tokenRole = store.state.currentUser.role
  let isAuthenticated = store.state.isAuthenticated
  if (tokenInLocalStorage && tokenInLocalStorage !== tokenInStore) {
    isAuthenticated = await store.dispatch('fetchCurrentUser')
  }
  const pathsWithoutAuthentication = ['home', 'home-about', 'home-Qa', 'users-teacher']
  if (!isAuthenticated && !pathsWithoutAuthentication.includes(to.name)) {
    Toast.fire({
      icon: "warning",
      title: "Please sign in first!",
    });
    next('/home')
    return
  }
  const pathsStudent = ["orders", "payment", "student-question"]
  const pathsTeacher = ["teacher-question"]
  if (pathsTeacher.includes(to.name) && tokenRole === 'student') {
    Toast.fire({
      icon: "warning",
      title: "Please sign in with the teacher's account.",
    });
    return
  }
  if (pathsStudent.includes(to.name) && tokenRole === 'teacher') {
    Toast.fire({
      icon: "warning",
      title: "Please sign in with the student's account.",
    });
    return
  }
  next()
})

export default router
