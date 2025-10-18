<script lang="ts" setup>
import Button from '@/components/Cart/ComponentButtonFinal.vue'
import Card from '@/components/Cart/ComponentCartProduct.vue'
import ComponentPopUp from '@/components/Cart/ComponentCartPopUp.vue'
import Header from '@/components/ComponentHeader.vue'
import useCarrinhoStore from '@/stores/carrinhoStore'
import { onMounted, ref } from 'vue'
import ButtonBack from '@/components/Cart/ComponentButtonBack.vue'

const carrinhoStore = useCarrinhoStore()
interface Produto {
  id: number
  idCategoria: number
  title: string
  desc: string
  price: number
  image: string
  quant: number
}

const popup = ref(false)

const produtos = ref<Produto[]>([])

const vazio = ref(true)

// PEGANDO OS DADOS
onMounted(() => {
  produtos.value = carrinhoStore.getProdutos
  if (produtos.value.length > 0) {
    vazio.value = false
  }
})

// Mostrar PopUp
const showPopUp = () => {
  popup.value = true
}

// LIMPAR TODOS OS PRODUTO
const clearAll = () => {
  carrinhoStore.removerTodos()
  produtos.value = carrinhoStore.getProdutos
  vazio.value = true
}

const removerProduto = (id: number) => {
  produtos.value = carrinhoStore.removerProduto(id)
  if (produtos.value.length  == 0) {
    vazio.value = true
  }
}
</script>

<template>
  <Header />
  <ComponentPopUp v-show="popup" />
  <div class="containerProducts vazio" v-show="vazio">
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <path
          d="M9 11V6C9 4.34315 10.3431 3 12 3C13.6569 3 15 4.34315 15 6V10.9673M10.4 21H13.6C15.8402 21 16.9603 21 17.816 20.564C18.5686 20.1805 19.1805 19.5686 19.564 18.816C20 17.9603 20 16.8402 20 14.6V12.2C20 11.0799 20 10.5198 19.782 10.092C19.5903 9.71569 19.2843 9.40973 18.908 9.21799C18.4802 9 17.9201 9 16.8 9H7.2C6.0799 9 5.51984 9 5.09202 9.21799C4.71569 9.40973 4.40973 9.71569 4.21799 10.092C4 10.5198 4 11.0799 4 12.2V14.6C4 16.8402 4 17.9603 4.43597 18.816C4.81947 19.5686 5.43139 20.1805 6.18404 20.564C7.03968 21 8.15979 21 10.4 21Z"
          stroke="#000000"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
      </g>
    </svg>
    <h1>Sacola Vazia</h1>
  </div>
  <div class="containerFooter" v-show="vazio">
    <ButtonBack />
  </div>
  <div class="containerProducts" v-show="!vazio">
    <div class="containerTitle">
      <h1>Produtos</h1>
      <button class="btnDelete" @click="clearAll">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <path
              d="M7 9.5L12 14.5M12 9.5L7 14.5M19.4922 13.9546L16.5608 17.7546C16.2082 18.2115 16.032 18.44 15.8107 18.6047C15.6146 18.7505 15.3935 18.8592 15.1583 18.9253C14.8928 19 14.6042 19 14.0271 19H6.2C5.07989 19 4.51984 19 4.09202 18.782C3.71569 18.5903 3.40973 18.2843 3.21799 17.908C3 17.4802 3 16.9201 3 15.8V8.2C3 7.0799 3 6.51984 3.21799 6.09202C3.40973 5.71569 3.71569 5.40973 4.09202 5.21799C4.51984 5 5.07989 5 6.2 5H14.0271C14.6042 5 14.8928 5 15.1583 5.07467C15.3935 5.14081 15.6146 5.2495 15.8107 5.39534C16.032 5.55998 16.2082 5.78846 16.5608 6.24543L19.4922 10.0454C20.0318 10.7449 20.3016 11.0947 20.4054 11.4804C20.4969 11.8207 20.4969 12.1793 20.4054 12.5196C20.3016 12.9053 20.0318 13.2551 19.4922 13.9546Z"
              stroke="#000000"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </g>
        </svg>
        Limpar Tudo
      </button>
    </div>
    <Card
      v-for="(produto, index) in produtos"
      :key="produto.id"
      :produto="produto"
      :fundo="index % 2 === 0 ? 'b1' : 'b2'"
      @remover-produto="removerProduto(produto.id)"
    />
  </div>
  <div class="containerFooter" v-show="!vazio">
    <div class="containerTotal">
      <span class="tag">Total</span>
      <span class="price">{{
        new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(carrinhoStore.getTotal)
      }}</span>
    </div>
    <Button @click="showPopUp" />
  </div>
</template>

<style lang="css" scoped>
.containerTitle {
  width: 100%;
  display: flex;
  position: relative;
  align-items: center;
  gap: 10px;
  justify-content: space-between;
}

.containerTitle h1 {
  font-weight: bolder;
  font-family: var(--font);
  text-transform: capitalize;
  font-size: 1.4rem;
}

.containerTitle .btnDelete {
  width: fit-content;
  height: 40px;
  background: none;
  border-radius: 5px;
  cursor: cell;
  font-weight: bolder;
  font-family: var(--font);
  text-transform: capitalize;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color1);
}

.btnDelete svg {
  width: 30px;
}

.btnDelete svg path {
  stroke: var(--color1);
}

.containerProducts {
  width: 100%;
  height: fit-content;
  display: flex;
  gap: 10px;
  flex-direction: column;
  padding: 20px;
  margin-bottom: 100px;
  position: relative;
  overflow-x: hidden;
}

.containerFooter {
  width: 100%;
  height: 150px;
  border-radius: 20px 20px 0px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 20px;
  position: fixed;
  bottom: -10px;
  gap: 30px;
  outline: 2px solid var(--color1-2);
  box-shadow: -4px 8px 14px black;
  background: white;
}

.containerTotal {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.tag {
  padding: 5px;
  font-weight: var(--font);
  font-size: 1rem;
  text-transform: uppercase;
  background: var(--color1-2);
  border-radius: 5px;
  outline: 2px solid var(--color1);
  color: var(--color1);
  font-weight: bolder;
}

.price {
  font-size: 1rem;
  font-weight: bolder;
  text-transform: uppercase;
  font-family: var(--font);
}

/* SE TIVER VAZIO */

.vazio {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  height: 50vh !important;
}

.vazio svg {
  width: 100px;
  height: 100px;
}

.vazio svg path {
  stroke: var(--color1);
}

.vazio h1 {
  font-weight: bolder;
  font-family: var(--font);
  text-transform: capitalize;
  font-size: 1.4rem;
  color: var(--color1);
}
</style>
