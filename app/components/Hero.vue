<template>
    <section
      class="relative h-screen w-full bg-cover bg-bottom flex items-center justify-center z-0"
      :style="{ backgroundImage: `url(${oceanRing})` }"
    >

    <!-- Overlay -->
    <div class="absolute inset-0 bg-opacity-30 z-10"></div>

    <!-- Content -->
    <div class="relative z-20 text-center text-white px-4">
      <h1 class="font-serif italic text-4xl md:text-6xl mb-2">
        Madeline Fehleisen &amp; Alexander Matte
      </h1>
      <div class="w-24 h-1 bg-white mx-auto my-6"></div>
      <p class="text-xl md:text-2xl mb-6">are getting married</p>
      <p class="font-light text-2xl md:text-3xl">August 12, 2023</p>
      <div class="mt-12">
        <a
          href="#rsvp"
          class="inline-block bg-white text-purple-700 px-8 py-3 rounded-full text-lg font-medium hover:bg-purple-50 transition-colors"
        >
          RSVP
        </a>
      </div>
    </div>

    <!-- Bottom wave -->
    <div class="absolute bottom-0 left-0 w-full z-30">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" class="w-full">
        <path
          fill="#ffffff"
          fill-opacity="1"
          d="M0,96L48,106.7C96,117,192,139,288,133.3C384,128,480,96,576,90.7C672,85,768,107,864,128C960,149,1056,171,1152,160C1248,149,1344,107,1392,85.3L1440,64L1440,320L0,320Z"
        />
      </svg>
    </div>
  </section>
</template>


<script setup>
import oceanRing from '@/assets/img/ocean-ring.jpeg'
import oceanRing1 from '@/assets/img/ocean-ring1.jpeg'


</script>

<style scoped>

</style>
