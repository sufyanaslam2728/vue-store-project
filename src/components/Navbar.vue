<template>
  <header class="bg-white shadow-md fixed top-0 left-0 w-full z-50">
    <div
      class="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-6"
    >
      <div class="flex justify-between items-center w-full md:w-auto">
        <router-link to="/" class="text-xl font-bold text-primary">VueShop 🛍️</router-link>
      </div>
      <div class="flex space-x-4 text-sm font-medium">
        <router-link to="/" class="text-gray-700 hover:text-primary">Home</router-link>
        <router-link to="/categories" class="text-gray-700 hover:text-primary"
          >Categories</router-link
        >
        <router-link to="/favorites" class="text-gray-700 hover:text-primary"
          >Favorites</router-link
        >
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
const search = ref('')

const emit = defineEmits(['search'])

const emitSearch = () => {
  emit('search', search.value)
}
</script>