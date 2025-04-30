<template>
    <section id="schedule" class="py-20 px-4">
      <div class="max-w-4xl mx-auto">
        <h2 class="text-3xl md:text-4xl text-center font-serif italic mb-12">
          Wedding Day Schedule
        </h2>
  
        <div class="relative">
          <!-- Timeline line -->
          <div class="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-green-700 -ml-0.5"></div>
  
          <!-- Timeline items -->
          <div class="space-y-12">
  
            <!-- Schedule Item Component -->
            <ScheduleItem
              v-for="(item, index) in scheduleItems"
              :key="index"
              :item="item"
              :is-even="index % 2 === 1"
            />
  
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup lang="ts">
  const scheduleItems = [
    {
      title: 'Guest Arrival',
      time: '1:30 PM',
      description: 'Please arrive early to be seated before the ceremony begins.'
    },
    {
      title: 'Ceremony',
      time: '2:00 PM',
      description: 'Exchange of vows in the Wildflower Garden.'
    },
    {
      title: 'Cocktail Hour',
      time: '3:00 PM - 4:00 PM',
      description: "Enjoy drinks and hors d'oeuvres on the garden terrace."
    },
    {
      title: 'Reception Dinner',
      time: '4:00 PM - 6:00 PM',
      description: 'Farm-to-table dinner in the Wildflower Barn.'
    },
    {
      title: 'Toasts & Cake Cutting',
      time: '6:00 PM - 6:30 PM',
      description: 'Speeches from family and friends, followed by cake cutting.'
    },
    {
      title: 'Dancing',
      time: '6:30 PM - 10:00 PM',
      description: 'Dance the night away under twinkling lights.'
    }
  ]
  </script>


<style scoped>
/* Page-specific styles */
</style>
