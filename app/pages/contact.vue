<template>
  <Navbar />

  <!-- Spacer div to clear fixed navbar height (64px) -->
  <div class="h-16"></div>

  <div
    class="flex justify-center items-center"
    style="min-height: calc(100vh - 64px);"
  >
    <section
      class="max-w-lg p-8 bg-gradient-to-br from-pink-50 via-rose-50 to-white rounded-3xl shadow-lg text-center relative overflow-hidden"
    >
      <!-- Soft glowing circles -->
      <div
        aria-hidden="true"
        class="absolute -top-16 -left-16 w-48 h-48 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"
      ></div>
      <div
        aria-hidden="true"
        class="absolute -bottom-20 -right-20 w-72 h-72 bg-rose-200 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-pulse"
      ></div>

      <h1 class="text-4xl font-semibold text-color-default mb-8">
        {{ $t('contact.title') }}
      </h1>

      <p class="mb-6 text-lg text-color-default">
        {{ $t('contact.description') }}
      </p>

      <p
        class="mb-8 text-lg font-semibold text-color-default underline decoration-rose-400 hover:decoration-rose-600 transition-colors duration-300"
      >
        <a
          :href="`mailto:alexandmadiswedding@gmail.com`"
          :aria-label="`${$t('contact.email_label')} alexandmadiswedding@gmail.com`"
          class="text-color-default"
        >
          alexandmadiswedding@gmail.com
        </a>

      </p>

      <p class="text-lg italic text-color-default">
        {{ $t('contact.note') }}
      </p>
    </section>
  </div>
</template>

<script setup>
// No script needed here for now
</script>

<style>

</style>
