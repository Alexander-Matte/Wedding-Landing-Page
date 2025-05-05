<template>
  <section id="our-story" class="py-20 px-4">
    <div class="max-w-5xl mx-auto">
      <h2 class="text-3xl md:text-4xl text-center italic mb-12">
        {{ $t('our_story.title') }}
      </h2>
      <div class="grid">
        <!-- Image -->
        <div class="flex">
          <NuxtImg
            src="stock-image-rings.jpeg"
            alt="Accommodation image"
            class="flex flex-1 rounded-lg shadow-lg text-center justify-center"
            width="900"
            height="400"
          />

        </div>
      </div>
      <!-- Story Text -->
      <div class="space-y-6 mt-8">
        <p v-for="(paragraph, key) in tm('our_story.story')" :key="key" class="text-gray-700 leading-relaxed">
          {{ rt(paragraph) }}
        </p>
      </div>

      <!-- Quote -->
      <div class="mt-16 text-center">
        <p class="italic text-xl -600">
          "{{ $t('our_story.quote') }}"
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
const { tm, rt } = useI18n();
</script>

<style scoped>
/* Page-specific styles */
</style>
