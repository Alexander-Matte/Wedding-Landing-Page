<template>
  <nav
    class="fixed w-full z-50 transition-all duration-500 ease-in-out"
    :class="[
      isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0',
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-wedding-pink/20' : 'bg-transparent border-b border-transparent'
    ]"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16 lg:h-20">
        <!-- Logo -->
        <NuxtLink
          :to="locale === 'de' ? '/de' : '/'"
          class="flex items-center space-x-2 group"
        >
          <div class="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-wedding-pink to-wedding-btn-pink rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
            <span class="text-white font-medium text-sm lg:text-base tracking-wider">M&A</span>
          </div>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <div class="hidden lg:flex items-center space-x-8">
          <NuxtLink
            v-for="item in navigationItems"
            :key="item.key"
            :to="item.href"
            class="relative text-gray-700 hover:text-wedding-btn-pink transition-colors duration-300 font-medium group"
          >
            <span class="relative z-10">{{ $t(item.key) }}</span>
            <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-wedding-pink to-wedding-btn-pink transition-all duration-300 group-hover:w-full"></span>
          </NuxtLink>
        </div>

        <!-- Language Selector and Mobile Menu -->
        <div class="flex items-center space-x-4">
          <LanguageSelector class="hidden sm:block" />
          
          <!-- Mobile Menu Button -->
          <button
            @click="toggleMenu"
            class="lg:hidden p-2 rounded-lg hover:bg-wedding-pink/10 transition-colors duration-200 focus:outline-none relative z-50"
            :aria-expanded="isOpen"
            aria-label="Toggle navigation menu"
          >
            <UIcon 
              :name="isOpen ? 'i-lucide-x' : 'i-lucide-menu'" 
              class="size-6! text-gray-700 transition-all duration-300"
            />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu Overlay -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div
        v-if="isOpen"
        class="lg:hidden absolute top-full left-0 right-0 bg-white/98 backdrop-blur-md border-b border-wedding-pink/20 shadow-xl"
      >
        <div class="px-4 py-6 space-y-4">
          <NuxtLink
            v-for="item in navigationItems"
            :key="item.key"
            :to="item.href"
            class="block py-3 px-4 text-lg font-medium text-gray-700 hover:text-wedding-btn-pink hover:bg-wedding-pink/5 rounded-lg transition-all duration-200"
            @click="closeMenu"
          >
            {{ $t(item.key) }}
          </NuxtLink>
          
          <!-- Mobile Language Selector -->
          <div class="pt-4 border-t border-gray-200">
            <LanguageSelector />
          </div>
        </div>
      </div>
    </Transition>

    <!-- Backdrop for mobile menu -->
    <Transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
        @click="closeMenu"
      ></div>
    </Transition>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

const isOpen = ref(false)
const isVisible = ref(true)
const scrolled = ref(false)
const lastScrollY = ref(0)

// Navigation items configuration
const navigationItems = computed(() => [
  {
    key: 'navbar.story',
    href: locale.value === 'de' ? '/de#our-story' : '/#our-story'
  },
  {
    key: 'navbar.details',
    href: locale.value === 'de' ? '/de#details' : '/#details'
  },
  {
    key: 'navbar.schedule',
    href: locale.value === 'de' ? '/de#schedule' : '/#schedule'
  },
  {
    key: 'navbar.rsvp',
    href: locale.value === 'de' ? '/de#rsvp' : '/#rsvp'
  },
  {
    key: 'navbar.registry',
    href: locale.value === 'de' ? '/de#registry' : '/#registry'
  },
  {
    key: 'navbar.activities',
    href: locale.value === 'de' ? '/de/activities' : '/activities'
  },
  {
    key: 'navbar.contact',
    href: locale.value === 'de' ? '/de/contact' : '/contact'
  }
])

const toggleMenu = () => {
  isOpen.value = !isOpen.value
  // Prevent body scroll when menu is open
  if (isOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

const closeMenu = () => {
  isOpen.value = false
  document.body.style.overflow = ''
}

const handleScroll = () => {
  const currentScrollY = window.scrollY
  
  // Show/hide navbar based on scroll direction
  if (currentScrollY > lastScrollY.value && currentScrollY > 100) {
    isVisible.value = false
  } else {
    isVisible.value = true
  }
  
  // Add background when scrolled
  scrolled.value = currentScrollY > 50
  
  lastScrollY.value = currentScrollY
}

// Close menu on escape key
const handleKeydown = (event) => {
  if (event.key === 'Escape' && isOpen.value) {
    closeMenu()
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('keydown', handleKeydown)
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024 && isOpen.value) {
      closeMenu()
    }
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})
</script>

<style scoped>
/* Custom scrollbar for mobile menu */
.mobile-menu {
  scrollbar-width: thin;
  scrollbar-color: var(--color-wedding-pink) transparent;
}

.mobile-menu::-webkit-scrollbar {
  width: 4px;
}

.mobile-menu::-webkit-scrollbar-track {
  background: transparent;
}

.mobile-menu::-webkit-scrollbar-thumb {
  background: var(--color-wedding-pink);
  border-radius: 2px;
}
</style>


