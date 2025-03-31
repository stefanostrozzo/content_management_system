<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm sticky-top w-100">
      <div class="container-fluid">
        <!-- Logo/Brand -->
        <router-link to="/" class="navbar-brand">
          <i class="bi bi-journal-text me-2"></i>
          My Blog
        </router-link>
  
        <!-- Toggle Mobile -->
        <button 
          class="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarContent"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
  
        <!-- Navbar Content -->
        <div class="collapse navbar-collapse" id="navbarContent">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <router-link 
                to="/" 
                class="nav-link" 
                :class="{ 'active': $route.path === '/' }"
              >
                <i class="bi bi-house-door me-1"></i> Home
              </router-link>
            </li>
            <li class="nav-item">
              <router-link 
                to="/posts" 
                class="nav-link" 
                :class="{ 'active': $route.path === '/posts' }"
              >
                <i class="bi bi-card-list me-1"></i> Posts
              </router-link>
            </li>
          </ul>
  
          <!-- Right Section -->
          <div class="d-flex align-items-center gap-3">
            <!-- Search -->
            <div class="input-group">
              <input 
                v-model="searchQuery"
                type="text" 
                class="form-control form-control-sm" 
                placeholder="Search..."
                @keyup.enter="performSearch"
              >
              <button class="btn btn-outline-light" @click="performSearch">
                <i class="bi bi-search"></i>
              </button>
            </div>
  
            <!-- User Dropdown -->
            <div class="dropdown">
              <button 
                class="btn btn-outline-light dropdown-toggle" 
                data-bs-toggle="dropdown"
              >
                <i class="bi bi-person-circle"></i>
              </button>
              <ul class="dropdown-menu dropdown-menu-end">
                <li>
                  <router-link to="/profile" class="dropdown-item">
                    <i class="bi bi-person me-2"></i> Profile
                  </router-link>
                </li>
                <li>
                  <button class="dropdown-item" @click="logout">
                    <i class="bi bi-box-arrow-right me-2"></i> Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  const searchQuery = ref('')
  
  const performSearch = () => {
    if (searchQuery.value.trim()) {
      router.push({ name: 'search', query: { q: searchQuery.value } })
    }
  }
  
  const logout = () => {
    // Implement your logout logic
    console.log('Logout clicked')
  }
  </script>
  
  <style scoped>
  .navbar {
    padding: 0.5rem 1rem;
  }
  
  .input-group {
    width: 250px;
  }
  
  @media (max-width: 992px) {
    .input-group {
      width: 100%;
      margin-top: 0.5rem;
    }
    
    .dropdown {
      margin-top: 0.5rem;
    }
  }
  </style>