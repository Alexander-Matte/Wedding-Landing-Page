<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

// Supabase
const supabase = useSupabaseClient()

const schema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
})

type Schema = z.infer<typeof schema>

const state = reactive<Schema>({
  email: '',
  password: ''
})

const loading = ref(false)
const errorMsg = ref('')

const signIn = async (event: FormSubmitEvent<Schema>) => {
  loading.value = true
  errorMsg.value = ''

  const { error } = await supabase.auth.signInWithPassword({
    email: event.data.email,
    password: event.data.password,
  })

  if (error) {
    errorMsg.value = error.message
  } else {
    await navigateTo('/admin/dashboard')
  }

  loading.value = false
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-8">
    <UCard class="w-full max-w-full sm:max-w-md shadow-xl rounded-2xl bg-white p-6 sm:p-8">
      <template #header>
        <h1 class="text-lg sm:text-xl font-semibold text-center text-gray-800">Admin Login</h1>
      </template>

      <UForm :schema="schema" :state="state" @submit="signIn" class="space-y-6">
        <UFormField 
        name="email" 
        label="Email" 
        required 
        :ui="{ label: 'font-bold' }"
        >
          <UInput
            v-model="state.email"
            type="email"
            placeholder="admin@example.com"
            class="w-full rounded-md border border-0 px-0 py-3 text-base focus:outline-none focus:ring-2 focus:ring-green-500"
            autocomplete="email"
          />
        </UFormField>

        <UFormField name="password" 
        label="Password"
        required
        :ui="{ label: 'font-bold' }"
        >
          <UInput
            v-model="state.password"
            type="password"
            placeholder="••••••••"
            class="w-full rounded-md border border-0 px-0 py-3 text-base focus:outline-none focus:ring-2 focus:ring-green-500"
            autocomplete="current-password"
          />
        </UFormField>

        <UButton
          type="submit"
          class="w-full py-3 text-base sm:text-lg rounded-md"
          color="success"
          :loading="loading"
        >
          Login
        </UButton>

        <p v-if="errorMsg" class="text-sm text-red-600 text-center mt-2" role="alert" aria-live="assertive">
          {{ errorMsg }}
        </p>
      </UForm>

      <template #footer>
        <p class="text-xs sm:text-sm text-gray-500 text-center mt-4">
          Enter your credentials to access the admin panel.
        </p>
      </template>
    </UCard>
  </div>
</template>
