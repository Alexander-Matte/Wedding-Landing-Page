<template>
  <section id="details" class="py-20 px-4">
    <div class="max-w-5xl mx-auto">
      <h2 class="text-3xl md:text-4xl text-center italic mb-12">
        {{ $t('weddingDetails.title') }}
      </h2>

      <div class="grid md:grid-cols-1 gap-10">

      <!-- Reception -->
      <div class="bg-white p-8 rounded-lg shadow-md">
        <h3 class="text-2xl mb-6">{{ $t('weddingDetails.reception.title') }}</h3>
        <div class="space-y-4">
          <div class="flex items-start gap-3">
            <UIcon name="emojione-v1:tear-off-calendar" class="mt-1 !size-6" />
            <p>{{ $t('weddingDetails.reception.date') }}</p>
          </div>
          <div class="flex items-start gap-3">
            <UIcon name="emojione-v1:two-oclock" class="mt-1 !size-6" />
            <p>{{ $t('weddingDetails.reception.time') }} 🥂</p>
          </div>
          <div class="flex items-start gap-3">
            <UIcon name="emojione-v1:round-pushpin" class="mt-1 !size-6" />
            <div>
              <p class="font-medium">{{ $t('weddingDetails.reception.location.title') }}</p>
              <p class="text-gray-600">{{ $t('weddingDetails.reception.location.addressLine1') }}</p>
              <p class="text-gray-600">{{ $t('weddingDetails.reception.location.addressLine2') }}</p>
            </div>
          </div>
        </div>
        <div class="mt-6 text-gray-700">
          <p>
            {{ $t('weddingDetails.reception.description') }}
            <ULink 
              to="https://paulushaus-neuwirth.de/"
              target="_blank"
              class="text-black hover:text-teal-600 underline hover:underline font-medium transition-colors"
            >
              paulushaus-neuwirth.de
            </ULink>

          </p>
        </div>
      </div>
      </div>


      <!-- Accommodations -->
      <Accommodations class="mt-12" />

  

      <!-- Transportation -->
      <div class="mt-18">
        <div class="text-2xl font-semibold mb-6 text-center">
        <USeparator
          size="xs"
          color="neutral"
          :label="$t('weddingDetails.transportation.title')"
          :ui="{ label: 'text-lg font-semibold' }"
        />

        </div>
        <UAccordion 
        trailing-icon="i-lucide-arrow-down"
        :items="items"
        type="multiple"
        :ui="{
          label: 'text-xl font-semibold',
          leadingIcon: 'text-4xl',
          trailingIcon: 'text-xl',
        }"
        >
          <template #content="{ item }">
            <div v-html="item.content" class="prose max-w-none pb-6"></div>
          </template>

        </UAccordion>
      </div>




    </div>
  </section>
</template>

<script setup lang="ts">
const { t,tm, rt } = useI18n();
import type { AccordionItem } from '@nuxt/ui'

const items: AccordionItem[] = [
  {
    label: t('weddingDetails.transportation.accordion.arrivingInGermany.title'),
    icon: 'emojione-v1:airplane-departure',
    content: t('weddingDetails.transportation.accordion.arrivingInGermany.content').replace(/\n/g, '<br/>'),
  },
  {
    label: t('weddingDetails.transportation.accordion.gettingToGmuend.title'),
    icon: 'emojione-v1:high-speed-train',
    content: t('weddingDetails.transportation.accordion.gettingToGmuend.content').replace(/\n/g, '<br/>')
  },
  {
    label: t('weddingDetails.transportation.accordion.gettingToVenue.title'),
    icon: 'emojione-v1:automobile',
    content: t('weddingDetails.transportation.accordion.gettingToVenue.content').replace(/\n/g, '<br/>')
  }
]




</script>

