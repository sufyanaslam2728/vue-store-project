<template>
  <div class="max-w-7xl mx-auto px-4 py-6">
    <div class="mb-4 text-center">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search products by title..."
        class="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        @input="resetPage"
      />
    </div>

    <div class="mb-6">
      <h3 class="text-2xl font-semibold text-center text-primary dark:text-blue-300 mb-4">
        Categories
      </h3>
      <div class="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        <div
          v-for="category in categories"
          :key="category.id"
          class="cursor-pointer bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow hover:shadow-lg transition-all duration-200"
          @click="filterByCategory(category)"
        >
          <div class="h-28 flex items-center justify-center bg-gray-100 dark:bg-gray-700">
            <img
              :src="category.image"
              alt="Category Image"
              class="object-contain h-full w-auto"
              loading="lazy"
            />
          </div>
          <div class="p-3 text-center">
            <h4 class="text-sm font-medium text-gray-700 dark:text-gray-200">
              {{ category.name }}
            </h4>
          </div>
        </div>
      </div>
    </div>

    <h2 class="text-2xl font-bold mb-4 text-primary dark:text-blue-300 text-center">
      All Products
    </h2>

    <div
      v-if="paginatedProducts.length"
      class="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      <ProductCard
        v-for="product in paginatedProducts"
        :key="product.id"
        :product="product"
        @toggle-fav="store.toggleFavorite"
      />
    </div>

    <p v-else class="text-gray-500 dark:text-gray-400 text-center mt-10 text-lg">
      😕 No products found matching "{{ searchQuery }}"
    </p>

    <div class="flex justify-center mt-8 space-x-4">
      <button
        @click="prevPage"
        :disabled="currentPage === 1"
        class="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50"
      >
        Previous
      </button>
      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50"
      >
        Next
      </button>
    </div>

    <div class="mt-8">
      <h3 class="text-2xl font-bold mb-4 text-primary dark:text-blue-300 text-center">
        Last 5 Favorited Products
      </h3>
      <div
        v-if="lastFavorited.length"
        class="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        <ProductCard
          v-for="product in lastFavorited"
          :key="product.id"
          :product="product"
          @toggle-fav="store.toggleFavorite"
        />
      </div>

      <h3 class="text-2xl font-bold mb-4 text-primary dark:text-blue-300 text-center">
        Last 5 Visited Products
      </h3>
      <div
        v-if="lastVisited.length"
        class="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        <ProductCard
          v-for="product in lastVisited"
          :key="product.id"
          :product="product"
          @toggle-fav="store.toggleFavorite"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import api from '../api' // Import the Axios instance from api.js
import ProductCard from '../components/ProductCard.vue'
import { useProductStore } from '../stores/productStore'

const searchQuery = ref('')
const categories = ref([])
const products = ref([])
const currentPage = ref(1)
const itemsPerPage = 10
const selectedCategory = ref(null)

const store = useProductStore()

onMounted(async () => {
  try {
    // Fetch categories and products
    const { data: categoryData } = await api.get('/categories')
    categories.value = categoryData
    await fetchProducts()
  } catch (error) {
    console.error('Error fetching products or categories:', error)
  }
})

watch(searchQuery, () => {
  currentPage.value = 1
  fetchProducts()
})

const fetchProducts = async () => {
  const offset = (currentPage.value - 1) * itemsPerPage
  let data = []
  if (selectedCategory.value) {
    const response = await api.get(`/categories/${selectedCategory.value.id}/products`, {
      params: { offset, limit: itemsPerPage },
    })
    data = response.data
  } else {
    const response = await api.get('/products', { params: { offset, limit: itemsPerPage } })
    data = response.data
  }
  products.value = data
}

const filteredProducts = computed(() => {
  if (!searchQuery.value.trim()) return products.value
  return products.value.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.value.toLowerCase()),
  )
})

const totalPages = computed(() => Math.ceil(filteredProducts.value.length / itemsPerPage))

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredProducts.value.slice(start, start + itemsPerPage)
})

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--
}

const resetPage = () => {
  currentPage.value = 1
}

const filterByCategory = (category) => {
  selectedCategory.value = category
  currentPage.value = 1
  fetchProducts()
}

const lastFavorited = computed(() => {
  const data = Object.values(store.favorites)
  return data.slice(-5)
})

const lastVisited = computed(() => {
  const visited = JSON.parse(localStorage.getItem('lastVisited') || '[]')
  return visited.slice(0, 5)
})

const updateLastVisited = (product) => {
  let visited = JSON.parse(localStorage.getItem('lastVisited') || '[]')
  visited = [product, ...visited.filter((p) => p.id !== product.id)].slice(0, 5)
  localStorage.setItem('lastVisited', JSON.stringify(visited))
}

watch(
  () => store.lastVisited,
  (newVisitedProduct) => {
    updateLastVisited(newVisitedProduct)
  },
  { deep: true },
)
</script>
