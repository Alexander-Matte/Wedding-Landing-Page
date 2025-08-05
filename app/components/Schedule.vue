<template>
  <section id="schedule" class="section-padding">
    <div class="section-max-width">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2 class="text-3xl sm:text-4xl md:text-5xl font-light italic mb-2 text-gray-800">
          {{ $t('schedule.title') }}
        </h2>
        <div class="w-16 h-0.5 bg-gradient-to-r from-wedding-pink to-wedding-btn-pink mx-auto"></div>
      </div>

      <!-- Timeline Container -->
      <div class="relative">
        <!-- Desktop Timeline Line -->
        <div class="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-wedding-pink to-wedding-btn-pink -ml-0.5" />

        <!-- Schedule Items -->
        <div class="space-y-8 lg:space-y-12">
          <ScheduleItem
            :item="{
              title: $t('schedule.item1.title'),
              time: $t('schedule.item1.time'),
              description: $t('schedule.item1.description')
            }"
            :is-even="false"
          />
          <ScheduleItem
            :item="{
              title: $t('schedule.item2.title'),
              time: $t('schedule.item2.time'),
              description: $t('schedule.item2.description')
            }"
            :is-even="true"
          />
          <ScheduleItem
            :item="{
              title: $t('schedule.item3.title'),
              time: $t('schedule.item3.time'),
              description: $t('schedule.item3.description')
            }"
            :is-even="false"
          />
          <ScheduleItem
            :item="{
              title: $t('schedule.item4.title'),
              time: $t('schedule.item4.time'),
              description: $t('schedule.item4.description')
            }"
            :is-even="true"
          />
          <ScheduleItem
            :item="{
              title: $t('schedule.item5.title'),
              time: $t('schedule.item5.time'),
              description: $t('schedule.item5.description')
            }"
            :is-even="false"
          />
          <ScheduleItem
            :item="{
              title: $t('schedule.item6.title'),
              time: $t('schedule.item6.time'),
              description: $t('schedule.item6.description')
            }"
            :is-even="true"
          />
        </div>
      </div>

      <!-- Decorative Elements -->
      <div class="mt-16">
        <div class="flex items-center">
          <div class="flex-1 h-0.5 bg-gradient-to-r from-transparent to-wedding-pink/30"></div>
          <div class="mx-4">
            <UIcon name="i-lucide-heart" class="w-5 h-5 text-wedding-btn-pink" />
          </div>
          <div class="flex-1 h-0.5 bg-gradient-to-l from-transparent to-wedding-pink/30"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import ScheduleItem from './ScheduleItem.vue'
import { useI18n } from 'vue-i18n'
useI18n()
</script>

<style scoped>
/* Responsive adjustments */
@media (max-width: 1024px) {
  .section-padding {
    padding: 4rem 1rem;
  }
}

@media (max-width: 640px) {
  .section-padding {
    padding: 3rem 1rem;
  }
  
  h2 {
    font-size: 2rem;
  }
}

/* Timeline animation */
.timeline-line {
  animation: timelineGrow 2s ease-out;
}

@keyframes timelineGrow {
  from {
    height: 0;
  }
  to {
    height: 100%;
  }
}
</style>
