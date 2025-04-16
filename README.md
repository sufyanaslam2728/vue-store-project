# 🛍️ Vue.js E-Commerce Website

This is a simple e-commerce website built with **Vue.js** using the [Platzi Fake Store API](https://fakeapi.platzi.com). The app demonstrates core e-commerce functionalities like category-based browsing, product search, favoriting items, tracking last visited products, pagination, and more.

---

## 🚀 Features

### ✅ Home Page

- Displays all product categories from the API.
- Includes a search bar to filter products by title.
- Shows the last 5 favorited and last 5 visited products from state/localStorage.

### ✅ Categories Page

- Lists all categories retrieved from the API.
- Displays a table of products for a selected category.
- Pagination support (e.g., 10 products per page).

### ✅ Product Listing Page

> **Note:** Based on my understanding of the assessment document, I assumed that selecting a category should display its associated products. Therefore, I implemented product listing functionality within the category page to reflect this behavior.

- Shows all products in a paginated table.
- Displays:
  - Product Image
  - Name
  - Price
  - Category
  - ⭐ Favorite toggle
- Includes sorting by price or name.

### ✅ Product Details Page

- Clicking on a product opens a detailed view with:
  - Product image
  - Name
  - Price
  - Description
  - Category

### ✅ Favorites Page

- Lists all favorited products with image, name, price, and category.
- Ability to remove a product from favorites.

### ✅ Bonus Features

- Sorting functionality (by price or name).
- Dark mode toggle 🌙 for UI customization.
- Lazy loading of product images.
- State management using **Pinia**.
- Optimized API usage to reduce redundant calls.

---

## 🛠️ Tech Stack

- [Vue.js 3](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [Vue Router](https://router.vuejs.org/)
- [Pinia](https://pinia.vuejs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Platzi Fake Store API](https://fakeapi.platzi.com)

---

## 📦 Installation Instructions

```bash
# Clone the repository
git clone https://github.com/sufyanaslam2728/vue-store-project.git

# Navigate to the project directory
cd vue-store-project

# change .env.example to .env and update the url to "https://api.escuelajs.co/api/v1"
mv .env.example .env

# Install dependencies
npm install

# Run the app locally
npm run dev
```
