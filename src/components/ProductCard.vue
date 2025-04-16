<template>
  <div
    class="block bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition-all duration-200 group"
  >
    <div class="relative">
      <FavouriteButton
        :isFavorited="isFavorited"
        @toggle="toggleFavorite"
        class="absolute top-2 right-2 z-10"
      />

      <router-link :to="`/product/${product.id}`" @click="handleLinkClick">
        <div class="h-52 bg-gray-50 flex items-center justify-center">
          <img
            :src="productImage"
            alt="Product Image"
            class="object-contain max-h-full w-auto"
            loading="lazy"
          />
        </div>
      </router-link>
    </div>

    <div class="p-4">
      <h2 class="font-medium text-lg truncate mb-1 group-hover:text-blue-600 transition">
        {{ product.title }}
      </h2>
      <p class="text-green-600 font-bold text-md mb-1">${{ product.price }}</p>
      <p class="text-gray-500 text-sm">{{ product.category?.name }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useProductStore } from '../stores/productStore'
import FavouriteButton from './FavouriteButton.vue'

const props = defineProps({
  product: Object,
})

const store = useProductStore()

const isFavorited = computed(() => store.favorites.some((fav) => fav.id === props.product.id))

const productImage = computed(() => {
  const image = props.product?.images?.[0]
  return image && image.trim() !== ''
    ? image
    : 'https://placehold.co/300x200?text=Image+Not+Available&font=roboto'
})

const toggleFavorite = (event) => {
  store.toggleFavorite(props.product)
}

const handleLinkClick = (event) => {
  if (event.target.closest('button')) return
}
</script>
