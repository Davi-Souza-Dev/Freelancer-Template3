<script setup lang="ts">
// import { onMounted, ref } from 'vue';
import useCarrinhoStore from '@/stores/carrinhoStore'
import type { Produto } from '@/types'
import { ref } from 'vue'
const carrinhoStore = useCarrinhoStore()
const emit = defineEmits(['removerProduto'])

interface Props {
  produto: Produto
  fundo: string
}

const props = defineProps<Props>()

const productQuant = ref(props.produto.quant)
const unitPrice = ref(props.produto.price / productQuant.value)
const totalPrice = ref(unitPrice.value)
// ADICIONAR E REMOVER QUANTIA
const addQuant = () => {
  if (productQuant.value < 100) {
    productQuant.value++
    totalPrice.value = unitPrice.value * productQuant.value
    updateProduto()
  }
}

const removeQuant = () => {
  if (productQuant.value > 1) {
    productQuant.value = productQuant.value - 1
    totalPrice.value = unitPrice.value * productQuant.value
    updateProduto()
  }
}

const deleteProduto = () => {
  carrinhoStore.removerProduto(props.produto.id)
  emit('removerProduto')
}

const updateProduto = () => {
  const product: Produto = props.produto
  product.quant = productQuant.value
  product.price = totalPrice.value
  carrinhoStore.updateProduto(product)
}
</script>

<template>
  <div class="containerCard" :class="props.fundo">
    <img :src="produto.image" />
    <div class="containerInfo">
      <h1 class="title">{{ produto.title }}</h1>
      <p class="price">
        {{
          new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(totalPrice)
        }}
      </p>
      <div class="containerQuant">
        <button class="btnAdd" @click="addQuant">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="var(--contorno)">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <title></title>
              <g id="Complete">
                <g data-name="add" id="add-2">
                  <g>
                    <line
                      fill="none"
                      stroke="var(--contorno)"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      x1="12"
                      x2="12"
                      y1="19"
                      y2="5"
                    ></line>
                    <line
                      fill="none"
                      stroke="var(--contorno)"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      x1="5"
                      x2="19"
                      y1="12"
                      y2="12"
                    ></line>
                  </g>
                </g>
              </g>
            </g>
          </svg>
        </button>
        <div class="numQuant">
          {{ productQuant }}
        </div>
        <button class="btnRemove" @click="removeQuant">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M7 12L17 12"
                stroke="var(--contorno)"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </g>
          </svg>
        </button>
      </div>
      <button class="btnDelete" @click="deleteProduto">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <path
              d="M10 12V17"
              stroke="var(--contorno)"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M14 12V17"
              stroke="var(--contorno)"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M4 7H20"
              stroke="var(--contorno)"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10"
              stroke="var(--contorno)"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
              stroke="var(--contorno)"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </g>
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.b1 {
  --fundo: var(--color1-2);
  --contorno: var(--color1);
}

.b2 {
  --fundo: var(--color2-2);
  --contorno: var(--color2);
}

.containerCard {
  width: 100%;
  max-width: 500px;
  height: 100px;
  border-radius: 10px;
  padding: 5px;
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 10px;
  flex-wrap: nowrap;
  background: #f8f8f8;
  outline: 1px solid var(--contorno);
}

.containerCard img {
  aspect-ratio: 1 / 1;
  height: 100%;
  border-radius: 10px;
  object-fit: cover;
}

.containerInfo {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  font-family: var(--font);
  position: relative;
}

.containerInfo .title {
  font-size: 1.2rem;
  font-weight: 900;
  white-space: normal;
  overflow-wrap: break-word;
  word-break: break-word;
}

.containerInfo .price {
  font-size: 1rem;
  font-weight: 700;
}

.containerInfo .containerQuant {
  width: 100px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  position: absolute;
  bottom: 0;
  right: 40px;
}

.containerQuant button {
  width: 20px;
  height: 20px;
  outline: 2px solid var(--contorno);
  background: var(--fundo);
  display: flex;
  align-items: center;
  justify-content: center;
}

.containerQuant button svg {
  width: 80%;
  height: 80%;
}

.btnAdd {
  border-radius: 5px 0px 0px 5px;
}

.btnRemove {
  border-radius: 0px 5px 5px 0px;
}

.containerQuant .numQuant {
  width: 40px;
  height: 100%;
  text-align: center;
  border: none;
  outline: 2px solid var(--contorno);
  font-family: var(--font);
  font-weight: bolder;
  color: var(--contorno);
  background: #f8f8f8;
}

.containerInfo .btnDelete {
  width: 25px;
  height: 25px;
  background: none;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0;
  right: 0;
}

.btnDelete svg path {
  stroke: var(--contorno);
}
</style>
