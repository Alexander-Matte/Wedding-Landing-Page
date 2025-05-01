<template>
    <section
      class="relative h-screen w-full bg-cover bg-bottom flex items-center justify-center z-0"
      :style="{ backgroundImage: `url(${oceanRing})` }"
    >

    <!-- Overlay -->
    <div class="absolute inset-0 bg-opacity-30 z-2 pointer-events-none"></div>


    <!-- Content -->
    <div class="relative z-20 text-center px-4">
      <h1 class="font-serif italic text-4xl md:text-6xl mb-2">
        Madeline Fehleisen &amp; Alexander Matte
      </h1>
      <div class="w-24 h-1 bg-white mx-auto my-6"></div>
      <p class="text-xl md:text-2xl mb-6">are getting married</p>
      <p class="font-light text-2xl md:text-3xl">June 6th, 2026</p>
      <div class="mt-12">
        <a
          href="#rsvp"
          class="inline-block bg-white px-8 py-3 rounded-full text-lg font-medium hover:bg--50 transition-colors"
        >
          RSVP
        </a>
      </div>
    </div>


    <!-- Bottom curve -->
    <div class="absolute bottom-0 left-0 w-full z-10 pointer-events-none">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" class="w-full">
        <path
          fill="#FAF9F6"
          fill-opacity="1"
          d="M0,288 C480,240 960,240 1440,288 L1440,320 L0,320 Z"
        />
      </svg>
    </div>

  </section>
</template>


<script setup>
import oceanRing from '@/assets/img/ocean-ring.jpeg'


</script>

<style scoped>

</style>
