<template>
  <div
    class="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors"
  >
    <Navbar :isDarkMode="isDarkMode" @toggle-dark="toggleDarkMode" />
    <main class="pt-24 px-4 sm:px-6 lg:px-8">
      <router-view :search="searchQuery" />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import Navbar from './components/Navbar.vue'

const searchQuery = ref('')
const isDarkMode = ref(localStorage.getItem('darkMode') === 'true')

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  localStorage.setItem('darkMode', isDarkMode.value)
}

onMounted(() => {
  if (localStorage.getItem('darkMode') === null) {
    isDarkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  }
})

watchEffect(() => {
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
})
</script>
