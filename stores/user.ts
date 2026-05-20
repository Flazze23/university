import { defineStore } from 'pinia'
import type { User, Order } from '~/types'

interface UserState {
  user: User | null
  orders: Order[]
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    user: null,
    orders: []
  }),

  getters: {
    isAuthenticated: state => state.user !== null,
    fullName: state =>
      state.user ? `${state.user.firstName} ${state.user.lastName}` : ''
  },

  actions: {
    // Демо-логін (без реального бекенду)
    login(email: string) {
      this.user = {
        id: 'u_demo',
        firstName: 'Олександр',
        lastName: 'Шатравка',
        email,
        phone: '+38 (067) 123-45-67',
        city: 'Київ',
        joinedAt: '2025-09-12'
      }
      this.orders = [
        {
          id: 'o1',
          number: 'TC-2026-00187',
          date: '2026-05-12',
          status: 'delivered',
          total: 1248,
          itemsCount: 3
        },
        {
          id: 'o2',
          number: 'TC-2026-00203',
          date: '2026-05-16',
          status: 'shipped',
          total: 2890,
          itemsCount: 1
        },
        {
          id: 'o3',
          number: 'TC-2026-00219',
          date: '2026-05-19',
          status: 'processing',
          total: 749,
          itemsCount: 2
        }
      ]
    },

    logout() {
      this.user = null
      this.orders = []
    }
  }
})
