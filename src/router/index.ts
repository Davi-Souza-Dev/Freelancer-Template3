import { createRouter, createWebHistory } from 'vue-router'
import Index from '../views/Index.vue'
import Cart from '@/views/Cart.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
    },
     {
      path: '/cart',
      name: 'cart',
      component: Cart,
    },
  ],
})

export default router
