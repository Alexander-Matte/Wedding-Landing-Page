<template>
  <div
    class="relative flex flex-col md:flex-row md:items-center text-center md:text-left"
  >
    <!-- Dot timeline and connecting line (Desktop only) -->
    <div class="hidden md:block absolute left-1/2 -ml-3 w-6 h-6 rounded-full bg-wedding-off-pink border-2 border-wedding-btn-pink z-10" />


    <!-- Left content -->
    <div
      class="md:w-1/2 mb-4 md:mb-0 px-4"
      :class="isEven ? 'md:order-2 md:pl-12' : 'md:pr-12'"
    >
      <h3 class="text-xl font-medium">{{ item.title }}</h3>
      <p class="text-gray-600">{{ item.time }}</p>
      <div class="mt-2 text-gray-700">
        <p>{{ item.description }}</p>
      </div>
    </div>

    <!-- Right content (spacer or optional content) -->
    <div class="md:w-1/2 px-4" :class="isEven ? 'md:order-1' : ''">
      <!-- Optional extra content on right if needed -->
    </div>
  </div>

  <!-- Down arrow (Mobile only) -->
  <div class="md:hidden flex justify-center mb-4">
  <img
      src="/wildflowers1.jpeg"
      alt="Scroll down indicator"
      class=""
    />
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
