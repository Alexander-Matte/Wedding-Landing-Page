<template>
  <section id="rsvp" class="py-20 px-4 bg-purple-50" style="background-image: url('https://images.unsplash.com/photo-1531685250784-7569952593d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80'); background-size: cover; background-position: center; background-blend-mode: overlay;">
    <div class="max-w-3xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
      <div class="md:flex">
        <div class="md:w-1/3 bg-purple-700 text-white p-8 flex flex-col justify-center">
          <h2 class="text-3xl font-serif italic mb-4">RSVP</h2>
          <p class="mb-6">Please let us know if you'll be joining us on our special day.</p>
          <p class="text-purple-200">Kindly respond by July 15, 2023</p>
        </div>
        <div class="md:w-2/3 p-8">
          <UForm :schema="schema" :state="state" @submit="onSubmit" class="space-y-6">
            <UFormField label="Full Name" name="name" required>
              <UInput v-model="state.name" placeholder="Enter your full name" />
            </UFormField>

            <UFormField label="Email" name="email" required>
              <UInput v-model="state.email" type="email" placeholder="Enter your email" />
            </UFormField>

            <UFormField label="Will you be attending?" name="attending">
              <URadioGroup v-model="state.attending" :options="[{ label: 'Joyfully Accept', value: 'yes' }, { label: 'Regretfully Decline', value: 'no' }]" />
            </UFormField>

            <template v-if="state.attending === 'yes'">
              <UFormField label="Number of Guests (Including Yourself)" name="guests">
                <USelect v-model="state.guests" :options="['1', '2', '3', '4']" />
              </UFormField>

              <UFormField label="Dietary Restrictions" name="dietaryRestrictions">
                <UTextarea v-model="state.dietaryRestrictions" placeholder="Please list any allergies or dietary restrictions" />
              </UFormField>
            </template>

            <UFormField label="Message for the Couple (Optional)" name="message">
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
import { ref, reactive } from 'vue'
import { z } from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

// Define the validation schema using zod
const schema = z.object({
  name: z.string().min(1, 'Full Name is required'),
  email: z.string().email('Invalid email address'),
  attending: z.enum(['yes', 'no']),
  guests: z.string().optional(),
  dietaryRestrictions: z.string().optional(),
  message: z.string().optional()
})

// Infer the schema type
type Schema = z.infer<typeof schema>

// Reactive state for form data
const state = reactive<Schema>({
  name: '',
  email: '',
  attending: 'yes',
  guests: '',
  dietaryRestrictions: '',
  message: ''
})

// Toast for notifications
const toast = useToast()

// Submission handler
const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  console.log('Form submitted:', event.data)
  toast.add({ title: 'RSVP Submitted', description: 'Thank you for your response!', color: 'success' })
}
</script>

<style scoped>
/* Page-specific styles */
</style>
