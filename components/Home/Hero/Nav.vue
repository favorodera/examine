<template>

  <nav class="w-full max-w-[90rem] flex items-center justify-between p-4 bg-transparent backdrop-blur-2xl sticky top-0 sm:p-12">

    <div class="w-max flex gap-1 items-end">

      <span class="i-hugeicons:brain-02 size-7 text-blue-500" />

      <p class="font-semibold text-xl">
        Examine
      </p>

    </div>

    <div class="w-max flex gap-4 items-center hidden break:flex">

      <HomeHeroNavLink label="Benefits" />
      <HomeHeroNavLink label="How It Works" />
      <HomeHeroNavLink label="Pricing" />

    </div>

    <button
      type="button"
      class="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg transition-background-color duration-500 hidden break:block"
    >
      Sign In
    </button>

    <button
      type="button"
      class="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded-lg transition-background-color duration-500 break:hidden"
    >
      <span class="i-hugeicons:menu-01 size-7" />
    </button>

  </nav>

</template>
