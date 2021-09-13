import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import("../views/Home"),
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import("../views/Signup"),
  },
  {
    path: '/signin',
    name: 'Signin',
    component: () => import("../views/Signin"),
  },
  {
    path: '/useraccount',
    name: 'UserAccount',
    component: () => import("../views/UserAccount"),
  },
  {
    path: '/posts',
    name: 'Posts',
    component: () => import("../views/Posts"),
  },
  {
    path: '/singlepost/:id',
    name: 'SinglePost',
    component: () => import("../views/SinglePost"),
  },
  {
    path: '/rgpd',
    name: 'Rgpd',
    component: () => import("../views/Rgpd"),
  },
  {
    path: '/charte',
    name: 'Charte',
    component: () => import("../views/Charte"),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const visitorPages = ["/", "/signin", "/signup", "/rgpd", "/charte"]
  const loggedUserPages = !visitorPages.includes(to.path)
  const loggedUser = localStorage.getItem("token")
  if (loggedUserPages && !loggedUser) {
    return next("/")
  }
  next()
})

export default router