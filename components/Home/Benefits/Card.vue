<template>

  <div class="card w-full flex flex-col items-center gap-5 p-4 rounded-3 bg-white ">

    <span
      :class="icon"
      class="size-9 text-brand-green"
    />

    <p class="text-lg text-center font-medium text-brand-green">
      {{ title }}
    </p>

    <p class="text-sm text-brand-gray text-center">
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

<style scoped lang="css">
.card {
  box-shadow: rgba(3, 3, 3, 0.1) 0px 0px 9px;
}
</style>
