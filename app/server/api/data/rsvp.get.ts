import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)

const { data: rsvp, error } = await client
  .from('rsvp')
  .select(`
    *,
    guests (
      name,
      is_adult
    )
  `)
  .not('email', 'like', 'cronTest%')

  
  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message })
  }

  // Mask emails
  const maskedRsvp = rsvp.map(item => ({
    ...item,
    email: maskEmail(item.email)
  }))

  return { rsvp: maskedRsvp }
})

// Helper function to mask the email
function maskEmail(email: string): string {
  const [name, domain] = email.split('@')

  if (!name || !domain) return '***@***'

  const visible = name.slice(0, 3)
  const domainParts = domain.split('.')
  const maskedDomain = '*'.repeat(domainParts[0]?.length || 4)
  const tld = domainParts.slice(1).join('.') || '***'

  return `${visible}***@${maskedDomain}.${tld}`
}
