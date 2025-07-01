import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Homeview.vue')
    },
    {
      path: '/start',
      name: 'start',
      component: () => import('@/views/Startview.vue')
    },
    {
      path: '/select',
      name: 'select',
      component: () => import('@/views/Selectview.vue')
    }
  ],
})

export default router
