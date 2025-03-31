<template>
    <div class="main-layout ">
      <LayoutHeader class="w-100" />
      <main class="main-content">
        <router-view /> <!-- Qui viene iniettato il contenuto della pagina -->
      </main>
      <LayoutFooter class="w-100"/>
    </div>
  </template>
  
  <script setup lang="ts">
  import LayoutHeader from '@/components/pagination/Navbar.vue'
  import LayoutFooter from '@/components/pagination/Footer.vue'
  </script>
  
  <style scoped>
  .main-layout {
    flex: 1;
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .main-content {
    flex: 1;
  }
  </style>