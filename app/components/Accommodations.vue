<template>
  <div>
    <div class="text-2xl font-semibold my-9 text-center">
      <USeparator size="xs" color="neutral" :label="$t('weddingDetails.accommodations.title')" :ui="{ label: 'text-lg font-semibold' }"/>
    </div>

    <ClientOnly>
      <UCarousel
        v-slot="{ item }"
        :items="accommodationItems"
        :ui="{
          item: 'basis-full md:basis-1/2 lg:basis-1/3',
          arrows: 'hidden md:flex'
        }"
        arrows
        :prev="{ variant: 'solid', size: 'xl' }"
        :next="{ variant: 'solid', size: 'xl' }"
        dots
        loop
        :autoplay="{ delay: 3500 }"
        class="w-full items-stretch"
      >
        <div class="flex flex-col h-full">
          <div class="flex flex-col h-full bg-white rounded-lg shadow overflow-hidden min-h-[600px]">
            <USlideover 
            v-if="item.info" 
            side="bottom" 
            :title="$t('weddingDetails.accommodations.info')"
            :close="{
              color: 'gray',
              variant: 'outline',
              class: 'rounded-full hover:bg-wedding-pink/10'
            }"
            :ui="{
              overlay: 'bg-black/50 backdrop-blur-sm',
              base: 'bg-white border-l border-wedding-pink/20',
              header: 'bg-wedding-pink! bg-gradient-to-r from-wedding-pink/10 to-wedding-btn-pink/10 border-b border-wedding-pink/20',
              title: 'text-gray-800 font-medium',
              body: 'p-6 bg-white',
              footer: 'bg-gray-50 border-t border-wedding-pink/20 p-6',
              close: 'text-gray-600 hover:text-wedding-btn-pink hover:bg-wedding-pink/10'
            }"
            class="!bg-white"
            >
              <UButton 
                color="gray" 
                variant="outline"
                label="Open"
                trailing-icon="emojione-v1:information" 
                size="lg"
                class="rounded-b-none border-wedding-pink/30 hover:bg-wedding-pink/10 hover:border-wedding-pink/50 transition-all duration-200"
                :ui="{
                  trailingIcon: 'text-xl ml-auto text-wedding-btn-pink'
                }"
              >
                {{ $t('weddingDetails.accommodations.info') }}
            </UButton>
              <template #body>
                <div class="space-y-4 bg-white">
                  <div class="p-4 bg-wedding-pink/5 rounded-lg border border-wedding-pink/20">
                    <p class="text-gray-700 leading-relaxed">
                      {{ rt(item.info) }}
                    </p>
                  </div>
                </div>
              </template>
              <template #footer>
                <div class="space-y-4 bg-gray-50">
                  <div class="p-4 bg-wedding-btn-pink/5 rounded-lg border border-wedding-btn-pink/20">
                    <p class="text-gray-700 leading-relaxed text-sm">
                      {{ rt(item.note_accommodation) }}
                    </p>
                  </div>
                  <div class="flex justify-center">
                    <NuxtLink
                      to="/contact"
                      class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-wedding-pink to-wedding-btn-pink hover:from-wedding-btn-pink hover:to-wedding-pink text-white font-medium rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                    >
                      <UIcon name="i-lucide-mail" class="w-5 h-5" />
                      {{ $t('contact.title') }}
                    </NuxtLink>
                  </div>
                </div>
              </template>
            </USlideover>
            <img
              :src="`/img/accommodations/${rt(item.img)}`"
              alt="Accommodation image"
              class="w-full h-48 object-cover"
            />
            <!-- Content -->
            <div class="p-4 flex flex-col flex-grow">
              <h4 class="text-lg font-medium">
                {{ rt(item.header) }}
              </h4>
              <p class="text-gray-600 mt-2 flex-grow">
                {{ rt(item.description) }}
              </p>
              <UButton 
              :to="rt(item.website)" 
              trailing-icon="i-lucide-arrow-right" 
              size="md">
              {{ $t('weddingDetails.accommodations.visitMessage') }}
            </UButton>
            </div>
          </div>
        </div>
      </UCarousel>
    </ClientOnly>

  </div>
</template>


<script setup lang="ts">
import { isMemberName } from 'typescript'
import { useI18n } from 'vue-i18n'

const { tm, rt } = useI18n()

interface AccommodationCard {
  header: string
  website: string
  description: string
  info?: string
  note_accommodation?: string
}

const cards = tm('weddingDetails.accommodations.cards') as Record<
  string,
  AccommodationCard
>

const accommodationItems = computed(() => Object.entries(cards).map(([key, value]) => ({ ...value, _key: key })))

const itemKeyMap = computed(() =>
  Object.fromEntries(accommodationItems.value.map((item, i) => [i, item._key]))
)
</script>

<style scoped>
/* Override modal styling to ensure wedding theme */
:deep(.slideover) {
  background-color: white !important;
}

:deep(.slideover-header) {
  background: linear-gradient(to right, rgba(240, 215, 209, 0.1), rgba(219, 134, 134, 0.1)) !important;
  border-bottom: 1px solid rgba(240, 215, 209, 0.2) !important;
}

:deep(.slideover-body) {
  background-color: white !important;
  color: #374151 !important;
}

:deep(.slideover-footer) {
  background-color: #f9fafb !important;
  border-top: 1px solid rgba(240, 215, 209, 0.2) !important;
}

:deep(.slideover-title) {
  color: #1f2937 !important;
  font-weight: 500 !important;
}

:deep(.slideover-close) {
  color: #6b7280 !important;
}

:deep(.slideover-close:hover) {
  color: #db8686 !important;
  background-color: rgba(240, 215, 209, 0.1) !important;
}
</style>
