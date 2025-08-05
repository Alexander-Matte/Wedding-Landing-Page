<template>
  <div class="min-h-screen bg-wedding-white">
    <Navbar />
    
    <main>
      <!-- Hero Section -->
      <Hero />
      
      <!-- Our Story Section -->
      <OurStory />
      
      <!-- Event Details Section -->
      <EventDetails />
      
      <!-- Schedule Section -->
      <section class="bg-wedding-white">
        <Schedule />
      </section>
      
      <!-- RSVP Section -->
      <RSVP />
      
      <!-- Registry Section -->
      <section class="bg-wedding-off-pink">
        <Registry />
      </section>
    </main>
    
    <!-- Footer Section -->
    <Footer />
  </div>
</template>

<script setup>
useScrollToHash()
</script>

<style scoped>
/* Ensure smooth scrolling between sections */
html {
  scroll-behavior: smooth;
}

/* Optimize for mobile performance */
@media (max-width: 768px) {
  .section-padding {
    padding: 3rem 1rem;
  }
}

/* Print optimization */
@media print {
  .section-padding {
    padding: 2rem 0;
  }
}
</style>