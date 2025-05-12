import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
    
    const { token, rpcPayload } = await readBody(event)

    const supabaseUrl = useRuntimeConfig().public.supabaseUrl
    const supabaseAnonKey = useRuntimeConfig().public.supabaseAnonKey
    const supabase = createClient(supabaseUrl, supabaseAnonKey)
  
    if (!token) {
        console.log({ statusCode: 400, statusMessage: 'Turnstile token missing.' });
      throw createError({ statusCode: 400, statusMessage: 'Turnstile token missing.' })
    }
  
    const result = await verifyTurnstileToken(token)
    if (!result.success) {
        console.log({ statusCode: 403, statusMessage: 'Turnstile verification failed.' })
      throw createError({ statusCode: 403, statusMessage: 'Turnstile verification failed.' })
    }

    console.log(result);
    console.log(token);
  
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
  
    return { success: true }
  })
  