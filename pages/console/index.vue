<template>
  
  <section class="w-full flex flex-col flex-[1_1_auto]">

    <NuxtLayout name="console">

      <section class="w-full flex flex-col">
        
        <ConsoleAssessmentCards />
      </section>

    </NuxtLayout>

  </section>
  
</template>

<script setup lang="ts">

definePageMeta({
  layout: false,
})
</script>
