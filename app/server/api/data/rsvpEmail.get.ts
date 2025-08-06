import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  // Check if user is authenticated
  const user = await serverSupabaseUser(event)
  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized - Please log in' })
  }

  // Check if user has admin role
  const config = useRuntimeConfig()
  const adminEmail = config.adminEmail
  if (user.email && user.email !== adminEmail) {
    throw createError({ statusCode: 403, statusMessage: 'Forbidden - Admin access required' })
  }

  const client = await serverSupabaseClient(event)

    const rsvpId = getQuery(event).rsvpId

    // Validate rsvpId
    if (!rsvpId || typeof rsvpId !== 'string') {
      throw createError({ statusCode: 400, statusMessage: 'Invalid RSVP ID' })
    }

    const { data, error } = await client
    .from('rsvp')
    .select('email')
    .eq('id', rsvpId)
    .single();

    if (error) {
        return { error: "Error fetching email data" }
    }

    // Mask the email for security
    const maskedEmail = maskEmail((data as any).email)

    return { data: { email: maskedEmail } }
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
