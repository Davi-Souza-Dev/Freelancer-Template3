<script lang="ts" setup>
import { ref } from 'vue'

// emit de clique no card
const emit = defineEmits(['clickProduct'])

interface Props {
  id: number
  title: string
  image: string
  price: number
  fundo: string
  selected: boolean
}

const props = defineProps<Props>()
const select = ref(props.selected)
const clickProduct = () => {
  emit('clickProduct', props.id)
}
</script>
<template>
  <div class="containerProduct b1" :class="props.fundo" @click="clickProduct()">
    <img :src="image" />
    <span class="title">{{ props.title }}</span>
    <div class="containerInfo">
      <span class="price">
        {{
          new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(props.price)
        }}</span
      >
      <div class="btnAdd">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          v-if="select == false"
        >
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
        <svg v-else viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <g id="Interface / Check">
              <path
                id="Vector"
                d="M6 12L10.2426 16.2426L18.727 7.75732"
                stroke="#000000"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </g>
          </g>
        </svg>
      </div>
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

.containerProduct {
  width: 150px;
  min-height: 180px;
  max-height: fit-content;
  outline: 1px solid var(--contorno);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  background: #f8f8f8;
  padding: 5px 5px 10px 5px;
  gap: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.containerProduct img {
  width: 100%;
  height: 100px;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border-radius: 5px;
}

.containerProduct > .containerInfo {
  width: 100%;
  height: 100%;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: nowrap;
}

.title {
  width: 100%;
  font-weight: bolder;
  font-family: var(--font);
  font-size: 1rem;
  text-transform: capitalize;
  word-wrap: break-word;
  white-space: normal;
}

.containerInfo .btnAdd {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--contorno);
}

.btnAdd svg {
  width: 80%;
}

.btnAdd svg path {
  stroke: var(--fundo);
}

.price {
  font-weight: bolder;
  font-family: var(--font);
  font-size: 0.9rem;
  text-transform: capitalize;
}
</style>
