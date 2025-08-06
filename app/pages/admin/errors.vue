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

        <!-- Header -->
        <div class="bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl shadow-xl p-8 text-white text-center relative overflow-hidden">
          <div class="absolute inset-0 bg-black/10"></div>
          <div class="relative z-10">
            <div class="flex justify-center mb-4">
              <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <UIcon name="i-lucide-alert-triangle" class="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 class="text-3xl md:text-4xl font-bold mb-2">Error Logs</h1>
            <p class="text-lg text-white/90">Monitor and manage application errors</p>
          </div>
        </div>

        <!-- Error Logs Section -->
        <div class="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div class="p-6 border-b border-gray-200">
            <div class="flex items-center justify-between">
              <div>
                <h2 class="text-2xl font-bold text-gray-800 flex items-center">
                  <UIcon name="i-lucide-alert-triangle" class="w-6 h-6 mr-3 text-red-600" />
                  Application Errors
                </h2>
                <p class="text-gray-600 mt-1">Monitor application errors and issues</p>
              </div>
              <div class="flex items-center space-x-3">
                <UButton
                  @click="refreshErrorLogs"
                  :loading="errorLogsLoading"
                  color="blue"
                  variant="outline"
                  size="sm"
                >
                  <UIcon name="i-lucide-refresh-cw" class="w-4 h-4 mr-2" />
                  Refresh
                </UButton>
                <UButton
                  @click="markAllResolved"
                  :loading="markingResolved"
                  color="green"
                  variant="outline"
                  size="sm"
                >
                  <UIcon name="i-lucide-check" class="w-4 h-4 mr-2" />
                  Mark All Resolved
                </UButton>
              </div>
            </div>
          </div>

          <!-- Error Logs Table -->
          <div class="overflow-x-auto w-full">
            <UTable
              :data="filteredErrorLogs"
              :columns="errorLogsColumns"
              row-type="ErrorLog"
              :ui="{
                table: 'w-full text-sm',
                thead: 'bg-gray-50',
                th: 'text-gray-700 font-semibold px-4 py-3 text-left whitespace-nowrap border-b border-gray-200',
                td: 'px-4 py-3 border-b border-gray-100 text-gray-700',
                tr: 'hover:bg-gray-50 transition-colors duration-150'
              }"
              class="w-full"
            >
              <template #level-data="{ row }">
                <UBadge
                  :color="getLevelColor((row.original as ErrorLog).level)"
                  variant="subtle"
                  size="sm"
                >
                  {{ (row.original as ErrorLog).level.toUpperCase() }}
                </UBadge>
              </template>

              <template #error_message-data="{ row }">
                <div class="max-w-md">
                  <p class="text-sm text-gray-900 font-medium" :title="(row.original as ErrorLog).error_message">
                    {{ (row.original as ErrorLog).error_message }}
                  </p>
                </div>
              </template>

              <template #resolved-data="{ row }">
                <UBadge
                  :color="(row.original as ErrorLog).resolved ? 'green' : 'red'"
                  variant="subtle"
                  size="sm"
                >
                  {{ (row.original as ErrorLog).resolved ? 'Resolved' : 'Unresolved' }}
                </UBadge>
              </template>

              <template #created_at-data="{ row }">
                {{ formatDate((row.original as ErrorLog).created_at) }}
              </template>

              <template #actions-data="{ row }">
                <div class="flex items-center space-x-2">
                  <UButton
                    v-if="!(row.original as ErrorLog).resolved"
                    @click="markAsResolved((row.original as ErrorLog).id)"
                    color="green"
                    variant="solid"
                    size="sm"
                    title="Mark as resolved"
                  >
                    <UIcon name="i-lucide-check" class="w-4 h-4 mr-1" />
                    Resolve
                  </UButton>
                  <UButton
                    @click="viewErrorDetails(row.original as ErrorLog)"
                    color="blue"
                    variant="outline"
                    size="sm"
                    title="View details"
                  >
                    <UIcon name="i-lucide-eye" class="w-4 h-4 mr-1" />
                    Details
                  </UButton>
                </div>
              </template>
            </UTable>
          </div>

          <!-- Error Logs Stats -->
          <div class="p-4 bg-gray-50 border-t border-gray-200">
            <div class="flex items-center justify-between text-sm text-gray-600">
              <div class="flex items-center space-x-6">
                <span>Total: {{ errorLogs.length }}</span>
                <span>Unresolved: {{ unresolvedCount }}</span>
                <span>Errors: {{ errorCount }}</span>
                <span>Warnings: {{ warningCount }}</span>
              </div>
              <span>Last updated: {{ lastErrorLogsUpdate }}</span>
            </div>
          </div>
        </div>

        <!-- Error Details Modal -->
        <UModal v-model="showErrorModal" :ui="{ 
          width: 'sm:max-w-2xl',
          overlay: 'bg-gray-900/50',
          base: '!bg-white !text-gray-900',
          container: '!bg-white',
          background: '!bg-white'
        }">
          <UCard v-if="selectedError" class="!bg-white !text-gray-900">
            <template #header>
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-semibold text-gray-900">Error Details</h3>
                <UButton
                  @click="showErrorModal = false"
                  color="gray"
                  variant="ghost"
                  icon="i-lucide-x"
                  size="sm"
                  type="button"
                />
              </div>
            </template>

            <div class="space-y-4">
              <!-- Basic Info -->
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="text-sm font-medium text-gray-700">Level</label>
                  <UBadge
                    :color="getLevelColor(selectedError.level)"
                    variant="subtle"
                    size="sm"
                    class="mt-1"
                  >
                    {{ selectedError.level.toUpperCase() }}
                  </UBadge>
                </div>
                <div>
                  <label class="text-sm font-medium text-gray-700">Status</label>
                  <UBadge
                    :color="selectedError.resolved ? 'green' : 'red'"
                    variant="subtle"
                    size="sm"
                    class="mt-1"
                  >
                    {{ selectedError.resolved ? 'Resolved' : 'Unresolved' }}
                  </UBadge>
                </div>
              </div>

              <!-- Error Message -->
              <div>
                <label class="text-sm font-medium text-gray-700">Error Message</label>
                <div class="mt-1 p-3 bg-red-50 border border-red-200 rounded-md">
                  <p class="text-sm text-red-800">{{ selectedError.error_message }}</p>
                </div>
              </div>

              <!-- Source & Endpoint -->
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="text-sm font-medium text-gray-700">Source</label>
                  <p class="mt-1 text-sm text-gray-900">{{ selectedError.source }}</p>
                </div>
                <div>
                  <label class="text-sm font-medium text-gray-700">Endpoint</label>
                  <p class="mt-1 text-sm text-gray-900">{{ selectedError.endpoint || 'N/A' }}</p>
                </div>
              </div>

              <!-- User Info -->
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="text-sm font-medium text-gray-700">User Email</label>
                  <p class="mt-1 text-sm text-gray-900">{{ selectedError.user_email || 'Anonymous' }}</p>
                </div>
                <div>
                  <label class="text-sm font-medium text-gray-700">IP Address</label>
                  <p class="mt-1 text-sm text-gray-900">{{ selectedError.ip_address || 'N/A' }}</p>
                </div>
              </div>

              <!-- Timestamps -->
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="text-sm font-medium text-gray-700">Created</label>
                  <p class="mt-1 text-sm text-gray-900">{{ formatDate(selectedError.created_at) }}</p>
                </div>
                <div v-if="selectedError.resolved_at">
                  <label class="text-sm font-medium text-gray-700">Resolved</label>
                  <p class="mt-1 text-sm text-gray-900">{{ formatDate(selectedError.resolved_at) }}</p>
                </div>
              </div>

              <!-- Error Details -->
              <div v-if="selectedError.error_detail">
                <label class="text-sm font-medium text-gray-700">Error Details</label>
                <div class="mt-1 p-3 bg-gray-50 border border-gray-200 rounded-md">
                  <pre class="text-xs text-gray-800 overflow-x-auto">{{ formatJson(selectedError.error_detail) }}</pre>
                </div>
              </div>

              <!-- Request Data -->
              <div v-if="selectedError.request_data">
                <label class="text-sm font-medium text-gray-700">Request Data</label>
                <div class="mt-1 p-3 bg-gray-50 border border-gray-200 rounded-md">
                  <pre class="text-xs text-gray-800 overflow-x-auto">{{ formatJson(selectedError.request_data) }}</pre>
                </div>
              </div>

              <!-- User Agent -->
              <div v-if="selectedError.user_agent">
                <label class="text-sm font-medium text-gray-700">User Agent</label>
                <p class="mt-1 text-xs text-gray-600 break-all">{{ selectedError.user_agent }}</p>
              </div>

              <!-- Notes -->
              <div v-if="selectedError.notes">
                <label class="text-sm font-medium text-gray-700">Notes</label>
                <p class="mt-1 text-sm text-gray-900">{{ selectedError.notes }}</p>
              </div>
            </div>

            <template #footer>
              <div class="flex justify-end space-x-3">
                <UButton
                  v-if="!selectedError.resolved"
                  @click="markAsResolved(selectedError.id)"
                  color="green"
                  variant="solid"
                >
                  Mark as Resolved
                </UButton>
                <UButton
                  @click="showErrorModal = false"
                  color="gray"
                  variant="outline"
                  type="button"
                >
                  Close
                </UButton>
              </div>
            </template>
          </UCard>
        </UModal>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, h, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'

