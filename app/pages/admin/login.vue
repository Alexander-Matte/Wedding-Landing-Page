<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

// Supabase
const supabase = useSupabaseClient()

// Zod schema
const schema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
})

// Infer form types
type Schema = z.infer<typeof schema>

// Form state
const state = reactive<Schema>({
  email: '',
  password: ''
})

const loading = ref(false)
const errorMsg = ref('')

// Submission handler
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
  <div class="flex min-h-screen items-center justify-center bg-gray-100 px-4">
    <UCard class="w-full max-w-md shadow-xl rounded-2xl bg-gray-100">
      <template #header>
        <h1 class="text-xl font-semibold text-center">Admin Login</h1>
      </template>

      <!-- Nuxt UI Form with Zod validation -->
      <UForm :schema="schema" :state="state" @submit="signIn" class="space-y-4">
        <UFormField name="email" label="Email">
          <UInput v-model="state.email" class="w-100" type="email" placeholder="admin@example.com" />
        </UFormField>

        <UFormField name="password" label="Password">
          <UInput v-model="state.password" class="w-100" type="password" placeholder="••••••••" />
        </UFormField>

        <UButton type="submit" class="w-full mt-2" color="success" :loading="loading">
          Login
        </UButton>

        <p v-if="errorMsg" class="text-sm text-red-500 text-center">{{ errorMsg }}</p>
      </UForm>

      <template #footer>
        <p class="text-xs text-gray-400 text-center">
          Enter your credentials to access the admin panel.
        </p>
      </template>
    </UCard>
  </div>
</template>
