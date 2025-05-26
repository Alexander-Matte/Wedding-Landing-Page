<template>
  <section id="schedule" class="py-20 px-4">
    <div class="max-w-4xl mx-auto">
      <h2 class="text-3xl md:text-4xl text-center italic mb-12">
        {{ $t('schedule.title') }}
      </h2>

      <div class="relative">
        <div class="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-green-700 -ml-0.5" />

        <div class="space-y-12">
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
    </div>
  </section>
</template>

<script setup lang="ts">
import ScheduleItem from './ScheduleItem.vue'
import { useI18n } from 'vue-i18n'
useI18n()
</script>
