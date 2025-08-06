<template>
  <div class="min-h-screen">
    <!-- Main content -->
    <main class="flex-1 flex flex-col py-8">
      <!-- Content -->
      <div class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <!-- Error State -->
        <div v-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4">
          <div class="flex">
            <UIcon name="i-lucide-alert-circle" class="w-5 h-5 text-red-400 mr-3" />
            <div>
              <h3 class="text-sm font-medium text-red-800">Error</h3>
              <p class="text-sm text-red-700 mt-1">{{ error }}</p>
            </div>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="flex justify-center items-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
        <!-- Welcome Header -->
        <div class="bg-gradient-to-r from-blue-500 to-pink-500 rounded-2xl shadow-xl p-8 text-white text-center relative overflow-hidden">
          <div class="absolute inset-0 bg-black/10"></div>
          <div class="relative z-10">
            <div class="flex justify-center mb-4">
              <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <UIcon name="i-lucide-heart" class="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 class="text-3xl md:text-4xl font-bold mb-2">Hello Madi and Alex! 💍</h1>
            <p class="text-lg text-white/90 mb-6">Your special day is getting closer! 🎉</p>
            <div class="flex justify-center mb-4">
              <div class="w-full max-w-md">
                <CountdownDisplay />
              </div>
            </div>
            <p class="text-white/80">Here's your wedding RSVP dashboard</p>
          </div>
        </div>

        <!-- Stats Overview -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <!-- Total RSVPs -->
          <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">Total RSVPs</p>
                <p class="text-3xl font-bold text-gray-900">{{ totalRSVPs }}</p>
              </div>
              <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <UIcon name="i-lucide-users" class="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <!-- Attending -->
          <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">Attending</p>
                <p class="text-3xl font-bold text-green-600">{{ totalAttending }}</p>
              </div>
              <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <UIcon name="i-lucide-check-circle" class="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <!-- Not Attending -->
          <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">Not Attending</p>
                <p class="text-3xl font-bold text-red-600">{{ totalNotAttending }}</p>
              </div>
              <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <UIcon name="i-lucide-x-circle" class="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>

          <!-- Response Rate -->
          <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">Response Rate</p>
                <p class="text-3xl font-bold text-purple-600">{{ responseRate }}%</p>
              </div>
              <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <UIcon name="i-lucide-percent" class="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        <!-- Guest Breakdown -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Adults vs Children -->
          <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <UIcon name="i-lucide-pie-chart" class="w-5 h-5 mr-2 text-blue-600" />
              Guest Breakdown
            </h3>
            <div class="space-y-4">
              <div class="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div class="flex items-center">
                  <UIcon name="i-lucide-user" class="w-5 h-5 text-blue-600 mr-3" />
                  <span class="font-medium text-gray-700">Adults</span>
                </div>
                <span class="text-2xl font-bold text-blue-600">{{ totalAdults }}</span>
              </div>
              <div class="flex items-center justify-between p-3 bg-pink-50 rounded-lg">
                <div class="flex items-center">
                  <UIcon name="i-lucide-baby" class="w-5 h-5 text-pink-600 mr-3" />
                  <span class="font-medium text-gray-700">Children</span>
                </div>
                <span class="text-2xl font-bold text-pink-600">{{ totalChildren }}</span>
              </div>
            </div>
          </div>

          <!-- Recent Activity -->
          <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <UIcon name="i-lucide-activity" class="w-5 h-5 mr-2 text-green-600" />
              Recent Activity
            </h3>
            <div class="space-y-3">
              <div v-for="rsvp in recentRSVPs" :key="rsvp.id" class="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50">
                <div class="w-2 h-2 rounded-full" :class="rsvp.attending ? 'bg-green-500' : 'bg-red-500'"></div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-gray-900 truncate">{{ rsvp.name }}</p>
                  <p class="text-xs text-gray-500">{{ formatDate(rsvp.created_at) }}</p>
                </div>
                <UBadge :color="rsvp.attending ? 'green' : 'red'" variant="subtle" size="sm">
                  {{ rsvp.attending ? 'Yes' : 'No' }}
                </UBadge>
              </div>
            </div>
          </div>


        </div>

        <!-- RSVPs Table -->
        <div class="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div class="p-6 border-b border-gray-200">
            <h2 class="text-2xl font-bold text-gray-800 flex items-center">
              <UIcon name="i-lucide-list" class="w-6 h-6 mr-3 text-blue-600" />
              RSVP Responses
            </h2>
            <p class="text-gray-600 mt-1">Detailed view of all RSVP submissions</p>
          </div>
          <div class="overflow-x-auto w-full">
                          <UTable
                v-model:expanded="expanded"
                :data="data"
                :columns="columns"
                row-type="RSVP"
                :ui="{
                  table: 'w-full text-sm table-fixed',
                  thead: 'bg-gray-50',
                  th: 'text-gray-700 font-semibold px-2 sm:px-4 py-3 text-left whitespace-nowrap border-b border-gray-200',
                  td: 'px-2 sm:px-4 py-3 border-b border-gray-100 text-gray-700',
                  tr: 'hover:bg-gray-50 transition-colors duration-150'
                }"
                class="w-full"
              >
              <template #expanded="{ row }">
                <div class="p-4 sm:p-6 bg-gradient-to-r from-blue-50 to-pink-50 border-t border-gray-200 w-full">
                  <div class="space-y-4 sm:space-y-6 w-full">
                    <!-- Message Section -->
                    <div class="bg-white rounded-lg p-4 shadow-sm w-full">
                      <h3 class="font-semibold text-gray-800 mb-3 flex items-center">
                        <UIcon name="i-lucide-message-circle" class="w-4 h-4 mr-2 text-blue-600 flex-shrink-0" />
                        Message
                      </h3>
                      <p class="text-gray-700 italic break-words whitespace-normal overflow-hidden">
                        {{ (row.original as RSVP).message ? (row.original as RSVP).message : 'No message provided' }}
                      </p>
                    </div>

                    <!-- Song Section -->
                    <div class="bg-white rounded-lg p-4 shadow-sm w-full">
                      <h3 class="font-semibold text-gray-800 mb-3 flex items-center">
                        <UIcon name="i-lucide-music" class="w-4 h-4 mr-2 text-pink-600 flex-shrink-0" />
                        Song Request
                      </h3>
                      <p class="text-gray-700 italic break-words whitespace-normal overflow-hidden">
                        {{ (row.original as RSVP).song ? (row.original as RSVP).song : 'No song requested' }}
                      </p>
                    </div>

                    <!-- Guests Section -->
                    <div class="bg-white rounded-lg p-4 shadow-sm w-full">
                      <h3 class="font-semibold text-gray-800 mb-3 flex items-center">
                        <UIcon name="i-lucide-users" class="w-4 h-4 mr-2 text-green-600 flex-shrink-0" />
                        Guests ({{ ((row.original as RSVP).guests || []).length + 1 }} total)
                      </h3>
                      <div class="space-y-3">
                        <!-- Main Person -->
                        <div class="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                          <UIcon name="i-lucide-user" class="w-5 h-5 text-blue-600 flex-shrink-0" />
                          <div class="min-w-0 flex-1">
                            <p class="font-medium text-gray-900 truncate">{{ (row.original as RSVP).name }}</p>
                            <p class="text-sm text-gray-600">Main Guest</p>
                          </div>
                        </div>
                        
                        <!-- Additional Guests -->
                        <div 
                          v-for="(guest, idx) in (row.original as RSVP).guests" 
                          :key="idx"
                          class="flex items-center space-x-3 p-3 rounded-lg"
                          :class="guest.is_adult ? 'bg-green-50' : 'bg-pink-50'"
                        >
                          <UIcon 
                            :name="guest.is_adult ? 'i-lucide-user' : 'i-lucide-baby'" 
                            class="w-5 h-5 flex-shrink-0"
                            :class="guest.is_adult ? 'text-green-600' : 'text-pink-600'"
                          />
                          <div class="min-w-0 flex-1">
                            <p class="font-medium text-gray-900 truncate">{{ guest.name }}</p>
                            <p class="text-sm text-gray-600">
                              {{ guest.is_adult ? 'Adult' : 'Child (Under 12)' }}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </UTable>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, h, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import type { Row } from '@tanstack/vue-table'
