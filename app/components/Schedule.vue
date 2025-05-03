<template>
  <section id="schedule" class="py-20 px-4">
    <div class="max-w-4xl mx-auto">
      <h2 class="text-3xl md:text-4xl text-center italic mb-12">
        {{ $t('schedule.title') }}

      </h2>

      <div class="relative">
        <!-- Timeline line -->
        <div class="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-green-700 -ml-0.5"/>

        <!-- Timeline items -->
        <div class="space-y-12">
          <ScheduleItem
            v-for="(item, index) in scheduleItems"
            :key="index"
            :item="{
              title: rt(item.title.loc.source),
              time: rt(item.time.loc.source),
              description: rt(item.description.loc.source)
            }"
            :is-even="index % 2 === 1"
          />


        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { tm, rt } = useI18n()

interface ScheduleItemRaw {
  title: { loc: { source: string } }
  time: { loc: { source: string } }
  description: { loc: { source: string } }
}


const scheduleItems = computed<ScheduleItemRaw[]>(() => {
  const items = tm('schedule.items') as unknown
  return Array.isArray(items) ? (items as ScheduleItemRaw[]) : []
})


</script>
