import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    
    const { token, rpcPayload } = await readBody(event)
    const supabase = await serverSupabaseClient(event)


  
    if (!token) {
      throw createError({ statusCode: 400, statusMessage: 'Turnstile token missing.' })
    }
  
    const result = await verifyTurnstileToken(token)
    if (!result.success) {

      throw createError({ statusCode: 403, statusMessage: 'Turnstile verification failed.' })
    }

  
    const { error } = await supabase.rpc('save_rsvp_and_guest', {
      attending: rpcPayload.attending,
      email: rpcPayload.email,
      guests: rpcPayload.guests,
      mainname: rpcPayload.mainName,
      message: rpcPayload.message
    })
  
    if (error) {
      console.log(error.message);
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
      
    }

  
    return { success: true }
  })
  