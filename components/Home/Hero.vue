<template>

  <section class="w-full p-4 mt-8 max-w[84.64rem] self-center">

    <div class=" hero flex gap-4 items-center w-full bg-white rounded-3 p-4">

      <div class="flex flex-col gap-8">

        <div class="flex flex-col gap-2">

          <h1 class="text-3xl sm:text-4xl text-brand-dark font-bold">
            Manage Exams with Ease
          </h1>
          <p class="text-brand-gray text-lg">
            Streamline your examination processes with our comprehensive management system
          </p>

        </div>

        <button
          type="button"
          class="w-max flex gap-2 items-center px-4 py-2 bg-brand-green hover:bg-brand-green/80 property-background-color duration-500 ease text-white rounded-2"
          @click="navigateTo('/auth')"
        >
          Get Started
        </button>

      </div>

      <div class="w-[18rem] h-max overflow-hidden shrink-0 hidden sm:block">

        <img
          src="/images/hero-image.png"
          alt="hero-image"
          loading="eager"
          class="size-full object-cover"
        >

      </div>

    </div>

  </section>

</template>

<style scoped lang="css">
.hero {
    box-shadow: rgba(3, 3, 3, 0.1) 0px 0px 9px;
}
</style>
