<script setup lang="ts">
import { Pagination, Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'

const modules = [Pagination, Autoplay]
</script>

<template>
  <div class="containerPromotions">
    <h1>Promoções</h1>
    <div class="containerSlider">
      <swiper
        :pagination="{
          dynamicBullets: true,
        }"
        :modules="modules"
        :autoplay="{ delay: 2000 }"
        :loop="true"
        class="mySwiper"
      >
        <swiper-slide>
          <img
            src="https://placehold.co/1000x10000/FF6347/FFFFFF?text=Promoção+1"
            class="imgPromotion"
          />
        </swiper-slide>
        <swiper-slide>
          <img
            src="https://placehold.co/1000x10000/4682B4/FFFFFF?text=Promoção+2"
            class="imgPromotion"
          />
        </swiper-slide>
        <swiper-slide>
          <img
            src="https://placehold.co/1000x10000/32CD32/000000?text=Aviso"
            class="imgPromotion"
          />
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<style lang="css" scoped>
.containerPromotions {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.containerPromotions h1 {
  font-weight: bolder;
  font-family: var(--font);
  text-transform: capitalize;
  font-size: 1.2rem;
}

.mySwiper {
  max-width: 350px;
  height: 120px;
  border-radius: 10px;
}

.swiper-slide {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.swiper-slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

::v-deep(.swiper-pagination-bullet-active) {
  background: var(--color1);
}
</style>
