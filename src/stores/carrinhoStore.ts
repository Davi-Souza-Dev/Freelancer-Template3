import type { Produto } from '@/types'
import { defineStore } from 'pinia'

const useCarrinhoStore = defineStore('carrinho', {
  state: () => ({
    produtos: [] as Produto[],
  }),

  getters: {
    getProdutos: (state) => state.produtos,
    getTotal: (state) => {
      let total = 0
      state.produtos.map((produto) => {
        total += produto.price
      })
      return total
    },
  },
  actions: {
    setProduto(produto: Produto) {
      const produtoExistente = this.produtos.find((p) => p.id === produto.id)
      if (produtoExistente == undefined) {
        this.produtos.push(produto)
        return
      }
    },
    removerProduto(id: number) {
      this.produtos = this.produtos.filter((p) => p.id !== id)
      return this.produtos
    },
    removerTodos() {
      this.produtos = []
    },
    findProduto(id: number) {
      const produto = this.produtos.find((produto) => produto.id == id)
      return produto
    },
    updateProduto(produto: Produto) {
      const index = this.produtos.findIndex((p) => p.id === produto.id)

      if (index !== -1) {
        this.produtos[index] = { ...this.produtos[index], ...produto }
      }
    },
  },
  persist: {
    storage: sessionStorage,
  },
})

export default useCarrinhoStore
