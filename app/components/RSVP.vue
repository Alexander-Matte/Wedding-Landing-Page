<template>
  <section id="rsvp" class="pt-4 pb-24 px-4 bg-wedding-white">
    <div class="section-max-width">
      <!-- Section Header -->
      <div class="text-center mb-12">
        <h2 class="text-3xl sm:text-4xl md:text-5xl font-light italic mb-6 text-gray-800">
          {{ $t('rsvp.title') }}
        </h2>
        <div class="w-16 h-0.5 bg-gradient-to-r from-wedding-pink to-wedding-btn-pink mx-auto mb-6"></div>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          {{ $t('rsvp.description') }}
        </p>
        <p class="text-sm text-gray-500 mt-2">
          {{ $t('rsvp.deadline') }}
        </p>
      </div>

      <!-- Mobile Scroll Hint -->
      <div class="flex justify-center mb-6 lg:hidden">
        <div class="animate-bounce text-gray-500 text-sm flex items-center space-x-2 bg-wedding-pink/10 px-4 py-2 rounded-full">
          <UIcon name="i-lucide-chevron-down" class="w-4 h-4" />
          <span>{{ $t('rsvp.scrollHint') }}</span>
          <UIcon name="i-lucide-chevron-down" class="w-4 h-4" />
        </div>
      </div>

      <!-- RSVP Form Card -->
      <div class="card max-w-4xl mx-auto overflow-hidden">
        <div class="grid grid-cols-1 lg:grid-cols-3">
          <!-- Form Info Sidebar -->
          <div class="lg:col-span-1 bg-gradient-to-br from-wedding-pink/10 to-wedding-btn-pink/10 p-8 lg:p-12 flex flex-col justify-center">
            <div class="text-center lg:text-left">
              <div class="w-16 h-16 bg-wedding-pink/20 rounded-full flex items-center justify-center mx-auto lg:mx-0 mb-6">
                <UIcon name="i-lucide-heart" class="w-8 h-8 text-wedding-btn-pink" />
              </div>
              <h3 class="text-2xl font-light italic mb-4 text-gray-800">
                {{ $t('rsvp.title') }}
              </h3>
              <p class="text-gray-600 mb-6 leading-relaxed">
                {{ $t('rsvp.description') }}
              </p>
              <div class="space-y-3">
                <div class="flex items-center space-x-3 text-sm text-gray-600">
                  <UIcon name="i-lucide-check-circle" class="w-5 h-5 text-green-500" />
                  <span>{{ $t('rsvp.features.secureSubmission') }}</span>
                </div>
                <div class="flex items-center space-x-3 text-sm text-gray-600">
                  <UIcon name="i-lucide-check-circle" class="w-5 h-5 text-green-500" />
                  <span>{{ $t('rsvp.features.toastConfirmation') }}</span>
                </div>
                <div class="flex items-center space-x-3 text-sm text-gray-600">
                  <UIcon name="i-lucide-check-circle" class="w-5 h-5 text-green-500" />
                  <span>{{ $t('rsvp.features.guestManagement') }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Form Section -->
          <div class="lg:col-span-2 p-8 lg:p-12">
            <UForm 
              :schema="schema" 
              :state="state" 
              class="space-y-6" 
              @submit="onSubmit"
              @keydown.enter.prevent
            >
              <!-- Name Field -->
              <UFormField :label="$t('rsvp.form.name.label')" name="name" required>
                <UInput 
                  v-model="state.name" 
                  :placeholder="$t('rsvp.form.name.placeholder')" 
                  class="w-full"
                  :ui="{ 
                    base: 'relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 focus:ring-2 focus:ring-wedding-pink/50 focus:ring-offset-0 dark:focus:ring-wedding-pink/50',
                    icon: 'flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500',
                    input: 'block w-full border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                  }"
                />
              </UFormField>

              <!-- Email Field -->
              <UFormField 
                :label="$t('rsvp.form.email.label')" 
                name="email" 
                required 
                :error="emailError ? $t('rsvp.form.email.error') : ''"
              >
                <UInput 
                  v-model="state.email" 
                  type="email" 
                  trailing-icon="i-lucide-at-sign"
                  class="w-full"
                  :placeholder="$t('rsvp.form.email.placeholder')" 
                  :class="{'border-red-500': emailError, 'focus:ring-red-500': emailError}"
                  @blur="checkEmail"
                  :ui="{ 
                    base: 'relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 focus:ring-2 focus:ring-wedding-pink/50 focus:ring-offset-0 dark:focus:ring-wedding-pink/50',
                    icon: 'flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500',
                    input: 'block w-full border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                  }"
                />
              </UFormField>

              <!-- Attending Field -->
              <UFormField :label="$t('rsvp.form.attending.label')" name="attending">
                <URadioGroup 
                  v-model="state.attending" 
                  :items="attendingItems" 
                  class="w-full"
                  :ui="{
                    wrapper: 'grid grid-cols-2 gap-4',
                    item: 'relative flex cursor-pointer rounded-lg border border-gray-200 bg-white p-4 shadow-sm focus:outline-none hover:border-wedding-pink/50',
                    itemActive: 'border-wedding-pink ring-2 ring-wedding-pink/50',
                    itemInactive: 'border-gray-200',
                    label: 'flex flex-1 cursor-pointer',
                    labelActive: 'text-wedding-btn-pink',
                    labelInactive: 'text-gray-900',
                    radio: 'h-4 w-4 text-wedding-pink border-gray-300 focus:ring-wedding-pink/50'
                  }"
                />
              </UFormField>

              <!-- Guest Count (if attending) -->
              <template v-if="state.attending === 'yes'">
                <UFormField :label="$t('rsvp.form.guests.label')" name="guests">
                  <USelect 
                    v-model="state.guests" 
                    :items="guestCountItems"
                    class="w-full"
                    :ui="{
                      base: 'relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 focus:ring-2 focus:ring-wedding-pink/50 focus:ring-offset-0',
                      input: 'block w-full border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 text-left'
                    }"
                  />
                </UFormField>

                <!-- Additional Guests -->
                <template v-if="state.attending === 'yes' && Number(state.guests) > 1">
                  <div class="space-y-6">
                    <div class="flex items-center space-x-3">
                      <UIcon name="i-lucide-users" class="w-5 h-5 text-wedding-btn-pink" />
                      <h4 class="text-lg font-medium text-gray-800">
                        {{ $t('rsvp.form.additionalGuests.header') }}
                      </h4>
                    </div>
                    
                    <div
                      v-for="(guest, index) in additionalGuests"
                      :key="index"
                      class="space-y-4 p-6 bg-wedding-pink/5 rounded-xl border border-wedding-pink/20"
                    >
                      <UFormField
                        :label="$t('rsvp.form.additionalGuests.label', { number: index + 2 })"
                        :error="formSubmitted && guest.name.trim() === '' ? $t('rsvp.form.additionalGuests.error') : ''"
                      >
                        <!-- Guest Type Selection -->
                        <URadioGroup 
                          v-model="guest.type"
                          orientation="horizontal" 
                          :items="[
                            { label: $t('rsvp.form.personType.adult'), value: 'adult' },
                            { label: $t('rsvp.form.personType.child'), value: 'child' }
                          ]"
                          class="mb-4"
                          :ui="{
                            wrapper: 'flex space-x-4',
                            item: 'flex items-center space-x-2',
                            radio: 'h-4 w-4 text-wedding-pink border-gray-300 focus:ring-wedding-pink/50'
                          }"
                        />
                        
                        <!-- Guest Name Input -->
                        <UInput
                          v-model="guest.name"
                          :placeholder="$t('rsvp.form.additionalGuests.placeholder', { number: index + 2 })"
                          class="w-full"
                          @blur="validateGuestName(index)"
                          :ui="{ 
                            base: 'relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 focus:ring-2 focus:ring-wedding-pink/50 focus:ring-offset-0',
                            input: 'block w-full border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                          }"
                        />
                      </UFormField>
                    </div>
                  </div>
                </template>
              </template>

              <!-- Song Request -->
              <UFormField 
                :label="$t('rsvp.form.song.label')" 
                name="song" 
                required 
              >
                <UInput 
                  v-model="state.song" 
                  class="w-full"
                  :placeholder="$t('rsvp.form.song.placeholder')"
                  :ui="{ 
                    base: 'relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 focus:ring-2 focus:ring-wedding-pink/50 focus:ring-offset-0',
                    input: 'block w-full border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                  }"
                />
              </UFormField>

              <!-- Message Field -->
              <UFormField 
                :label="$t('rsvp.form.message.label')" 
                :hint="$t('rsvp.form.message.hint')" 
                name="message"
              >
                <UTextarea 
                  v-model="state.message" 
                  :placeholder="$t('rsvp.form.message.placeholder')" 
                  class="w-full"
                  autoresize
                  :ui="{ 
                    base: 'relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 focus:ring-2 focus:ring-wedding-pink/50 focus:ring-offset-0',
                    textarea: 'block w-full border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 resize-none'
                  }"
                />
              </UFormField>

              <!-- Turnstile Verification -->
              <UFormField>
                <div class="w-full flex justify-center sm:justify-start px-2">
                  <ClientOnly>
                    <NuxtTurnstile
                      ref="turnstile"
                      :options="turnstileOptions"
                      v-model="turnstileToken"
                      class="turnstile-container"
                    />
                  </ClientOnly>
                </div>
              </UFormField>


              <!-- Submit Button -->
              <UButton 
                type="submit" 
                class="w-full bg-gradient-to-r from-wedding-btn-pink to-wedding-pink hover:from-wedding-pink hover:to-wedding-btn-pink text-white font-medium py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                :loading="loading"
                :disabled="loading"
              >
                <UIcon name="i-lucide-send" class="w-5 h-5 mr-2" />
                {{ $t('rsvp.form.submit') }}
              </UButton>
            </UForm>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive, watch, computed } from 'vue'
