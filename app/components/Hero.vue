<template>
  <section
    id="hero"
    class="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
  >
    <!-- Background Image with Parallax Effect -->
    <div 
      class="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105"
      :style="{ backgroundImage: `url(${oceanRing})` }"
    >
      <!-- Light gradient overlay for subtle enhancement -->
      <div class="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white/10"></div>
    </div>

    <!-- Floating Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="floating-element floating-1"></div>
      <div class="floating-element floating-2"></div>
      <div class="floating-element floating-3"></div>
    </div>

    <!-- Main Content -->
    <div class="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <!-- Names -->
      <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light italic mb-4 text-gray-800 drop-shadow-lg animate-fade-in-up">
        {{ $t('hero.names') }}
      </h1>
      
      <!-- Decorative Line -->
      <div class="w-24 h-1 bg-gradient-to-r from-wedding-pink to-wedding-btn-pink mx-auto my-6 animate-fade-in-up animation-delay-200 shadow-lg"></div>
      
      <!-- Marrying Text -->
      <p class="text-xl sm:text-2xl md:text-3xl mb-6 text-gray-700 animate-fade-in-up animation-delay-300 drop-shadow-md">
        {{ $t('hero.marrying') }}
      </p>
      
      <!-- Date -->
      <p class="text-2xl sm:text-3xl md:text-4xl text-gray-800 mb-12 animate-fade-in-up animation-delay-400 drop-shadow-md">
        {{ $t('hero.date') }}
      </p>

      <!-- RSVP Button -->
      <div class="mb-12 animate-fade-in-up animation-delay-500">
        <a
          href="#rsvp"
          class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-wedding-pink to-wedding-btn-pink text-white text-lg font-medium rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 group"
        >
          <span class="mr-2">{{ $t('hero.rsvp') }}</span>
          <UIcon 
            name="i-lucide-arrow-right" 
            class="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" 
          />
        </a>
      </div>
      
      <!-- Countdown Display -->
      <div class="animate-fade-in-up animation-delay-600">
        <CountdownDisplay class="text-gray-800" />
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
      <div class="w-6 h-10 border-2 border-gray-600/50 rounded-full flex justify-center">
        <div class="w-1 h-3 bg-gray-600/70 rounded-full mt-2 animate-pulse"></div>
      </div>
    </div>
  </section>
</template>

<script setup>
import oceanRing from '@/assets/img/ocean-ring.jpeg'
</script>

<style scoped>
/* Floating Elements Animation */
.floating-element {
  position: absolute;
  background: rgba(240, 215, 209, 0.1);
  border-radius: 50%;
  animation: float 6s ease-in-out infinite;
}

.floating-1 {
  width: 80px;
  height: 80px;
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.floating-2 {
  width: 120px;
  height: 120px;
  top: 60%;
  right: 15%;
  animation-delay: 2s;
}

.floating-3 {
  width: 60px;
  height: 60px;
  bottom: 30%;
  left: 20%;
  animation-delay: 4s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
    opacity: 0.3;
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
    opacity: 0.6;
  }
}

/* Fade In Up Animation */
.animate-fade-in-up {
  animation: fadeInUp 1s ease-out forwards;
  opacity: 0;
  transform: translateY(30px);
}

.animation-delay-200 {
  animation-delay: 0.2s;
}

.animation-delay-300 {
  animation-delay: 0.4s;
}

.animation-delay-400 {
  animation-delay: 0.6s;
}

.animation-delay-500 {
  animation-delay: 0.8s;
}

.animation-delay-600 {
  animation-delay: 1s;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Typography */
@media (max-width: 640px) {
  h1 {
    font-size: 2.5rem;
    line-height: 1.1;
  }
  
  p {
    font-size: 1.125rem;
  }
}

@media (min-width: 641px) and (max-width: 1024px) {
  h1 {
    font-size: 3.5rem;
  }
}

/* Parallax Effect */
@media (prefers-reduced-motion: no-preference) {
  .parallax {
    transform: translateZ(0);
    will-change: transform;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .floating-element {
    background: rgba(255, 255, 255, 0.2);
  }
  
  h1, p {
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
  }
}

/* Print styles */
@media print {
  .floating-element,
  .scroll-indicator {
    display: none;
  }
  
  section {
    min-height: auto;
    page-break-inside: avoid;
  }
}
</style>
