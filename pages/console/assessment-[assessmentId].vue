<template>
  
  <section class="w-full flex flex-col flex-[1_1_auto] pb-4 gap-8">

    <nav class="w-full flex justify-center p-4 sticky top-0 z-1 b-b b-b-[#e5e7be] bg-white">

      <div class="w-full flex flex-col gap-2 items-start justify-between max-w[90rem]">
        
        <h1 class="text-brand-dark text-2xl font-semibold">
          Examination Overview
        </h1>

        <div class="w-full flex items-center justify-between gap-4">

          <div class="flex flex-col gap-2">

            <p class="text-sm text-brand-dark font-semibold line-clamp-1">
              Examination: {{ assessment?.name }}
            </p>

            <p class="text-sm text-brand-gray font-semibold">
              Duration: {{ assessment?.duration_mins }} minutes
            </p>

          </div>

          <div class="w-max flex flex-col gap-2">

            <p class="text-sm text-brand-dark font-semibold w-max">
              Status: {{ assessment?.status }}
            </p>

            <p class="text-sm text-brand-gray font-semibold w-max">
              Date: {{ assessment?.date_time }}
            </p>

          </div>

        </div>

      </div>

    </nav>

    <ConsoleAssessment
      v-if="assessment"
      :overall-score="assessment.marks_obtainable"
      :number-of-candidates="assessment.candidates.length"
      :average-score="averageScore"
      :passed-candidates="passedCandidates"
      :failed-candidates="failedCandidates"
    />
        
  </section>
  
</template>

<script setup lang="ts">
const { assessmentId } = useRoute().params

const { data: assessment } = await useAsyncData(
  'assessment',
  async () => await $fetch(`/api/assessment?assessmentId=${assessmentId}`, { method: 'get' }),
  {
    server: false,
  },
)

const averageScore = computed(() => {
  if (assessment.value && assessment.value.candidates.length > 0) {
    const sumOfScores = assessment.value.candidates.reduce((sum, candidate) => sum + candidate.score, 0)
    const numberOfCandidates = assessment.value.candidates.length
    return sumOfScores / numberOfCandidates
  }
  return 0
})

const passedCandidates = computed(() => {
  if (assessment.value && assessment.value.candidates.length > 0) {
    return assessment.value.candidates.filter(candidate => candidate.remark === 'pass').length
  }
  return 0
})

const failedCandidates = computed(() => {
  if (assessment.value && assessment.value.candidates.length > 0) {
    return assessment.value.candidates.filter(candidate => candidate.remark === 'fail').length
  }
  return 0
})
</script>
