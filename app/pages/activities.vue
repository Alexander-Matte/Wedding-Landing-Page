<template>
  <Navbar />
  <div class="h-20"></div>
  
  <div class="container mx-auto px-4 py-10 space-y-12">
    <div class="text-center">
      <h1 class="text-4xl font-bold mb-4">{{ $t('activities.title') }}</h1>
      <p class="text-lg text-gray-600">
        {{ $t('activities.subtitle') }}
      </p>
    </div>
    <!-- 1–4 Days -->
    <UCard class="bg-[#FAF9F6]">
      <template #header>
        <h2 class="text-2xl font-semibold">{{ $t('activities.days_1_4.title') }}</h2>
      </template>
      <ul class="list-disc pl-5 space-y-2 text-gray-700">
        <li><strong>{{ $t('activities.days_1_4.explore.title') }}:</strong> {{ $t('activities.days_1_4.explore.desc') }}</li>
        <li><strong>{{ $t('activities.days_1_4.riverwalk.title') }}:</strong> {{ $t('activities.days_1_4.riverwalk.desc') }}</li>
        <li><strong>{{ $t('activities.days_1_4.skypark.title') }}:</strong> {{ $t('activities.days_1_4.skypark.desc') }}</li>
        <li><strong>{{ $t('activities.days_1_4.museum.title') }}:</strong> {{ $t('activities.days_1_4.museum.desc') }}</li>
        <li><strong>{{ $t('activities.days_1_4.food.title') }}:</strong> {{ $t('activities.days_1_4.food.desc') }}</li>
      </ul>
    </UCard>

    <!-- 1 Week -->
    <UCard class="bg-[#FAF9F6]">
      <template #header>
        <h2 class="text-2xl font-semibold">{{ $t('activities.days_7.title') }}</h2>
      </template>
      <ul class="list-disc pl-5 space-y-2 text-gray-700">
        <li><strong>{{ $t('activities.days_7.hike.title') }}:</strong> {{ $t('activities.days_7.hike.desc') }}</li>
        <li><strong>{{ $t('activities.days_7.limes.title') }}:</strong> {{ $t('activities.days_7.limes.desc') }}</li>
        <li><strong>{{ $t('activities.days_7.hall.title') }}:</strong> {{ $t('activities.days_7.hall.desc') }}</li>
        <li><strong>{{ $t('activities.days_7.therme.title') }}:</strong> {{ $t('activities.days_7.therme.desc') }}</li>
        <li><strong>{{ $t('activities.days_7.nature.title') }}:</strong> {{ $t('activities.days_7.nature.desc') }}</li>
      </ul>
    </UCard>

    <!-- 2 Weeks -->
    <UCard class="bg-[#FAF9F6]">
      <template #header>
        <h2 class="text-2xl font-semibold">{{ $t('activities.days_14.title') }}</h2>
      </template>
      <ul class="list-disc pl-5 space-y-2 text-gray-700">
        <li><strong>{{ $t('activities.days_14.stuttgart.title') }}:</strong> {{ $t('activities.days_14.stuttgart.desc') }}</li>
        <li><strong>{{ $t('activities.days_14.castles.title') }}:</strong> {{ $t('activities.days_14.castles.desc') }}</li>
        <li><strong>{{ $t('activities.days_14.blackforest.title') }}:</strong> {{ $t('activities.days_14.blackforest.desc') }}</li>
        <li><strong>{{ $t('activities.days_14.bodensee.title') }}:</strong> {{ $t('activities.days_14.bodensee.desc') }}</li>
        <li><strong>{{ $t('activities.days_14.ulm.title') }}:</strong> {{ $t('activities.days_14.ulm.desc') }}</li>
        <li><strong>{{ $t('activities.days_14.allgaeu.title') }}:</strong> {{ $t('activities.days_14.allgaeu.desc') }}</li>
        <li><strong>{{ $t('activities.days_14.neuschwanstein.title') }}:</strong> {{ $t('activities.days_14.neuschwanstein.desc') }}</li>
        <li><strong>{{ $t('activities.days_14.munich.title') }}:</strong> {{ $t('activities.days_14.munich.desc') }}</li>
      </ul>
    </UCard>

    <div class="text-center mt-10">
      <p class="text-gray-600">
        {{ $t('activities.footer') }}
        <NuxtLink to="/contact" class="text-primary font-medium hover:underline">
          {{ $t('activities.contact_link') }}
        </NuxtLink>
      </p>
    </div>
  </div>
</template>
<style>

</style>