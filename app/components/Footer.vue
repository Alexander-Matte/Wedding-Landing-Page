<template>
  <footer class="py-10 px-4 bg-white border-t border-wedding-pink/20">
    <div class="max-w-2xl mx-auto text-center">
      <h2 class="text-xl sm:text-2xl font-light italic mb-3 text-gray-800">
        {{ $t('footer.title') }}
      </h2>

      <div class="flex justify-center items-center mb-4">
        <div class="w-10 h-0.5 bg-gradient-to-r from-transparent to-wedding-pink"></div>
        <div class="w-6 h-6 bg-gradient-to-br from-wedding-pink to-wedding-btn-pink rounded-full flex items-center justify-center mx-3 shadow-sm">
          <UIcon name="i-lucide-heart" class="w-3 h-3 text-white" />
        </div>
        <div class="w-10 h-0.5 bg-gradient-to-l from-transparent to-wedding-pink"></div>
      </div>

      <p class="text-gray-600 text-sm mb-2">
        {{ $t('footer.message') }}
      </p>
      <p class="text-gray-400 text-xs">
        {{ $t('footer.date') }}
      </p>
    </div>
  </footer>
</template>
