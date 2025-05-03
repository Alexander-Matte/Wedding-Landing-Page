<template>
  <nav
    class="fixed w-full z-10 transition-transform transition-colors duration-700"
    :class="isVisible ? 'translate-y-0' : '-translate-y-full'"
    :style="backgroundStyle"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <div class="flex items-center">
          <span class="text-xl font-medium italic">M & A</span>
        </div>
        <!-- Desktop menu -->
        <div class="hidden md:flex items-center space-x-8">
          <NuxtLink to="#our-story" class="text-gray-700 transition-colors">
            <strong>{{ $t('navbar.story') }}</strong> 
          </NuxtLink>
          <NuxtLink to="#details" class="text-gray-700 transition-colors">
            <strong>{{ $t('navbar.details') }}</strong>
          </NuxtLink>
          <NuxtLink to="#schedule" class="text-gray-700 transition-colors">
            <strong>{{ $t('navbar.schedule') }}</strong>
          </NuxtLink>
          <NuxtLink to="#rsvp" class="text-gray-700 transition-colors">
            <strong>{{ $t('navbar.rsvp') }}</strong>
          </NuxtLink>
          <NuxtLink to="#registry" class="text-gray-700 transition-colors">
            <strong>{{ $t('navbar.registry') }}</strong>
          </NuxtLink>
        </div>
        <LanguageSelector />

        <!-- Mobile menu button -->
        <div class="md:hidden flex items-center">
          <UButton variant="text" class="text-gray-700" @click="toggleMenu"          >
            <UIcon :name="isOpen ? 'lucide:x' : 'i-lucide-menu'" size="24" />
          </UButton>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <div v-if="isOpen" class="md:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1 bg-[#FAF9F6]">
        <NuxtLink
          to="#our-story"
          class="block px-3 py-2 text-base font-medium text-gray-700"
          @click="toggleMenu"
        >
          Our Story
        </NuxtLink>
        <NuxtLink
          to="#details"
          class="block px-3 py-2 text-base font-medium text-gray-700"
          @click="toggleMenu"
        >
          Details
        </NuxtLink>
        <NuxtLink
          to="#schedule"
          class="block px-3 py-2 text-base font-medium text-gray-700"
          @click="toggleMenu"
        >
          Schedule
        </NuxtLink>
        <NuxtLink
          to="#rsvp"
          class="block px-3 py-2 text-base font-medium text-gray-700"
          @click="toggleMenu"
        >
          RSVP
        </NuxtLink>
        <NuxtLink
          to="#registry"
          class="block px-3 py-2 text-base font-medium text-gray-700"
          @click="toggleMenu"
        >
          Registry
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';

const isOpen = ref(false);
const isVisible = ref(true);
const lastScrollY = ref(0);
const currentScrollY = ref(0);

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

const handleScroll = () => {
  currentScrollY.value = window.scrollY;

  // Hide on scroll down, show on scroll up
  if (currentScrollY.value > lastScrollY.value && currentScrollY.value > 200) {
    isVisible.value = false;
  } else {
    isVisible.value = true;
  }

  lastScrollY.value = currentScrollY.value;
};

// Background style that fades in white between 200px and 400px
const backgroundStyle = computed(() => {
  const y = currentScrollY.value;

  if (y <= 200) {
    return { backgroundColor: 'rgba(250, 249, 246, 0)' };
  }

  const alpha = Math.min((y - 200) / 200, 1); // fade in between 200–400
  return { backgroundColor: `rgba(250, 249, 246, ${alpha})` };
});



onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>
