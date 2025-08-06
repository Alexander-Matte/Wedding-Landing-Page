import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'

export interface ErrorLogData {
  level: 'error' | 'warn' | 'info' | 'debug'
  source: string
  endpoint?: string
  errorMessage: string
  errorDetails?: any
  requestData?: any
  userAgent?: string
  ipAddress?: string
}

export const useErrorLogger = () => {
  const logError = async (event: any, errorData: ErrorLogData) => {
    try {
      const client = await serverSupabaseClient(event)
      
      // Try to get user info, but don't fail if no session exists
      let user = null
      try {
        user = await serverSupabaseUser(event)
      } catch (authError) {
        // User is not authenticated - this is normal for public endpoints
        user = null
      }
      
      const logEntry = {
        level: errorData.level,
        source: errorData.source,
        endpoint: errorData.endpoint,
        user_email: user?.email || null,
        user_id: user?.id || null,
        error_message: errorData.errorMessage,
        error_detail: errorData.errorDetails ? JSON.stringify(errorData.errorDetails) : null,
        request_data: errorData.requestData ? JSON.stringify(errorData.requestData) : null,
        user_agent: errorData.userAgent || getHeader(event, 'user-agent'),
        ip_address: errorData.ipAddress || getClientIP(event),
        resolved: false
      }

      const { error } = await client
        .from('error_logs')
        .insert([logEntry] as any)

      if (error) {
        // Fallback to console if database logging fails
        console.error('Failed to log error to database:', error)
        console.error('Original error:', errorData)
      }
    } catch (loggingError) {
      // Fallback to console if logging completely fails
      console.error('Error logging failed:', loggingError)
      console.error('Original error:', errorData)
    }
  }

  const logErrorLevel = async (event: any, source: string, message: string, details?: any) => {
    await logError(event, {
      level: 'error',
      source,
      errorMessage: message,
      errorDetails: details
    })
  }

  const logWarning = async (event: any, source: string, message: string, details?: any) => {
    await logError(event, {
      level: 'warn',
      source,
      errorMessage: message,
      errorDetails: details
    })
  }

  const logInfo = async (event: any, source: string, message: string, details?: any) => {
    await logError(event, {
      level: 'info',
      source,
      errorMessage: message,
      errorDetails: details
    })
  }

  return {
    logError,
    logErrorLevel,
    logWarning,
    logInfo
  }
}

function getHeader(event: any, headerName: string): string | null {
  try {
    return event.node.req.headers[headerName] || null
  } catch {
    return null
  }
}

function getClientIP(event: any): string | null {
  try {
    return event.node.req.socket.remoteAddress || null
  } catch {
    return null
  }
} 