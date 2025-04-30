<template>
    <section id="details" class="py-20 px-4 bg-purple-50">
      <div class="max-w-5xl mx-auto">
        <h2 class="text-3xl md:text-4xl text-center font-serif italic text-purple-700 mb-12">
          Wedding Details
        </h2>
  
        <div class="grid md:grid-cols-2 gap-10">
          <!-- Ceremony -->
          <div class="bg-white p-8 rounded-lg shadow-md">
            <h3 class="text-2xl font-serif text-purple-700 mb-6">Ceremony</h3>
            <div class="space-y-4">
              <DetailRow icon="i-heroicons-calendar" text="Saturday, August 12, 2023" />
              <DetailRow icon="i-heroicons-clock" text="2:00 PM" />
              <DetailRow icon="i-heroicons-map-pin" custom>
                <p class="font-medium">Wildflower Meadows</p>
                <p class="text-gray-600">123 Blossom Road</p>
                <p class="text-gray-600">Meadowville, CA 95476</p>
              </DetailRow>
            </div>
            <div class="mt-6 text-gray-700">
              <p>
                The ceremony will be held outdoors in the garden surrounded by beautiful wildflowers.
                Please arrive 30 minutes early to be seated.
              </p>
            </div>
          </div>
  
          <!-- Reception -->
          <div class="bg-white p-8 rounded-lg shadow-md">
            <h3 class="text-2xl font-serif text-purple-700 mb-6">Reception</h3>
            <div class="space-y-4">
              <DetailRow icon="i-heroicons-calendar" text="Saturday, August 12, 2023" />
              <DetailRow icon="i-heroicons-clock" text="4:00 PM - 10:00 PM" />
              <DetailRow icon="i-heroicons-map-pin" custom>
                <p class="font-medium">The Wildflower Barn</p>
                <p class="text-gray-600">123 Blossom Road</p>
                <p class="text-gray-600">Meadowville, CA 95476</p>
              </DetailRow>
            </div>
            <div class="mt-6 text-gray-700">
              <p>
                Join us for dinner, dancing, and celebration at the rustic barn just a short walk
                from the ceremony site. Cocktail hour will begin immediately following the ceremony.
              </p>
            </div>
          </div>
        </div>
  
        <!-- Accommodations -->
        <div class="mt-12 bg-white p-8 rounded-lg shadow-md">
          <h3 class="text-2xl font-serif text-purple-700 mb-6">Accommodations</h3>
          <div class="space-y-6">
            <div>
              <h4 class="font-medium text-lg">Meadowville Inn</h4>
              <p class="text-gray-600">456 Main Street, Meadowville, CA 95476</p>
              <p class="text-gray-600">Phone: (555) 123-4567</p>
              <p class="mt-2">
                We've reserved a block of rooms under "Madeline & Alexander Wedding". Please book by
                July 12th for the special rate.
              </p>
            </div>
            <div>
              <h4 class="font-medium text-lg">Wildflower Cottage B&amp;B</h4>
              <p class="text-gray-600">789 Garden Lane, Meadowville, CA 95476</p>
              <p class="text-gray-600">Phone: (555) 987-6543</p>
              <p class="mt-2">
                A charming B&amp;B just 5 minutes from our venue. Mention our wedding for a 10%
                discount.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  

<script setup>
// Your page-specific logic here (if needed)
</script>

<style scoped>
/* Page-specific styles */
</style>