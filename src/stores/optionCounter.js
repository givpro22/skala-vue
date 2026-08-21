import { defineStore } from 'pinia'

export const useOptionCounterStore = defineStore('optionCounter', {
  state: () => ({
    count: 0,
    step: 1,
  }),
  getters: {
    doubleCount: (state) => state.count * 2,
    isEven: (state) => state.count % 2 === 0,
  },
  actions: {
    increment() {
      this.count += this.step
    },
    decrement() {
      this.count -= this.step
    },
    reset() {
      this.count = 0
    },
  },
})
