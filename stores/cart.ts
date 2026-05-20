import { defineStore } from 'pinia'
import type { CartItem, Product } from '~/types'

interface CartState {
  items: CartItem[]
  _hydrated: boolean
}

const STORAGE_KEY = 'turbochem.cart.v1'

export const useCartStore = defineStore('cart', {
  state: (): CartState => ({
    items: [],
    _hydrated: false
  }),

  getters: {
    count: state => state.items.reduce((acc, i) => acc + i.qty, 0),
    isEmpty: state => state.items.length === 0,

    // Окремий getter — приймає список продуктів і повертає subtotal
    subtotal: state => (catalog: Product[]) =>
      state.items.reduce((acc, ci) => {
        const product = catalog.find(p => p.id === ci.productId)
        return acc + (product ? product.price * ci.qty : 0)
      }, 0),

    // Кількість конкретного товару
    qtyOf: state => (productId: string) =>
      state.items.find(i => i.productId === productId)?.qty ?? 0
  },

  actions: {
    hydrate() {
      if (this._hydrated) return
      if (import.meta.client) {
        try {
          const raw = localStorage.getItem(STORAGE_KEY)
          if (raw) {
            const parsed = JSON.parse(raw) as CartItem[]
            if (Array.isArray(parsed)) this.items = parsed
          }
        } catch (e) {
          console.warn('[cart] hydrate failed', e)
        }
      }
      this._hydrated = true
    },

    persist() {
      if (import.meta.client) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items))
      }
    },

    add(productId: string, qty = 1) {
      const existing = this.items.find(i => i.productId === productId)
      if (existing) existing.qty += qty
      else this.items.push({ productId, qty })
      this.persist()
    },

    setQty(productId: string, qty: number) {
      const item = this.items.find(i => i.productId === productId)
      if (!item) return
      if (qty <= 0) this.remove(productId)
      else { item.qty = qty; this.persist() }
    },

    remove(productId: string) {
      this.items = this.items.filter(i => i.productId !== productId)
      this.persist()
    },

    clear() {
      this.items = []
      this.persist()
    }
  }
})
