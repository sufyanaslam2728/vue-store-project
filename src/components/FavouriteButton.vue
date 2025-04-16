<template>
  <button
    @click.stop="$emit('toggle')"
    class="text-yellow-400 text-2xl"
    :title="isFavorited ? 'Remove from Favorites' : 'Add to Favorites'"
  >
    <span v-if="isFavorited">★</span>
    <span v-else>☆</span>
  </button>
</template>

<script setup>
defineProps({
  isFavorited: Boolean,
})
defineEmits(['toggle'])
</script>
