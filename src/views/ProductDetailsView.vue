<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <div class="bg-white rounded-2xl shadow-md overflow-hidden md:flex md:space-x-6">
      <div class="md:w-1/2 bg-gray-100 flex items-center justify-center p-6">
        <img
          :src="product?.images?.[0] || fallbackImage"
          alt="Product Image"
          class="h-72 object-contain w-full"
          loading="lazy"
        />
      </div>

      <div class="md:w-1/2 p-6 flex flex-col justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gray-800 mb-2">{{ product.title }}</h1>
          <p class="text-gray-600 mb-4">{{ product.description }}</p>
          <div class="text-green-600 text-xl font-semibold mb-2">
            ${{ product.price }}
          </div>
          <div class="text-sm text-gray-500">
            Category: <span class="font-medium">{{ product.category?.name }}</span>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { useProductStore } from '../stores/productStore'

const route = useRoute()
const product = ref({})
const store = useProductStore()

const fallbackImage = 'https://via.placeholder.com/300x300?text=No+Image'

onMounted(async () => {
  const { data } = await axios.get(`https://api.escuelajs.co/api/v1/products/${route.params.id}`)
  product.value = data
  store.visitProduct(data)
})
</script>
