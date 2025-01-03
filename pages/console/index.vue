<template>
  
  <section class="w-full flex flex-col flex-[1_1_auto] pb-4">

    <nav class="w-full flex justify-center p-4 sticky top-0 z-1 b-b b-b-[#e5e7be] bg-white">

      <div class="w-full flex items-center justify-between max-w[90rem]">

        <NuxtLink
          to="/"
          class="flex items-center gap-1"
        >
          <span class="i-hugeicons:school-report-card size-8 text-brand-green" />
          <p class="text-lg font-bold text-brand-dark">Examine</p>

        </NuxtLink>

        <button
          type="button"
          class="b-2 b-brand-green rounded-full overflow-hidden transition-transform duration-500 "
          @click="navigateTo('/console')"
        >
          <img
            :src="user?.user_metadata.picture"
            :alt="user?.user_metadata.name"
            class="size-8 object-cover"
          >
        </button>

      </div>

    </nav>
        
    <ConsoleAssessments />

  </section>
  
</template>

<script setup lang="ts">
const user = await useSupabaseUser()
</script>
