<template>

  <nav class="w-full flex justify-center p-4 sticky top-0 z-1 b-b b-b-[#e5e7be] bg-white">

    <div class="w-full flex items-center justify-between max-w[90rem]">

      <NuxtLink
        to="/"
        class="flex items-center gap-1"
      >
        <span class="i-hugeicons:school-report-card size-8 text-brand-green" />
        <p class="text-lg font-bold text-brand-dark">Examine</p>

      </NuxtLink>

      <div class="w-max flex gap-4 items-center hidden sm:flex">

        <HomeNavLink
          label="Benefits"
          url="#benefits"
        />
        <HomeNavLink
          label="How It Works"
          url="#how-it-works"
        />

      </div>

      <button
        type="button"
        class="bg-brand-green font-semibold hover:bg-brand-green/70 text-brand-dark px-4 py-1 rounded-md transition-background-color duration-500 "
        @click="navigateTo('/console')"
      >
        Console
      </button>

    </div>
 
  </nav>
</template>

<style scoped lang="css">
nav {
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px;
}
</style>
