<template>
  <div class="language-toggle flex items-center gap-4">
    <label :class="{ active: locale === 'en' }" class="flex items-center gap-1">
      <img src="@/assets/icons/canada.png" alt="Canada Flag" class="w-5 h-5" >
    </label>

    <USwitch
      v-model="isGerman"
      class="custom-switch"
      :checked-icon="null"
      :unchecked-icon="null"
      color="info"
      size="xl"
    />

    <label :class="{ active: locale === 'de' }" class="flex items-center gap-1">
      <img src="@/assets/icons/germany.png" alt="Germany Flag" class="w-5 h-5" >
    </label>
  </div>
</template>



<script setup>
import { ref, watch, onMounted } from 'vue'
import { useI18n } from '#imports'

const { locale, setLocale } = useI18n()
const isGerman = ref(false)

onMounted(() => {
  const savedLocale = localStorage.getItem('locale')
  if (savedLocale && savedLocale !== locale.value) {
    setLocale(savedLocale)
  }
  isGerman.value = locale.value === 'de'
})

watch(isGerman, (newVal) => {
  const newLocale = newVal ? 'de' : 'en'
  if (newLocale !== locale.value) {
    setLocale(newLocale)
    localStorage.setItem('locale', newLocale)
  }
})
</script>

