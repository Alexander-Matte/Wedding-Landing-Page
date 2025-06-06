<template>
  <section class="text-center py-5">
    <div class="max-w-3xl mx-auto px-4">
      <h2 class="text-3xl md:text-4xl text-center italic mb-8 tracking-wide">
        {{ $t('countdown.message') }} 💍
      </h2>

      <Countdown 
        :date="targetDate" 
        v-slot="{ years, days, hours, minutes, seconds }"
        with-years
      >
        <p class="text-2xl md:text-3xl font-mono tracking-widest">
           {{ days }}{{ $t('countdown.time.day') }}
           {{ hours }}{{ $t('countdown.time.hour') }}
           {{ minutes }}{{ $t('countdown.time.minute') }}
           {{ seconds }}{{ $t('countdown.time.second') }}
        </p>
      </Countdown>
    </div>
  </section>
</template>

<script setup>
const targetDate = new Date('June 06, 2026 14:00:00')
</script>

<style scoped>
</style>
