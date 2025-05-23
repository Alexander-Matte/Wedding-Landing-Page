export default defineNuxtRouteMiddleware((to) => {
  if (process.env.VERCEL_ENV !== 'production') return

  if (to.path !== '/under-construction') {
    return navigateTo('/under-construction')
  }
})
