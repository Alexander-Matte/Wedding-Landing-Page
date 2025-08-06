import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import { useErrorLogger } from '~/composables/useErrorLogger.server'

export default defineEventHandler(async (event) => {
  const { logErrorLevel } = useErrorLogger()
  
  // Check if user is authenticated
  const user = await serverSupabaseUser(event)
  if (!user) {
    await logErrorLevel(event, 'api', 'Unauthorized access attempt', { endpoint: '/api/data/errorLogs' })
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized - Please log in' })
  }

  // Check if user has admin role
  const config = useRuntimeConfig()
  const adminEmail = config.adminEmail
  if (user.email && user.email !== adminEmail) {
    await logErrorLevel(event, 'api', 'Admin access denied', { 
      endpoint: '/api/data/errorLogs',
      userEmail: user.email,
      adminEmail: adminEmail 
    })
    throw createError({ statusCode: 403, statusMessage: 'Forbidden - Admin access required' })
  }

  const client = await serverSupabaseClient(event)
  const query = getQuery(event)
  
  // Build query with optional filters
  let supabaseQuery = client
    .from('error_logs')
    .select('*')
    .order('created_at', { ascending: false })

  // Add filters if provided
  if (query.level) {
    supabaseQuery = supabaseQuery.eq('level', query.level)
  }
  
  if (query.source) {
    supabaseQuery = supabaseQuery.eq('source', query.source)
  }
  
  if (query.resolved === 'false') {
    supabaseQuery = supabaseQuery.eq('resolved', false)
  }
  
  if (query.resolved === 'true') {
    supabaseQuery = supabaseQuery.eq('resolved', true)
  }

  // Limit results (default 100, max 1000)
  const limit = Math.min(parseInt(query.limit as string) || 100, 1000)
  supabaseQuery = supabaseQuery.limit(limit)

  const { data: errorLogs, error } = await supabaseQuery

  if (error) {
    await logErrorLevel(event, 'api', 'Error logs query failed', { 
      endpoint: '/api/data/errorLogs',
      error: error.message,
      userEmail: user.email 
    })
    throw createError({ statusCode: 500, statusMessage: error.message })
  }

  return { errorLogs }
}) 