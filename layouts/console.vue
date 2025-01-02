<template>

  <section class="w-full flex flex-col flex-[1_1_auto] gap-12">

    <div class="w-full flex items-end justify-between py-4 b-b b-b-blue-900 bg-background sticky -top-1 z-1 sm:py-8 ">

      <NuxtLink to="/">
        <span class="i-hugeicons:brain-02 size-8 text-blue-500" />
      </NuxtLink>

      <p class=" text-blue-500 font-mono text-lg font-bold">
        CONSOLE
      </p>

      <button
        class="rounded-full overflow-hidden size-8 b-2 b-elevate hover:scale-110 property-transform duration-500 ease"
        @click="visible = true"
      >
        <img
          :src="user?.user_metadata.picture"
          alt="user"
          loading="lazy"
          class="size-full"
        >
      </button>

    </div>

    <slot />

    <Drawer
      v-model:visible="visible"
      :header="user?.user_metadata.name"
      position="right"
      pt:root:class="bg-elevate"
      pt:header:class="pt-4 sm:pt-8"
    >
      <template #header>

        <ConsoleSlideHeader />

      </template>

      <ConsoleSlideBody />

      <template #footer>

        <ConsoleSlideFooter />

      </template>
    
    </Drawer>

  </section>

</template>

<script setup lang="ts">
const user = useSupabaseUser()
const visible = ref(false)
</script>
