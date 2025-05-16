<template>
  <section
    id="hero"
    class="relative h-screen w-full bg-cover bg-right lg:bg-bottom flex items-center justify-center z-0"
    :style="{ backgroundImage: `url(${oceanRing})` }"
  >

    <!-- Overlay -->
    <div class="absolute inset-0 bg-opacity-30 z-2 pointer-events-none"/>

    <!-- Content -->
    <div class="relative z-20 text-center px-4">
      <h1 class="italic text-4xl md:text-6xl mb-2">
        {{ $t('hero.names') }}
      </h1>
      <div class="w-24 h-1 bg-white mx-auto my-6"/>
      <p class="text-xl md:text-2xl mb-6">{{ $t('hero.marrying') }}</p>
      <p class="font-light text-2xl md:text-3xl">{{ $t('hero.date') }}</p>
      <div class="mt-12">
        <button class="rsvp-button">
          <span>
            <a
              href="#rsvp"
              class="inline-block bg-white px-8 py-3 rounded-full text-lg font-medium hover:bg--50 transition-colors"
            >{{ $t('hero.rsvp') }}</a>
          </span>
        </button>
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

.rsvp-button {
  position: relative;
  padding: 10px 22px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.rsvp-button:active {
  transform: scale(0.96);
}

.rsvp-button:before,
.rsvp-button:after {
  position: absolute;
  content: "";
  width: 150%;
  left: 50%;
  height: 100%;
  transform: translateX(-50%);
  z-index: -1000;
  background-repeat: no-repeat;
}

.rsvp-button:hover:before {
  top: -70%;
  background-image: radial-gradient(circle, #7d2ae8 20%, transparent 20%),
    radial-gradient(circle, transparent 20%, #7d2ae8 20%, transparent 30%),
    radial-gradient(circle, #7d2ae8 20%, transparent 20%),
    radial-gradient(circle, #7d2ae8 20%, transparent 20%),
    radial-gradient(circle, transparent 10%, #7d2ae8 15%, transparent 20%),
    radial-gradient(circle, #7d2ae8 20%, transparent 20%),
    radial-gradient(circle, #7d2ae8 20%, transparent 20%),
    radial-gradient(circle, #7d2ae8 20%, transparent 20%),
    radial-gradient(circle, #7d2ae8 20%, transparent 20%);
  background-size: 10% 10%, 20% 20%, 15% 15%, 20% 20%, 18% 18%, 10% 10%, 15% 15%,
    10% 10%, 18% 18%;
  background-position: 50% 120%;
  animation: greentopBubbles 0.6s ease;
}

@keyframes greentopBubbles {
  0% {
    background-position: 5% 90%, 10% 90%, 10% 90%, 15% 90%, 25% 90%, 25% 90%,
      40% 90%, 55% 90%, 70% 90%;
  }

  50% {
    background-position: 0% 80%, 0% 20%, 10% 40%, 20% 0%, 30% 30%, 22% 50%,
      50% 50%, 65% 20%, 90% 30%;
  }

  100% {
    background-position: 0% 70%, 0% 10%, 10% 30%, 20% -10%, 30% 20%, 22% 40%,
      50% 40%, 65% 10%, 90% 20%;
    background-size: 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%;
  }
}

.rsvp-button:hover::after {
  bottom: -70%;
  background-image: radial-gradient(circle, #7d2ae8 20%, transparent 20%),
    radial-gradient(circle, #7d2ae8 20%, transparent 20%),
    radial-gradient(circle, transparent 10%, #7d2ae8 15%, transparent 20%),
    radial-gradient(circle, #7d2ae8 20%, transparent 20%),
    radial-gradient(circle, #7d2ae8 20%, transparent 20%),
    radial-gradient(circle, #7d2ae8 20%, transparent 20%),
    radial-gradient(circle, #7d2ae8 20%, transparent 20%);
  background-size: 15% 15%, 20% 20%, 18% 18%, 20% 20%, 15% 15%, 20% 20%, 18% 18%;
  background-position: 50% 0%;
  animation: greenbottomBubbles 0.6s ease;
}

@keyframes greenbottomBubbles {
  0% {
    background-position: 10% -10%, 30% 10%, 55% -10%, 70% -10%, 85% -10%,
      70% -10%, 70% 0%;
  }

  50% {
    background-position: 0% 80%, 20% 80%, 45% 60%, 60% 100%, 75% 70%, 95% 60%,
      105% 0%;
  }

  100% {
    background-position: 0% 90%, 20% 90%, 45% 70%, 60% 110%, 75% 80%, 95% 70%,
      110% 10%;
    background-size: 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%;
  }
}
</style>
