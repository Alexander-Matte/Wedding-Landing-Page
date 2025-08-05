<template>
  <section id="details" class="section-padding bg-wedding-off-pink">
    <div class="section-max-width">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2 class="text-3xl sm:text-4xl md:text-5xl font-light italic mb-6 text-gray-800">
          {{ $t('weddingDetails.title') }}
        </h2>
        <div class="w-16 h-0.5 bg-gradient-to-r from-wedding-pink to-wedding-btn-pink mx-auto"></div>
      </div>

      <!-- Reception Details -->
      <div class="card p-8 lg:p-12 mb-16">
        <div class="text-center mb-8">
          <h3 class="text-2xl sm:text-3xl font-light italic mb-4 text-gray-800">
            {{ $t('weddingDetails.reception.title') }}
          </h3>
          <div class="w-12 h-0.5 bg-wedding-pink mx-auto"></div>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Date -->
          <div class="flex items-start space-x-4 p-6 bg-white/50 rounded-xl border border-wedding-pink/20">
            <div class="flex-shrink-0 w-12 h-12 bg-wedding-pink/20 rounded-full flex items-center justify-center">
              <UIcon name="emojione-v1:tear-off-calendar" class="w-6 h-6 text-wedding-btn-pink" />
            </div>
            <div>
              <h4 class="font-medium text-gray-800 mb-1">Date</h4>
              <p class="text-gray-600">{{ $t('weddingDetails.reception.date') }}</p>
            </div>
          </div>

          <!-- Time -->
          <div class="flex items-start space-x-4 p-6 bg-white/50 rounded-xl border border-wedding-pink/20">
            <div class="flex-shrink-0 w-12 h-12 bg-wedding-pink/20 rounded-full flex items-center justify-center">
              <UIcon name="emojione-v1:two-oclock" class="w-6 h-6 text-wedding-btn-pink" />
            </div>
            <div>
              <h4 class="font-medium text-gray-800 mb-1">Time</h4>
              <p class="text-gray-600">{{ $t('weddingDetails.reception.time') }} 🥂</p>
            </div>
          </div>

          <!-- Location -->
          <div class="flex items-start space-x-4 p-6 bg-white/50 rounded-xl border border-wedding-pink/20 md:col-span-2 lg:col-span-1">
            <div class="flex-shrink-0 w-12 h-12 bg-wedding-pink/20 rounded-full flex items-center justify-center">
              <UIcon name="emojione-v1:round-pushpin" class="w-6 h-6 text-wedding-btn-pink" />
            </div>
            <div>
              <h4 class="font-medium text-gray-800 mb-1">Location</h4>
              <p class="font-medium text-gray-800">{{ $t('weddingDetails.reception.location.title') }}</p>
              <p class="text-gray-600 text-sm">{{ $t('weddingDetails.reception.location.addressLine1') }}</p>
              <p class="text-gray-600 text-sm">{{ $t('weddingDetails.reception.location.addressLine2') }}</p>
            </div>
          </div>
        </div>

        <!-- Description -->
        <div class="mt-8 p-6 bg-white/70 rounded-xl border border-wedding-pink/20">
          <p class="text-gray-700 leading-relaxed">
            {{ $t('weddingDetails.reception.description') }}
            <ULink 
              to="https://paulushaus-neuwirth.de/"
              target="_blank"
              class="inline-flex items-center text-wedding-btn-pink hover:text-wedding-pink underline hover:underline font-medium transition-colors ml-1"
            >
              paulushaus-neuwirth.de
              <UIcon name="i-lucide-external-link" class="w-4 h-4 ml-1" />
            </ULink>
          </p>
        </div>
      </div>

      <!-- Accommodations -->
      <Accommodations class="mb-16" />

      <!-- Transportation -->
      <div class="card p-8 lg:p-12">
        <div class="text-center mb-8">
          <h3 class="text-2xl sm:text-3xl font-light italic mb-4 text-gray-800">
            {{ $t('weddingDetails.transportation.title') }}
          </h3>
          <div class="w-12 h-0.5 bg-wedding-pink mx-auto"></div>
        </div>

        <UAccordion 
          :items="transportationItems"
          type="multiple"
          :ui="{
            wrapper: 'space-y-4',
            item: 'bg-white/70 rounded-xl border border-wedding-pink/20 overflow-hidden',
            trigger: 'p-6 hover:bg-wedding-pink/5 transition-colors duration-200',
            label: 'text-lg font-medium text-gray-800 flex items-center space-x-3',
            leadingIcon: 'w-6 h-6 text-wedding-btn-pink',
            trailingIcon: 'w-5 h-5 text-gray-500 transition-transform duration-200',
            content: 'px-6 pb-6'
          }"
        >
          <template #leading-icon="{ item }">
            <UIcon :name="item.icon" />
          </template>
          
          <template #content="{ item }">
            <div class="transportation-content">
              <div v-html="`<p>${item.content}</p>`" class="prose max-w-none"></div>
            </div>
          </template>
        </UAccordion>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n();
