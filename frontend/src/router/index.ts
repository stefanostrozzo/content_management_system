import { createRouter, createWebHistory } from 'vue-router'
import PostList from '../components/PostList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: PostList,
    },
    {
      path: '/posts',
      name: 'listpost',
      component: PostList,
    },
  ],
})

export default router
