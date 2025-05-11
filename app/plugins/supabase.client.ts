import { createClient } from '@supabase/supabase-js'

export default defineNuxtPlugin(nuxtApp => {
  const supabaseUrl = useRuntimeConfig().public.supabaseUrl
  const supabaseKey = useRuntimeConfig().public.supabaseAnonKey
  const supabase = createClient(supabaseUrl, supabaseKey)

  nuxtApp.provide('supabase', supabase)
})
