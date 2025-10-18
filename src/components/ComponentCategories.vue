<script lang="ts" setup>
interface Props {
  id: number
  nome: string
}
const props = defineProps<Props>()
const emit = defineEmits(['selectCat'])
const selectCat = () => {
  emit('selectCat', props.id)
}
</script>

<template>
  <label :for="'cat' + props.id" @input="selectCat()">
    <input type="radio" name="rdCat" :id="'cat' + props.id" :checked="props.id == 1" />

    <div class="category">
      <span>{{ props.nome }}</span>
    </div>
  </label>
</template>

<style scoped>
.category {
  width: fit-content;
  padding: 10px 20px;
  border-radius: 5px;
}

.category span {
  font-weight: bolder;
  font-family: var(--font);
  text-transform: uppercase;
  color: var(--color2);
}

input {
  display: none;
}

input[type='radio']:checked + .category {
  outline: 1px solid var(--color1);
}

input[type='radio']:checked + .category span {
  color: var(--color1);
}
</style>
