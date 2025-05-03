<template>
  <section id="our-story" class="py-20 px-4">
    <div class="max-w-5xl mx-auto">
      <h2 class="text-3xl md:text-4xl text-center italic mb-12">
        {{ $t('our_story.title') }}
      </h2>
      <div class="grid md:grid-cols-2 gap-10 items-center">
        <!-- Image -->
        <div>
          <img
            src="https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80"
            alt="Madeline and Alexander"
            class="rounded-lg shadow-lg w-full h-auto"
          >
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
// Your page-specific logic here (if needed)
</script>

<style scoped>
/* Page-specific styles */
</style>