const UIcon = resolveComponent('UIcon')
const UButton = resolveComponent('UButton')
const UBadge = resolveComponent('UBadge')

definePageMeta({
  layout: 'admin'
})

// Server-side data fetching
const { data: initialLogs } = await useFetch('/api/data/errorLogs', {
  key: 'error-logs-initial',
  server: true,
  lazy: false,
  default: () => ({ errorLogs: [] })
})

// Error log types
type ErrorLog = {
  id: number
  level: 'error' | 'warn' | 'info' | 'debug'
  source: string
  endpoint?: string
  user_email?: string
  user_id?: string
  error_message: string
  error_detail?: string
  request_data?: string
  user_agent?: string
  ip_address?: string
  resolved: boolean
  resolved_at?: string
  resolved_by?: string
  notes?: string
  created_at: string
}

// Reactive data
const errorLogs = ref<ErrorLog[]>(initialLogs.value?.errorLogs || [])
const errorLogsLoading = ref(false)
const markingResolved = ref(false)
const lastErrorLogsUpdate = ref('')
const showErrorModal = ref(false)
const selectedError = ref<ErrorLog | null>(null)
const loading = ref(!initialLogs.value?.errorLogs)
const error = ref<string | null>(null)
const generatingTestErrors = ref(false)

// Load error logs
const loadErrorLogs = async () => {
  errorLogsLoading.value = true
  try {
    const { data: logs, error: fetchError } = await useFetch('/api/data/errorLogs', {
      key: 'error-logs',
      server: true,
      lazy: false,
      default: () => ({ errorLogs: [] }),
      onResponseError({ response }) {
        if (response.status === 401) {
          error.value = 'You are not authorized to access this data. Please log in again.'
          navigateTo('/admin/login')
        } else if (response.status === 403) {
          error.value = 'You do not have permission to access this data.'
          navigateTo('/admin/login?error=unauthorized')
        } else {
          error.value = 'Failed to load error logs. Please try again.'
        }
      }
    })
    
    if (fetchError.value) {
      error.value = 'Failed to load error logs. Please try again.'
    } else if (logs.value?.errorLogs) {
      errorLogs.value = logs.value.errorLogs
      lastErrorLogsUpdate.value = new Date().toLocaleString()
    } else if (logs.value && Array.isArray(logs.value)) {
      // Handle case where API returns array directly
      errorLogs.value = logs.value
      lastErrorLogsUpdate.value = new Date().toLocaleString()
    } else {
      // Handle case where API returns null (no error logs)
      errorLogs.value = []
      lastErrorLogsUpdate.value = new Date().toLocaleString()
    }
  } catch (e) {
    error.value = 'An unexpected error occurred. Please try again.'
  } finally {
    errorLogsLoading.value = false
    loading.value = false
  }
}

