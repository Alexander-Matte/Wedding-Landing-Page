<template>
  <div class="min-h-screen bg-wedding-white">
    <Navbar />
    
    <!-- Hero Section -->
    <section class="pt-32 pb-16 px-4 bg-gradient-to-br from-wedding-off-pink to-wedding-pink/20">
      <div class="section-max-width text-center">
        <h1 class="text-4xl sm:text-5xl md:text-6xl font-light italic mb-6 text-gray-800">
          {{ $t('activities.title') }}
        </h1>
        <div class="w-16 h-0.5 bg-gradient-to-r from-wedding-pink to-wedding-btn-pink mx-auto mb-6"></div>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          {{ $t('activities.subtitle') }}
        </p>
      </div>
    </section>

    <!-- Activities Content -->
    <section class="section-padding">
      <div class="section-max-width">
        <!-- 1–4 Days -->
        <div class="card p-8 lg:p-12 mb-12">
          <div class="text-center mb-8">
            <div class="w-16 h-16 bg-wedding-pink/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <UIcon name="i-lucide-calendar-days" class="w-8 h-8 text-wedding-btn-pink" />
            </div>
            <h2 class="text-2xl sm:text-3xl font-light italic mb-4 text-gray-800">
              {{ $t('activities.days_1_4.title') }}
            </h2>
            <div class="w-12 h-0.5 bg-wedding-pink mx-auto"></div>
          </div>
          
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div 
              v-for="(activity, key) in activities1to4" 
              :key="key"
              class="p-6 bg-white/70 rounded-xl border border-wedding-pink/20 hover:shadow-lg transition-all duration-300 group"
            >
              <div class="flex items-start space-x-4">
                <div class="w-10 h-10 bg-wedding-pink/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <UIcon :name="activity.icon" class="w-5 h-5 text-wedding-btn-pink" />
                </div>
                <div>
                  <h3 class="font-medium text-gray-800 mb-2 group-hover:text-wedding-btn-pink transition-colors">
                    {{ $t(activity.title) }}
                  </h3>
                  <p class="text-gray-600 text-sm leading-relaxed">
                    {{ $t(activity.desc) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 1 Week -->
        <div class="card p-8 lg:p-12 mb-12">
          <div class="text-center mb-8">
            <div class="w-16 h-16 bg-wedding-btn-pink/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <UIcon name="i-lucide-calendar-week" class="w-8 h-8 text-wedding-pink" />
            </div>
            <h2 class="text-2xl sm:text-3xl font-light italic mb-4 text-gray-800">
              {{ $t('activities.days_7.title') }}
            </h2>
            <div class="w-12 h-0.5 bg-wedding-btn-pink mx-auto"></div>
          </div>
          
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div 
              v-for="(activity, key) in activities1Week" 
              :key="key"
              class="p-6 bg-white/70 rounded-xl border border-wedding-btn-pink/20 hover:shadow-lg transition-all duration-300 group"
            >
              <div class="flex items-start space-x-4">
                <div class="w-10 h-10 bg-wedding-btn-pink/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <UIcon :name="activity.icon" class="w-5 h-5 text-wedding-pink" />
                </div>
                <div>
                  <h3 class="font-medium text-gray-800 mb-2 group-hover:text-wedding-pink transition-colors">
                    {{ $t(activity.title) }}
                  </h3>
                  <p class="text-gray-600 text-sm leading-relaxed">
                    {{ $t(activity.desc) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 2 Weeks -->
        <div class="card p-8 lg:p-12 mb-12">
          <div class="text-center mb-8">
            <div class="w-16 h-16 bg-gradient-to-br from-wedding-pink/20 to-wedding-btn-pink/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <UIcon name="i-lucide-calendar" class="w-8 h-8 text-wedding-btn-pink" />
            </div>
            <h2 class="text-2xl sm:text-3xl font-light italic mb-4 text-gray-800">
              {{ $t('activities.days_14.title') }}
            </h2>
            <div class="w-12 h-0.5 bg-gradient-to-r from-wedding-pink to-wedding-btn-pink mx-auto"></div>
          </div>
          
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div 
              v-for="(activity, key) in activities2Weeks" 
              :key="key"
              class="p-6 bg-white/70 rounded-xl border border-wedding-pink/20 hover:shadow-lg transition-all duration-300 group"
            >
              <div class="flex items-start space-x-4">
                <div class="w-10 h-10 bg-gradient-to-br from-wedding-pink/20 to-wedding-btn-pink/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <UIcon :name="activity.icon" class="w-5 h-5 text-wedding-btn-pink" />
                </div>
                <div>
                  <h3 class="font-medium text-gray-800 mb-2 group-hover:text-wedding-btn-pink transition-colors">
                    {{ $t(activity.title) }}
                  </h3>
                  <p class="text-gray-600 text-sm leading-relaxed">
                    {{ $t(activity.desc) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Contact Section -->
        <div class="text-center">
          <div class="card p-8 max-w-2xl mx-auto">
            <div class="w-16 h-16 bg-wedding-pink/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <UIcon name="i-lucide-help-circle" class="w-8 h-8 text-wedding-btn-pink" />
            </div>
            <h3 class="text-xl font-medium text-gray-800 mb-4">
              {{ $t('activities.footer') }}
            </h3>
            <NuxtLink 
              to="/contact" 
              class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-wedding-pink to-wedding-btn-pink text-white font-medium rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <UIcon name="i-lucide-mail" class="w-5 h-5 mr-2" />
              {{ $t('activities.contact_link') }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// Activity data with icons
const activities1to4 = [
  { title: 'activities.days_1_4.explore.title', desc: 'activities.days_1_4.explore.desc', icon: 'i-lucide-map-pin' },
  { title: 'activities.days_1_4.riverwalk.title', desc: 'activities.days_1_4.riverwalk.desc', icon: 'i-lucide-trees' },
  { title: 'activities.days_1_4.skypark.title', desc: 'activities.days_1_4.skypark.desc', icon: 'i-lucide-mountain' },
  { title: 'activities.days_1_4.museum.title', desc: 'activities.days_1_4.museum.desc', icon: 'i-lucide-landmark' },
  { title: 'activities.days_1_4.food.title', desc: 'activities.days_1_4.food.desc', icon: 'i-lucide-utensils' }
]

const activities1Week = [
  { title: 'activities.days_7.hike.title', desc: 'activities.days_7.hike.desc', icon: 'i-lucide-hiking' },
  { title: 'activities.days_7.limes.title', desc: 'activities.days_7.limes.desc', icon: 'i-lucide-building' },
  { title: 'activities.days_7.hall.title', desc: 'activities.days_7.hall.desc', icon: 'i-lucide-home' },
  { title: 'activities.days_7.therme.title', desc: 'activities.days_7.therme.desc', icon: 'i-lucide-droplets' },
  { title: 'activities.days_7.nature.title', desc: 'activities.days_7.nature.desc', icon: 'i-lucide-leaf' }
]

const activities2Weeks = [
  { title: 'activities.days_14.stuttgart.title', desc: 'activities.days_14.stuttgart.desc', icon: 'i-lucide-car' },
  { title: 'activities.days_14.castles.title', desc: 'activities.days_14.castles.desc', icon: 'i-lucide-castle' },
  { title: 'activities.days_14.blackforest.title', desc: 'activities.days_14.blackforest.desc', icon: 'i-lucide-tree-pine' },
  { title: 'activities.days_14.bodensee.title', desc: 'activities.days_14.bodensee.desc', icon: 'i-lucide-waves' },
  { title: 'activities.days_14.ulm.title', desc: 'activities.days_14.ulm.desc', icon: 'i-lucide-church' },
  { title: 'activities.days_14.allgaeu.title', desc: 'activities.days_14.allgaeu.desc', icon: 'i-lucide-mountain-snow' },
  { title: 'activities.days_14.neuschwanstein.title', desc: 'activities.days_14.neuschwanstein.desc', icon: 'i-lucide-crown' },
  { title: 'activities.days_14.munich.title', desc: 'activities.days_14.munich.desc', icon: 'i-lucide-beer' }
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
  .section-padding {
    padding: 2rem 1rem;
  }
  
  h1 {
    font-size: 2.5rem;
  }
  
  h2 {
    font-size: 1.75rem;
  }
}

/* Smooth animations */
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
</style>