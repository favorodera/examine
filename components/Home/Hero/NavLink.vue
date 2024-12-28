<template>
  <a
    :href="url"
    class="font-medium text-4 relative hidden after:content-[''] after:absolute after:-bottom-2 after:w-0 after:h-0.5 after:bg-blue-500 hover:after:w-full after:property-width after:duration-500 after:ease-in break:flex "
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
