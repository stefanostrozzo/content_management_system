import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import BlogView from '@/views/BlogView.vue'
import MainLayout from '@/layouts/MainLayout.vue'
import PostList from '@/components/features/PostList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/posts',
      component: MainLayout,
      children: [
        {
          path: '',
          name: 'posts',
          component: PostList
          
        }
      ]
    }
  ]
})

export default router