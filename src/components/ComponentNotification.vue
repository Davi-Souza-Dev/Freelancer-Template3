<script setup lang="ts">
interface Props {
  msg: string
}
const props = defineProps<Props>()
</script>

<template>
  <div class="notification">
    <div class="icon">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M9 17H5.6C4.35 17 3.72 17 3.59 16.9C3.44 16.79 3.4 16.72 3.38 16.54C3.37 16.38 3.75 15.75 4.52 14.48C5.32 13.18 6 11.29 6 8.6C6 7.11 6.63 5.69 7.76 4.64C8.88 3.59 10.41 3 12 3C13.59 3 15.12 3.59 16.24 4.64C17.37 5.69 18 7.11 18 8.6C18 11.29 18.68 13.18 19.47 14.48C20.24 15.75 20.63 16.38 20.61 16.54C20.6 16.72 20.56 16.79 20.41 16.9C20.28 17 19.65 17 18.39 17H15M9 17V18C9 19.66 10.34 21 12 21C13.66 21 15 19.66 15 18V17H9Z"
          stroke="var(--color1)"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
    <span>{{ props.msg }}</span>
  </div>
</template>

<style scoped>
.notification {
  --bg: #ffffff;
  --shadow: rgba(0, 0, 0, 0.12);
  --anim: cubic-bezier(0.16, 1, 0.3, 1);

  display: flex;
  align-items: center;
  gap: 14px;

  position: fixed;
  right: 25px;
  bottom: 50px;

  background: var(--bg);
  border-left: 5px solid var(--color1);
  box-shadow: 0 5px 25px var(--shadow);
  border-radius: 14px;
  padding: 14px 22px;
  min-width: 220px;

  font-family: var(--font);
  font-weight: 800;
  font-size: 1rem;
  color: var(--color1);
  text-transform: capitalize;

  animation: slideUp 0.4s var(--anim), fadeIn 0.3s ease-in-out;
  z-index: 200;
}

.icon {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon svg {
  width: 90%;
  height: 90%;
}

@keyframes slideUp {
  from {
    transform: translateY(25px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0.5;
  }
  to {
    opacity: 1;
  }
}

@media (max-width: 600px) {
  .notification {
    right: 10px;
    bottom: 20px;
    font-size: 0.9rem;
    padding: 12px 18px;
    min-width: 200px;
  }
}
</style>
