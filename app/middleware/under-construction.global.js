export default defineNuxtRouteMiddleware((to, from) => {
  if (to.path !== '/under-construction') {
    return navigateTo('/under-construction')
  }
})
  