import { z } from 'zod'
import { useI18n } from 'vue-i18n'
import type { FormSubmitEvent } from '@nuxt/ui'

const { locale } = useI18n()
const { t } = useI18n()
const toast = useToast()
const turnstileKey = ref(0)
const turnstileToken = ref('')
const turnstile = ref()
const loading = ref(false)

// Form validation schema
const schema = z.object({
  name: z.string().min(1, t('rsvp.form.name.required')),
  email: z.string()
    .nonempty(t('rsvp.form.email.required'))
    .email(t('rsvp.form.email.invalid')),
  attending: z.enum(['yes', 'no']),
  guests: z.string().optional(),
  message: z.string().optional(),
  song: z.string()
    .min(1, t('rsvp.form.song.required'))
    .max(200, t('rsvp.form.song.tooLong')) 
});

type Schema = z.output<typeof schema>

const state = reactive<Schema>({
  name: '',
  email: '',
  attending: 'no',
  guests: '',
  message: '',
  song: ''
})

// Form items
const attendingItems = computed(() => [
  { label: t('rsvp.form.attending.yes'), value: 'yes' },
  { label: t('rsvp.form.attending.no'), value: 'no' }
])

const guestCountItems = computed(() => 
  Array.from({ length: 10 }, (_, i) => ({ label: `${i + 1}`, value: `${i + 1}` }))
)

