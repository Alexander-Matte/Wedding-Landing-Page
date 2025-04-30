<template>
    <div class="relative flex md:items-center flex-col md:flex-row">
      <!-- Left content -->
      <div
        class="md:w-1/2 md:pr-12 mb-4 md:mb-0"
        :class="isEven ? 'md:order-1 md:text-right' : ''"
      >
        <h3 class="text-xl font-medium text-purple-700">{{ item.title }}</h3>
        <p class="text-gray-600">{{ item.time }}</p>
        <div class="mt-2 text-gray-700">
          <p>{{ item.description }}</p>
        </div>
      </div>
  
      <!-- Dot -->
      <div class="hidden md:block absolute left-1/2 -ml-3 w-6 h-6 rounded-full bg-purple-100 border-4 border-purple-400"></div>
  
      <!-- Right content -->
      <div class="md:w-1/2 md:pl-12" :class="isEven ? 'md:order-2' : ''">
        <div class="md:hidden mb-2">
          <div class="w-6 h-6 rounded-full bg-purple-100 border-4 border-purple-400"></div>
        </div>
      </div>
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
  

<style scoped>
/* Page-specific styles */
</style>