// Refresh error logs
const refreshErrorLogs = async () => {
  await loadErrorLogs()
}

// Mark error as resolved
const markAsResolved = async (errorId: number) => {
  try {
    const { error: patchError } = await useFetch(`/api/data/errorLogs`, {
      method: 'PATCH',
      body: {
        id: errorId,
        resolved: true,
        notes: 'Marked as resolved by admin'
      }
    })
    
    if (patchError.value) {
      console.error('Failed to mark error as resolved:', patchError.value)
    } else {
      // Update local state
      const errorLog = errorLogs.value.find(log => log.id === errorId)
      if (errorLog) {
        errorLog.resolved = true
        errorLog.resolved_at = new Date().toISOString()
        errorLog.resolved_by = 'Admin'
      }
    }
  } catch (e) {
    console.error('Error marking as resolved:', e)
  }
}

// Mark all errors as resolved
const markAllResolved = async () => {
  markingResolved.value = true
  try {
    const unresolvedErrors = errorLogs.value.filter(log => !log.resolved)
    for (const errorLog of unresolvedErrors) {
      await markAsResolved(errorLog.id)
    }
  } catch (e) {
    console.error('Error marking all as resolved:', e)
  } finally {
    markingResolved.value = false
  }
}

// View error details
const viewErrorDetails = (errorLog: ErrorLog) => {
  selectedError.value = errorLog
  showErrorModal.value = true
}

