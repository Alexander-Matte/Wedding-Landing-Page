export default defineNuxtRouteMiddleware((to) => {
  // Only run in production mode
  if (process.env.NODE_ENV !== 'production') return

  // Prevent redirect loop
  if (to.path !== '/under-construction') {
    return navigateTo('/under-construction')
  }
})
