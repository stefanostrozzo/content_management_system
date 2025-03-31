<template>
    <footer class="bg-dark text-white py-4 mt-auto">
      <div class="container">
        <div class="row">
          <!-- Column 1 -->
          <div class="col-md-4 mb-4 mb-md-0">
            <h5 class="text-primary">
              <i class="bi bi-journal-text me-2"></i> My Blog
            </h5>
            <p class="small text-muted">
              A simple blog created with Vue 3 and TypeScript
            </p>
          </div>
  
          <!-- Column 2 -->
          <div class="col-md-4 mb-4 mb-md-0">
            <h5>Quick Links</h5>
            <ul class="list-unstyled">
              <li class="mb-2">
                <router-link to="/" class="text-white-50">
                  <i class="bi bi-chevron-right small me-1"></i> Home
                </router-link>
              </li>
              <li class="mb-2">
                <router-link to="/posts" class="text-white-50">
                  <i class="bi bi-chevron-right small me-1"></i> All Posts
                </router-link>
              </li>
            </ul>
          </div>
  
          <!-- Column 3 -->
          <div class="col-md-4">
            <h5>Connect</h5>
            <ul class="list-unstyled">
              <li class="mb-2">
                <a href="#" class="text-white-50">
                  <i class="bi bi-twitter me-2"></i> Twitter
                </a>
              </li>
              <li class="mb-2">
                <a href="#" class="text-white-50">
                  <i class="bi bi-github me-2"></i> GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>
  
        <hr class="border-secondary mt-4 mb-3">
  
        <div class="text-center small text-muted">
          &copy; {{ new Date().getFullYear() }} My Blog. All rights reserved.
        </div>
      </div>
    </footer>
  </template>
  
  <script setup lang="ts">
  // No logic needed for basic footer
  </script>
  
  <style scoped>
  footer a {
    text-decoration: none;
    transition: color 0.2s;
  }
  
  footer a:hover {
    color: var(--bs-primary) !important;
  }
  </style>