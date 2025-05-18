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
      const emailResponse = await fetch('http://192.168.2.113:3000/api/sendEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: 'Automated Email <yourwedding@resend.dev>',
          to: `${process.env.EMAIL_TO}`,
          subject: "Someone RSVP'd to your wedding!",
          message: rpcPayload.message,
        }),
      })

      if (!emailResponse.ok) {
        const err = await emailResponse.json()
      }

    } catch (emailError) {
    }
  
    return { success: true }
  })
  