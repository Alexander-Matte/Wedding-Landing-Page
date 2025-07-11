<template>
  <div>
    <!-- Main content -->
    <main class="flex-1 flex flex-col">
      <!-- Content -->
      <div class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div class="bg-blue-50 border border-blue-200 p-4 rounded shadow text-blue-900 mb-5 text-center">
                <h2 class="text-xl font-semibold">Hello Madi and Alex! 💍</h2>
                <div class="mt-2">
                    I hope you are getting excited for your big day! 🎉<br />
                    <div class="flex justify-center">
                      <div class="w-full max-w-xs">
                        <CountdownDisplay />
                      </div>
                    </div>
                    <p>Here's the latest information on your wedding and RSVPs.</p>
                  </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div class="bg-white p-4 rounded shadow text-center">
                <div class="text-sm text-gray-500">Total RSVPs</div>
                <div class="text-xl font-bold">{{ totalRSVPs }}</div>
              </div>
              <div class="bg-white p-4 rounded shadow text-center">
                <div class="text-sm text-gray-500">Not Attending</div>
                <div class="text-xl font-bold">{{ totalNotAttending }}</div>
              </div>
              <div class="bg-white p-4 rounded shadow text-center">
                <div class="text-sm text-gray-500">Attending</div>
                <div class="text-xl font-bold">{{ totalAttending }}</div>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div class="bg-white p-4 rounded shadow text-center">
                <div class="text-sm text-gray-500">Adults</div>
                <div class="text-xl font-bold">{{ totalAdults }}</div>
              </div>
              <div class="bg-white p-4 rounded shadow text-center">
                <div class="text-sm text-gray-500">Children</div>
                <div class="text-xl font-bold">{{ totalChildren }}</div>
              </div>
            </div>


          <h2 class="text-2xl font-semibold mb-4">RSVPs</h2>
          <div class="bg-white p-4 rounded shadow overflow-x-auto w-full">
            <UTable
              v-model:expanded="expanded"
              :data="data"
              :columns="columns"
              row-type="RSVP"
              :ui="{
                table: 'w-full text-sm table-auto',
                tr: '',
                th: 'text-gray-800 font-semibold px-2 py-2 text-left whitespace-nowrap',
                td: 'px-2 py-2 break-words max-w-[200px] text-gray-700'
              }"
              class="w-full"
            >
              <template #expanded="{ row }">
                <div class="p-4 bg-gray-50 rounded">
                  <h3 class="font-semibold mb-2">Message</h3>
                  <p class="mb-4 italic text-gray-700">
                    {{ row.original.message ? row.original.message : 'No message' }}
                  </p>

                  <h3 class="font-semibold mb-2">Guests</h3>
                  <ul class="list-disc list-inside">
                    <li v-for="(guest, idx) in row.original.guests" :key="idx">
                      {{ guest.name }} —
                      <span class="italic">
                        {{ guest.is_adult ? 'Adult' : 'Child (Under 12)' }}
                      </span>
                    </li>
                    <li
                      v-if="!row.original.guests || row.original.guests.length === 0"
                      class="italic text-gray-500"
                    >
                      No guests associated with this RSVP
                    </li>
                  </ul>

                  <h3 class="font-semibold mb-2 mt-4">Song</h3>
                  <p class="mb-4 italic text-gray-700">
                    {{ row.original.song ? row.original.song : 'No song :( )' }}
                  </p>
                </div>
              </template>
            </UTable>
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
  name: string
  attending: boolean
  email: string
  created_at: string
  guests?: Guest[]
}

const data = ref<RSVP[]>([])

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

try {
  const { status, data: rsvps, error } = await useFetch('/api/data/rsvp')

  if (error.value) {
    console.error('Failed to fetch RSVPs:', error.value)
  } else if (rsvps.value?.rsvp) {
    data.value = rsvps.value.rsvp
  }
} catch (e) {
  console.error('Error fetching RSVPs:', e)
}

const totalRSVPs = computed(() => data.value.length)

const totalAttending = computed(() =>
  data.value.filter(rsvp => rsvp.attending).length
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
    const { data, error } = await useFetch(`/api/data/rsvpEmail?rsvpId=${encodeURIComponent(rsvpId)}`, {
      method: 'GET'
    });

    if (error.value) {
      console.error('Failed to retrieve email:', error.value);
      return;
    }

    const email = data.value?.data?.email;

    if (!email) {
      console.error('Email not found in response');
      return;
    }

    window.location.href = `mailto:${email}`;
  } catch (err) {
    console.error('Error sending email:', err);
  }
}



</script>
