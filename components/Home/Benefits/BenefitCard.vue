<template>

  <div class=" w-full flex flex-col gap-5 p-2 pb-7 bg-[#171717] rounded-10 ">

    <div class="w-full h-[13.875rem] bg-black flex items-center justify-center rounded-t-8">

      <div class="bg-[#171717] p-6 rounded-6">

        <span
          :class="icon"
          class="size-16 bg-blue-500"
        />

      </div>

    </div>

    <div class="flex flex-col gap-2 px-6">

      <p class="text-xl font-bold">
        {{ title }}
      </p>
      <p class="text-base font-medium opacity-60 hyphens-auto">
        {{ description }}
      </p>

    </div>
  </div>

</template>

<script setup lang="ts">
defineProps<{
  title: string
  description: string
  icon: string
}>()
</script>
