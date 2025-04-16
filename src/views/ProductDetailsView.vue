<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <div
      v-if="product"
      class="bg-white rounded-2xl shadow-md overflow-hidden md:flex md:space-x-6 dark:bg-gray-800 dark:text-white"
    >
      <div class="md:w-1/2 bg-gray-100 flex items-center justify-center p-6 dark:bg-gray-700">
        <img
          :src="product.images?.[0]"
          alt="Product Image"
          class="h-72 object-contain w-full"
          loading="lazy"
        />
      </div>

      <div class="md:w-1/2 p-6 flex flex-col justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gray-800 mb-2 dark:text-gray-100">
            {{ product.title || 'Product title not available' }}
          </h1>
          <p class="text-gray-600 mb-4 dark:text-gray-300">
            {{ product.description || 'No description available.' }}
          </p>
          <div class="text-green-600 text-xl font-semibold mb-2">${{ product.price || 'N/A' }}</div>
          <div class="text-sm text-gray-500 dark:text-gray-400">
            Category:
            <span class="font-medium">{{
              product.category?.name || 'Category not available'
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/api.js'
import { useProductStore } from '../stores/productStore'

const route = useRoute()
const router = useRouter()
const product = ref(null)
const store = useProductStore()

onMounted(async () => {
  try {
    const { data } = await api.get(`/products/${route.params.id}`)
    if (data) {
      product.value = data
      store.visitProduct(data)
    } else {
      router.push({ name: 'NotFound' })
    }
  } catch (error) {
    console.error('Error fetching product:', error)
    router.push({ name: 'NotFound' })
  }
})
</script>
