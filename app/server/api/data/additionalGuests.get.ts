import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)

  const rsvpId = getQuery(event).rsvpId

  if (!rsvpId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing RSVP ID'
    })
  }

  const { data, error } = await client
    .from('additionalguests')
    .select('name, is_adult')
    .eq('rsvp_id', rsvpId)

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message
    })
  }

  return { guests: data }
})
