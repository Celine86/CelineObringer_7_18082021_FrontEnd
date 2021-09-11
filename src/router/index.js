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
    path: '/posts',
    name: 'Posts',
    component: () => import("../components/Posts"),
  },
  {
    path: '/singlepost/:id',
    name: 'SinglePost',
    component: () => import("../components/SinglePost"),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const visitorPages = ["/", "/signin", "/signup"]
  const loggedUserPages = !visitorPages.includes(to.path)
  const loggedUser = localStorage.getItem("token")
  if (loggedUserPages && !loggedUser) {
    return next("/")
  }
  next()
})

export default router