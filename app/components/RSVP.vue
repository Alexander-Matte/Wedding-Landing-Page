<template>
  <section id="rsvp" class="py-20 px-4">
    <div class="max-w-3xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
      <div class="md:flex">
        <div class="md:w-1/3 p-8 flex flex-col justify-center">
          <h2 class="text-3xl italic mb-4">{{ $t('rsvp.title') }}</h2>
          <p class="mb-6">{{ $t('rsvp.description') }}</p>
          <p>{{ $t('rsvp.deadline') }}</p>
        </div>
        <div class="md:w-2/3 p-8">
          <UForm 
          :schema="schema" 
          :state="state" 
          class="space-y-6" 
          @submit="onSubmit"
          @keydown.enter.prevent
          >
            <UFormField :label="$t('rsvp.form.name.label')" name="name" required>
              <UInput 
                v-model="state.name" 
                :placeholder="$t('rsvp.form.name.placeholder')" 
                class="w-2/3"
              />
            </UFormField>

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
                class="w-2/3"
                :placeholder="$t('rsvp.form.email.placeholder')" 
                :class="{'border-red-500': emailError, 'focus:ring-red-500': emailError}"
                @blur="checkEmail"
              />
            </UFormField>

            <UFormField :label="$t('rsvp.form.attending.label')" name="attending">
              <URadioGroup v-model="state.attending" :items="items" class="w-2/3"/>
            </UFormField>

            <template v-if="state.attending === 'yes'">
              <UFormField :label="$t('rsvp.form.guests.label')" name="guests">
                <USelect v-model="state.guests" arrow color="neutral" variant="subtle" :items="['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']" />
              </UFormField>
              <template v-if="state.attending === 'yes' && Number(state.guests) > 1">
                <div class="space-y-4">
                  <h3 class="text-lg font-semibold">{{ $t('rsvp.form.additionalGuests.header') }}</h3>
                  <div v-for="(guest, index) in additionalGuests" :key="index" class="flex flex-col space-y-4">
                    <UFormField
                      :label="$t('rsvp.form.additionalGuests.label', { number: index + 2 })"
                      :error="formSubmitted && guest.name.trim() === '' ? $t('rsvp.form.additionalGuests.error') : ''"
                      class="flex-1"
                    >
                      <UInput
                        v-model="guest.name"
                        :placeholder="$t('rsvp.form.additionalGuests.placeholder', { number: index + 2 })"
                        class="w-2/3"
                        @blur="validateGuestName(index)"
                      />
                    </UFormField>
                  </div>
                </div>
              </template>
            </template>

            <UFormField :label="$t('rsvp.form.message.label')" :hint="$t('rsvp.form.message.hint')" name="message">
              <UTextarea 
              v-model="state.message" 
              :placeholder="$t('rsvp.form.message.placeholder')" 
              class="w-2/3"
              autoresize
              />
            </UFormField>

            <UFormField>
              <NuxtTurnstile
                ref="turnstile"
                :options="{ theme: 'light', language: locale }"
                v-model="turnstileToken"
              />

            </UFormField>

            <UButton 
              type="submit" 
              color="primary" 
              class="w-full cursor-pointer"
              :loading="loading">
              {{ $t('rsvp.form.submit') }}
            </UButton>
          </UForm>
        </div>
      </div>
    </div>
  </section>
</template>


<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { z } from 'zod'
import { useI18n } from 'vue-i18n'
import type { FormSubmitEvent } from '@nuxt/ui'
const { locale } = useI18n()
const { t } = useI18n()
const supabase = useNuxtApp().$supabase

const turnstileKey = ref(0)
const turnstileToken = ref('')
const turnstile = ref()
const loading = ref(false)


const schema = z.object({
  name: z.string().min(1, t('rsvp.form.name.required')),
  email: z.string()
    .nonempty(t('rsvp.form.email.required'))
    .email(t('rsvp.form.email.invalid')),
  attending: z.enum(['yes', 'no']),
  guests: z.string().optional(),
  message: z.string().optional()
})

type Schema = z.output<typeof schema>

const state = reactive<Schema>({
  name: '',
  email: '',
  attending: 'no',
  guests: '',
  message: ''
})

const emailError = ref('')
const missingGuestsError = ref('')
const formSubmitted = ref(false)

const items = ref([
  { label: t('rsvp.form.attending.yes'), value: 'yes' },
  { label: t('rsvp.form.attending.no'), value: 'no' }
])

const additionalGuests = ref<{ name: string }[]>([])

const toast = useToast()

// Watch when user selects "yes"
watch(() => state.attending, (newVal) => {
  if (newVal === 'yes') {
    state.guests = '1'
    additionalGuests.value = []
  } else {
    state.guests = ''
    additionalGuests.value = []
  }
})

// Watch when guest count changes
watch(() => state.guests, (newVal) => {
  if (!newVal || isNaN(parseInt(newVal as string))) return
  const count = Number(newVal) - 1
  const currentLength = additionalGuests.value.length

  if (count > currentLength) {
    for (let i = currentLength; i < count; i++) {
      additionalGuests.value.push({ name: '' })
    }
  } else if (count < currentLength) {
    additionalGuests.value.splice(count)
  }
})


const validateGuestName = (index: number) => {
  const guest = additionalGuests.value[index]

  // Validate guest name
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
  // Simple email regex for basic validation
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
  return emailRegex.test(email)
}

const checkAdditionalGuests = (): boolean => {
  missingGuestsError.value = ''

  const mainName = state.name.trim().toLowerCase()
  const guestNames = additionalGuests.value.map(g => g.name.trim().toLowerCase())

  // Check for empty guest names
  const emptyGuest = additionalGuests.value.find(g => g.name.trim() === '')
  if (emptyGuest) {
    missingGuestsError.value = t('rsvp.form.additionalGuests.error')
    toast.add({ 
      title: t('rsvp.toast.emptyGuestName.title'), 
      description: t('rsvp.toast.emptyGuestName.description'), 
      color: 'error' 
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

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  event.preventDefault()
  formSubmitted.value = true
  loading.value = true
  checkEmail()

  if (!turnstileToken.value) {
    toast.add({
      title: t('rsvp.toast.captcha.error'),
      description: t('rsvp.toast.captcha.tokenMissing'),
      color: 'error'
    })
    loading.value = false
    return
  }

  if (state.attending === 'yes' && !checkAdditionalGuests()) {
    loading.value = false
    return
  }

  const rpcPayload = {
    mainName: state.name,
    email: state.email,
    attending: state.attending === 'yes',
    message: state.message || '',
    guests: additionalGuests.value.map(g => g.name)
  }

  console.log("TEST");
  const { data, error } = await useFetch('/api/submitForm', {
    method: 'POST',
    body: {
      token: turnstileToken.value,
      rpcPayload
    }
  })

  if (error.value) {
    toast.add({
      title: t('rsvp.toast.error.title'),
      description: error.value.statusMessage || t('rsvp.toast.error.description'),
      color: 'error'
    })
    loading.value = false
    return
  }

  toast.add({
    title: t('rsvp.toast.success'),
    description: t('rsvp.toast.confirmation'),
    color: 'success'
  })

  state.name = ''
  state.email = ''
  state.attending = 'no'
  state.message = ''
  additionalGuests.value = []

  // Reset error states
  emailError.value = ''
  formSubmitted.value = false
  turnstile.value?.reset()
  turnstileToken.value = ''
  loading.value = false
}



</script>



<style scoped>

</style>
