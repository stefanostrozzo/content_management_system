<template>
    <MainLayout>
      <!-- Il tuo contenuto specifico per la pagina blog -->
      <h1>Blog Posts</h1>
      <PostList />
    </MainLayout>
  </template>
  
  <script setup lang="ts">
  import MainLayout from '@/layouts/MainLayout.vue'
  import PostList from '@/components/features/PostList.vue'
  </script>
  
  <style scoped>
  /* Stili specifici per la pagina blog */
  </style>