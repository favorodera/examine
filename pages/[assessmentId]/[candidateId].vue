<template>

  <Layout>

    <template
      v-if="candidateDetails && status === 'success'"
      #nav
    >

      <div class="w-full flex items-center justify-between gap-4">

        <h1 class="text-2xl font-semibold">
          Candidate Overview
        </h1>

        <!-- <button
          v-if="candidateDetails.assessments.status === 'ended'"
          type="button"
          class="rounded-md bg-brand-green px-4 py-1 text-white font-medium transition-background-color duration-500 hover:bg-brand-green/70"
          @click="print()"
        >
          Print
        </button> -->

      </div>

      <div class="w-full flex items-center justify-between gap-4">

        <div class="flex flex-col gap-1">

          <p class="line-clamp-1 text-sm font-medium">
            Examination: {{ candidateDetails.assessments.assessment_name }}
          </p>

          <p class="text-sm text-brand-gray font-medium">
            Duration: {{ candidateDetails.assessments.duration_mins }} minutes
          </p>

        </div>

        <div class="w-max flex flex-col gap-1">

          <p class="w-max text-sm font-medium capitalize">
            Status: {{ candidateDetails.assessments.status }}
          </p>

          <p class="w-max text-sm text-brand-gray font-medium">
            Date: {{ `${formatDateTime(candidateDetails.assessments.date_time).formattedDate}
                ${formatDateTime(candidateDetails.assessments.date_time).formattedTime}` }} UTC
          </p>

        </div>

      </div>

    </template>

    <template #body>

      <CandidateDetails
        :candidate-details="candidateDetails"
        :status="status"
      >

        <template
          v-if="status === 'error'"
          #error
        >

          <div class="m-a flex flex-col items-center gap-2 text-red">

            <span class="i-hugeicons:alert-02 size-6" />

            <p class="text-lg font-medium">
              Error Fetching Candidate
            </p>

            <button
              type="button"
              class="rounded-md bg-brand-green px-3 py-1 text-white font-medium transition-background-color duration-500 hover:bg-brand-green/70"
              @click="refresh()"
            >
              Retry
            </button>

          </div>

        </template>

        <template
          v-if="status === 'pending'"
          #loading
        >

          <div class="m-a flex flex-col items-center gap-2 text-orange">

            <span class="i-hugeicons:reload size-6 animate-spin" />

            <p class="text-lg font-medium">
              Fetching Candidate...
            </p>

          </div>

        </template>

      </CandidateDetails>

    </template>

  </Layout>

</template>

<script setup lang="ts">
import type { RealtimeChannel } from '@supabase/realtime-js'

const { assessmentId, candidateId } = useRoute().params
const client = useSupabaseClient()
const assessmentChannel = ref<RealtimeChannel>()

const { data: candidateDetails, status, refresh } = await useAsyncData(
  'candidate',
  () => $fetch(`/api/candidate-details?assessmentId=${assessmentId}&candidateId=${candidateId}`, { method: 'GET', timeout: 30000 }),
  { server: false },
)

useSeoMeta({
  title: () => `Results | ${candidateDetails.value?.name}`,
  description: () => `${candidateDetails.value?.name}'s results for ${candidateDetails.value?.assessments.assessment_name} `,
  ogTitle: () => `Examine | Results | ${candidateDetails.value?.name}`,
  ogDescription: () => `${candidateDetails.value?.name}'s results for ${candidateDetails.value?.assessments.assessment_name} `,
  ogUrl: () => `https://examine-app.vercel.app/${candidateDetails.value?.assessments.assessment_id}/${encodeURIComponent(candidateDetails.value?.candidate_id as string)}`,
  ogSiteName: 'Examine',
  twitterTitle: () => `Examine | Results | ${candidateDetails.value?.name}`,
  twitterDescription: () => `${candidateDetails.value?.name}'s results for ${candidateDetails.value?.assessments.assessment_name} `,
})

// const print = () => window.print()

onMounted(() => {
  
  assessmentChannel.value = client.channel('assessment-status')
    .on(
      'postgres_changes',
      { event: 'UPDATE', schema: 'public', table: 'assessments', filter: `assessment_id=eq.${assessmentId}` },
      () => refresh(),
    )
    .subscribe()

})

onUnmounted(() => {
  client.removeChannel(assessmentChannel.value!)
})
</script>
