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
      path: '/search',
      name: 'search',
      component: () => import('@/views/Searchview.vue')
    },
    {
      path: '/select',
      name: 'select',
      component: () => import('@/views/Selectview.vue')
    },
    {
      path: '/help',
      name: 'help',
      component: () => import('@/views/Helpview.vue')
    },
    {
      path: '/chat',
      name: 'chat',
      component: () => import('@/views/Chatview.vue'),
      }
    ,
    {
      path: '/login',
      name: 'login',
      beforeEnter: (to, from, next) => {
        alert('서비스 준비중입니다');
        next('/');
      }
    },
    {
      path: '/signup',
      name: 'signup',
      beforeEnter: (to, from, next) => {
        alert('서비스 준비중입니다');
        next('/');
      }
    },
  ],
})

export default router
