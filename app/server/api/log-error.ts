import { useErrorLogger } from '~/composables/useErrorLogger.server'

export default defineEventHandler(async (event) => {
  const { logError } = useErrorLogger()
  
  try {
    const body = await readBody(event)
    
    // Validate required fields
    if (!body.level || !body.source || !body.errorMessage) {
      throw createError({ 
        statusCode: 400, 
        statusMessage: 'Missing required fields: level, source, errorMessage' 
      })
    }

    // Log the error using our utility
    await logError(event, {
      level: body.level,
      source: body.source,
      endpoint: body.endpoint,
      errorMessage: body.errorMessage,
      errorDetails: body.errorDetails,
      requestData: body.requestData,
      userAgent: body.userAgent,
      ipAddress: body.ipAddress
    })

    return { success: true }
  } catch (error) {
    // Don't throw error if logging fails - just return success
    // This prevents logging errors from breaking the application
    return { success: true }
  }
}) 