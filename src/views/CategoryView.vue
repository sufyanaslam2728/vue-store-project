<template>
  <div class="max-w-6xl mx-auto px-4 py-6">
    <h1 class="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
      Product Categories
    </h1>

    <div class="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 mb-8">
      <div
        v-for="category in categories"
        :key="category.id"
        class="cursor-pointer bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow hover:shadow-lg transition"
        @click="selectCategory(category)"
      >
        <div class="h-28 flex items-center justify-center bg-white dark:bg-gray-700">
          <img
            :src="category.image"
            alt="Category Image"
            class="object-contain h-full w-auto"
            loading="lazy"
          />
        </div>
        <div class="p-3 text-center">
          <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ category.name }}</h4>
        </div>
      </div>
    </div>

    <div v-if="selectedCategory" class="mb-8">
      <h2 class="text-xl font-semibold mb-4 text-center text-gray-800 dark:text-gray-100">
        Products in "{{ selectedCategory.name }}"
      </h2>

      <div class="relative inline-block text-left mb-6">
        <button
          type="button"
          class="inline-flex justify-between items-center px-6 py-2 rounded bg-blue-500 text-white font-medium shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
          @click="toggleDropdown"
        >
          <span>Sort Products</span>
          <i class="fas fa-caret-down ml-2"></i>
        </button>
        <!-- Dropdown menu -->
        <div
          v-if="dropdownOpen"
          class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <div class="py-1">
            <button
              @click="sortProducts('price')"
              class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full"
            >
              Sort by Price
              <i v-if="priceSortDirection === 'asc'" class="fas fa-arrow-up ml-2"></i>
              <i v-if="priceSortDirection === 'desc'" class="fas fa-arrow-down ml-2"></i>
            </button>
            <button
              @click="sortProducts('title')"
              class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full"
            >
              Sort by Name
              <i v-if="titleSortDirection === 'asc'" class="fas fa-arrow-up ml-2"></i>
              <i v-if="titleSortDirection === 'desc'" class="fas fa-arrow-down ml-2"></i>
            </button>
          </div>
        </div>
      </div>

      <div v-if="paginatedProducts.length">
        <table
          class="min-w-full bg-white dark:bg-gray-800 rounded-md shadow overflow-hidden text-sm"
        >
          <thead class="bg-gray-100 dark:bg-gray-700 text-left text-gray-800 dark:text-gray-100">
            <tr>
              <th class="px-4 py-2">Image</th>
              <th class="px-4 py-2">Name</th>
              <th class="px-4 py-2">Price</th>
              <th class="px-4 py-2">Category</th>
              <th class="px-4 py-2 text-center">Favorite</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="product in paginatedProducts"
              :key="product.id"
              class="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            >
              <td class="px-4 py-2">
                <img
                  :src="product.images?.[0]"
                  alt="Product"
                  class="h-12 w-12 object-contain"
                  loading="lazy"
                />
              </td>
              <td class="px-4 py-2 text-gray-900 dark:text-gray-100">{{ product.title }}</td>
              <td class="px-4 py-2 text-green-600 font-semibold">${{ product.price }}</td>
              <td class="px-4 py-2 text-gray-500 dark:text-gray-400">
                {{ product.category?.name || selectedCategory.name }}
              </td>
              <td class="px-4 py-2 text-center">
                <FavouriteButton
                  :isFavorited="isFavorite(product)"
                  @toggle="() => toggleFavorite(product)"
                />
              </td>
            </tr>
          </tbody>
        </table>

        <div class="flex justify-center mt-6 space-x-4">
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 text-gray-900 dark:text-gray-100"
          >
            Previous
          </button>
          <button
            @click="nextPage"
            :disabled="!hasNextPage"
            class="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 text-gray-900 dark:text-gray-100"
          >
            Next
          </button>
        </div>
      </div>

      <p v-else class="text-center text-gray-500 dark:text-gray-400 mt-6">
        No products found for this category.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useProductStore } from '@/stores/productStore'
import FavouriteButton from '../components/FavouriteButton.vue'
import api from '@/api.js'

const categories = ref([])
const selectedCategory = ref(null)
const paginatedProducts = ref([])
const currentPage = ref(1)
const itemsPerPage = 10
const hasNextPage = ref(false)
const priceSortDirection = ref('asc')
const titleSortDirection = ref('asc')
const dropdownOpen = ref(false)

const store = useProductStore()

const isMounted = ref(true)

const toggleFavorite = (product) => {
  store.toggleFavorite(product)
}

const isFavorite = (product) => {
  return store.favorites.some((p) => p.id === product.id)
}

onMounted(async () => {
  try {
    const { data } = await api.get('/categories')
    if (isMounted.value) {
      categories.value = data
    }
  } catch (error) {
    console.error('Error fetching categories:', error)
  }
})

onBeforeUnmount(() => {
  isMounted.value = false
})

const selectCategory = async (category) => {
  selectedCategory.value = category
  currentPage.value = 1
  await fetchProducts()
}

const fetchProducts = async () => {
  if (!selectedCategory.value) return
  const offset = (currentPage.value - 1) * itemsPerPage
  try {
    const { data } = await api.get(`/categories/${selectedCategory.value.id}/products`, {
      params: {
        offset,
        limit: itemsPerPage + 1,
      },
    })
    if (isMounted.value) {
      hasNextPage.value = data.length > itemsPerPage
      paginatedProducts.value = data.slice(0, itemsPerPage)
    }
  } catch (error) {
    console.error('Error fetching products:', error)
  }
}

const nextPage = async () => {
  if (hasNextPage.value) {
    currentPage.value++
    await fetchProducts()
  }
}

const prevPage = async () => {
  if (currentPage.value > 1) {
    currentPage.value--
    await fetchProducts()
  }
}

const sortProducts = (key) => {
  if (key === 'price') {
    priceSortDirection.value = priceSortDirection.value === 'asc' ? 'desc' : 'asc'
    paginatedProducts.value.sort((a, b) =>
      priceSortDirection.value === 'asc' ? a[key] - b[key] : b[key] - a[key],
    )
  } else if (key === 'title') {
    titleSortDirection.value = titleSortDirection.value === 'asc' ? 'desc' : 'asc'
    paginatedProducts.value.sort((a, b) =>
      titleSortDirection.value === 'asc'
        ? a[key].localeCompare(b[key])
        : b[key].localeCompare(a[key]),
    )
  }
  dropdownOpen.value = false // Close the dropdown after sorting
}

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}
</script>
