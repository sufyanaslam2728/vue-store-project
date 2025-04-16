import { defineStore } from 'pinia'

export const useProductStore = defineStore('product', {
  state: () => ({
    favorites: JSON.parse(localStorage.getItem('favorites')) || [],
    lastVisited: JSON.parse(localStorage.getItem('lastVisited')) || [],
  }),
  actions: {
    toggleFavorite(product) {
      const exists = this.favorites.find(p => p.id === product.id)
      if (exists) {
        this.favorites = this.favorites.filter(p => p.id !== product.id)
      } else {
        this.favorites.push(product)
      }
      localStorage.setItem('favorites', JSON.stringify(this.favorites))
    },
    visitProduct(product) {
      this.lastVisited = [product, ...this.lastVisited.filter(p => p.id !== product.id)].slice(0, 5)
      localStorage.setItem('lastVisited', JSON.stringify(this.lastVisited))
    },
  }
})
