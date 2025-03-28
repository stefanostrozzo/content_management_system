<template>
    <div>
      <h2>Lista dei Post</h2>
      <ul>
        <li v-for="post in posts" :key="post._id">{{ post.title }}</li>
      </ul>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  const posts = ref<any[]>([]);
  
  onMounted(async () => {
    try {
      const { data } = await axios.get(import.meta.env.VITE_API_URL + '/posts');
      posts.value = data;
      console.log(posts.value);
    } catch (error) {
      console.error('Errore nel recupero dei post:', error);
    }
  });
  </script>
  