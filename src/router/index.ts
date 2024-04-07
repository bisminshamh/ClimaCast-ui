import { createRouter, createWebHistory } from 'vue-router'
import store from '@/stores'

// Create the router instance
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/login',
      component: () => import('../layouts/default.vue'),
      children: [
        {
          path: '',
          component: () => import('../views/Login.vue'),
          meta: { authRequired: false } // Authentication not required
        }
      ]
    },
    {
      path: '/signup',
      component: () => import('../layouts/default.vue'),
      children: [
        {
          path: '',
          component: () => import('../views/Signup.vue'),
          meta: { authRequired: false } // Authentication not required
        }
      ]
    },
    {
      path: '/weather/:location',
      name: 'weather',
      component: () => import('../views/weatherView.vue'),
      props: (route) => ({
        location: route.params.location
      })
    },
    {
      path: '/',
      meta: { authRequired: true },
      component: () => import('../views/Dashboard.vue'),
      children: [
        {
          path: '/home',
          component: () => import('../views/HomeView.vue'),
          meta: { authRequired: true } // Authentication required
        },
        {
          path: '/mail-setup',
          component: () => import('../views/mailSetupView.vue'),
          meta: { authRequired: true } // Authentication required
        }
      ],
      // Navigation guard to check authentication before entering the route
      beforeEnter: (to, from, next) => {
        // Check if the route requires authentication
        if (to.meta.authRequired && !store.getters['auth/IS_AUTHENTICATED']) {
          console.log('not authenticated')
          next('/login') // Redirect to login if not authenticated
        } else {
          console.log('authenticated')
          next() // Proceed to the route if authenticated or if route doesn't require authentication
        }
      }
    }
  ]
})

export default router
