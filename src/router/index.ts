import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: () => import('../layouts/default.vue'),
      children: [
        {
          path: '',
          component: () => import('../views/Login.vue')
        }
      ]
    },
    {
      path: '/signup',
      component: () => import('../layouts/default.vue'),
      children: [
        {
          path: '',
          component: () => import('../views/Signup.vue')
        }
      ]
    },
    {
      path: '/weather/:location',
      component: () => import('../views/weatherView.vue'),
      props: (route) => ({ location: route.params.location })
    },
    {
      path: '/',
      component: () => import('../views/Dashboard.vue'),
      children: [
        {
          path: '/home',
          component: () => import('../components/home.vue')
        },
        {
          path: '/profile',
          component: () => import('../components/profile.vue')
        }
      ]
      // beforeEnter: (to, from, next) => {
      //   // Check if user is authenticated
      //   const isAuthenticated = /* Your authentication logic here */;
      //   if (!isAuthenticated) {
      //     next('/login'); // Redirect to login if not authenticated
      //   } else {
      //     next(); // Proceed to the route if authenticated
      //   }
      // }
    }
  ]
})

export default router
