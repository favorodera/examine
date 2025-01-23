<template>

  <Layout>

    <template
      v-if="assessment"
      #nav
    >

      <div class="w-full flex items-center justify-between gap-4">

        <h1 class="text-2xl font-semibold">
          Assessment Overview
        </h1>

        <button
          type="button"
          class="rounded-md bg-brand-green px-4 py-1 text-white font-medium transition-background-color duration-500 hover:bg-brand-green/70"
          @click="navigateTo('/console')"
        >
          Console
        </button>

      </div>

      <div class="w-full flex items-center justify-between gap-4">

        <div class="flex flex-col gap-1">

          <p class="line-clamp-1 text-sm font-medium">
            Examination: {{ assessment.assessment_name }}
          </p>

          <p class="text-sm text-brand-gray font-medium">
            Duration: {{ assessment.duration_mins }} minutes
          </p>

        </div>

        <div class="w-max flex flex-col gap-1">

          <p class="w-max text-sm font-medium capitalize">
            Status: {{ assessment.status }}
          </p>

          <p class="w-max text-sm text-brand-gray font-medium">
            Date: {{ `${formatDateTime(assessment.date_time).formattedDate}
                ${formatDateTime(assessment.date_time).formattedTime}` }} UTC
          </p>

        </div>

      </div>

    </template>

    <template #body>

      <ConsoleAssessmentDetails
        :assessment="assessment"
        :status="status"
      >

        <template
          v-if="status === 'error'"
          #error
        >

          <div class="m-a flex flex-col items-center gap-2 text-red">

            <span class="i-hugeicons:alert-02 size-6" />

            <p class="text-lg font-medium">
              Error Fetching Assessment
            </p>

            <button
              type="button"
              class="rounded-md bg-brand-green px-3 py-1 text-lg text-white font-medium transition-background-color duration-500 hover:bg-brand-green/70"
              @click="refresh()"
            >
              Retry
            </button>

          </div>

        </template>

        <template
          v-if="status === 'pending' && assessment === null"
          #loading
        >

          <div class="m-a flex flex-col items-center gap-2 text-orange">

            <span class="i-hugeicons:reload size-6 animate-spin" />

            <p class="text-lg font-medium">
              Fetching Assessment...
            </p>

          </div>

        </template>

      </ConsoleAssessmentDetails>

      <ModalsNewQuestion :remaining-marks-obtainable="remainingMarksObtainable" />

    </template>

  </Layout>

</template>

<script setup lang="ts">
import type { RealtimeChannel } from '@supabase/realtime-js'

const client = useSupabaseClient()

const { assessmentId } = useRoute().params
const questionsChannel = ref<RealtimeChannel>()

const { data: assessment, refresh: refresh, status, clear } = await useAsyncData(
  'assessment-details',
  () => $fetch(`/api/assessment-details?assessmentId=${assessmentId}`, { method: 'get', timeout: 30000 }),
  { server: false },
)

const remainingMarksObtainable = computed(() => {
  const marksObtainable = assessment.value?.marks_obtainable
  const marksAssignedToQuestions = ref<number>()

  const marksAssignedToQuestionsArray = assessment.value?.questions.questions.map(question => question.marks_obtainable)

  marksAssignedToQuestions.value = marksAssignedToQuestionsArray?.reduce((sum, mark) => sum + mark, 0)

  return marksObtainable! - marksAssignedToQuestions.value!
})

onMounted(() => {

  questionsChannel.value = client.channel('assessment-details')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'assessments', filter: `assessment_id=eq.${assessmentId}` },
      () => refresh(),
    )
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'candidates', filter: `assessment_id=eq.${assessmentId}` },
      () => refresh(),
    )
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'questions', filter: `assessment_id=eq.${assessmentId}` },
      () => refresh(),
    )
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'correct_answers', filter: `assessment_id=eq.${assessmentId}` },
      () => refresh(),
    )
    .subscribe()

})

onUnmounted(() => {

  clear()

  client.removeChannel(questionsChannel.value!)

})

</script>
