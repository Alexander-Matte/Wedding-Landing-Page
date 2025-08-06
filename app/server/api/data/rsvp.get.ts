import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import { useErrorLogger } from '~/composables/useErrorLogger.server'

export default defineEventHandler(async (event) => {
  const { logErrorLevel } = useErrorLogger()
  
  // Check if user is authenticated
  const user = await serverSupabaseUser(event)
  if (!user) {
    await logErrorLevel(event, 'api', 'Unauthorized access attempt', { endpoint: '/api/data/rsvp' })
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized - Please log in' })
  }

  // Check if user has admin role (you can customize this based on your user roles)
  // For now, we'll check if the user email matches admin emails
  const config = useRuntimeConfig()
  const adminEmail = config.adminEmail
  if (user.email && user.email !== adminEmail) {
    await logErrorLevel(event, 'api', 'Admin access denied', { 
      endpoint: '/api/data/rsvp',
      userEmail: user.email,
      adminEmail: adminEmail 
    })
    throw createError({ statusCode: 403, statusMessage: 'Forbidden - Admin access required' })
  }

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
    await logErrorLevel(event, 'api', 'Database query failed', { 
      endpoint: '/api/data/rsvp',
      error: error.message,
      userEmail: user.email 
    })
    throw createError({ statusCode: 500, statusMessage: error.message })
  }

  // Mask emails
  const maskedRsvp = (rsvp || []).map((item: any) => ({
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
