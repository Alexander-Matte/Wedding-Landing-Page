<template>
  <section id="details" class="py-20 px-4 bg--50">
    <div class="max-w-5xl mx-auto">
      <h2 class="text-3xl md:text-4xl text-center font-serif italic mb-12">
        Wedding Details
      </h2>

      <div class="grid md:grid-cols-2 gap-10">
        <!-- Ceremony -->
        <div class="bg-white p-8 rounded-lg shadow-md">
          <h3 class="text-2xl font-serif mb-6">Ceremony</h3>
          <div class="space-y-4">
            <div class="flex items-start gap-3">
              <UIcon name="i-heroicons-calendar" class="mt-1 -600" />
              <p>Saturday, August 12, 2023</p>
            </div>
            <div class="flex items-start gap-3">
              <UIcon name="i-heroicons-clock" class="mt-1 -600" />
              <p>2:00 PM</p>
            </div>
            <div class="flex items-start gap-3">
              <UIcon name="i-heroicons-map-pin" class="mt-1 -600" />
              <div>
                <p class="font-medium">Wildflower Meadows</p>
                <p class="text-gray-600">123 Blossom Road</p>
                <p class="text-gray-600">Meadowville, CA 95476</p>
              </div>
            </div>
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
          <h3 class="text-2xl font-serif -700 mb-6">Reception</h3>
          <div class="space-y-4">
            <div class="flex items-start gap-3">
              <UIcon name="i-heroicons-calendar" class="mt-1 -600" />
              <p>Saturday, August 12, 2023</p>
            </div>
            <div class="flex items-start gap-3">
              <UIcon name="i-heroicons-clock" class="mt-1 -600" />
              <p>4:00 PM - 10:00 PM</p>
            </div>
            <div class="flex items-start gap-3">
              <UIcon name="i-heroicons-map-pin" class="mt-1 -600" />
              <div>
                <p class="font-medium">The Wildflower Barn</p>
                <p class="text-gray-600">123 Blossom Road</p>
                <p class="text-gray-600">Meadowville, CA 95476</p>
              </div>
            </div>
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
      <div class="mt-12">
        <h3 class="text-2xl font-serif font-semibold mb-6 text-center">Accommodations</h3>
        <div class="grid md:grid-cols-2 gap-6">
          <UCard class="bg-white">
            <template #header>
              <h4 class="text-lg font-medium">Paulushaus Neuwirth - Lodging at the venue
                <template>
                  <ClientOnly>
                    <UPopover mode="hover" :close-delay="300" arrow>
                      <UIcon name="lucide:info" class="mx-4 text-yellow-500" size="24" />
                      <template #content>
                        <div class="max-w-xs text-sm text-gray-700">
                          The venue is 4 km from town, so transport will be needed to get there and back. Taxis are available if you haven’t rented a car. There’s also a nearby bus stop within walking distance if you prefer public transport.
                        </div>
                      </template>
                    </UPopover>
                  </ClientOnly>
                </template>
                
              </h4>
            </template>
            
            <a
              href="https://paulushaus-neuwirth.de/"
              target="_blank"
              rel="noopener"
              class="text-blue-600 hover:underline"
            >
              Visit Website
            </a>
            <p class="text-gray-600 mt-2">
              Group-style retreat house perfect for larger self-catering groups. Kitchen, outdoor area with
              sports/playground, basic amenities. No restaurant. ~0 km from venue; ~4 km to city center. Free parking.
            </p>
          </UCard>

          <UCard class="bg-white">
            <template #header>
              <h4 class="text-lg font-medium">Hotel am Remspark</h4>
            </template>
            <a
              href="https://hotelamremspark.de/"
              target="_blank"
              rel="noopener"
              class="text-blue-600 hover:underline"
            >
              Visit Website
            </a>
            <p class="text-gray-600 mt-2">
              Modern 4-star hotel near the city center. Fitness area, rooftop restaurant/bar, breakfast buffet.
              ~7–8 km to venue. On-site paid parking. Bike rentals at cost and Wi-Fi.
            </p>
          </UCard>

          <UCard class="bg-white">
            <template #header>
              <h4 class="text-lg font-medium">Hotel Schwäbisch Gmünd</h4>
            </template>
            <a
              href="https://hotel-schwaebisch-gmuend.de/"
              target="_blank"
              rel="noopener"
              class="text-blue-600 hover:underline"
            >
              Visit Website
            </a>
            <p class="text-gray-600 mt-2">
              Comfortable 4-star hotel with wellness area (pool, sauna, fitness), breakfast buffet, and regional cuisine.
              ~6–7 km to venue. Garage parking (~€10/day). Right near train station.
            </p>
          </UCard>

          <UCard class="bg-white">
            <template #header>
              <h4 class="text-lg font-medium">Tagungszentrum Schönblick</h4>
            </template>
            <a
              href="https://www.schoenblick.de/de"
              target="_blank"
              rel="noopener"
              class="text-blue-600 hover:underline"
            >
              Visit Website
            </a>
            <p class="text-gray-600 mt-2">
              Peaceful guesthouse with forest surroundings. Breakfast included, basic amenities, park grounds,
              and free parking. ~1–2 km to venue; ~2.5 km to city center.
            </p>
          </UCard>

          <UCard class="bg-white">
            <template #header>
              <h4 class="text-lg font-medium">Hotel Mutlanger Hof</h4>
            </template>
            <a
              href="https://www.mutlangerhof.de/"
              target="_blank"
              rel="noopener"
              class="text-blue-600 hover:underline"
            >
              Visit Website
            </a>
            <p class="text-gray-600 mt-2">
              Simple and quiet guesthouse in Mutlangen. Free Wi-Fi, continental breakfast, and bike rental.
              ~5 km to venue; ~3.5 km to city center. Free parking on site.
            </p>
          </UCard>
        </div>
      </div>

      <!-- Transportation -->
      <div class="mt-16">
        <h3 class="text-2xl font-serif font-semibold mb-6 text-center">Transportation</h3>
        <div class="space-y-6 text-gray-700">
          <p>
            The nearest major cities with international airports to the wedding venue are <strong>Stuttgart</strong>, <strong>Frankfurt</strong>, and <strong>Munich (München)</strong>. 
            <strong>Stuttgart Airport (STR)</strong> is closer and more convenient, but <strong>Frankfurt Airport (FRA)</strong> and <strong>Munich Airport (MUC)</strong> are also good options with more international flight availability.
          </p>

          <p>
            From either airport, you have three main options for getting to the region:
          </p>

          <ul class="list-disc list-inside">
            <li><strong>Train:</strong> All three airports have train connections to <strong>Schwäbisch Gmünd</strong>, the nearest city to the venue. You may need to transfer once, typically in Stuttgart or Göppingen, depending on the route.</li>
            <li><strong>Car Rental:</strong> Renting a car is a convenient option and allows flexibility, especially if you're staying in the countryside or want to explore the region. Highways connect all three airports to Schwäbisch Gmünd (approx. 45 minutes from Stuttgart, 2.5 hours from Frankfurt, and 2.5 hours from Munich).</li>
          </ul>

          <p>
            Once you arrive in <strong>Schwäbisch Gmünd</strong>, the wedding venue is located in a nearby rural area approximately 4 km outside the city.
          </p>

          <p>
            From Schwäbisch Gmünd, you can reach the venue and surrounding areas in several ways:
          </p>

          <ul class="list-disc list-inside">
            <li><strong>Bus:</strong> Local bus 72 stop near the venue The bus stop is called <strong>Lindach, Paulushaus</strong> *Please inform the bus driver where you want to get off and they should be able to ensure you get off at the correct spot.</li>
            <li><strong>Taxi:</strong> Taxis are available at the train station and around the city. You can contact the following taxi services:
              <ul class="list-inside list-disc">
                <li><strong>Taxi Schwäbisch Gmünd:</strong>FILL IN</li>
                <li><strong>Taxi Gmünd:</strong>FILL IN</li>
              </ul>
            </li>
            <li><strong>Car:</strong> If you're staying outside the city or have a rental, driving is the most flexible option. Parking is available at the venue and most accommodations.</li>
          </ul>

          <p>
            Please plan accordingly depending on your arrival airport and whether you’ll be using public transport or a rental car. We’re happy to help coordinate if you’re unsure!
          </p>
        </div>
      </div>




    </div>
  </section>
</template>

<script setup>
// No logic required here currently
</script>

<style scoped>
/* Optional: Your scoped styles go here */
</style>
