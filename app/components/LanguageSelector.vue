<template>
  <div class="language-toggle flex items-center gap-4">
    <label :class="{ active: locale === 'en' }" class="flex items-center gap-1">
      <img src="@/assets/icons/canada.png" alt="Canada Flag" class="w-5 h-5" />
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
      <img src="@/assets/icons/germany.png" alt="Germany Flag" class="w-5 h-5" />
    </label>
  </div>
</template>



<script setup>
import { ref, watch } from 'vue'
import { useI18n } from '#imports'


const { locale, setLocale } = useI18n()
const isGerman = ref(locale.value === 'de')

// Watch toggle value and change locale
watch(isGerman, (newVal) => {
  const newLocale = newVal ? 'de' : 'en'
  if (newLocale !== locale.value) {
    setLocale(newLocale)
  }
})
</script>
