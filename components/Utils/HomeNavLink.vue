<template>
  <NuxtLink
    :to="url"
    class="relative hidden text-base font-bold after:absolute after:h-0.5 after:w-0 sm:flex after:bg-brand-green after:duration-500 after:ease-in after:property-width after:content-[''] after:-bottom-2 hover:after:w-full"
  >
    {{ label }}
  </NuxtLink>

</template>

<script setup lang="ts">
defineProps<{
  label: string
  url: string
}>()
</script>
