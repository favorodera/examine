<template>

  <NuxtLink
    to="/"
    class="flex items-center gap-1"
  >
    <span class="i-hugeicons:school-report-card size-8 text-brand-green" />
    <p class="text-lg font-semibold">Examine</p>

  </NuxtLink>

  <div class="hidden w-max flex items-center gap-4 sm:flex">

    <UtilsHomeNavLink
      label="Benefits"
      url="#benefits"
    />
    <UtilsHomeNavLink
      label="How It Works"
      url="#how-it-works"
    />

  </div>

  <button
    type="button"
    class="rounded-md bg-brand-green px-3 py-1 text-white font-medium transition-background-color duration-500 hover:bg-brand-green/70"
    @click="navigateTo('/console')"
  >
    Console
  </button>
 
</template>
