// Simple in-memory rate limiting (for production, consider using Redis)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

export default defineNuxtRouteMiddleware((to) => {
  // Only apply rate limiting to sensitive routes
  const sensitiveRoutes = ['/admin/login', '/api/data/rsvp', '/api/data/rsvpEmail']
  const isSensitiveRoute = sensitiveRoutes.some(route => to.path.startsWith(route))
  
  if (!isSensitiveRoute) return

  const clientIP = getClientIP() || 'unknown'
  const key = `${clientIP}:${to.path}`
  const now = Date.now()
  const windowMs = 15 * 60 * 1000 // 15 minutes
  const maxRequests = to.path === '/admin/login' ? 5 : 100 // 5 login attempts, 100 API calls

  const current = rateLimitStore.get(key)
  
  if (!current || now > current.resetTime) {
    // First request or window expired
    rateLimitStore.set(key, { count: 1, resetTime: now + windowMs })
  } else if (current.count >= maxRequests) {
    // Rate limit exceeded
    throw createError({
      statusCode: 429,
      statusMessage: 'Too many requests. Please try again later.'
    })
  } else {
    // Increment counter
    current.count++
  }
})

function getClientIP(): string | undefined {
  // This is a simplified version - in production, you'd want to handle various proxy scenarios
  if (process.server) {
    const event = useRequestEvent()
    return event?.node.req.socket.remoteAddress
  }
  return undefined
} 