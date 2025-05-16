// composables/useScrollToHash.js
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

export default function useScrollToHash() {
  const route = useRoute()

  onMounted(() => {
    const hash = route.hash
    if (hash) {
      // Wait for the DOM to be fully loaded
      setTimeout(() => {
        const element = document.querySelector(hash)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    }
  })
}
