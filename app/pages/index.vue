<template>
  <div class="w-full min-h-screen bg-wedding-white]">
    <Navbar />
    <main>
      <section class="bg-wedding-white">
        <Hero />
      </section>
      
      <section class="bg-wedding-white">
        <OurStory />
      </section>
      
      <section class="bg-wedding-green">
        <EventDetails />
      </section>
      <section class="bg-wedding-white">
        <Schedule />
      </section>
      <section class="bg-wedding-green">
        <RSVP />
      </section>

      <section class="bg-wedding-white">
        <Registry />
      </section>
    </main>
      
    <section class="bg-wedding-green">
      <Footer />
    </section>
   
  </div>
</template>
<script setup>
useScrollToHash()
</script>