const emailError = ref('')
const formSubmitted = ref(false)
const additionalGuests = ref<{ name: string; type: 'adult' | 'child' }[]>([])

// Computed property for responsive Turnstile size
const turnstileSize = computed((): 'compact' | 'normal' => {
  if (import.meta.client) {
    return window.innerWidth < 768 ? 'compact' : 'normal'
  }
  return 'normal'
})

// Optimize Turnstile performance for mobile
const turnstileOptions = computed(() => ({
  theme: 'light' as const,
  language: locale.value,
  size: turnstileSize.value,
  appearance: 'always' as const, // Changed from 'interaction-only' to 'always' for better mobile compatibility
  callback: (token: string) => {
    turnstileToken.value = token
  },
  'expired-callback': () => {
    turnstileToken.value = ''
    turnstile.value?.reset()
  }
}))

// Watch for attendance changes
watch(() => state.attending, (newVal) => {
  if (newVal === 'yes') {
    state.guests = '1'
    additionalGuests.value = []
  } else {
    state.guests = ''
    additionalGuests.value = []
  }
})

// Watch for guest count changes
watch(() => state.guests, (newVal) => {
  if (!newVal || isNaN(parseInt(newVal as string))) return
  const count = Number(newVal) - 1
  const currentLength = additionalGuests.value.length

  if (count > currentLength) {
    for (let i = currentLength; i < count; i++) {
      additionalGuests.value.push({ name: '', type: 'adult' })
    }
  } else if (count < currentLength) {
    additionalGuests.value.splice(count)
  }
})

