<template>
  <a
    href=""
    class="font-medium text-4 relative hidden after:content-[''] after:absolute after:-bottom-2 after:w-0 after:h-0.5 after:bg-blue-500 hover:after:w-full after:property-width after:duration-500 break:flex "
  >
    {{ label }}
  </a>

</template>

<script setup lang="ts">
defineProps<{
  label: string
}>()
</script>