const UIcon = resolveComponent('UIcon')
const supabase = useSupabaseClient()
const UButton = resolveComponent('UButton')
const UBadge = resolveComponent('UBadge')
const UDropdownMenu = resolveComponent('UDropdownMenu')

definePageMeta({
  layout: 'admin'
})

const logout = async () => {
  await supabase.auth.signOut()
  return navigateTo('/')
}

type Guest = {
  name: string
  is_adult: boolean
}

type RSVP = {
  id: string
  name: string
  attending: boolean
  email: string
  created_at: string
  message?: string
  song?: string
  guests?: Guest[]
}

const data = ref<RSVP[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

try {
  const { status, data: rsvps, error: fetchError } = await useFetch('/api/data/rsvp', {
    onResponseError({ response }) {
      if (response.status === 401) {
        error.value = 'You are not authorized to access this data. Please log in again.'
        navigateTo('/admin/login')
      } else if (response.status === 403) {
        error.value = 'You do not have permission to access this data.'
        navigateTo('/admin/login?error=unauthorized')
      } else {
        error.value = 'Failed to load RSVP data. Please try again.'
      }
    }
  })

  if (fetchError.value) {
    error.value = 'Failed to load RSVP data. Please try again.'
  } else if (rsvps.value?.rsvp) {
    data.value = rsvps.value.rsvp
  }
} catch (e) {
  error.value = 'An unexpected error occurred. Please try again.'
} finally {
  loading.value = false
}

const columns: TableColumn<RSVP>[] = [
  {
    id: 'expand',
    header: 'Details',
    cell: ({ row }) =>
      h(UButton, {
        color: 'neutral',
        variant: 'ghost',
        icon: 'i-lucide-chevron-down',
        square: true,
        'aria-label': 'Expand',
        class: 'hover:text-white',
        ui: {
          leadingIcon: [
            'transition-transform',
            row.getIsExpanded() ? 'duration-200 rotate-180' : ''
          ]
        },
        onClick: () => row.toggleExpanded()
      })
  },
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'email',
    header: 'Email'
  },
{
  accessorKey: 'attending',
  header: ({ column }) =>
    h(
      'div',
      { class: 'text-left' },
      'Attending'
    ),
  cell: ({ row }) =>
    h(
      UBadge,
      {
        color: row.getValue('attending') ? 'green' : 'red',
        variant: 'subtle',
        class: 'flex items-center justify-start w-full p-0' // left-align contents
      },
      () =>
        h(UIcon, {
          name: row.getValue('attending')
            ? 'emojione-v1:left-check-mark'
            : 'emojione-v1:cross-mark',
          class: 'mt-1 !size-5'
        })
    )
}
,
  {
    id: 'hasGuests',
    header: 'Has Guests',
    cell: ({ row }) => {
      const guests = row.original.guests || []
      return guests.length > 0 ? 'Yes' : 'No'
    }
  },
  {
    accessorKey: 'created_at',
    header: 'RSVP Recieved Date',
    cell: ({ row }) =>
      new Date(row.getValue('created_at')).toLocaleString('en-US', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      })
  },
    {
        id: 'actions',
        cell: ({ row }) => {
        return h(
            'div',
            { class: 'text-right' },
            h(
            UDropdownMenu,
            {
              content: {
              align: 'end'
              },
              items: getRowItems(row),
              'aria-label': 'Actions dropdown',
              ui: {
                label: 'text-gray-900',
                content: 'bg-white text-gray-900 shadow-md border border-gray-200 rounded',
              },
            },
            () =>
                h(UButton, {
                icon: 'i-lucide-ellipsis-vertical',
                color: 'neutral',
                variant: 'ghost',
                class: 'ml-auto hover:text-white',
                'aria-label': 'Actions dropdown'
                })
            )
        )
        }
    },
]

