<template>
  <nav class="bg-white bg-opacity-90 backdrop-blur-sm fixed w-full z-10 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <span class="text-xl font-medium text-purple-700 italic">
            M & A
          </span>
        </div>
        <!-- Desktop menu -->
        <div class="hidden md:flex items-center space-x-8">
          <NuxtLink to="#our-story" class="text-gray-700 hover:text-purple-600 transition-colors">
            Our Story
          </NuxtLink>
          <NuxtLink to="#details" class="text-gray-700 hover:text-purple-600 transition-colors">
            Details
          </NuxtLink>
          <NuxtLink to="#schedule" class="text-gray-700 hover:text-purple-600 transition-colors">
            Schedule
          </NuxtLink>
          <NuxtLink to="#rsvp" class="text-gray-700 hover:text-purple-600 transition-colors">
            RSVP
          </NuxtLink>
          <NuxtLink to="#registry" class="text-gray-700 hover:text-purple-600 transition-colors">
            Registry
          </NuxtLink>
        </div>
        <!-- Mobile menu button -->
        <div class="md:hidden flex items-center">
          <Button @click="toggleMenu" variant="text" class="text-gray-700 hover:text-purple-600">
            <Icon :name="isOpen ? 'close' : 'menu'" size="24" />
          </Button>
        </div>
      </div>
    </div>
    <!-- Mobile menu -->
    <div v-if="isOpen" class="md:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1 bg-white">
        <NuxtLink to="#our-story" class="block px-3 py-2 text-base font-medium text-gray-700 hover:text-purple-600" @click="toggleMenu">
          Our Story
        </NuxtLink>
        <NuxtLink to="#details" class="block px-3 py-2 text-base font-medium text-gray-700 hover:text-purple-600" @click="toggleMenu">
          Details
        </NuxtLink>
        <NuxtLink to="#schedule" class="block px-3 py-2 text-base font-medium text-gray-700 hover:text-purple-600" @click="toggleMenu">
          Schedule
        </NuxtLink>
        <NuxtLink to="#rsvp" class="block px-3 py-2 text-base font-medium text-gray-700 hover:text-purple-600" @click="toggleMenu">
          RSVP
        </NuxtLink>
        <NuxtLink to="#registry" class="block px-3 py-2 text-base font-medium text-gray-700 hover:text-purple-600" @click="toggleMenu">
          Registry
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>

<script setup>

const isOpen = ref(false);

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};
</script>
