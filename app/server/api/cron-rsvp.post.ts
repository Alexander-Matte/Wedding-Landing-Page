import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event)

  const randomNum = Math.floor(Math.random() * 1_000_000_000)
  const email = `cronTest${randomNum}@gmail.com`

  // Dummy payload
  const rpcPayload = {
    attending: true,
    email,
    guests: [],
    mainName: `Cron Test ${randomNum}`,
    message: 'Test RSVP via cron job'
  }

    const { data, error } = await supabase
      .from('rsvp') 
      .insert([
        {
          attending: rpcPayload.attending,
          email: rpcPayload.email,
          name: rpcPayload.mainName, 
          message: rpcPayload.message,
          guests: rpcPayload.guests 
        }
      ]);

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message })
  }

  return { success: true, email }
})