import type { AccordionItem } from '@nuxt/ui'

const transportationItems: AccordionItem[] = [
  {
    label: t('weddingDetails.transportation.accordion.arrivingInGermany.title'),
    icon: 'emojione-v1:airplane-departure',
    content: t('weddingDetails.transportation.accordion.arrivingInGermany.content')
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br/>')
      .replace(/Stuttgart Airport \(STR\)/g, '<strong>Stuttgart Airport (STR)</strong>')
      .replace(/Frankfurt Airport \(FRA\)/g, '<strong>Frankfurt Airport (FRA)</strong>')
      .replace(/Munich Airport \(MUC\)/g, '<strong>Munich Airport (MUC)</strong>'),
  },
  {
    label: t('weddingDetails.transportation.accordion.gettingToGmuend.title'),
    icon: 'emojione-v1:high-speed-train',
    content: t('weddingDetails.transportation.accordion.gettingToGmuend.content')
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br/>')
      .replace(/From Stuttgart Airport:/g, '<strong>From Stuttgart Airport:</strong>')
      .replace(/From Frankfurt Airport:/g, '<strong>From Frankfurt Airport:</strong>')
      .replace(/From Munich Airport:/g, '<strong>From Munich Airport:</strong>')
  },
  {
    label: t('weddingDetails.transportation.accordion.gettingToVenue.title'),
    icon: 'emojione-v1:automobile',
    content: t('weddingDetails.transportation.accordion.gettingToVenue.content')
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br/>')
  }
]
</script>

<style scoped>
/* Responsive adjustments */
@media (max-width: 768px) {
  .card {
    padding: 1.5rem;
  }
  
  .grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .card {
    padding: 1rem;
  }
  
  h2 {
    font-size: 2rem;
  }
  
  h3 {
    font-size: 1.5rem;
  }
}

/* Smooth transitions */
.card {
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

/* Print styles */
@media print {
  .card {
    box-shadow: none;
    border: 1px solid #ddd;
  }
  
  .card:hover {
    transform: none;
  }
}

/* Transportation content styling */
.transportation-content {
  color: #374151;
  line-height: 1.7;
}

.transportation-content p {
  margin-bottom: 1rem;
  font-size: 0.95rem;
}

.transportation-content strong {
  color: #1f2937;
  font-weight: 600;
}

.transportation-content br + br {
  margin-top: 1.5rem;
}

.transportation-content br {
  margin-bottom: 0.5rem;
}

/* Airport and location highlighting */
.transportation-content p:has(strong) {
  background: rgba(240, 215, 209, 0.1);
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border-left: 3px solid var(--color-wedding-pink);
  margin-bottom: 1rem;
}

/* Time and distance information */
.transportation-content p:not(:has(strong)) {
  padding-left: 1rem;
  border-left: 2px solid rgba(240, 215, 209, 0.3);
  margin-bottom: 0.75rem;
}
</style>

