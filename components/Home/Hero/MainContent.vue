<template>

  <section class="w-full flex flex-col items-center justify-center gap-8">

    <div class="flex flex-col items-center gap-6">

      <p class="px-4 py-2 text-center text-sm font-semibold text-blue-500 rounded-4 bg-elevate w-max">
        #1 Assessment Management Platform
      </p>

      <h1 class="text-center text-2xl font-bold sm:text-4xl lg:text-7xl">

        Innovating <span class="text-gray">Assessment</span>
        <br>
        Processes

      </h1>

      <p class="text-center text-lg font-semibold opacity-80">
        Manage your assessments or examinations efficiently and in the better way with Examine.
      </p>

    </div>

    <button
      type="button"
      class="bg-blue-500 hover:bg-blue-600 font-semibold px-4 py-2 rounded-lg transition-background-color duration-500"
      @click="navigateTo('/auth')"
    >
      Get Started
    </button>

  </section>

</template>
