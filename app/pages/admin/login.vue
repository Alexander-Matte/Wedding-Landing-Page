<script setup lang="ts">
const supabase = useSupabaseClient()
const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMsg = ref('')

const signIn = async () => {
  loading.value = true
  errorMsg.value = ''
  const { error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  })
  if (error) {
    errorMsg.value = error.message
  } else {
    await navigateTo('/admin/dashboard') // or your desired page
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

      <form @submit.prevent="signIn" class="space-y-4">
        <UFormGroup label="Email" name="email">
          <UInput v-model="email" type="email" placeholder="admin@example.com" required />
        </UFormGroup>

        <UFormGroup label="Password" name="password">
          <UInput v-model="password" type="password" placeholder="••••••••" required />
        </UFormGroup>

        <UButton type="submit" class="w-full mt-2" color="success" :loading="loading">
          Login
        </UButton>


        <p v-if="errorMsg" class="text-sm text-red-500 text-center">{{ errorMsg }}</p>
      </form>

      <template #footer>
        <p class="text-xs text-gray-400 text-center">
          Enter your credentials to access the admin panel.
        </p>
      </template>
    </UCard>
  </div>
</template>
