<template>

  <nav class="w-full flex items-center justify-between py-4 bg-background sticky -top-1 z-1 sm:py-8">

    <NuxtLink to="/">
      <span class="i-hugeicons:brain-02 size-10 text-blue-500" />
    </NuxtLink>

    <div class="w-max flex gap-4 items-center hidden break:flex">

      <HomeHeroNavLink
        label="Benefits"
        url="#benefits"
        :mobile="false"
      />
      <HomeHeroNavLink
        label="How It Works"
        url="#benefits"
        :mobile="false"
      />
      <HomeHeroNavLink
        label="Pricing"
        url="#benefits"
        :mobile="false"
      />

    </div>

    <button
      type="button"
      class="bg-blue-500 font-semibold hover:bg-blue-600 px-4 py-2 rounded-lg transition-background-color duration-500 hidden break:block"
      @click="navigateTo('/auth')"
    >
      Sign In
    </button>

    <button
      type="button"
      class="bg-blue-500 font-semibold hover:bg-blue-600 px-2 py-1 rounded-lg transition-background-color duration-500 break:hidden"
      @click="toggle"
    >
      <span class="i-hugeicons:menu-01 size-7" />
    </button>

    <Popover
      ref="popover"
      pt:root:class="left-1/2 w-50"
      pt:content:class="flex flex-col gap-4"
    >

      <HomeHeroNavLink
        label="Benefits"
        url="#benefits"
        :mobile="true"
        @click="toggle"
      />
      <HomeHeroNavLink
        label="How It Works"
        url="#benefits"
        :mobile="true"
        @click="toggle"
      />
      <HomeHeroNavLink
        label="Pricing"
        url="#benefits"
        :mobile="true"
        @click="toggle"
      />

      <button
        type="button"
        class="bg-blue-500 font-semibold hover:bg-blue-600 px-4 py-2 rounded-lg transition-background-color duration-500"
        @click="navigateTo('/auth')"
      >
        Sign In
      </button>

    </Popover>

  </nav>

</template>

<script setup lang="ts">
const popover = ref()

const toggle = (event: Event) => {
  popover.value.toggle(event)
}
</script>
