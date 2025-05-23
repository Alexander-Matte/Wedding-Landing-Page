<template>
  <div>
    <h3 class="text-2xl font-semibold mb-6 text-center">
      {{ $t('weddingDetails.accommodations.title') }}
    </h3>

    <ClientOnly>
      <UCarousel
        v-slot="{ item }"
        :items="accommodationItems"
        :ui="{
          item: 'basis-full md:basis-1/2 lg:basis-1/3',
          arrows: 'hidden md:flex'
        }"
        arrows
        :prev="{ variant: 'solid' }"
        :next="{ variant: 'solid' }"
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
            title="Info"
            :close="{
              color: 'primary',
              variant: 'outline',
              class: 'rounded-full'
            }"
            >
              <UButton 
              color="warning" 
              label="Open"
              trailing-icon="heroicons:information-circle" 
              size="lg"
              class="rounded-b-none"
              :close="{
                color: 'primary',
                variant: 'outline',
                class: 'rounded-full'
              }">
                {{ $t('weddingDetails.accommodations.info') }}
            </UButton>
              <template #body>
                <p class="text-white">
                  {{ rt(item.info) }}
                </p>
              </template>
              <template #footer>
                <div class="text-white">
                  {{ rt(item.note_accommodation) }}
                  <div class="mt-5">
                    <NuxtLink
                      to="/contact"
                      class="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded shadow transition duration-150"
                    >
                      <UIcon name="heroicons:envelope" class="w-5 h-5" />
                    {{ $t('contact.title') }}
                  </NuxtLink></div>
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
