<template>
  <section id="our-story" class="section-padding bg-wedding-white">
    <div class="section-max-width">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2 class="text-3xl sm:text-4xl md:text-5xl font-light italic mb-6 text-gray-800">
          {{ $t('our_story.title') }}
        </h2>
        <div class="w-16 h-0.5 bg-gradient-to-r from-wedding-pink to-wedding-btn-pink mx-auto"></div>
      </div>

      <!-- Story Content -->
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <!-- Image Section -->
        <div class="relative group">
          <div class="relative overflow-hidden rounded-2xl shadow-2xl">
            <img
              src="/img/stock-image-rings.jpeg"
              alt="Wedding rings representing our love story"
              class="w-full h-80 sm:h-96 lg:h-[500px] object-cover transform group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
            <!-- Overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
          
          <!-- Decorative Elements -->
          <div class="absolute -top-4 -right-4 w-20 h-20 bg-wedding-pink/20 rounded-full blur-xl"></div>
          <div class="absolute -bottom-4 -left-4 w-16 h-16 bg-wedding-btn-pink/20 rounded-full blur-xl"></div>
        </div>

        <!-- Text Content -->
        <div class="space-y-8">
          <div class="space-y-6">
            <p 
              v-for="(paragraph, key) in tm('our_story.story')" 
              :key="key" 
              class="text-lg leading-relaxed text-gray-800 font-light"
            >
              {{ rt(paragraph) }}
            </p>
          </div>

          <!-- Quote Section -->
          <div class="relative mt-12 p-8 bg-gradient-to-br from-wedding-off-pink to-wedding-pink/30 rounded-2xl border border-wedding-pink/20">
            <div class="absolute -top-3 -left-3 w-8 h-8 bg-wedding-pink rounded-full flex items-center justify-center">
              <UIcon name="i-lucide-quote" class="w-4 h-4 text-white" />
            </div>
            <blockquote class="text-xl sm:text-2xl italic text-gray-900 font-light leading-relaxed">
              "{{ $t('our_story.quote') }}"
            </blockquote>
            <div class="absolute -bottom-3 -right-3 w-8 h-8 bg-wedding-btn-pink rounded-full flex items-center justify-center">
              <UIcon name="i-lucide-quote" class="w-4 h-4 text-white rotate-180" />
            </div>
          </div>
        </div>
      </div>

      <!-- Timeline Elements (Mobile) -->
      <div class="mt-16 lg:hidden">
        <div class="flex items-center justify-center space-x-4">
          <div class="w-3 h-3 bg-wedding-pink rounded-full"></div>
          <div class="w-12 h-0.5 bg-wedding-pink/30"></div>
          <div class="w-3 h-3 bg-wedding-btn-pink rounded-full"></div>
          <div class="w-12 h-0.5 bg-wedding-pink/30"></div>
          <div class="w-3 h-3 bg-wedding-pink rounded-full"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const { tm, rt } = useI18n();
</script>

<style scoped>
/* Smooth animations */
.group:hover img {
  transform: scale(1.05);
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .section-padding {
    padding: 4rem 1rem;
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
  
  blockquote {
    font-size: 1.125rem;
  }
}

/* Print styles */
@media print {
  .group:hover img {
    transform: none;
  }
  
  .absolute {
    position: static;
  }
}
</style>
