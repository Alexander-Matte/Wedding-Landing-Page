import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)

    const rsvpId = getQuery(event).rsvpId

    const { data, error } = await client
    .from('rsvp')
    .select('email')
    .eq('id', rsvpId) // Use the variable directly
    .single(); // Use .single() if you expect only one result

    if (error) {
        console.error(error.message)
    return { error: "Error Fetching Email" }
    }

    return { data }



})