// Close modal
const closeModal = () => {
  showErrorModal.value = false
  selectedError.value = null
  // Force a small delay to ensure modal is fully closed
  setTimeout(() => {
    showErrorModal.value = false
  }, 100)
}

// Get level color for badges
const getLevelColor = (level: string) => {
  switch (level) {
    case 'error': return 'red'
    case 'warn': return 'yellow'
    case 'info': return 'blue'
    default: return 'gray'
  }
}

// Format JSON for display
const formatJson = (json: string) => {
  try {
    return JSON.stringify(JSON.parse(json), null, 2)
  } catch (e) {
    return json
  }
}

// Format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
  
  if (diffInHours < 1) {
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    return `${diffInMinutes} minutes ago`
  } else if (diffInHours < 24) {
    return `${diffInHours} hours ago`
  } else if (diffInHours < 48) {
    return 'Yesterday'
  } else {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    })
  }
}

// Computed properties for error logs
const filteredErrorLogs = computed(() => {
  return errorLogs.value.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
})

const unresolvedCount = computed(() => errorLogs.value.filter(log => !log.resolved).length)
const errorCount = computed(() => errorLogs.value.filter(log => log.level === 'error').length)
const warningCount = computed(() => errorLogs.value.filter(log => log.level === 'warn').length)

// Error logs table columns
const errorLogsColumns: TableColumn<ErrorLog>[] = [
  {
    accessorKey: 'level',
    header: 'Level'
  },
  {
    accessorKey: 'source',
    header: 'Source'
  },
  {
    accessorKey: 'error_message',
    header: 'Error Message'
  },
  {
    accessorKey: 'user_email',
    header: 'User'
  },
  {
    accessorKey: 'created_at',
    header: 'Date'
  },
  {
    accessorKey: 'resolved',
    header: 'Status',
    cell: ({ row }) => h(UBadge, {
      color: row.original.resolved ? 'green' : 'red',
      variant: 'subtle',
      size: 'sm'
    }, () => row.original.resolved ? 'Resolved' : 'Unresolved')
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => h('div', { class: 'flex items-center space-x-2' }, [
      !row.original.resolved && h(UButton, {
        onClick: () => markAsResolved(row.original.id),
        color: 'green',
        variant: 'solid',
        size: 'sm',
        title: 'Mark as resolved'
      }, () => [
        h(UIcon, { name: 'i-lucide-check', class: 'w-4 h-4 mr-1' }),
        'Resolve'
      ]),
      h(UButton, {
        onClick: () => viewErrorDetails(row.original),
        color: 'blue',
        variant: 'outline',
        size: 'sm',
        title: 'View details'
      }, () => [
        h(UIcon, { name: 'i-lucide-eye', class: 'w-4 h-4 mr-1' }),
        'Details'
      ])
    ])
  }
]

// Load error logs on component mount
onMounted(() => {
  // Set initial timestamp on client side to avoid hydration mismatch
  if (initialLogs.value?.errorLogs) {
    lastErrorLogsUpdate.value = new Date().toLocaleString()
  }
  
  if (!initialLogs.value?.errorLogs) {
    loadErrorLogs()
  }
})
</script> 