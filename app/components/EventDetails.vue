<template>
  <section id="details" class="py-20 px-4 bg--50">
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
            <UIcon name="i-heroicons-calendar" class="mt-1 -600" />
            <p>{{ $t('weddingDetails.reception.date') }}</p>
          </div>
          <div class="flex items-start gap-3">
            <UIcon name="i-heroicons-clock" class="mt-1 -600" />
            <p>{{ $t('weddingDetails.reception.time') }}</p>
          </div>
          <div class="flex items-start gap-3">
            <UIcon name="i-heroicons-map-pin" class="mt-1 -600" />
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
            <a href="https://paulushaus-neuwirth.de/" class="text-blue-600 underline" target="_blank" rel="noopener noreferrer"> paulushaus-neuwirth.de</a>.
          </p>
        </div>
      </div>
      </div>


      <!-- Accommodations -->
      <div class="mt-12">
        <h3 class="text-2xl font-semibold mb-6 text-center">{{ $t('weddingDetails.accommodations.title') }}</h3>
        <div class="grid md:grid-cols-2 gap-6">
          <UCard v-for="(card, key) in tm('weddingDetails.accommodations.cards')" :key="key" class="bg-white">
            <template #header>
              <h4 class="text-lg font-medium">{{ rt(card.header) }}
                <template>
                  <ClientOnly>
                    <UPopover v-if="key === 'paulushaus'" mode="hover" :close-delay="300" arrow>
                      <UIcon name="lucide:info" class="mx-4 text-yellow-500" size="24" />
                      <template #content>
                        <div class="max-w-xs text-sm text-gray-700">
                          {{ rt(card.info) }}
                        </div>
                      </template>
                    </UPopover>
                  </ClientOnly>
                </template>
              </h4>
            </template>
            
            <a
              :href="rt(card.website)"
              target="_blank"
              rel="noopener"
              class="text-blue-600 hover:underline"
            >
            {{ $t('weddingDetails.accommodations.visitMessage') }}
            </a>
            <p class="text-gray-600 mt-2">
              {{ rt(card.description) }}
            </p>
          </UCard>
        </div>
      </div>

      <!-- Transportation -->
      <div class="mt-16">
        <h3 class="text-2xl font-semibold mb-6 text-center">{{ $t('weddingDetails.transportation.title') }}</h3>
        <div class="space-y-6 text-gray-700">
          <p>
            {{ $t('weddingDetails.transportation.description') }}
          </p>

          <p>
            {{ $t('weddingDetails.transportation.notice1') }}
          </p>

          <ul class="list-disc list-inside">
            <li><strong>{{ $t('weddingDetails.transportation.options.train.title') }}</strong>: {{ $t('weddingDetails.transportation.options.train.description') }}</li>
            <li><strong>{{ $t('weddingDetails.transportation.options.carRental.title') }}:</strong> {{ $t('weddingDetails.transportation.options.carRental.description') }}</li>
          </ul>

          <p>
            {{ $t('weddingDetails.transportation.venueDetails.description') }}
          </p>

          <p>
            {{ $t('weddingDetails.transportation.venueDetails.notice1') }}
          </p>

          <ul class="list-disc list-inside">
            <li><strong>{{ $t('weddingDetails.transportation.venueDetails.transportOptions.bus.title') }}: </strong>{{ $t('weddingDetails.transportation.venueDetails.transportOptions.bus.description') }}</li>
            <li><strong>{{ $t('weddingDetails.transportation.venueDetails.transportOptions.taxi.title') }}: </strong>{{ $t('weddingDetails.transportation.venueDetails.transportOptions.taxi.description') }}
              <ul class="list-inside list-disc">
                <li><strong>Taxi Schwäbisch Gmünd: </strong>{{ $t('weddingDetails.transportation.venueDetails.transportOptions.taxi.taxiServices.taxiSchwaebischGmuend') }}</li>
                <li><strong>Taxi Gmünd: </strong>{{ $t('weddingDetails.transportation.venueDetails.transportOptions.taxi.taxiServices.taxiGmuend') }}</li>
              </ul>
            </li>
            <li><strong>{{ $t('weddingDetails.transportation.venueDetails.transportOptions.car.title') }}: </strong>{{ $t('weddingDetails.transportation.venueDetails.transportOptions.car.description') }}</li>
          </ul>

          <p>
            {{ $t('weddingDetails.transportation.venueDetails.planningReminder') }}
          </p>
        </div>
      </div>




    </div>
  </section>
</template>

<script setup>
const { tm, rt } = useI18n();
</script>

<style scoped>
/* Optional: Your scoped styles go here */
</style>
