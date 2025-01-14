<template>

  <Layout>

    <template
      v-if="assessment"
      #nav
    >

      <nav class="shadowed sticky z-1 w-full flex justify-center bg-white p-4">

        <div class="max-w-360 w-full flex flex-col items-center justify-between gap-2">

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
                Examination: {{ assessment.name }}
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
                Date: {{ assessment.date_time.split('T')[0] }} {{ assessment.date_time.split('T')[1] }} UTC
              </p>

            </div>

          </div>

        </div>

      </nav>

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
const createUpdate = useCreateUpdate()

const { data: assessment, refresh, status } = await useAsyncData(
  'assessment-details',
  () => $fetch(`/api/assessmentDetails?assessmentId=${assessmentId}`, { method: 'get', timeout: 30000 }),
  { server: false },
)

watch(createUpdate, () => {
  if (createUpdate.question) {
    refresh()
  }
})
</script>
