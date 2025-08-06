export default defineNuxtPlugin(() => {
  const nuxtApp = useNuxtApp()
  
  // Handle Vue errors on client side
  nuxtApp.vueApp.config.errorHandler = (error, instance, info) => {
    console.error('Vue error:', error, info)
    // You can add client-side error reporting here if needed
  }
  
  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason)
    // You can add client-side error reporting here if needed
  })
  
  // Handle global errors
  window.addEventListener('error', (event) => {
    console.error('Global error:', event.error)
    // You can add client-side error reporting here if needed
  })
}) 