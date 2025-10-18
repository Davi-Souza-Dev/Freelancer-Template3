<script setup lang="ts">
import type { Categoria, Produto } from '@/types'

import Header from '@/components/ComponentHeader.vue'
import Categories from '@/components/ComponentCategories.vue'
import Promotion from '@/components/ComponentPromotion.vue'
import Product from '@/components/ComponentCardProduct.vue'
import PopUp from '@/components/ComponentPopUp.vue'
import { onMounted, ref } from 'vue'
import axios from 'axios'

import useCarrinhoStore from '@/stores/carrinhoStore'

const carrinhoStore = useCarrinhoStore()

const fundoPopUp = ref('b1')
const showPopUp = ref(false)

const categorias = ref<Categoria[]>([])
const produtos = ref<Produto[]>([])
const produto = ref<Produto>({
  id: 0,
  idCategoria: 0,
  title: '',
  desc: '',
  price: 0,
  image: '',
  quant: 1,
})

// PEGANDO OS DADOS
onMounted(async () => {
  try {
    const response = await axios.get('/db.json')
    categorias.value = response.data.categorias
    selectCat(1)
  } catch (error) {
    console.error(error)
  }
})

// VERIFICAR SE ALGUM PRODUTO JA FOI SELECIONADO
const produtoChecked = (idProduto: number) => {
  return carrinhoStore.getProdutos.some((produto) => produto.id === idProduto)
}

// SELECIONAR OS PRODUTOS DE UMA CATEGORIA
const selectCat = async (idCat: number) => {
  try {
    const response = await axios.get('/db.json')
    produtos.value = response.data.produtos.filter((p: Produto) => p.idCategoria == idCat)
  } catch (error) {
    console.error(error)
  }
}

const clickProduct = (idProduto: number, fundo: string) => {
  showPopUp.value = true
  const produtoEncontrado = produtos.value.find((p) => p.id === Number(idProduto))
  if (produtoEncontrado) {
    produto.value = produtoEncontrado
  }
  fundoPopUp.value = fundo
}

// FEHCAR O POPUP
const closePopUp = () => {
  showPopUp.value = false
}

// CONTROLAR PESQUISA DE PRODUTO
const searching = ref(false)
const searchProduto = ref('')
const toggleSearching = () => {
  searching.value = !searching.value
  searchProduto.value = ''
}

const inputSearching = async () => {
  try {
    staySearching()
    const response = await axios.get('/db.json')
    const search = searchProduto.value.toLowerCase().trim()
    produtos.value = response.data.produtos.filter((p: Produto) =>
      p.title.toLowerCase().includes(search),
    )
  } catch (error) {
    console.error(error)
  }
}

const staySearching = () => {
  if (searchProduto.value == '') {
    searching.value = false
  }
}
</script>

<template>
  <Header />
  <div class="containerIndex">
    <Promotion />
    <div class="containerProducts">
      <div class="containerTitle">
        <div class="containerSearch">
          <button class="btnSearch" @click="toggleSearching()">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="SVGRepo_bgCarrier" stroke-width="2"></g>
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M4 11C4 7.13401 7.13401 4 11 4C14.866 4 18 7.13401 18 11C18 14.866 14.866 18 11 18C7.13401 18 4 14.866 4 11ZM11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C13.125 20 15.078 19.2635 16.6177 18.0319L20.2929 21.7071C20.6834 22.0976 21.3166 22.0976 21.7071 21.7071C22.0976 21.3166 22.0976 20.6834 21.7071 20.2929L18.0319 16.6177C19.2635 15.078 20 13.125 20 11C20 6.02944 15.9706 2 11 2Z"
                  fill="var(--color1)"
                ></path>
              </g>
            </svg>
          </button>
          <input
            type="text"
            name="txtSearch"
            v-show="searching"
            v-model="searchProduto"
            @input="inputSearching"
          />
        </div>
        <h1 v-show="!searching">Produtos</h1>
      </div>
      <div class="containerCategories" v-show="!searching">
        <Categories
          v-for="categoria in categorias"
          :key="categoria.id"
          :nome="categoria.nome"
          :id="categoria.id"
          @select-cat="selectCat(categoria.id)"
        />
      </div>
      <div class="containerGrid">
        <Product
          v-for="produto in produtos"
          :key="produto.id + '-' + carrinhoStore.getProdutos.length"
          :id="produto.id"
          :selected="produtoChecked(produto.id)"
          :price="produto.price"
          :title="produto.title"
          :image="produto.image"
          :fundo="Math.floor(produto.id / 2) % 2 === 0 ? 'b1' : 'b2'"
          @click-product="
            clickProduct(produto.id, Math.floor(produto.id / 2) % 2 === 0 ? 'b1' : 'b2')
          "
        />

        <PopUp v-show="showPopUp" @close="closePopUp" :fundo="fundoPopUp" :produto="produto" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.containerIndex {
  width: 100%;
  height: fit-content;
  display: flex;
  gap: 50px;
  flex-direction: column;
  padding: 20px;
  position: relative;
  overflow-x: hidden;
}

.containerCategories {
  width: 100%;
  height: fit-content;
  padding: 10px 5px;
  display: flex;
  align-items: center;
  gap: 10px;
  overflow-x: scroll;
}

.containerProducts {
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
}

.containerTitle {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  position: sticky;
  top: 10px;
}

.containerTitle h1 {
  font-weight: bolder;
  font-family: var(--font);
  text-transform: capitalize;
  font-size: 1.4rem;
}

.containerTitle .containerSearch {
  width: fit-content;
  display: flex;
}

.containerTitle .btnSearch {
  width: 40px;
  height: 40px;
  background: var(--color1-2);
  outline: 2px solid var(--color1);
  border-radius: 5px;
  cursor: cell;
  z-index: 1;
}

.btnSearch svg {
  width: 50%;
}

.containerSearch input {
  width: 180px;
  outline: 2px solid var(--color1);
  border-radius: 0px 5px 5px 0px;
  padding: 8px;
  font-size: 1rem;
  font-family: var(--font);
  font-weight: 500;
  background: #fafafa;
  color: var(--color1);
  text-transform: capitalize;
}

.containerGrid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); /* se adapta */
  gap: 30px 50px; /* espaçamento horizontal e vertical */
  justify-items: center; /* centraliza os cards */
  align-items: start;
  padding: 20px;
  box-sizing: border-box;
}
</style>
