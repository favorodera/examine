<template>
  <a
    :href="url"
    class="font-medium text-lg after:content-[''] relative text-brand-dark hidden  after:absolute after:-bottom-2 after:w-0 after:h-0.5 after:bg-brand-green hover:after:w-full after:property-width after:duration-500 after:ease-in sm:flex"
  >
    {{ label }}
  </a>

</template>

<script setup lang="ts">
defineProps<{
  label: string
  url: string
}>()
</script>
