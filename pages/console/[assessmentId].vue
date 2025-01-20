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

          <p class="w-max text-sm font-medium">
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

          <div class="m-a flex flex-col items-center gap-4 text-red">

            <span class="i-hugeicons:alert-02 size-8" />

            <p class="text-xl font-semibold">
              Error Fetching Assessment
            </p>

            <button
              type="button"
              class="rounded-md bg-brand-green px-3 py-1 text-white font-medium transition-background-color duration-500 hover:bg-brand-green/70"
              @click="refreshAssessmentDetails()"
            >
              Retry
            </button>

          </div>

        </template>

        <template
          v-if="status === 'pending'"
          #loading
        >

          <div class="m-a flex flex-col items-center gap-4 text-orange">

            <span class="i-hugeicons:reload size-8 animate-spin" />

            <p class="text-xl font-semibold">
              Fetching Assessment...
            </p>

          </div>

        </template>

      </ConsoleAssessmentDetails>

      <ModalsNewQuestion />

    </template>

  </Layout>

</template>

<script setup lang="ts">
const { assessmentId } = useRoute().params

const { data: assessment, refresh: refreshAssessmentDetails, status } = await useAsyncData(
  'assessment-details',
  () => $fetch(`/api/assessment-details?assessmentId=${assessmentId}`, { method: 'get', timeout: 30000 }),
  { server: false },
)

</script>