// Validation functions
const validateGuestName = (index: number) => {
  const guest = additionalGuests.value[index]
  if (guest.name.trim() === '') {
    toast.add({
      title: t('rsvp.toast.emptyGuestName.title'),
      description: t('rsvp.toast.emptyGuestName.description'),
      color: 'error'
    })
  }
}

const checkEmail = () => {
  if (!state.email) {
    emailError.value = t('rsvp.form.email.required')
  } else if (!isValidEmail(state.email)) {
    emailError.value = t('rsvp.form.email.invalid')
  } else {
    emailError.value = ''
  }
}

const isValidEmail = (email: string) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
  return emailRegex.test(email)
}

const checkAdditionalGuests = (): boolean => {
  const mainName = state.name.trim().toLowerCase()
  const guestNames = additionalGuests.value.map(g => g.name.trim().toLowerCase())

  // Check for empty guest names
  const emptyGuest = additionalGuests.value.find(g => g.name.trim() === '')
  if (emptyGuest) {
    toast.add({ 
      title: t('rsvp.toast.emptyGuestName.title'), 
      description: t('rsvp.toast.emptyGuestName.description'), 
      color: 'error', 
    })
    return false
  }

  // Check for guest name matching main name
  if (guestNames.includes(mainName)) {
    toast.add({ 
      title: t('rsvp.toast.duplicateMainName.title'), 
      description: t('rsvp.toast.duplicateMainName.description'), 
      color: 'error' 
    })
    return false
  }

  // Check for duplicate guest names
  const nameSet = new Set(guestNames)
  if (nameSet.size !== guestNames.length) {
    toast.add({ 
      title: t('rsvp.toast.duplicateGuests.title'), 
      description: t('rsvp.toast.duplicateGuests.description'), 
      color: 'error'
    })
    return false
  }

  return true
}

// Form submission
const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  event.preventDefault()
  formSubmitted.value = true
  loading.value = true
  checkEmail()

  // Security checks
  if (!turnstileToken.value) {
    toast.add({
      title: t('rsvp.toast.captcha.error'),
      description: t('rsvp.toast.captcha.error'),
      color: 'error'
    })
    loading.value = false
    return
  }

  if (state.attending === 'yes' && !checkAdditionalGuests()) {
    loading.value = false
    return
  }

  // Prepare payload
  const rpcPayload = {
    mainName: state.name,
    email: state.email,
    attending: state.attending === 'yes',
    message: state.message || '',
    guests: additionalGuests.value.map(g => ({
      name: g.name,
      isAdult: g.type === 'adult'
    })),
    song: state.song,
  }

  try {
    const { data, error } = await useFetch('/api/submitForm', {
      method: 'POST',
      body: {
        token: turnstileToken.value,
        rpcPayload
      }
    })

    if (error.value) {
      throw error.value
    }

    // Success
    toast.add({
      title: t('rsvp.toast.success.title'),
      description: t('rsvp.toast.success.description'),
      color: 'success'
    })

    // Reset form
    state.name = ''
    state.email = ''
    state.attending = 'no'
    state.message = ''
    state.song = ''
    additionalGuests.value = []
    emailError.value = ''
    formSubmitted.value = false
    turnstile.value?.reset()
    turnstileToken.value = ''

  } catch (err) {
    toast.add({
      title: t('rsvp.toast.error.title'),
      description: t('rsvp.toast.error.description'),
      color: 'error'
    })
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* Responsive adjustments */
@media (max-width: 1024px) {
  .card {
    margin: 0 1rem;
  }
}

/* Turnstile mobile optimizations */
.turnstile-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 65px;
}

@media (max-width: 768px) {
  .turnstile-container {
    min-height: 60px;
    transform: scale(0.9);
    transform-origin: center;
  }
}

@media (max-width: 480px) {
  .turnstile-container {
    transform: scale(0.85);
  }
}

@media (max-width: 640px) {
  .section-padding {
    padding: 2rem 1rem;
  }
  
  h2 {
    font-size: 2rem;
  }
}

/* Form field focus states */
:deep(.form-field:focus-within) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(240, 215, 209, 0.3);
}

/* Loading state */
.loading {
  opacity: 0.7;
  pointer-events: none;
}

/* Print styles */
@media print {
  .card {
    box-shadow: none;
    border: 1px solid #ddd;
  }
}
</style>
