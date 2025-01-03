<template>

  <section class="w-full max-w-[90rem] px-4 self-center">

    <div class="w-full grid grid-cols-[repeat(auto-fit,minmax(min(100%,27rem),1fr))] gap-8 grid-justify-items-center">

      <div class="container bg-white rounded-3.5 p-8 flex flex-col gap-3">

        <h1 class="text-5 text-brand-dark font-medium">
          Overall Score
        </h1>
        <p class="text-2xl text-brand-green font-bold">
          {{ overallScore }}%
        </p>

      </div>

      <div class="container bg-white rounded-3.5 p-8 flex flex-col gap-3">

        <h1 class="text-5 text-brand-dark font-medium">
          Number of Candidates
        </h1>
        <p class="text-2xl text-brand-green font-bold">
          {{ numberOfCandidates }}
        </p>

      </div>

      <div class="container bg-white rounded-3.5 p-8 flex flex-col gap-3">

        <h1 class="text-5 text-brand-dark font-medium">
          Average Score
        </h1>
        <p class="text-2xl text-brand-green font-bold">
          {{ averageScore }}%
        </p>

      </div>

      <div class="container bg-white rounded-3.5 p-8 flex flex-col gap-3">

        <h1 class="text-5 text-brand-dark font-medium">
          Passed Candidates
        </h1>
        <p class="text-2xl text-brand-green font-bold">
          {{ passedCandidates }}
        </p>

      </div>

      <div class="container bg-white rounded-3.5 p-8 flex flex-col gap-3">

        <h1 class="text-5 text-brand-dark font-medium">
          Failed Candidates
        </h1>
        <p class="text-2xl text-brand-red font-bold">
          {{ failedCandidates }}
        </p>

      </div>

    </div>

  </section>

</template>

<script setup lang="ts">
defineProps<{
  overallScore: number
  numberOfCandidates: number
  averageScore: number
  passedCandidates: number
  failedCandidates: number
}>()
</script>

<style scoped lang="css">
.container {
  box-shadow: rgba(3, 3, 3, 0.1) 0px 0px 9px
}
</style>
