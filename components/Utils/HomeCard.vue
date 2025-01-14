<template>

  <div class="shadowed w-full flex flex-col items-center gap-5 rounded-3 bg-white p-4">

    <span
      :class="icon"
      class="size-8 text-brand-green"
    />

    <p class="text-center text-lg text-brand-green font-normal">
      {{ title }}
    </p>

    <p class="text-center text-base text-brand-gray">
      {{ description }}
    </p>

  </div>

</template>

<script setup lang="ts">
defineProps<{
  title: string
  description: string
  icon: string
}>()
</script>
