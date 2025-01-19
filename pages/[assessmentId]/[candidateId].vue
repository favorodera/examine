<template>
    
  <Layout>

    <template
      v-if="candidateDetails && status === 'success'"
      #nav
    >

      <nav class="shadowed sticky z-1 w-full flex justify-center bg-white p-4">

        <div class="max-w-360 w-full flex flex-col items-center justify-between gap-2">

          <div class="w-full flex items-center justify-between gap-4">

            <h1 class="text-2xl font-semibold">
              Candidate Overview
            </h1>

            <button
              type="button"
              class="rounded-md bg-brand-green px-4 py-1 text-white font-medium transition-background-color duration-500 hover:bg-brand-green/70"
              @click="navigateTo('/console')"
            >
              Print
            </button>

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

              <p class="w-max text-sm font-medium">
                Status: {{ candidateDetails.assessments.status }}
              </p>

              <p class="w-max text-sm text-brand-gray font-medium">
                Date: {{ formatDate(candidateDetails.assessments.date_time) }} UTC
              </p>

            </div>

          </div>

        </div>

      </nav>

    </template>

    <template #body>
      
      <CandidateDetails
        :candidate-details="candidateDetails "
        :status="status"
      >
    
        <template
          v-if="status === 'error'"
          #error
        >

          <div class="m-a flex flex-col items-center gap-4 text-red">

            <span class="i-hugeicons:alert-02 size-8" />

            <p class="text-xl font-semibold">
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

          <div class="m-a flex flex-col items-center gap-4 text-orange">

            <span class="i-hugeicons:reload size-8 animate-spin" />

            <p class="text-xl font-semibold">
              Fetching Candidate...
            </p>

          </div>

        </template>

      </CandidateDetails>

    </template>

  </Layout>

</template>

<script setup lang="ts">
const { assessmentId, candidateId } = useRoute().params
  
const { data: candidateDetails, status, refresh } = await useAsyncData(
  'candidate',
  () => $fetch(`/api/candidate-details?assessmentId=${assessmentId}&candidateId=${candidateId}`, { method: 'GET', timeout: 30000 }),
  { server: false },
)
</script>
