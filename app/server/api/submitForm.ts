import { serverSupabaseClient } from '#supabase/server'
import { z } from 'zod'
import { useErrorLogger } from '~/composables/useErrorLogger.server'

// Input validation schema
const rsvpSchema = z.object({
  attending: z.boolean(),
  email: z.string().email('Invalid email address').max(255),
  mainName: z.string().min(1, 'Name is required').max(100, 'Name too long'),
  message: z.string().max(1000, 'Message too long').optional(),
  song: z.string().max(200, 'Song request too long').optional(),
  guests: z.array(z.object({
    name: z.string().min(1, 'Guest name required').max(100, 'Guest name too long'),
    is_adult: z.boolean()
  })).max(10, 'Too many guests').optional()
})

export default defineEventHandler(async (event) => {
    const { logErrorLevel } = useErrorLogger()
    
    const { token, rpcPayload } = await readBody(event)
    const supabase = await serverSupabaseClient(event)

    // Validate Turnstile token
    if (!token) {
      await logErrorLevel(event, 'api', 'Turnstile token missing', { endpoint: '/api/submitForm' })
      throw createError({ statusCode: 400, statusMessage: 'Turnstile token missing.' })
    }
  
    const result = await verifyTurnstileToken(token)
    if (!result.success) {
      await logErrorLevel(event, 'api', 'Turnstile verification failed', { 
        endpoint: '/api/submitForm',
        turnstileResult: result 
      })
      throw createError({ statusCode: 403, statusMessage: 'Turnstile verification failed.' })
    }

    // Validate and sanitize input data
    try {
      const validatedData = rsvpSchema.parse(rpcPayload)
      
      // Sanitize strings to prevent XSS
      const sanitizedData = {
        ...validatedData,
        mainName: sanitizeString(validatedData.mainName),
        message: validatedData.message ? sanitizeString(validatedData.message) : null,
        song: validatedData.song ? sanitizeString(validatedData.song) : null,
        guests: validatedData.guests?.map(guest => ({
          ...guest,
          name: sanitizeString(guest.name)
        }))
      }

      const { data, error } = await supabase
        .from('rsvp')
        .insert([{
          attending: sanitizedData.attending,
          email: sanitizedData.email.toLowerCase().trim(),
          name: sanitizedData.mainName,
          message: sanitizedData.message,
          guests: sanitizedData.guests,
          song: sanitizedData.song
        }] as any);

      if (error) {
        // Log the specific database error with more details
        await logErrorLevel(event, 'api', 'Database insert failed', { 
          endpoint: '/api/submitForm',
          error: error.message,
          errorCode: error.code,
          errorDetails: error.details,
          errorHint: error.hint,
          data: sanitizedData,
          requestData: rpcPayload
        })
        
        // Handle specific error types
        if (error.code === '23505' || error.message.includes('duplicate key')) { // Unique violation
          throw createError({ 
            statusCode: 409, 
            statusMessage: 'An RSVP with this email already exists.' 
          })
        } else if (error.code === '23503') { // Foreign key violation
          throw createError({ 
            statusCode: 400, 
            statusMessage: 'Invalid data provided.' 
          })
        } else {
          throw createError({ statusCode: 500, statusMessage: error.message })
        }
      }

      try {
        const emailResponse = await $fetch('/api/sendEmail', {
          method: 'POST',
          body: {
            message: sanitizedData.message,
            name: sanitizedData.mainName,
            email: sanitizedData.email,
          }
        })
      } catch (emailError) {
        // Email sending failed but don't fail the RSVP submission
        await logErrorLevel(event, 'api', 'Email sending failed', { 
          endpoint: '/api/submitForm',
          emailError: emailError,
          recipient: sanitizedData.email 
        })
      }

      return { success: true }
    } catch (validationError) {
      if (validationError instanceof z.ZodError) {
        await logErrorLevel(event, 'api', 'Validation error', { 
          endpoint: '/api/submitForm',
          validationErrors: validationError.errors,
          requestData: rpcPayload 
        })
        throw createError({ 
          statusCode: 400, 
          statusMessage: `Validation error: ${validationError.errors[0].message}` 
        })
      }
      // Don't log unexpected errors here since they're already logged above
      throw validationError
    }
})

// Helper function to sanitize strings
function sanitizeString(str: string): string {
  return str
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
}
  