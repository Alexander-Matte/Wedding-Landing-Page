<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const items: NavigationMenuItem[] = [
  {
    label: 'Our Story',
    icon: 'i-lucide-heart',
    to: '/our-story'
  },
  {
    label: 'Wedding Outline',
    icon: 'i-lucide-calendar-heart',
    to: '/wedding-outline'
  },
  {
    label: 'Location',
    icon: 'i-lucide-map-pin',
    to: '/location'
  },
  {
    label: 'How to get here',
    icon: 'i-lucide-car',
    to: '/directions'
  },
  {
    label: 'Accommodations',
    icon: 'i-lucide-hotel',
    to: '/accommodations'
  },
  {
    label: 'Gifts',
    icon: 'i-lucide-gift',
    to: '/gifts'
  },
  {
    label: 'Contact',
    icon: 'i-lucide-mail',
    to: '/contact'
  }
]
</script>

<template>
  <UNavigationMenu :items="items" class="w-full justify-center" />
</template>
