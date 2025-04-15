<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar />
    <main class="pt-24 px-4 sm:px-6 lg:px-8">
      <router-view :search="searchQuery" />
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Navbar from './components/Navbar.vue'

const searchQuery = ref('')

const handleSearch = (val) => {
  searchQuery.value = val
}
</script>
