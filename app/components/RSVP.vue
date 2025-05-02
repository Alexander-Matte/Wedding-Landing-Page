<template>
  <section id="rsvp" class="py-20 px-4">
    <div class="max-w-3xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
      <div class="md:flex">
        <div class="md:w-1/3 p-8 flex flex-col justify-center">
          <h2 class="text-3xl italic mb-4">RSVP</h2>
          <p class="mb-6">Please let us know if you'll be joining us on our special day.</p>
          <p class="-200">Kindly respond by July 15, 2023</p>
        </div>
        <div class="md:w-2/3 p-8">
          <UForm :schema="schema" :state="state" @submit="onSubmit" class="space-y-6">
            <UFormField label="Full Name" name="name" required>
              <UInput v-model="state.name" placeholder="Enter your full name" />
            </UFormField>

            <UFormField 
              label="Email" 
              name="email" 
              required 
              :error="emailError ? 'Please enter a valid email address.' : ''"
            >
              <UInput 
                v-model="state.email" 
                type="email" 
                placeholder="Enter your email" 
                @blur="checkEmail"
                :class="{'border-red-500': emailError, 'focus:ring-red-500': emailError}"
              />
            </UFormField>


            <UFormField label="Will you be attending?" name="attending">
              <URadioGroup v-model="state.attending" :items="items" />
            </UFormField>

            <template v-if="state.attending === 'yes'">
              <UFormField label="Number of Guests (Including Yourself)" name="guests">
                <USelect v-model="state.guests" arrow color="neutral" variant="subtle" :items="['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']" />
              </UFormField>
              <template v-if="state.attending === 'yes' && Number(state.guests) > 1">
                <div class="space-y-4">
                  <h3 class="text-lg font-semibold">Additional Guest Names</h3>
                  <div v-for="(guest, index) in additionalGuests" :key="index" class="flex items-center gap-2">
                    <UInput
                      v-model="guest.name"
                      :disabled="guest.saved"
                      :placeholder="`Guest ${index + 2} First and Last Name`"
                      class="flex-1"
                    />
                    <UButton size="xs" @click="toggleEdit(index)">
                      {{ guest.saved ? 'Edit' : 'Save' }}
                    </UButton>
                  </div>
                </div>
              </template>
            </template>

            <UFormField label="Message for the Couple" hint="Optional" name="message">
              <UTextarea v-model="state.message" placeholder="Share your well wishes or a memory" />
            </UFormField>

            <UButton type="submit" color="primary" class="w-full">Submit RSVP</UButton>
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

const schema = z.object({
  name: z.string().min(1, 'Full Name is required'),
  email: z.string().email('Invalid email address'),
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
  { label: 'Joyfully Accept', value: 'yes' },
  { label: 'Regretfully Decline', value: 'no' }
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
      toast.add({ title: 'Guest name is empty', description: 'Please enter a name before saving.', color: 'error' })
      return
    }

    if (guestName === mainName) {
      toast.add({ 
        title: 'Duplicate Name Detected', 
        description: 'This name is already added above in the Full Name field. Only additional guests in your party need to be entered here.', 
        color: 'error' 
      })
      return
    }

    // Check if the name is already used by another guest
    const isDuplicate = additionalGuests.value.some((g, i) => i !== index && g.name.trim().toLowerCase() === guestName)

    if (isDuplicate) {
      toast.add({ 
        title: 'Duplicate Guest Name Detected', 
        description: 'This guest name is already used by another guest.', 
        color: 'error' 
      })
      return
    }
  }

  guest.saved = !guest.saved
}


const checkEmail = () => {
  if (!state.email) {
    emailError.value = 'Email is required.'
  } else if (!isValidEmail(state.email)) {
    emailError.value = 'Invalid email address.'
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
