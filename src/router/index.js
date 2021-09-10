import { createRouter, createWebHashHistory } from 'vue-router'
// import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import("../components/Home"),
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import("../components/Signup"),
  },
  {
    path: '/signin',
    name: 'Signin',
    component: () => import("../components/Signin"),
  },
  {
    path: '/useraccount',
    name: 'UserAccount',
    component: () => import("../components/UserAccount"),
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import("../components/Test"),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const visitorPages = ["/", "/signin", "/signup", "test"]
  const loggedUserPages = !visitorPages.includes(to.path)
  const loggedUser = localStorage.getItem("token")
  if (loggedUserPages && !loggedUser) {
    return next("/")
  }
  next()
})

export default router