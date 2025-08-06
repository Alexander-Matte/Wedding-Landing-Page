<template>
  <div class="language-toggle flex flex-row items-center gap-2 flex-nowrap">
    <button 
      @click="setLanguage('en')" 
      :class="{ 
        'active': locale === 'en',
        'inactive': locale !== 'en'
      }" 
      class="flex flex-row items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-wedding-pink/10 whitespace-nowrap"
    >
      <img src="@/assets/icons/canada.png" alt="Canada Flag" class="w-4 h-4 flex-shrink-0" />
      <span class="text-sm font-medium">EN</span>
    </button>

    <div class="w-px h-6 bg-gray-300 flex-shrink-0"></div>

    <button 
      @click="setLanguage('de')" 
      :class="{ 
        'active': locale === 'de',
        'inactive': locale !== 'de'
      }" 
      class="flex flex-row items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-wedding-pink/10 whitespace-nowrap"
    >
      <img src="@/assets/icons/germany.png" alt="Germany Flag" class="w-4 h-4 flex-shrink-0" />
      <span class="text-sm font-medium">DE</span>
    </button>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useI18n } from '#imports'

const { locale, setLocale } = useI18n()

const setLanguage = (lang) => {
  setLocale(lang)
  localStorage.setItem('locale', lang)
}

onMounted(() => {
  const savedLocale = localStorage.getItem('locale')
  if (savedLocale && savedLocale !== locale.value) {
    setLocale(savedLocale)
  }
})
</script>

<style scoped>
.language-toggle {
  font-family: var(--secondary-font-family);
  display: flex !important;
  flex-direction: row !important;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: nowrap;
}

.active {
  background: rgba(240, 215, 209, 0.2);
  color: #6b7280;
  font-weight: 600;
}

.inactive {
  color: #6b7280;
  font-weight: 400;
}

.inactive:hover {
  color: var(--color-wedding-btn-pink);
}

/* Mobile optimizations */
@media (max-width: 640px) {
  .language-toggle {
    gap: 1px;
  }
  
  .language-toggle button {
    padding: 0.5rem 0.75rem;
  }
  
  .language-toggle span {
    font-size: 0.75rem;
  }
}

/* Ensure horizontal layout on all screen sizes */
@media (min-width: 641px) {
  .language-toggle {
    flex-direction: row !important;
  }
}
</style>

