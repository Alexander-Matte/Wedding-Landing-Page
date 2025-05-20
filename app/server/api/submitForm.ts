import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
    
    const { token, rpcPayload } = await readBody(event)

    const supabaseUrl = useRuntimeConfig().public.supabaseUrl
    const supabaseAnonKey = useRuntimeConfig().public.supabaseAnonKey
    const supabase = createClient(supabaseUrl, supabaseAnonKey)


  
    if (!token) {
      throw createError({ statusCode: 400, statusMessage: 'Turnstile token missing.' })
    }
  
    const result = await verifyTurnstileToken(token)
    if (!result.success) {

      throw createError({ statusCode: 403, statusMessage: 'Turnstile verification failed.' })
    }
  
    const { error } = await supabase.rpc('save_rsvp_and_guests', {
      attending: rpcPayload.attending,
      email: rpcPayload.email,
      guests: rpcPayload.guests,
      mainname: rpcPayload.mainName,
      message: rpcPayload.message
    })
  
    if (error) {
      throw createError({ statusCode: 500, statusMessage: error.message })
    }

    try {
      const emailResponse = await $fetch('/api/sendEmail', {
        method: 'POST',
        body: {
          message: rpcPayload.message,
          name: rpcPayload.mainName,
          email: rpcPayload.email,
        }
      })
    } catch (emailError) {
      // Handle error (e.g., emailError.data for response body)
    }

  
    return { success: true }
  })
  