<!-- layouts/adminLayout.vue -->
<template>
  <div class="min-h-screen font-sans flex bg-wedding-pink">
    <!-- Navigation menu -->
    <UNavigationMenu
      orientation="vertical"
      :items="items"
      :collapsed= isCollapsed
      tooltip
      class="data-[orientation=vertical] px-4 py-6"
      :ui="{
        label: 'text-default font-bold text-lg',
        linkLeadingIcon: 'text-3xl',
      }"
    />

    <!-- Page content -->
    <main class="flex-1 flex flex-col bg-gray-100 overflow-x-hidden">
      <div class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 my-5">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '#components'
import type { NavigationMenuItem } from '@nuxt/ui'
const supabase = useSupabaseClient()


const isCollapsed = ref(false)

function updateCollapsed() {
  isCollapsed.value = window.innerWidth < 768
}

onMounted(() => {
  updateCollapsed()
  window.addEventListener('resize', updateCollapsed)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateCollapsed)
})

const logout = async () => {
  await supabase.auth.signOut()
  return navigateTo('/')
}


const items = ref<NavigationMenuItem[][]>([
  [
    {
      label: 'Wedding Admin',
      type: 'label',
    },
    {
      label: 'RSVPs',
      icon: 'emojione-v1:pages',
      to: '/admin/dashboard',
    },
    {
      label: 'Special Message',
      icon: 'emojione-v1:closed-mailbox-with-raised-flag',
      to: '/admin/message',
    }
  ],
  [
    {
      label: 'Back To Wedding Homepage',
      icon: 'emojione-v1:house',
      to: '/',
    },
    {
      label: 'Logout',
      icon: 'emojione-v1:door',
      onSelect: logout,
    }
  ]
])


</script>
