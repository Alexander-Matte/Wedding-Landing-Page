<template>
  <div class="min-h-screen bg-wedding-white flex flex-col">
    <!-- Language Selector -->
    <div class="fixed top-4 right-4 z-50">
      <LanguageSelector />
    </div>

    <main class="flex-1 flex flex-col items-center justify-center px-4 py-16 sm:py-24">
      <div class="max-w-2xl mx-auto text-center">
        <!-- Names -->
        <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light italic mb-4 text-gray-800 animate-fade-in-up">
          {{ $t('thankYou.names') }}
        </h1>

        <!-- Married statement -->
        <p class="text-xl sm:text-2xl md:text-3xl mb-2 text-gray-600 animate-fade-in-up animation-delay-200">
          {{ $t('thankYou.married') }}
        </p>

        <!-- Date -->
        <p class="text-lg sm:text-xl text-wedding-btn-pink mb-10 animate-fade-in-up animation-delay-200">
          {{ $t('thankYou.date') }}
        </p>

        <!-- Decorative divider -->
        <div class="flex justify-center items-center mb-10 animate-fade-in-up animation-delay-300">
          <div class="w-16 h-0.5 bg-gradient-to-r from-transparent to-wedding-pink"></div>
          <div class="w-10 h-10 bg-gradient-to-br from-wedding-pink to-wedding-btn-pink rounded-full flex items-center justify-center mx-4 shadow-md">
            <UIcon name="i-lucide-heart" class="w-5 h-5 text-white" />
          </div>
          <div class="w-16 h-0.5 bg-gradient-to-l from-transparent to-wedding-pink"></div>
        </div>

        <!-- Thank You Headline -->
        <h2 class="text-3xl sm:text-4xl font-light italic mb-6 text-gray-800 animate-fade-in-up animation-delay-400">
          {{ $t('thankYou.headline') }}
        </h2>

        <!-- Thank you message -->
        <p class="text-base sm:text-lg text-gray-600 leading-relaxed mb-12 animate-fade-in-up animation-delay-400">
          {{ $t('thankYou.message') }}
        </p>

        <!-- Photos card -->
        <div class="card p-8 sm:p-10 mb-12 animate-fade-in-up animation-delay-500">
          <div class="flex justify-center mb-4">
            <div class="w-12 h-12 bg-wedding-off-pink rounded-full flex items-center justify-center">
              <UIcon name="i-lucide-camera" class="w-6 h-6 text-wedding-btn-pink" />
            </div>
          </div>
          <h3 class="text-xl sm:text-2xl font-light italic mb-3 text-gray-800">
            {{ $t('thankYou.photos.title') }}
          </h3>
          <p class="text-gray-600 leading-relaxed">
            {{ $t('thankYou.photos.message') }}
          </p>
        </div>

        <!-- Closing -->
        <div class="animate-fade-in-up animation-delay-600">
          <p class="text-lg italic text-gray-500 mb-2">
            {{ $t('thankYou.closing') }}
          </p>
          <p class="text-xl sm:text-2xl font-light italic text-gray-800">
            {{ $t('thankYou.signature') }}
          </p>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup>
</script>

<style scoped>
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
</style>
