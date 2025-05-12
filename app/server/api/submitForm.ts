export default defineEventHandler(async (event) => {
    const { token, rpcPayload } = await readBody(event)
    const supabase = useNuxtApp().$supabase
  
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
  
    return { success: true }
  })
  