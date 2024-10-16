import { createRouter, createWebHistory } from 'vue-router'
import PaginaUpload from '@/views/PaginaUpload.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/paginaUpload',
      name: 'paginaUpload',
      component: PaginaUpload,
    },
  ],
})

export default router
