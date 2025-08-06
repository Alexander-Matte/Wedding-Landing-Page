<template>
  <footer id="footer" class="py-12 px-4 bg-white border-t border-wedding-pink/20">
    <div class="max-w-4xl mx-auto text-center">
      <!-- Main Footer Content -->
      <div class="mb-8">
        <h2 class="text-2xl sm:text-3xl font-light italic mb-4 text-gray-800">
          {{ $t('footer.title') }}
        </h2>

        <!-- Decorative Heart -->
        <div class="flex justify-center items-center mb-6">
          <div class="w-12 h-0.5 bg-gradient-to-r from-transparent to-wedding-pink"></div>
          <div class="w-8 h-8 bg-gradient-to-br from-wedding-pink to-wedding-btn-pink rounded-full flex items-center justify-center mx-3 shadow-md">
            <UIcon name="i-lucide-heart" class="w-4 h-4 text-white" />
          </div>
          <div class="w-12 h-0.5 bg-gradient-to-l from-transparent to-wedding-pink"></div>
        </div>

        <p class="text-gray-700 mb-6 leading-relaxed">
          {{ $t('footer.celebrationMessage') }}
        </p>

        <!-- Event Details -->
        <div class="text-gray-600 text-sm">
          <p>{{ $t('footer.eventDetails') }}</p>
        </div>
      </div>

      <!-- Simple Links -->
      <div class="flex justify-center space-x-8 text-sm">
        <NuxtLink 
          to="/contact" 
          class="text-wedding-btn-pink hover:text-wedding-pink transition-colors"
        >
          Contact
        </NuxtLink>
        <NuxtLink 
          to="/activities" 
          class="text-wedding-btn-pink hover:text-wedding-pink transition-colors"
        >
          Activities
        </NuxtLink>
        <a 
          href="#rsvp" 
          class="text-wedding-btn-pink hover:text-wedding-pink transition-colors"
        >
          RSVP
        </a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
/* Responsive adjustments */
@media (max-width: 640px) {
  h2 {
    font-size: 1.75rem;
  }
  
  p {
    font-size: 0.875rem;
  }
}

/* Heart animation */
.heart-icon {
  animation: heartbeat 2s ease-in-out infinite;
}

@keyframes heartbeat {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

/* Print styles */
@media print {
  footer {
    border-top: 1px solid #ddd;
  }
}
</style>

