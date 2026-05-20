import { defineStore } from 'pinia'

interface UIState {
  cartDrawerOpen: boolean
  searchOpen: boolean
  mobileMenuOpen: boolean
}

export const useUIStore = defineStore('ui', {
  state: (): UIState => ({
    cartDrawerOpen: false,
    searchOpen: false,
    mobileMenuOpen: false
  }),
  actions: {
    openCart() { this.cartDrawerOpen = true },
    closeCart() { this.cartDrawerOpen = false },
    toggleSearch() { this.searchOpen = !this.searchOpen },
    closeSearch() { this.searchOpen = false },
    toggleMobileMenu() { this.mobileMenuOpen = !this.mobileMenuOpen },
    closeMobileMenu() { this.mobileMenuOpen = false }
  }
})
