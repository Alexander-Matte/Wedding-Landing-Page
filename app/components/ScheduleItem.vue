<template>
  <div class="relative flex flex-col lg:flex-row lg:items-center">
    <!-- Timeline Dot - Desktop Only -->
    <div class="hidden lg:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
      <div class="w-6 h-6 rounded-full bg-white border-4 border-wedding-pink shadow-lg flex items-center justify-center">
        <div class="w-3 h-3 rounded-full bg-wedding-btn-pink"></div>
      </div>
    </div>

    <!-- Content Card -->
    <div 
      class="relative lg:ml-0 lg:w-1/2 p-6 bg-white rounded-2xl shadow-lg border border-wedding-pink/20 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
      :class="isEven ? 'lg:order-2 lg:ml-12' : 'lg:mr-12'"
    >
      <!-- Time Badge -->
      <div class="inline-flex items-center px-3 py-1 bg-gradient-to-r from-wedding-pink/20 to-wedding-btn-pink/20 rounded-full text-sm font-medium text-wedding-btn-pink mb-4">
        <UIcon name="i-lucide-clock" class="w-4 h-4 mr-2" />
        {{ item.time }}
      </div>

      <!-- Title -->
      <h3 class="text-xl lg:text-2xl font-medium text-gray-800 mb-3">
        {{ item.title }}
      </h3>

      <!-- Description -->
      <p class="text-gray-600 leading-relaxed">
        {{ item.description }}
      </p>

      <!-- Decorative Corner -->
      <div class="absolute top-0 right-0 w-8 h-8 bg-gradient-to-br from-wedding-pink/20 to-transparent rounded-bl-2xl"></div>
    </div>

    <!-- Spacer for desktop layout -->
    <div class="hidden lg:block lg:w-1/2" :class="isEven ? 'lg:order-1' : ''"></div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  item: {
    title: string
    time: string
    description: string
  }
  isEven: boolean
}>()
</script>

<style scoped>
/* Responsive adjustments */
@media (max-width: 1024px) {
  .timeline-dot {
    left: 2rem;
  }
}

@media (max-width: 640px) {
  .content-card {
    margin-left: 3rem;
  }
}

/* Hover effects */
.content-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

/* Animation for timeline dots */
.timeline-dot {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
}

/* Print styles */
@media print {
  .content-card {
    box-shadow: none;
    border: 1px solid #ddd;
  }
  
  .content-card:hover {
    transform: none;
  }
}
</style>
