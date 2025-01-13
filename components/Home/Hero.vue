<template>

  <div class="shadowed w-full flex items-center gap-4 rounded-3 bg-white p-4">

    <div class="flex flex-col gap-8">

      <div class="flex flex-col gap-2">

        <h1 class="text-3xl font-bold">
          Manage Exams with Ease
        </h1>
        <p class="text-lg text-brand-gray">
          Streamline your examination processes with our comprehensive management system
        </p>

      </div>

      <button
        type="button"
        class="w-max flex items-center gap-2 rounded-2 bg-brand-green px-4 py-2 text-white font-bold duration-500 ease property-background-color hover:bg-brand-green/70"
        @click="navigateTo('/auth')"
      >
        Get Started
      </button>

    </div>

    <div class="hidden h-max w-[18rem] shrink-0 overflow-hidden sm:block">

      <img
        src="/images/hero-image.png"
        alt="hero-image"
        loading="eager"
        class="size-full object-cover"
      >

    </div>

  </div>

</template>
