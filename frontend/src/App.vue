<template>
  <div id="app">
    <RouterView /> <!-- Solo questo, niente altri componenti qui -->
  </div>
</template>

<style>
#app {
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
}
</style>

<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()

</script>