const expanded = ref({})

const totalRSVPs = computed(() => data.value.length)

const totalAttending = computed(() =>
  data.value.reduce((count, rsvp) => {
    if (!rsvp.attending) {
      return count
    }
    const rsvpPerson = 1 // the main RSVP person
    const guestCount = (rsvp.guests || []).length
    return count + rsvpPerson + guestCount
  }, 0)
)

const totalNotAttending = computed(() =>
  data.value.filter(rsvp => rsvp.attending === false).length
)


const totalAdults = computed(() =>
  data.value.reduce((count, rsvp) => {
    if (!rsvp.attending) {
      return count
    }
    const rsvpAdult = 1 // the main RSVP person
    const guestAdults = (rsvp.guests || []).filter(g => g.is_adult).length
    return count + rsvpAdult + guestAdults
  }, 0)
)

const totalChildren = computed(() =>
  data.value.reduce((count, rsvp) => {
    if (!rsvp.attending) {
      return count
    }
    const guestChildren = (rsvp.guests || []).filter(g => !g.is_adult).length
    return count + guestChildren
  }, 0)
)

// Response rate calculation
const responseRate = computed(() => {
  if (totalRSVPs.value === 0) return 0
  return Math.round((totalRSVPs.value / (totalRSVPs.value + totalNotAttending.value)) * 100)
})

