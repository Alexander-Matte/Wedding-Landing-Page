<template>
  <footer id="footer" class="py-12 px-4 custom-border-top">
    <div class="max-w-5xl mx-auto text-center">
      <h2 class="italic text-3xl mb-6">
        {{ $t('footer.title')}}
      </h2>

      <div class="flex justify-center items-center mb-6">
        <div class="w-12 h-0.5 bg-gray-300"/>
        <UIcon name="i-heroicons-heart-solid" class="mx-4 text-gray-300" size="24" />
        <div class="w-12 h-0.5 bg-gray-300"/>
      </div>

      <p class="mb-8">{{ $t('footer.celebrationMessage')}}</p>

      <div class="text-gray-500 text-sm">
        <p>{{ $t('footer.eventDetails')}}</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.custom-border-top {
  border-top: 1px solid #e5e7eb;
  box-shadow: 0 -3px 8px rgba(0, 0, 0, 0.05);
}
</style>

