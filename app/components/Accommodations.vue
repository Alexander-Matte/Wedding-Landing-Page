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
        :autoplay="{ delay: 3000 }"
        class="w-full items-stretch"
      >
        <div class="flex flex-col h-full">
          <div class="flex flex-col h-full bg-white rounded-lg shadow overflow-hidden min-h-[500px]">
            <!-- Image -->
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

              <a
                :href="rt(item.website)"
                target="_blank"
                rel="noopener"
                class="text-blue-600 hover:underline"
              >
                {{ $t('weddingDetails.accommodations.visitMessage') }}
              </a>

              <p class="text-gray-600 mt-2 flex-grow">
                {{ rt(item.description) }}
              </p>
            </div>
          </div>
        </div>
      </UCarousel>
    </ClientOnly>

  </div>
</template>


<script setup lang="ts">
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
