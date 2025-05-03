<template>
  <section id="rsvp" class="py-20 px-4">
    <div class="max-w-3xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
      <div class="md:flex">
        <div class="md:w-1/3 p-8 flex flex-col justify-center">
          <h2 class="text-3xl italic mb-4">{{ $t('rsvp.title') }}</h2>
          <p class="mb-6">{{ $t('rsvp.description') }}</p>
          <p class="-200">{{ $t('rsvp.deadline') }}</p>
        </div>
        <div class="md:w-2/3 p-8">
          <UForm :schema="schema" :state="state" class="space-y-6" @submit="onSubmit">
            <UFormField :label="$t('rsvp.form.name.label')" name="name" required>
              <UInput v-model="state.name" :placeholder="$t('rsvp.form.name.required')" />
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
                :placeholder="$t('rsvp.form.email.placeholder')" 
                :class="{'border-red-500': emailError, 'focus:ring-red-500': emailError}"
                @blur="checkEmail"
              />
            </UFormField>


            <UFormField :label="$t('rsvp.form.attending.label')" name="attending">
              <URadioGroup v-model="state.attending" :items="items" />
            </UFormField>

            <template v-if="state.attending === 'yes'">
              <UFormField :label="$t('rsvp.form.guests.label')" name="guests">
                <USelect v-model="state.guests" arrow color="neutral" variant="subtle" :items="['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']" />
              </UFormField>
              <template v-if="state.attending === 'yes' && Number(state.guests) > 1">
                <div class="space-y-4">
                  <h3 class="text-lg font-semibold">{{ $t('rsvp.form.additionalGuests.header') }}</h3>
                  <div v-for="(guest, index) in additionalGuests" :key="index" class="flex items-center gap-2">
                    <UInput
                      v-model="guest.name"
                      :disabled="guest.saved"
                      :placeholder="`Guest ${index + 2} First and Last Name`"
                      class="flex-1"
                    />
                    <UButton size="xs" @click="toggleEdit(index)">
                      {{ guest.saved ? $t('rsvp.additionalGuests.edit') : $t('rsvp.additionalGuests.save') }}
                    </UButton>
                  </div>
                </div>
              </template>
            </template>

            <UFormField :label="$t('rsvp.form.message.label')" :hint="$t('rsvp.form.message.hint')" name="message">
              <UTextarea v-model="state.message" :placeholder="$t('rsvp.form.message.placeholder')" />
            </UFormField>

            <UButton type="submit" color="primary" class="w-full">{{ $t('rsvp.form.submit') }}</UButton>
          </UForm>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { z } from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()


const schema = z.object({
  name: z.string().min(1, t('rsvp.form.name.required')),
  email: z.string().email(t('rsvp.form.email.invalid')),
  attending: z.enum(['yes', 'no']),
  guests: z.string().optional(),
  message: z.string().optional()
})

type Schema = z.infer<typeof schema>

const state = reactive<Schema>({
  name: '',
  email: '',
  attending: 'no',
  guests: '',
  message: ''
})

const emailError = ref('')
const formSubmitted = ref(false)

const items = ref([
  { label: t('rsvp.form.attending.yes'), value: 'yes' },
  { label: t('rsvp.form.attending.no'), value: 'no' }
])

const additionalGuests = ref<{ name: string; saved: boolean }[]>([])

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
  if (!newVal || isNaN(Number(newVal))) return

  const count = Number(newVal) - 1
  const currentLength = additionalGuests.value.length

  if (count > currentLength) {
    for (let i = currentLength; i < count; i++) {
      additionalGuests.value.push({ name: '', saved: false })
    }
  } else if (count < currentLength) {
    additionalGuests.value.splice(count)
  }
})

const toggleEdit = (index: number) => {
  const guest = additionalGuests.value[index]
  const mainName = state.name.trim().toLowerCase()
  const guestName = guest.name.trim().toLowerCase()

  if (!guest.saved) {
    if (guest.name.trim() === '') {
      toast.add({ 
        title: t('rsvp.toast.guest.empty.title'), 
        description: t('rsvp.toast.guest.empty.description'), 
        color: 'error' 
      })
      return
    }

    if (guestName === mainName) {
      toast.add({ 
        title: t('rsvp.toast.guest.duplicate_main.title'), 
        description: t('rsvp.toast.guest.duplicate_main.description'), 
        color: 'error' 
      })
      return
    }

    const isDuplicate = additionalGuests.value.some((g, i) => i !== index && g.name.trim().toLowerCase() === guestName)

    if (isDuplicate) {
      toast.add({ 
        title: t('rsvp.toast.guest.duplicate.title'), 
        description: t('rsvp.toast.guest.duplicate.description'), 
        color: 'error' 
      })
      return
    }
  }

  guest.saved = !guest.saved
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

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  formSubmitted.value = true
  checkEmail()

  if (emailError.value) {
    toast.add({ title: 'Invalid Input', description: emailError.value, color: 'error' })
    return
  }

  const mainName = event.data.name.trim().toLowerCase()
  const duplicates = additionalGuests.value.some(g => g.name.trim().toLowerCase() === mainName)

  if (duplicates) {
    toast.add({ 
      title: 'Duplicate Name Detected', 
      description: 'The name in the Full Name input cannot match any of the additional guest names.', 
      color: 'error' 
    })
    return
  }

  // Check if there are any duplicate guest names
  const duplicateGuests = additionalGuests.value.some((guest, index) => {
    const guestName = guest.name.trim().toLowerCase()
    return additionalGuests.value.some((otherGuest, otherIndex) => 
      otherIndex !== index && otherGuest.name.trim().toLowerCase() === guestName
    )
  })

  if (duplicateGuests) {
    toast.add({ 
      title: 'Duplicate Guest Name Detected', 
      description: 'There are duplicate additional guest names. Please ensure each guest has a unique name.', 
      color: 'error' 
    })
    return
  }

  console.log('Form submitted:', {
    ...event.data,
    additionalGuests: additionalGuests.value.map(g => g.name)
  })

  toast.add({ 
    title: 'RSVP Submitted', 
    description: 'Thank you for your response!', 
    color: 'success' 
  })
}

</script>


<style scoped>

</style>
