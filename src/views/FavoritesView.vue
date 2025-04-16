<template>
  <div class="p-4">
    <h2 class="text-xl font-bold mb-4">Favorite Products</h2>
    <div
      v-if="store.favorites.length"
      class="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      <ProductCard
        v-for="product in store.favorites"
        :key="product.id"
        :product="product"
        @toggle-fav="store.toggleFavorite"
      />
    </div>
    <p v-else>No favorites yet!</p>
  </div>
</template>

<script setup>
import { useProductStore } from '../stores/productStore'
import ProductCard from '../components/ProductCard.vue'

const store = useProductStore()
</script>