// Recent RSVPs (last 5)
const recentRSVPs = computed(() => {
  return data.value
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5)
})

// Utility functions
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  })
}

const exportToCSV = () => {
  const headers = ['Name', 'Email', 'Attending', 'Guests', 'Message', 'Song', 'Date']
  const csvContent = [
    headers.join(','),
    ...data.value.map(rsvp => [
      `"${rsvp.name}"`,
      `"${rsvp.email}"`,
      rsvp.attending ? 'Yes' : 'No',
      rsvp.attending ? (rsvp.guests?.length || 0) + 1 : 0,
      `"${rsvp.message || ''}"`,
      `"${rsvp.song || ''}"`,
      `"${new Date(rsvp.created_at).toLocaleDateString()}"`
    ].join(','))
  ].join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv' })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `wedding-rsvps-${new Date().toISOString().split('T')[0]}.csv`
  a.click()
  window.URL.revokeObjectURL(url)
}

const sendReminderEmails = () => {
  // This would integrate with your email service
  alert('Reminder email functionality would be implemented here')
}

const refreshData = async () => {
  try {
    const { status, data: rsvps, error } = await useFetch('/api/data/rsvp')
    if (error.value) {
      console.error('Failed to refresh RSVPs:', error.value)
    } else if (rsvps.value?.rsvp) {
      data.value = rsvps.value.rsvp
    }
  } catch (e) {
    console.error('Error refreshing RSVPs:', e)
  }
}

function getRowItems(row: Row<RSVP>) {
  return [
    {
      type: 'label',
      label: 'Actions',
      color: 'success'
    },
    {
      type: 'separator'
    },
    {
      label: 'Send Email',
      onClick: () => sendEmail(row.original.id)
    }
  ]
}

async function sendEmail(rsvpId: string) {
  try {
    const response = await useFetch(`/api/data/rsvpEmail?rsvpId=${encodeURIComponent(rsvpId)}`, {
      method: 'GET'
    });

    if (response.error.value) {
      return;
    }

    // Since we're now masking emails for security, we can't provide direct email access
    alert(`Email address is masked for security. Please contact the administrator for the full email address.`);
  } catch (err) {
    // Handle error silently
  }
}

const formatJson = (json: string) => {
  try {
    return JSON.stringify(JSON.parse(json), null, 2)
  } catch (e) {
    return json
  }
}


</script>
