<script setup lang="ts">
import useCarrinhoStore from '@/stores/carrinhoStore'
import type { Produto } from '@/types'
import { ref, watch } from 'vue'
import Notification from '@/components/ComponentNotification.vue'

const showNotification = ref(false)
const noticationMsg = ref('')

const cart = useCarrinhoStore()

interface Props {
  produto: Produto
  fundo: string
}

const props = defineProps<Props>()
const emit = defineEmits(['close'])

// PREÇO TOTAL
const productQuant = ref(props.produto.quant)
const unitPrice = ref(props.produto.price)
const totalPrice = ref(unitPrice.value)

watch(props, (newProduto) => {
  productQuant.value = newProduto.produto.quant
  unitPrice.value = newProduto.produto.price
  totalPrice.value = unitPrice.value * productQuant.value
})

// ADICIONAR E REMOVER QUANTIA
const addQuant = () => {
  if (productQuant.value < 100) productQuant.value++
  totalPrice.value = unitPrice.value * productQuant.value
}

const removeQuant = () => {
  if (productQuant.value > 1) productQuant.value--
  totalPrice.value = unitPrice.value * productQuant.value
}

const closePopUp = () => {
  emit('close')
}

// ADICIONAR O PRODUTO AO CARRINHO
const addCart = () => {
  const product: Produto = props.produto
  product.quant = productQuant.value
  product.price = totalPrice.value
  
  // SE JA TIVER NO CARRINHO
  if (cart.findProduto(props.produto.id)) {
    cart.updateProduto(product)
    notification('Produto Atualizado!')
    return
  }

  cart.setProduto(product)
  notification('Produto Adicionado!')
}

const notification = (msg: string) => {
  showNotification.value = true
  noticationMsg.value = msg
  setTimeout(() => {
    showNotification.value = false
  }, 2000)
}
</script>

<template>
  <div class="background" :class="props.fundo">
    <Notification :msg="noticationMsg" v-show="showNotification" />
    <div class="containerPopUp">
      <button class="btnClose" id="btnClose" @click="closePopUp()">
        <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#000000">
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <path
              fill="#000000"
              d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z"
            ></path>
          </g>
        </svg>
      </button>
      <img :src="props.produto.image" alt="" />
      <h1>{{ props.produto.title }}</h1>
      <p>
        {{ props.produto.desc }}
      </p>
      <div class="containerFooter">
        <div class="containerQuant">
          <button id="btnRemove" @click="removeQuant">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M7 12L17 12"
                  stroke="#000000"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </g>
            </svg>
          </button>
          <div class="quantDisplay">{{ productQuant }}</div>
          <button id="btnAdd" @click="addQuant">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <g id="Edit / Add_Plus">
                  <path
                    id="Vector"
                    d="M6 12H12M12 12H18M12 12V18M12 12V6"
                    stroke="#000000"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </g>
              </g>
            </svg>
          </button>
        </div>
        <div class="containerFinish">
          <button id="btnAddCart" @click="addCart">Adicionar</button>
          <p class="totalPrice">
            {{
              new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(totalPrice)
            }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.b1 {
  --secundario: var(--color1-2);
  --principal: var(--color1);
}

.b2 {
  --secundario: var(--color2-2);
  --principal: var(--color2);
}

.background {
  position: fixed;
  bottom: 0px;
  width: 100%;
  /* margin-left: -20px; */
  height: 100vh;
  background: rgba(0, 0, 0, 0.137);
  z-index: 100;
  backdrop-filter: blur(2px); /* opcional, dá um efeito bonito */
}

.btnClose {
  width: 30px;
  height: 30px;
  position: absolute;
  right: 10px;
  top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--secundario);
  border-radius: 50%;
}

.btnClose svg {
  width: 60%;
}

.btnClose svg path {
  fill: var(--principal);
}
.containerPopUp {
  width: 100%;
  height: 70%;
  background: white;
  position: absolute;
  bottom: 0px;
  border-radius: 20px 20px 0px 0px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.containerPopUp > img {
  width: 150px;
  height: 150px;
  border-radius: 5px;
  object-fit: cover;
}

.containerPopUp > h1 {
  font-weight: bolder;
  font-family: var(--font);
  text-transform: capitalize;
  font-size: 2rem;
}

.containerPopUp > p {
  font-weight: 500;
  font-family: var(--font);
  text-transform: capitalize;
  font-size: 1rem;
  text-align: justify;
}

.containerFooter {
  width: 100%;
  height: 120px;
  background-color: var(--secundario);
  border-radius: 10px 10px 0px 0px;
  position: absolute;
  bottom: 0px;
  margin-left: -20px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  justify-content: space-around;
}

.containerQuant {
  flex: fit-content;
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  background: #ffffff;
  gap: 10px;
  padding: 10px;
}

.containerQuant button {
  width: 23px;
  height: 23px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: var(--secundario);
}

.containerQuant button svg {
  width: 60%;
}

.containerQuant button svg path {
  stroke: var(--principal);
}

.containerQuant .quantDisplay {
  font-weight: bolder;
  font-family: var(--font);
  text-transform: capitalize;
  font-size: 1.2rem;
  color: var(--principal);
  text-align: justify;
}

.containerFinish {
  width: 80%;
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  background: #ffffff;
  padding: 10px;
}

.containerFinish button {
  padding: 5px 10px;
  height: 35px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: var(--secundario);
  font-weight: bolder;
  font-family: var(--font);
  text-transform: capitalize;
  font-size: 1.3rem;
  color: var(--principal);
  text-align: justify;
}

.containerFinish .totalPrice {
  font-weight: bolder;
  font-family: var(--font);
  text-transform: capitalize;
  font-size: 1.2rem;
  color: var(--principal);
  text-align: justify;
}
</style>
