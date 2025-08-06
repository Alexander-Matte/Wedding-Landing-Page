<template>
  <section id="registry" class="section-padding">
    <div class="section-max-width">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2 class="text-3xl sm:text-4xl md:text-5xl font-light italic mb-6 text-gray-800">
          {{ $t('registry.title') }}
        </h2>
        <div class="w-16 h-0.5 bg-gradient-to-r from-wedding-pink to-wedding-btn-pink mx-auto"></div>
      </div>

      <!-- Registry Content Card -->
      <div class="card max-w-4xl mx-auto p-8 lg:p-12 text-center">
        <!-- Decorative Icon -->
        <div class="w-20 h-20 bg-gradient-to-br from-wedding-pink/20 to-wedding-btn-pink/20 rounded-full flex items-center justify-center mx-auto mb-8">
          <UIcon name="i-lucide-heart" class="w-10 h-10 text-wedding-btn-pink" />
        </div>

        <!-- Content -->
        <div class="space-y-8">
          <p class="text-lg lg:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
            {{ $t('registry.paragraph1') }}
          </p>
          
          <div class="w-16 h-0.5 bg-wedding-pink/30 mx-auto"></div>
          
          <p class="text-lg lg:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
            {{ $t('registry.paragraph2') }}
          </p>
          
          <div class="w-16 h-0.5 bg-wedding-pink/30 mx-auto"></div>
          
          <p class="text-lg lg:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto font-medium">
            {{ $t('registry.paragraph3') }}
          </p>
        </div>

        <!-- Decorative Elements -->
        <div class="mt-12 flex justify-center space-x-4">
          <div class="w-3 h-3 bg-wedding-pink rounded-full"></div>
          <div class="w-3 h-3 bg-wedding-btn-pink rounded-full"></div>
          <div class="w-3 h-3 bg-wedding-pink rounded-full"></div>
        </div>
      </div>

      <!-- Additional Info Cards -->
      <div class="grid md:grid-cols-2 gap-8 mt-16 max-w-4xl mx-auto">
        <!-- Presence Card -->
        <div class="card p-6 text-center">
          <div class="w-12 h-12 bg-wedding-pink/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <UIcon name="i-lucide-users" class="w-6 h-6 text-wedding-btn-pink" />
          </div>
          <h3 class="text-xl font-medium text-gray-800 mb-3">{{ $t('registry.presenceCard.title') }}</h3>
          <p class="text-gray-600">
            {{ $t('registry.presenceCard.description') }}
          </p>
        </div>

        <!-- Future Card -->
        <div class="card p-6 text-center">
          <div class="w-12 h-12 bg-wedding-btn-pink/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <UIcon name="i-lucide-home" class="w-6 h-6 text-wedding-pink" />
          </div>
          <h3 class="text-xl font-medium text-gray-800 mb-3">{{ $t('registry.futureCard.title') }}</h3>
          <p class="text-gray-600">
            {{ $t('registry.futureCard.description') }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// No logic needed for static content
</script>

<style scoped>
/* Responsive adjustments */
@media (max-width: 768px) {
  .card {
    padding: 1.5rem;
  }
  
  .grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .section-padding {
    padding: 3rem 1rem;
  }
  
  h2 {
    font-size: 2rem;
  }
  
  p {
    font-size: 1rem;
  }
}

/* Smooth animations */
.card {
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

/* Print styles */
@media print {
  .card {
    box-shadow: none;
    border: 1px solid #ddd;
  }
  
  .card:hover {
    transform: none;
  }
}
</style>
