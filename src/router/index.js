import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import CategoryView from '@/views/CategoryView.vue'
import ProductDetailsView from '@/views/ProductDetailsView.vue'
import FavoritesView from '@/views/FavoritesView.vue'

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/categories', name: 'Category', component: CategoryView },
  { path: '/product/:id', name: 'ProductDetails', component: ProductDetailsView },
  { path: '/favorites', name: 'Favorites', component: FavoritesView }
]

export default createRouter({
  history: createWebHistory(),
  routes,
})