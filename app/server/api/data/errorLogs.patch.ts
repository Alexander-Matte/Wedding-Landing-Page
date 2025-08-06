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
  const body = await readBody(event)
  
  if (!body.id) {
    throw createError({ statusCode: 400, statusMessage: 'Error log ID is required' })
  }

  const updateData: any = {}
  
  if (body.resolved !== undefined) {
    updateData.resolved = body.resolved
  }
  
  if (body.notes) {
    updateData.notes = body.notes
  }
  
  if (body.resolved === true) {
    updateData.resolved_by = user.email
    updateData.resolved_at = new Date().toISOString()
  }

  const { data, error } = await client
    .from('error_logs')
    .update(updateData)
    .eq('id', body.id)
    .select()
    .single()

  if (error) {
    await logErrorLevel(event, 'api', 'Error log update failed', { 
      endpoint: '/api/data/errorLogs',
      error: error.message,
      userEmail: user.email,
      errorLogId: body.id 
    })
    throw createError({ statusCode: 500, statusMessage: error.message })
  }

  return { success: true, data }
}) 