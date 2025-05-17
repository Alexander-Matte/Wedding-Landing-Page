<template>
  <nav
    class="fixed w-full z-10 transition-transform transition-colors duration-700"
    :class="isVisible ? 'translate-y-0' : '-translate-y-full'"
    :style="backgroundStyle"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <NuxtLink
          :to="locale === 'de' ? '/de' : '/'">
          <span class="text-xl font-medium italic">M & A</span>
        </NuxtLink>
        <!-- Desktop menu -->
        <div class="hidden md:flex items-center space-x-8">
          <NuxtLink
            :to="locale === 'de' ? '/de#our-story' : '/#our-story'"
            class="text-gray-700 transition-colors"
          >
            <strong>{{ $t('navbar.story') }}</strong>
          </NuxtLink>

          <NuxtLink
            :to="locale === 'de' ? '/de#details' : '/#details'"
            class="text-gray-700 transition-colors"
          >
            <strong>{{ $t('navbar.details') }}</strong>
          </NuxtLink>

          <NuxtLink
            :to="locale === 'de' ? '/de#schedule' : '/#schedule'"
            class="text-gray-700 transition-colors"
          >
            <strong>{{ $t('navbar.schedule') }}</strong>
          </NuxtLink>

          <NuxtLink
            :to="locale === 'de' ? '/de#rsvp' : '/#rsvp'"
            class="text-gray-700 transition-colors"
          >
            <strong>{{ $t('navbar.rsvp') }}</strong>
          </NuxtLink>

          <NuxtLink
            :to="locale === 'de' ? '/de#registry' : '/#registry'"
            class="text-gray-700 transition-colors"
          >
            <strong>{{ $t('navbar.registry') }}</strong>
          </NuxtLink>
          <NuxtLink
            :to="locale === 'de' ? '/de/activities' : '/activities'"
            class="text-gray-700 transition-colors"
            @click="toggleMenu"
          >
          <strong>{{ $t('navbar.activities') }}</strong>
          </NuxtLink>
          <NuxtLink
            :to="locale === 'de' ? '/de/contact' : '/contact'"
            class="text-gray-700 transition-colors"
            @click="toggleMenu"
          >
          <strong>{{ $t('navbar.contact') }}</strong>
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
          :to="locale === 'de' ? '/de#our-story' : '/#our-story'"
          class="block px-3 py-2 text-base font-medium text-gray-700"
          @click="toggleMenu"
        >
          {{ $t('navbar.story') }}
        </NuxtLink>
        <NuxtLink
          :to="locale === 'de' ? '/de#details' : '/#details'"
          class="block px-3 py-2 text-base font-medium text-gray-700"
          @click="toggleMenu"
        >
          {{ $t('navbar.details') }}
        </NuxtLink>
        <NuxtLink
          :to="locale === 'de' ? '/de#schedule' : '/#schedule'"
          class="block px-3 py-2 text-base font-medium text-gray-700"
          @click="toggleMenu"
        >
          {{ $t('navbar.schedule') }}
        </NuxtLink>
        <NuxtLink
          :to="locale === 'de' ? '/de#rsvp' : '/#rsvp'"
          class="block px-3 py-2 text-base font-medium text-gray-700"
          @click="toggleMenu"
        >
          {{ $t('navbar.rsvp') }}
        </NuxtLink>
        <NuxtLink
          :to="locale === 'de' ? '/de#registry' : '/#registry'"
          class="block px-3 py-2 text-base font-medium text-gray-700"
          @click="toggleMenu"
        >
          {{ $t('navbar.registry') }}
        </NuxtLink>
        <NuxtLink
          :to="locale === 'de' ? '/de/activities' : '/activities'"
          class="block px-3 py-2 text-base font-medium text-gray-700"
          @click="toggleMenu"
        >
          {{ $t('navbar.activities') }}
        </NuxtLink>
        <NuxtLink
          :to="locale === 'de' ? '/de/contact' : '/contact'"
          class="block px-3 py-2 text-base font-medium text-gray-700"
          @click="toggleMenu"
        >
          {{ $t('navbar.contact') }}
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

const isOpen = ref(false)
const isVisible = ref(true)
const lastScrollY = ref(0)
const currentScrollY = ref(0)

// Initialize with fallback values (0)
const fadeStart = ref(0)
const fadeEnd = ref(0)

const updateThresholds = () => {
  fadeStart.value = window.innerHeight * 0.2
  fadeEnd.value = window.innerHeight * 0.4
}

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const handleScroll = () => {
  currentScrollY.value = window.scrollY

  if (
    currentScrollY.value > lastScrollY.value &&
    currentScrollY.value > fadeStart.value
  ) {
    isVisible.value = false
  } else if (
    currentScrollY.value < lastScrollY.value &&
    currentScrollY.value > fadeStart.value
  ) {
    isVisible.value = true
  } else if (currentScrollY.value <= fadeStart.value) {
    isVisible.value = true
  }

  lastScrollY.value = currentScrollY.value
}

const backgroundStyle = computed(() => {
  const y = currentScrollY.value

  if (y <= fadeStart.value) {
    return { backgroundColor: 'rgba(250, 249, 246, 0)' }
  }

  const alpha = Math.min((y - fadeStart.value) / (fadeEnd.value - fadeStart.value), 1)
  return { backgroundColor: `rgba(250, 249, 246, ${alpha})` }
})

onMounted(() => {
  // Only now window is available
  updateThresholds()
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('resize', updateThresholds)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', updateThresholds)
})
</script>


