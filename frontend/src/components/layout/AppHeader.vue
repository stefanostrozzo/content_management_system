<template>
    <header class="app-header">
      <div class="container">
        <AppLogo />
        <MainNavigation />
        <ThemeToggle />
      </div>
    </header>
  </template>
  
  <script setup lang="ts">
  import AppLogo from '@/components/ui/AppLogo.vue'
  import MainNavigation from '@/components/layout/MainNavigation.vue'
  import ThemeToggle from '@/components/ui/ThemeToggle.vue'
  </script>
  
  <style scoped>
  .app-header {
    background: var(--color-bg);
    border-bottom: 1px solid var(--color-border);
    position: sticky;
    top: 0;
    z-index: 100;
  }
  </style>