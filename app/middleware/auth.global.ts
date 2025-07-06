export default defineNuxtRouteMiddleware(async (to, from) => {
  if (to.path.startsWith('/admin')) {
    // Normalize path by removing trailing slash (except root '/')
    const normalizedPath = to.path.endsWith('/') && to.path !== '/' 
      ? to.path.slice(0, -1) 
      : to.path

    const allowedAdminRoutes = ['/admin', '/admin/login', '/admin/dashboard', '/admin/message']
    const user = useSupabaseUser()

    // If trying to access disallowed admin routes → redirect to homepage
    if (!allowedAdminRoutes.includes(normalizedPath)) {
      return navigateTo('/')
    }

    // If user not logged in and not on login page → redirect to login
    if (!user.value && normalizedPath !== '/admin/login') {
      return navigateTo('/admin/login')
    }

    // If user is logged in and visiting /admin or /admin/login → redirect to dashboard
    if (user.value && (normalizedPath === '/admin' || normalizedPath === '/admin/login')) {
      return navigateTo('/admin/dashboard')
    }

    // Otherwise allow access
  }
})
