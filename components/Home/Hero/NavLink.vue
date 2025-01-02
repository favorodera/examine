<template>
  <a
    :href="url"
    class="font-medium text-lg after:content-[''] relative"
    :class="{
      'hidden  after:absolute after:-bottom-2 after:w-0 after:h-0.5 after:bg-blue-500 hover:after:w-full after:property-width after:duration-500 after:ease-in break:flex': !mobile,
      'hover:text-blue-500 property-color duration-500 ease': mobile,
    }"
  >
    {{ label }}
  </a>

</template>

<script setup lang="ts">
defineProps<{
  label: string
  url: string
  mobile: boolean
}>()
</script>
