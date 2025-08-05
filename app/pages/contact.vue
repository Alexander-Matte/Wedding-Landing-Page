<template>
  <div class="min-h-screen bg-wedding-white">
    <Navbar />
    
    <!-- Hero Section -->
    <section class="pt-32 pb-16 px-4 bg-gradient-to-br from-wedding-off-pink to-wedding-pink/20">
      <div class="section-max-width text-center">
        <h1 class="text-4xl sm:text-5xl md:text-6xl font-light italic mb-6 text-gray-800">
          {{ $t('contact.title') }}
        </h1>
      </div>
    </section>

    <!-- Contact Content -->
    <section class="section-padding">
      <div class="section-max-width">
        <!-- Contact Information -->
        <div class="card p-8 lg:p-12 max-w-2xl mx-auto">
          <div class="text-center">
            <div class="w-20 h-20 bg-gradient-to-br from-wedding-pink/20 to-wedding-btn-pink/20 rounded-full flex items-center justify-center mx-auto mb-8">
              <UIcon name="i-lucide-heart" class="w-10 h-10 text-wedding-btn-pink" />
            </div>
            
            <h2 class="text-2xl sm:text-3xl font-light italic mb-6 text-gray-800">
              {{ $t('contact.getInTouch') }}
            </h2>
            
            <p class="text-lg text-gray-600 mb-8 leading-relaxed">
              {{ $t('contact.description') }}
            </p>

            <!-- Contact Methods -->
            <div class="space-y-6 mb-8">
              <!-- Email -->
              <div class="flex items-center space-x-4 p-4 bg-white/50 rounded-xl border border-wedding-pink/20 hover:shadow-md transition-all duration-300 group">
                <div class="w-12 h-12 bg-wedding-pink/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <UIcon name="i-lucide-mail" class="w-6 h-6 text-wedding-btn-pink" />
                </div>
                <div class="text-center flex-1">
                  <h3 class="font-medium text-gray-800 mb-1">Email</h3>
                  <a 
                    href="mailto:alexandmadiswedding@gmail.com"
                    class="text-wedding-btn-pink hover:text-wedding-pink transition-colors font-medium"
                    :aria-label="`${$t('contact.email_label')} alexandmadiswedding@gmail.com`"
                  >
                    alexandmadiswedding@gmail.com
                  </a>
                </div>
              </div>

              <!-- WhatsApp -->
              <div class="flex items-center space-x-4 p-4 bg-white/50 rounded-xl border border-wedding-pink/20 hover:shadow-md transition-all duration-300 group">
                <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <UIcon name="i-lucide-message-circle" class="w-6 h-6 text-green-600" />
                </div>
                <div class="text-center flex-1">
                  <h3 class="font-medium text-gray-800 mb-1">{{ $t('contact.whatsapp') }}</h3>
                  <p class="text-gray-600 text-sm">
                    {{ $t('contact.whatsappDesc') }}
                  </p>
                </div>
              </div>

              <!-- Response Time -->
              <div class="flex items-center space-x-4 p-4 bg-white/50 rounded-xl border border-wedding-pink/20">
                <div class="w-12 h-12 bg-wedding-btn-pink/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <UIcon name="i-lucide-clock" class="w-6 h-6 text-wedding-btn-pink" />
                </div>
                <div class="text-center flex-1">
                  <h3 class="font-medium text-gray-800 mb-1">{{ $t('contact.responseTime') }}</h3>
                  <p class="text-gray-600 text-sm">
                    {{ $t('contact.responseTimeDesc') }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Call to Action -->
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:alexandmadiswedding@gmail.com"
                class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-wedding-pink to-wedding-btn-pink text-white font-medium rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <UIcon name="i-lucide-mail" class="w-5 h-5 mr-2" />
                {{ $t('contact.sendEmail') }}
              </a>
              <NuxtLink 
                :to="`/${locale === 'de' ? 'de' : ''}#rsvp`"
                class="inline-flex items-center px-6 py-3 border-2 border-wedding-btn-pink text-wedding-btn-pink font-medium rounded-full hover:bg-wedding-btn-pink hover:text-white transition-all duration-300"
              >
                <UIcon name="i-lucide-check-circle" class="w-5 h-5 mr-2" />
                {{ $t('contact.rsvpNow') }}
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Additional Information -->
        <div class="mt-16 text-center">
          <div class="card p-8 max-w-2xl mx-auto">
            <div class="w-16 h-16 bg-wedding-pink/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <UIcon name="i-lucide-info" class="w-8 h-8 text-wedding-btn-pink" />
            </div>
            <h3 class="text-xl font-medium text-gray-800 mb-4">
              {{ $t('contact.needHelp') }}
            </h3>
            <p class="text-gray-600">
              {{ $t('contact.note') }}
            </p>
          </div>
        </div>

      </div>
    </section>
  </div>
</template>

<script setup>
// No form handling needed
</script>

<style scoped>
/* Responsive adjustments */
@media (max-width: 768px) {
  .card {
    padding: 1.5rem;
  }
}

@media (max-width: 640px) {
  .section-padding {
    padding: 2rem 1rem;
  }
  
  h1 {
    font-size: 2.5rem;
  }
  
  h2 {
    font-size: 1.75rem;
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
